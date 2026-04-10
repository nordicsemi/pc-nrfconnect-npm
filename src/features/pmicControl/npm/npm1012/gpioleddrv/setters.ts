/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { NpmEventEmitter } from '../../pmicHelpers';
import {
    GPIOLEDDrv,
    GPIOLEDDrvGPIODrive,
    GPIOLEDDrvGPIOMode,
    GPIOLEDDrvGPIOPolarity,
    GPIOLEDDrvGPIOPull,
    GPIOLEDDrvGPIOState,
    GPIOLEDDrvLEDDrive,
    GPIOLEDDrvLEDMode,
    GPIOLEDDrvState,
} from '../../types';
import { GpioLedDrvGet } from './getters';
import { gpioModeInputKeys, gpioModeOutputKeys } from './types';

export class GpioLedDrvSet {
    private get: GpioLedDrvGet;
    constructor(
        private eventEmitter: NpmEventEmitter,
        private sendCommand: (
            command: string,
            onSuccess?: (response: string, command: string) => void,
            onError?: (response: string, command: string) => void,
        ) => void,
        private offlineMode: boolean,
        private index: number,
    ) {
        this.get = new GpioLedDrvGet(sendCommand, index);
    }

    async all(config: GPIOLEDDrv) {
        const promises = [
            this.gpioDebounce(config.gpioDebounce),
            this.gpioDrive(config.gpioDrive),
            this.gpioDutyCycle(config.gpioDutyCycle),
            this.gpioMode(config.gpioMode, config.gpioState),
            this.gpioOpenDrain(config.gpioOpenDrain),
            this.gpioPolarity(config.gpioPolarity),
            this.gpioPull(config.gpioPull),

            this.ledDrive(config.ledDrive),
            this.ledDutyCycle(config.ledDutyCycle),
            this.ledMode(config.ledMode),

            this.state(config.state),
        ];

        await Promise.allSettled(promises);
    }

    dutyCycle(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioDutyCycle: value,
                        ledDutyCycle: value,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm1012 gpio led duty set ${this.index} ${value}`,
                () => resolve(),
                () => {
                    this.get.dutyCycle();
                    reject();
                },
            );
        });
    }

    gpioDebounce(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioDebounce: value,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm1012 gpio debounce set ${this.index} ${value ? 'on' : 'off'}`,
                () => resolve(),
                () => {
                    this.get.gpioDebounce();
                    reject();
                },
            );
        });
    }

    gpioDrive(value: GPIOLEDDrvGPIODrive) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioDrive: value,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm1012 gpio drive set ${this.index} ${value}`,
                () => resolve(),
                () => {
                    this.get.gpioDrive();
                    reject();
                },
            );
        });
    }

    gpioDutyCycle(value: number) {
        return this.dutyCycle(value);
    }

    gpioMode(mode: GPIOLEDDrvGPIOMode, state: GPIOLEDDrvGPIOState) {
        return new Promise<void>((resolve, reject) => {
            let gpioMode: GPIOLEDDrvGPIOMode | undefined;
            switch (state) {
                case 'Input':
                    gpioMode =
                        gpioModeInputKeys.find(item => item === mode) ??
                        gpioModeInputKeys[0];
                    break;
                case 'Output':
                    gpioMode =
                        gpioModeOutputKeys.find(item => item === mode) ??
                        gpioModeOutputKeys[0];
                    break;
                default:
                    gpioMode = undefined;
            }

            if (gpioMode === undefined) {
                resolve();
                return;
            }

            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioMode,
                        gpioState: state,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm1012 gpio function set ${this.index} ${gpioMode}`,
                () => resolve(),
                () => {
                    this.get.gpioMode();
                    reject();
                },
            );
        });
    }

    gpioOpenDrain(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioOpenDrain: value,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm1012 gpio opendrain set ${this.index} ${value ? 'on' : 'off'}`,
                () => resolve(),
                () => {
                    this.get.gpioOpenDrain();
                    reject();
                },
            );
        });
    }

    gpioPolarity(value: GPIOLEDDrvGPIOPolarity) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioPolarity: value,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm1012 gpio polarity set ${this.index} ${value}`,
                () => resolve(),
                () => {
                    this.get.gpioPolarity();
                    reject();
                },
            );
        });
    }

    gpioPull(value: GPIOLEDDrvGPIOPull) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioPull: value,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm1012 gpio pull set ${this.index} ${value}`,
                () => resolve(),
                () => {
                    this.get.gpioPull();
                    reject();
                },
            );
        });
    }

    ledDrive(value: GPIOLEDDrvLEDDrive) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        ledDrive: value,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm1012 gpio led drive set ${this.index} ${value}`,
                () => resolve(),
                () => {
                    this.get.ledDrive();
                    reject();
                },
            );
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
    gpioState(_value: GPIOLEDDrvGPIOState) {
        return new Promise<void>(resolve => {
            resolve();
        });
    }

    ledDutyCycle(value: number) {
        return this.dutyCycle(value);
    }

    ledMode(value: GPIOLEDDrvLEDMode) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        ledMode: value,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm1012 gpio led mode set ${this.index} ${value}`,
                () => resolve(),
                () => {
                    this.get.ledMode();
                    reject();
                },
            );
        });
    }

    state(value: GPIOLEDDrvState) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        state: value,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            if (value !== 'LED') {
                resolve();
                return;
            }

            const onError = () => {
                this.get.state();
                reject();
            };

            this.sendCommand(
                `npm1012 gpio function set ${this.index} LED`,
                () =>
                    this.gpioPolarity('ACTIVELOW').then(resolve).catch(onError),
                onError,
            );
        });
    }
}
