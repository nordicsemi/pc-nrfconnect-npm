/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { NpmEventEmitter } from '../../pmicHelpers';
import { LED, LedExport, LEDMode } from '../../types';
import { LedGet } from './getters';
import { modeValues } from './types';

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
        this.get = new LedGet(sendCommand, index);
    }

    async all(led: LedExport) {
        const promises = [];
        if (led.mode !== undefined) {
            promises.push(this.mode(led.mode));
        }

        await Promise.allSettled(promises);
    }

    mode(mode: LEDMode) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LED>(
                    'onLEDUpdate',
                    {
                        mode,
                    },
                    this.index,
                );
                resolve();
            } else {
                this.sendCommand(
                    `npmx led mode set ${this.index} ${modeValues.findIndex(m => m === mode)}`,
                    () => resolve(),
                    () => {
                        this.get.mode();
                        reject();
                    },
                );
            }
        });
    }
}
