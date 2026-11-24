/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    type LongPressResetDebounce,
    type LongPressResetPinSel,
    type ModuleParams,
    type PowerDownWait,
    type ResetConfig,
} from '../../types';
import { ResetGet } from './getters';
import {
    longPressResetDebounceSelDisabled,
    longPressResetPinSelKeys,
} from './types';

export class ResetSet {
    private get: ResetGet;

    constructor(
        private eventEmitter: ModuleParams['eventEmitter'],
        private offlineMode: ModuleParams['offlineMode'],
        private sendCommand: ModuleParams['sendCommand'],
    ) {
        this.get = new ResetGet(sendCommand);
    }

    async all(config: ResetConfig) {
        const promises = [
            this.longPressResetPinSel(config.longPressResetPinSel),
        ];

        if (config.longPressResetDebounce !== undefined) {
            promises.push(
                this.longPressResetDebounce(config.longPressResetDebounce),
            );
        }
        if (config.longPressResetEnable !== undefined) {
            promises.push(
                this.longPressResetEnable(config.longPressResetEnable),
            );
        }
        if (config.powerDownWait !== undefined) {
            promises.push(this.powerDownWait(config.powerDownWait));
        }

        await Promise.allSettled(promises);
    }

    longPressResetDebounce(value: LongPressResetDebounce) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<ResetConfig>(
                    'onResetUpdate',
                    {
                        longPressResetDebounce: value,
                    },
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm12xx reset_ctrl long_press_reset debounce set ${value}`,
                () => resolve(),
                () => {
                    this.get.longPressResetDebounce();
                    reject();
                },
            );
        });
    }

    longPressResetEnable(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<ResetConfig>(
                    'onResetUpdate',
                    {
                        longPressResetEnable: value,
                    },
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm12xx reset_ctrl long_press_reset enable set ${value ? 'on' : 'off'}`,
                () => resolve(),
                () => {
                    this.get.longPressResetEnable();
                    reject();
                },
            );
        });
    }

    longPressResetPinSel(pinSel: LongPressResetPinSel) {
        return new Promise<void>((resolve, reject) => {
            const value = longPressResetPinSelKeys.find(
                v => v.toLowerCase() === pinSel,
            );
            if (value === undefined) {
                reject();
                return;
            }

            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<ResetConfig>(
                    'onResetUpdate',
                    {
                        longPressResetDebounceSelDisabled:
                            longPressResetDebounceSelDisabled(value),
                        longPressResetPinSel: value,
                    },
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm12xx reset_ctrl long_press_reset pinsel set ${value}`,
                () => resolve(),
                () => {
                    this.get.longPressResetPinSel();
                    reject();
                },
            );
        });
    }

    powerDownWait(value: PowerDownWait) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<ResetConfig>(
                    'onResetUpdate',
                    {
                        powerDownWait: value,
                    },
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm12xx reset_ctrl powerdown_wait set ${value}`,
                () => resolve(),
                () => {
                    this.get.powerDownWait();
                    reject();
                },
            );
        });
    }
}
