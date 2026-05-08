/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ShellParser } from '@nordicsemiconductor/pc-nrfconnect-shared';

import { type RootState } from '../../../../appReducer';
import BaseNpmDevice from '../basePmicDevice';
import {
    isModuleDataPair,
    MAX_TIMESTAMP,
    NpmEventEmitter,
    parseLogData,
    parseToFloat,
} from '../pmicHelpers';
import {
    type AdcSample,
    type FuelGauge,
    type LoggingEvent,
    type OnBoardLoad,
    type PmicDialog,
} from '../types';
import { BatteryProfiler } from './batteryProfiler';
import BuckModule, { toBuckExport } from './buck';
import ChargerModule from './charger';
import FuelGaugeModule from './fuelGauge';
import GpioLedDrvModule from './gpioleddrv';
import LdoModule, { toLdoExport } from './ldo';
import LedModule, { toLedExport } from './led';
import OnBoardLoadModule from './onBoardLoad';
import UsbCurrentLimiterModule from './universalSerialBusCurrentLimiter';

export const npm1012FWVersion = '0.3.0+0';

export default class Npm1012 extends BaseNpmDevice {
    constructor(
        shellParser: ShellParser | undefined,
        dialogHandler: ((pmicDialog: PmicDialog) => void) | null,
    ) {
        super(
            'npm1012',
            npm1012FWVersion,
            shellParser,
            dialogHandler,
            new NpmEventEmitter(),
            {
                bucks: { Module: BuckModule, count: 1 },
                ldos: { Module: LdoModule, count: 2 },
                gpioLedDrvs: { Module: GpioLedDrvModule, count: 3 },
                ChargerModule,
                maxEnergyExtraction: true,
                noOfBatterySlots: 3,
                leds: {
                    Module: LedModule,
                    count: 1,
                },
                BatteryProfiler,
                FuelGaugeModule,
                UsbCurrentLimiterModule,
                OnBoardLoadModule,
            },
            1,
            {
                reset: false,
                charger: true,
                sensor: false,
            },
        );

        if (shellParser) {
            this.releaseAll.push(
                shellParser.onShellLoggingEvent(logEvent => {
                    parseLogData(logEvent, loggingEvent => {
                        switch (loggingEvent.module) {
                            case 'module_pmic':
                                this.processModulePmic(loggingEvent);
                                break;
                            case 'module_pmic_adc':
                                this.processModulePmicAdc(loggingEvent);
                                break;
                            case 'module_pmic_irq':
                                this.processModulePmicIrq(loggingEvent);
                                break;
                            case 'module_pmic_charger':
                                // Handled in charger callbacks
                                break;
                            case 'module_fg':
                                // Handled in fuelGauge callbacks
                                break;
                            case 'module_cc_sink':
                                this.processModuleCCSink(loggingEvent);
                                break;
                        }

                        this.eventEmitter.emit('onLoggingEvent', {
                            loggingEvent,
                            dataPair: isModuleDataPair(loggingEvent.module),
                        });
                    });
                }),
            );
        }
    }

    private processModuleCCSink({ message }: LoggingEvent) {
        if (message.startsWith('cc_level:')) {
            const value = parseToFloat(message);
            this.eventEmitter.emit('onOnBoardLoadUpdate', {
                iLoad: value,
            } satisfies OnBoardLoad);
        }
    }

    private processModulePmic({ message }: LoggingEvent) {
        switch (message) {
            case 'No response from PMIC.':
                if (this.pmicState !== 'pmic-disconnected') {
                    this.pmicState = 'pmic-disconnected';
                    this.eventEmitter.emit('onPmicStateChange', this.pmicState);
                }
                break;
            case 'PMIC available. Application can be restarted.':
                if (this.pmicState === 'pmic-pending-rebooting') return;

                if (this.autoReboot) {
                    this.kernelReset();
                    this.pmicState = 'pmic-pending-rebooting';
                    this.eventEmitter.emit('onPmicStateChange', this.pmicState);
                } else if (this.pmicState !== 'pmic-pending-reboot') {
                    this.pmicState = 'pmic-pending-reboot';
                    this.eventEmitter.emit('onPmicStateChange', this.pmicState);
                }
                break;
        }
    }

