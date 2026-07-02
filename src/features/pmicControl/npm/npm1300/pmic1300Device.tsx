/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    logger,
    type ShellParser,
} from '@nordicsemiconductor/pc-nrfconnect-shared';

import { type RootState } from '../../../../appReducer';
import BaseNpmDevice from '../basePmicDevice';
import {
    isModuleDataPair,
    MAX_TIMESTAMP,
    NpmEventEmitter,
    parseLogData,
} from '../pmicHelpers';
import {
    type AdcSample,
    type FuelGauge,
    type IrqEvent,
    type LoggingEvent,
    type NpmExportV2,
    type NpmPeripherals,
    type PmicDialog,
    type USBPower,
} from '../types';
import { BatteryProfiler } from './batteryProfiler';
import BuckModule, { toBuckExport } from './buck';
import ChargerModule from './charger';
import FuelGaugeModule from './fuelGauge';
import GpioModule from './gpio';
import { numGPIOs } from './gpio/types';
import LdoModule, { toLdoExport } from './ldo';
import LedModule from './led';
import LowPowerModule from './lowPower';
import overlay from './overlay';
import PofModule from './pof';
import ResetModule from './reset';
import TimerConfigModule from './timerConfig';
import UsbCurrentLimiterModule from './universalSerialBusCurrentLimiter';

export const npm1300FWVersion = '1.5.2+0';

