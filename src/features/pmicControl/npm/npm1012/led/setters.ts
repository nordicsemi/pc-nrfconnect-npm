/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { NpmEventEmitter } from '../../pmicHelpers';
import { LED, LedExport } from '../../types';
import { LedGet } from './getters';

export class LedSet {
    private get: LedGet;
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
        this.get = new LedGet(sendCommand);
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
                    `npm1012 gpio led blink continuous set ${value ? 'on' : 'off'}`,
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
                    `npm1012 gpio led blink double set ${value ? 'on' : 'off'}`,
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
                    `npm1012 gpio led blink timeoff set ${value}ms`,
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
                    `npm1012 gpio led blink timeon set ${value}ms`,
                    () => resolve(),
                    () => {
                        this.get.blinkTimeOn();
                        reject();
                    },
                );
            }
        });
    }

    pwmFrequency(freq: number) {
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
                    `npm1012 gpio led pwmfreq set ${freq}Hz`,
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
                    `npm1012 gpio led phaseshift set ${value ? 'on' : 'off'}`,
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
