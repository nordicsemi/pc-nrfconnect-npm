/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

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
    type ErrorLogs,
    type FuelGauge,
    type LoggingEvent,
    type ModuleParams,
    type NpmExportLatest,
    type OnBoardLoad,
} from '../types';
import { BatteryProfiler } from './batteryProfiler';
import BuckModule, { toBuckExport } from './buck';
import ChargerModule from './charger';
import FuelGaugeModule from './fuelGauge';
import GpioModule from './gpio';
import { numGPIOs } from './gpio/types';
import LedModule from './led';
import LowPowerModule from './lowPower';
import OnBoardLoadModule from './onBoardLoad';
import PofModule from './pof';
import ResetModule from './reset';
import SysRegModule from './sysReg';
import TimerConfigModule from './timerConfig';
import UserOtpModule from './userOtp';

export const npm1210FWVersion = '0.4.1+0';

export default class Npm1210 extends BaseNpmDevice {
    constructor(
        shellParser: ModuleParams['shellParser'],
        dialogHandler: ModuleParams['dialogHandler'],
    ) {
        super(
            'npm1210',
            npm1210FWVersion,
            shellParser,
            dialogHandler,
            new NpmEventEmitter(),
            {
                BatteryProfiler,
                ChargerModule,
                FuelGaugeModule,
                LowPowerModule,
                OnBoardLoadModule,
                PofModule,
                ResetModule,
                SysRegModule,
                TimerConfigModule,
                UserOtpModule,
                bucks: { Module: BuckModule, count: 1 },
                gpios: { Module: GpioModule, count: numGPIOs },
                leds: { Module: LedModule, count: 4 },
                maxEnergyExtraction: false,
                noOfBatterySlots: 3,
            },
            1,
            {
                reset: true,
                charger: true,
                sensor: true,
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
        const resetOrError = message.split(': ');
        const resetOrErrorMessage = resetOrError[0];
        const resetOrErrorValues = resetOrError[1]?.split(',') ?? [];

        switch (resetOrErrorMessage) {
            case 'Charger error':
                this.eventEmitter.emit('onErrorLogs', {
                    chargerError: resetOrErrorValues,
                } satisfies ErrorLogs);
                break;
            case 'Error sensor state':
                this.eventEmitter.emit('onErrorLogs', {
                    sensorError: resetOrErrorValues,
                } satisfies ErrorLogs);
                break;
            case 'Reset reason':
                this.eventEmitter.emit('onErrorLogs', {
                    resetCause: resetOrErrorValues,
                } satisfies ErrorLogs);
                break;

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

    private processModulePmicAdc({ timestamp, message }: LoggingEvent) {
        const cycleCount = message.match(/cycle_count=([^,\s]+)/)?.[1];
        const iBat = message.match(/ibat=([^,\s]+)/)?.[1];
        const soc = message.match(/soc=([^,\s]+)/)?.[1];
        const soh = message.match(/soh=([^,\s]+)/)?.[1];
        const tBat = message.match(/tbat=([^,\s]+)/)?.[1];
        const tte = message.match(/tte=([^,\s]+)/)?.[1];
        const ttf = message.match(/ttf=([^,\s]+)/)?.[1];
        const vBat = message.match(/vbat=([^,\s]+)/)?.[1];
        const r0Effective = message.match(/r0_effective=([^,\s]+)/)?.[1];

        if (
            !cycleCount ||
            !iBat ||
            !soc ||
            !soh ||
            !tBat ||
            !tte ||
            !ttf ||
            !vBat
        ) {
            return;
        }

        const adcSample: AdcSample = {
            iBat: Number(iBat) * 1000, // convert to mA
            soc: Number(soc),
            tBat: Number(tBat),
            timestamp,
            tte: Number(tte),
            ttf: Number(ttf),
            vBat: Number(vBat),
        };
        if (adcSample.timestamp < this.lastUptime) {
            this.uptimeOverflowCounter += 1;
            adcSample.timestamp += MAX_TIMESTAMP * this.uptimeOverflowCounter;
        }
        this.lastUptime = adcSample.timestamp;
        this.eventEmitter.emit('onAdcSample', adcSample);

        const fuelGaugeUpdate: Partial<FuelGauge> = {
            actualCapacity: Number(soh),
            cycleCount: Number(cycleCount),
            estimatedBatteryResistance:
                r0Effective !== undefined ? Number(r0Effective) : Number.NaN,
        };
        this.eventEmitter.emitPartialEvent<FuelGauge>(
            'onFuelGauge',
            fuelGaugeUpdate,
        );
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
    ): NpmExportLatest {
        const currentState = getState().app.pmicControl;

        return {
            boosts: [],
            bucks: [...currentState.bucks.map(toBuckExport)],
            charger: currentState.charger,
            gpios: [],
            deviceType: currentState.npmDevice.deviceType,
            fileFormatVersion: 2 as const,
            firmwareVersion: currentState.npmDevice.supportedVersion,
            fuelGaugeSettings: {
                enabled: currentState.fuelGaugeSettings.enabled,
                chargingSamplingRate:
                    currentState.fuelGaugeSettings.chargingSamplingRate,
            },
            onBoardLoad: currentState.onBoardLoad,
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

    requestBatteryHealthProfileData() {
        return new Promise<string>((resolve, reject) => {
            this.shellParser?.enqueueRequest(
                'fuel_gauge state get',
                {
                    onSuccess: result => {
                        const match = result.match(/(?<json>{[^}]+})/);
                        const jsonDataString = match?.groups?.json;
                        if (jsonDataString === undefined) {
                            reject();
                            return;
                        }
                        resolve(jsonDataString);
                    },
                    onError: reject,
                    onTimeout: error => {
                        console.warn(error);
                        reject();
                    },
                },
                undefined,
                true,
            );
        });
    }
}
