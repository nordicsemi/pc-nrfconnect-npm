/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    type LED,
    type LEDDrive,
    type LedExport,
    type LEDMode,
    type LEDPwmFreq,
    type ModuleParams,
} from '../../types';
import { LedGet } from './getters';
import { modeKeys } from './types';

export class LedSet {
    private get: LedGet;

    constructor(
        private eventEmitter: ModuleParams['eventEmitter'],
        private offlineMode: ModuleParams['offlineMode'],
        private sendCommand: ModuleParams['sendCommand'],
        private index: number,
    ) {
        this.get = new LedGet(sendCommand, index);
    }

    async all(led: LedExport) {
        const promises = [];
        if (led.blinkContinuous !== undefined) {
            promises.push(this.blinkContinuous(led.blinkContinuous));
        }
        if (led.blinkDouble !== undefined) {
            promises.push(this.blinkDouble(led.blinkDouble));
        }
        if (led.blinkTimeOff !== undefined) {
            promises.push(this.blinkTimeOff(led.blinkTimeOff));
        }
        if (led.blinkTimeOn !== undefined) {
            promises.push(this.blinkTimeOn(led.blinkTimeOn));
        }
        if (led.drive !== undefined) {
            promises.push(this.drive(led.drive));
        }
        if (led.dutyCycle !== undefined) {
            promises.push(this.dutyCycle(led.dutyCycle));
        }
        if (led.pwmFrequency !== undefined) {
            promises.push(this.pwmFrequency(led.pwmFrequency));
        }
        if (led.rgbPhaseShifting !== undefined) {
            promises.push(this.rgbPhaseShifting(led.rgbPhaseShifting));
        }

        await Promise.allSettled(promises);
    }

    blinkContinuous(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LED>(
                    'onLEDUpdate',
                    {
                        blinkContinuous: value,
                    },
                    this.index,
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx led blink continuous set ${value ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.blinkContinuous();
                        reject();
                    },
                );
            }
        });
    }

    blinkDouble(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LED>(
                    'onLEDUpdate',
                    {
                        blinkDouble: value,
                    },
                    this.index,
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx led blink double set ${value ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.blinkDouble();
                        reject();
                    },
                );
            }
        });
    }

    blinkTimeOff(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LED>(
                    'onLEDUpdate',
                    {
                        blinkTimeOff: value,
                    },
                    this.index,
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx led blink timeoff set ${value}ms`,
                    () => resolve(),
                    () => {
                        this.get.blinkTimeOff();
                        reject();
                    },
                );
            }
        });
    }

    blinkTimeOn(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LED>(
                    'onLEDUpdate',
                    {
                        blinkTimeOn: value,
                    },
                    this.index,
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx led blink timeon set ${value}ms`,
                    () => resolve(),
                    () => {
                        this.get.blinkTimeOn();
                        reject();
                    },
                );
            }
        });
    }

    drive(value: LEDDrive) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LED>(
                    'onLEDUpdate',
                    {
                        drive: value,
                    },
                    this.index,
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx led drive set ${this.index} ${value}`,
                    () => resolve(),
                    () => {
                        this.get.drive();
                        reject();
                    },
                );
            }
        });
    }

    dutyCycle(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LED>(
                    'onLEDUpdate',
                    {
                        dutyCycle: value,
                    },
                    this.index,
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx led duty set ${this.index} ${value}`,
                    () => resolve(),
                    () => {
                        this.get.dutyCycle();
                        reject();
                    },
                );
            }
        });
    }

    mode(value: LEDMode) {
        return new Promise<void>((resolve, reject) => {
            const mode = modeKeys.find(v => v === value);
            if (mode === undefined) {
                reject();
                return;
            }

            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LED>(
                    'onLEDUpdate',
                    {
                        mode: value,
                    },
                    this.index,
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx led mode set ${this.index} ${value}`,
                    () => resolve(),
                    () => {
                        this.get.mode();
                        reject();
                    },
                );
            }
        });
    }

    pwmFrequency(freq: LEDPwmFreq) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LED>(
                    'onLEDUpdate',
                    {
                        pwmFrequency: freq,
                    },
                    this.index,
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx led pwmfreq set ${freq}`,
                    () => resolve(),
                    () => {
                        this.get.pwmFrequency();
                        reject();
                    },
                );
            }
        });
    }

    rgbPhaseShifting(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LED>(
                    'onLEDUpdate',
                    {
                        rgbPhaseShifting: value,
                    },
                    this.index,
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx led phaseshift set ${value ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.rgbPhaseShifting();
                        reject();
                    },
                );
            }
        });
    }
}
