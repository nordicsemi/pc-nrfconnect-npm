/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams, type POF } from '../../types';
import { PofGet } from './getters';

export class PofSet {
    private get: PofGet;

    constructor(
        private eventEmitter: ModuleParams['eventEmitter'],
        private offlineMode: ModuleParams['offlineMode'],
        private sendCommand: ModuleParams['sendCommand'],
    ) {
        this.get = new PofGet(sendCommand);
    }

    async all(config: POF) {
        const promises = [this.resetThreshold(config.resetThreshold)];

        if (config.warnThreshold) {
            promises.push(this.warnThreshold(config.warnThreshold));
        }

        await Promise.allSettled(promises);
    }

    resetThreshold(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<POF>('onPOFUpdate', {
                    resetThreshold: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx reset_ctrl pof reset_threshold set ${value}V`,
                    () => resolve(),
                    () => {
                        this.get.resetThreshold();
                        reject();
                    },
                );
            }
        });
    }

    warnThreshold(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<POF>('onPOFUpdate', {
                    warnThreshold: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx reset_ctrl pof warn_threshold set ${value}V`,
                    () => resolve(),
                    () => {
                        this.get.warnThreshold();
                        reject();
                    },
                );
            }
        });
    }
}