    private processModulePmicAdc({
        timestamp,
        message,
        logLevel,
    }: LoggingEvent) {
        if (
            logLevel === 'err' &&
            message.startsWith('Error: ADC reading failed')
        ) {
            // TODO: handle event
            return;
        }

        const messageParts = message.split(',');
        const adcSample: AdcSample = {
            iBat: NaN,
            soc: NaN,
            tBat: 0,
            timestamp,
            tte: NaN,
            ttf: NaN,
            vBat: 0,
        };

        const fixed = (dp: number, value?: string | number) =>
            Number(Number(value ?? 0).toFixed(dp));

        const fuelGaugeUpdate: Partial<FuelGauge> = {};

        messageParts.forEach(part => {
            const pair = part.split('=');
            switch (pair[0]) {
                case 'cycle_count':
                    fuelGaugeUpdate.cycleCount = Number(pair[1]);
                    break;
                case 'ibat':
                    adcSample.iBat = fixed(2, Number(pair[1] ?? NaN) * 1000);
                    break;
                case 'soc':
                    adcSample.soc = Math.min(
                        100,
                        Math.max(0, fixed(1, pair[1])),
                    );
                    break;
                case 'soh':
                    fuelGaugeUpdate.actualCapacity = Number(pair[1]);
                    break;
                case 'tbat':
                    adcSample.tBat = fixed(1, pair[1]);
                    break;
                case 'tte':
                    adcSample.tte = Number(pair[1] ?? NaN);
                    break;
                case 'ttf':
                    adcSample.ttf = Number(pair[1] ?? NaN);
                    break;
                case 'vbat':
                    adcSample.vBat = fixed(2, pair[1]);
                    break;
            }
        });

        if (adcSample.timestamp < this.lastUptime) {
            this.uptimeOverflowCounter += 1;
            adcSample.timestamp += MAX_TIMESTAMP * this.uptimeOverflowCounter;
        }

        this.eventEmitter.emitPartialEvent<FuelGauge>(
            'onFuelGauge',
            fuelGaugeUpdate,
        );

        this.lastUptime = adcSample.timestamp;

        this.eventEmitter.emit('onAdcSample', adcSample);
    }

    // eslint-disable-next-line class-methods-use-this
    private processModulePmicIrq({ logLevel, message }: LoggingEvent) {
        if (logLevel === 'wrn' && message.startsWith('IRQ handling aborted')) {
            // TODO: handle event
        }
    }

    release() {
        super.release();
        this.releaseAll.forEach(release => release());
    }

    // eslint-disable-next-line class-methods-use-this
    generateExport(
        getState: () => RootState & {
            app: { pmicControl: { npmDevice: BaseNpmDevice } };
        },
    ) {
        const currentState = getState().app.pmicControl;

        return {
            boosts: [...currentState.boosts],
            bucks: [...currentState.bucks.map(toBuckExport)],
            charger: currentState.charger,
            deviceType: currentState.npmDevice.deviceType,
            firmwareVersion: currentState.npmDevice.supportedVersion,
            fuelGaugeSettings: {
                enabled: currentState.fuelGaugeSettings.enabled,
                chargingSamplingRate:
                    currentState.fuelGaugeSettings.chargingSamplingRate,
                discardPosiiveDeltaZ:
                    currentState.fuelGaugeSettings.discardPosiiveDeltaZ,
            },
            gpioLedDrvs: [...currentState.gpioleddrvs],
            gpios: [...currentState.gpios],
            ldos: [...currentState.ldos.map(toLdoExport)],
            leds: [...currentState.leds.map(toLedExport)],
            lowPower: currentState.lowPower,
            reset: currentState.reset,
            timerConfig: currentState.timerConfig,
            usbPower: currentState.usbPower
                ? { currentLimiter: currentState.usbPower.currentLimiter }
                : undefined,
            fileFormatVersion: 2 as const,
        };
    }

    // eslint-disable-next-line class-methods-use-this
    get canUploadBatteryProfiles() {
        return true;
    }

    // TODO: Enable when overlay format is known
    // generateOverlay(npmExport: NpmExportV2) {
    //     return overlay(npmExport, this);
    // }
}