export default class Npm1300 extends BaseNpmDevice {
    constructor(
        shellParser: ShellParser | undefined,
        dialogHandler: ((dialog: PmicDialog) => void) | null,
        peripherals?: Partial<NpmPeripherals>,
        hardwareVersion?: string,
        pmicVersion?: number,
        type: 'npm1300' | 'npm1304' = 'npm1300',
        fw: string = npm1300FWVersion,
    ) {
        super(
            type,
            fw,
            shellParser,
            dialogHandler,
            new NpmEventEmitter(),
            {
                ChargerModule,
                noOfBatterySlots: 3,
                maxEnergyExtraction: false,
                ldos: {
                    Module: LdoModule,
                    count: 2,
                },
                bucks: {
                    Module: BuckModule,
                    count: 2,
                },
                gpios: {
                    Module: GpioModule,
                    count: numGPIOs,
                },
                leds: {
                    Module: LedModule,
                    count: 3,
                },
                BatteryProfiler,
                PofModule,
                UsbCurrentLimiterModule,
                TimerConfigModule,
                LowPowerModule,
                ResetModule,
                FuelGaugeModule,
                ...peripherals,
            },
            1,
            {
                reset: true,
                charger: true,
                sensor: true,
            },
            hardwareVersion,
            pmicVersion,
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

    private processModulePmic({ message }: LoggingEvent) {
        switch (message) {
            case 'Power Failure Warning':
                this.batteryProfiler?.pofError();
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
            case 'No USB connection':
                this.eventEmitter.emit('onUsbPower', {
                    detectStatus: 'No USB connection',
                } as USBPower);
                break;
            case 'Default USB 100/500mA':
                this.eventEmitter.emit('onUsbPower', {
                    detectStatus: 'USB 100/500 mA',
                } as USBPower);
                break;
            case '1.5A High Power':
                this.eventEmitter.emit('onUsbPower', {
                    detectStatus: '1.5A High Power',
                } as USBPower);
                break;
            case '3A High Power':
                this.eventEmitter.emit('onUsbPower', {
                    detectStatus: '3A High Power',
                } as USBPower);
                break;
        }
    }

    private processModulePmicAdc({ timestamp, message }: LoggingEvent) {
        const match = message.match(
            /ibat=(?<ibat>[^,]+),vbat=(?<vbat>[^,]+),tbat=(?<tbat>[^,]+),soc=(?<soc>[^,]+),tte=(?<tte>[^,]+),ttf=(?<ttf>[^,]+),soh=(?<soh>[^,]+),cycle_count=(?<cycle_count>[^,]+)/,
        );

        if (
            !match?.groups ||
            !match.groups.cycle_count ||
            !match.groups.ibat ||
            !match.groups.soc ||
            !match.groups.soh ||
            !match.groups.tbat ||
            !match.groups.tte ||
            !match.groups.ttf ||
            !match.groups.vbat
        ) {
            return;
        }

        const adcSample: AdcSample = {
            iBat: Number(match.groups.ibat) * 1000, // convert to mA
            soc: Number(match.groups.soc),
            tBat: Number(match.groups.tbat),
            timestamp,
            tte: Number(match.groups.tte),
            ttf: Number(match.groups.ttf),
            vBat: Number(match.groups.vbat),
        };
        if (adcSample.timestamp < this.lastUptime) {
            this.uptimeOverflowCounter += 1;
            adcSample.timestamp += MAX_TIMESTAMP * this.uptimeOverflowCounter;
        }
        this.lastUptime = adcSample.timestamp;
        this.eventEmitter.emit('onAdcSample', adcSample);

        const fuelGaugeUpdate: Partial<FuelGauge> = {
            actualCapacity: Number(match.groups.soh),
            cycleCount: Number(match.groups.cycle_count),
        };
        this.eventEmitter.emitPartialEvent<FuelGauge>(
            'onFuelGauge',
            fuelGaugeUpdate,
        );
    }

    processModulePmicIrq = ({ message }: LoggingEvent) => {
        const messageParts = message.split(',');
        const event: IrqEvent = {
            type: '',
            event: '',
        };
        messageParts.forEach(part => {
            const pair = part.split('=');
            switch (pair[0]) {
                case 'type':
                    event.type = pair[1];
                    break;
                case 'bit':
                    event.event = pair[1];
                    break;
            }
        });

        this.doActionOnEvent(event);
    };

    private doActionOnEvent(irqEvent: IrqEvent) {
        switch (irqEvent.type) {
            case 'EVENTSVBUSIN0SET':
                this.processEventVBus0Set(irqEvent);
                break;
            case 'EVENTSBCHARGER1SET':
                if (irqEvent.event === 'EVENTCHGERROR') {
                    this.eventEmitter.emit('onErrorLogs', {
                        chargerError: [],
                        sensorError: [],
                    });

                    this.shellParser?.enqueueRequest(
                        'npmx errlog get',
                        {
                            onSuccess: res => {
                                let errors: string[] = [];
                                let currentState = '';

                                const emit = () => {
                                    switch (currentState) {
                                        case 'RSTCAUSE:':
                                            this.eventEmitter.emit(
                                                'onErrorLogs',
                                                {
                                                    resetCause: errors,
                                                },
                                            );
                                            logger.warn(
                                                `Reset cause: ${errors.join(
                                                    ', ',
                                                )}`,
                                            );
                                            break;
                                        case 'CHARGER_ERROR:':
                                            this.eventEmitter.emit(
                                                'onErrorLogs',
                                                {
                                                    chargerError: errors,
                                                },
                                            );
                                            logger.error(
                                                `Charger Errors: ${errors.join(
                                                    ', ',
                                                )}`,
                                            );
                                            break;
                                        case 'SENSOR_ERROR:':
                                            this.eventEmitter.emit(
                                                'onErrorLogs',
                                                {
                                                    sensorError: errors,
                                                },
                                            );
                                            logger.error(
                                                `Sensor Errors: ${errors.join(
                                                    ', ',
                                                )}`,
                                            );
                                            break;
                                    }
                                };
                                const split = res?.split('\n');
                                split
                                    ?.map(item => item.trim())
                                    .forEach(item => {
                                        if (item.match(/[A-Z_]+:/)) {
                                            if (currentState) emit();
                                            currentState = item;
                                            errors = [];
                                        } else {
                                            errors.push(item);
                                        }
                                    });

                                emit();
                            },
                            onError: () => {
                                logger.warn(
                                    'error message unable to read error from device',
                                );
                            },
                            onTimeout: () => {
                                logger.warn('Reading latest error timed out.');
                            },
                        },
                        undefined,
                        true,
                    );
                }
                break;
            case 'RSTCAUSE':
                this.eventEmitter.emit('onErrorLogs', {
                    resetCause: [irqEvent.event],
                });
                logger.warn(`Reset cause: ${irqEvent.event}`);
                break;
        }
    }

    private processEventVBus0Set(irqEvent: IrqEvent) {
        switch (irqEvent.event) {
            case 'EVENTVBUSREMOVED':
                this.eventEmitter.emit('onUsbPowered', false);
                break;
            case 'EVENTVBUSDETECTED':
                this.eventEmitter.emit('onUsbPowered', true);
                break;
        }
    }

    release() {
        super.release();
        this.batteryProfiler?.release();
        this.releaseAll.forEach(release => release());
    }

    // eslint-disable-next-line class-methods-use-this
    get canUploadBatteryProfiles() {
        return true;
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
            charger: currentState.charger,
            bucks: [...currentState.bucks.map(toBuckExport)],
            ldos: [...currentState.ldos.map(toLdoExport)],
            gpios: [...currentState.gpios],
            leds: [...currentState.leds],
            pof: currentState.pof,
            lowPower: currentState.lowPower,
            reset: currentState.reset,
            timerConfig: currentState.timerConfig,
            fuelGaugeSettings: {
                enabled: currentState.fuelGaugeSettings.enabled,
                chargingSamplingRate:
                    currentState.fuelGaugeSettings.chargingSamplingRate,
            },
            firmwareVersion: currentState.npmDevice.supportedVersion,
            deviceType: currentState.npmDevice.deviceType,
            usbPower: currentState.usbPower
                ? { currentLimiter: currentState.usbPower.currentLimiter }
                : undefined,
            fileFormatVersion: 2 as const,
        };
    }

    generateOverlay(npmExport: NpmExportV2) {
        return overlay(npmExport, this);
    }

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
