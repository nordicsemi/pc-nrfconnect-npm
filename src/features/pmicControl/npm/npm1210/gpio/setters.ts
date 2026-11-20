/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    type GPIO,
    type GPIODrive,
    type GPIOExport,
    type GPIOMode,
    type GPIOPolarity,
    type GPIOPull,
    type ModuleParams,
} from '../../types';
import { GpioGet } from './getters';
import { isInputMode, modeKeys, polarityDisabled } from './types';

export class GpioSet {
    private get: GpioGet;

    constructor(
        private eventEmitter: ModuleParams['eventEmitter'],
        private offlineMode: ModuleParams['offlineMode'],
        private sendCommand: ModuleParams['sendCommand'],
        private index: number,
    ) {
        this.get = new GpioGet(sendCommand, index);
    }

    async all(gpio: GPIOExport) {
        await Promise.allSettled([
            this.debounce(gpio.debounce),
            this.drive(gpio.drive),
            this.mode(gpio.mode),
            this.openDrain(gpio.openDrain),
            this.pull(gpio.pull),

            ...(gpio.polarity !== undefined
                ? [this.polarity(gpio.polarity)]
                : []),
        ]);
    }

    debounce(debounce: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<GPIO>(
                    'onGPIOUpdate',
                    {
                        debounce,
                    },
                    this.index,
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx gpio debounce set ${this.index} ${
                        debounce ? 'on' : 'off'
                    }`,
                    () => resolve(),
                    () => {
                        this.get.debounce();
                        reject();
                    },
                );
            }
        });
    }

    drive(drive: GPIODrive) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<GPIO>(
                    'onGPIOUpdate',
                    {
                        drive,
                    },
                    this.index,
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx gpio drive set ${this.index} ${drive}`,
                    () => resolve(),
                    () => {
                        this.get.drive();
                        reject();
                    },
                );
            }
        });
    }

    mode(value: GPIOMode) {
        return new Promise<void>((resolve, reject) => {
            const mode = modeKeys.find(v => v === value);
            if (mode === undefined) {
                reject();
                return;
            }

            if (this.offlineMode) {
                const isInput = isInputMode(mode);
                this.eventEmitter.emitPartialEvent<GPIO>(
                    'onGPIOUpdate',
                    {
                        debounceEnabled: isInput,
                        driveEnabled: !isInput,
                        mode,
                        polarityEnabled: !polarityDisabled(mode),
                        pullEnabled: isInput,
                    },
                    this.index,
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx gpio function set ${this.index} ${mode}`,
                    () => resolve(),
                    () => {
                        this.get.mode();
                        reject();
                    },
                );
            }
        });
    }

    openDrain(openDrain: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<GPIO>(
                    'onGPIOUpdate',
                    {
                        openDrain,
                    },
                    this.index,
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx gpio opendrain set ${this.index} ${
                        openDrain ? 'on' : 'off'
                    }`,
                    () => resolve(),
                    () => {
                        this.get.openDrain();
                        reject();
                    },
                );
            }
        });
    }

    polarity(polarity: GPIOPolarity) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<GPIO>(
                    'onGPIOUpdate',
                    {
                        polarity,
                    },
                    this.index,
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx gpio polarity set ${this.index} ${polarity}`,
                    () => resolve(),
                    () => {
                        this.get.polarity();
                        reject();
                    },
                );
            }
        });
    }

    pull(pull: GPIOPull) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<GPIO>(
                    'onGPIOUpdate',
                    {
                        pull,
                    },
                    this.index,
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx gpio pull set ${this.index} ${pull}`,
                    () => resolve(),
                    () => {
                        this.get.pull();
                        reject();
                    },
                );
            }
        });
    }
}
