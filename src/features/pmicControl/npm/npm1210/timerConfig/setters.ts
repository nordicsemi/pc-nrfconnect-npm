/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    type ModuleParams,
    type TimerConfig,
    type TimerMode,
} from '../../types';
import { TimerConfigGet } from './getters';

export class TimerConfigSet {
    private get: TimerConfigGet;

    constructor(
        private eventEmitter: ModuleParams['eventEmitter'],
        private offlineMode: ModuleParams['offlineMode'],
        private sendCommand: ModuleParams['sendCommand'],
    ) {
        this.get = new TimerConfigGet(sendCommand);
    }

    async all(config: TimerConfig) {
        const promises = [this.mode(config.mode), this.period(config.period)];

        if (config.enabled !== undefined) {
            promises.push(this.enabled(config.enabled));
        }

        await Promise.allSettled(promises);
    }

    enabled(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<TimerConfig>(
                    'onTimerConfigUpdate',
                    {
                        enabled: value,
                    },
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx timer state set ${value ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.enabled();
                        reject();
                    },
                );
            }
        });
    }

    mode(value: TimerMode) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<TimerConfig>(
                    'onTimerConfigUpdate',
                    {
                        mode: value,
                    },
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx timer mode set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.mode();
                        reject();
                    },
                );
            }
        });
    }

    period(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<TimerConfig>(
                    'onTimerConfigUpdate',
                    {
                        period: value,
                    },
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx timer period set ${value / 1000}`,
                    () => resolve(),
                    () => {
                        this.get.period();
                        reject();
                    },
                );
            }
        });
    }
}
