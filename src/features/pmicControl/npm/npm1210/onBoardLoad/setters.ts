/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams, type OnBoardLoad } from '../../types';
import { OnBoardLoadGet } from './getters';

export class OnBoardLoadSet {
    private get: OnBoardLoadGet;

    constructor(
        private eventEmitter: ModuleParams['eventEmitter'],
        private offlineMode: ModuleParams['offlineMode'],
        private sendCommand: ModuleParams['sendCommand'],
    ) {
        this.get = new OnBoardLoadGet(sendCommand);
    }

    async all(onBoardLoad: OnBoardLoad) {
        await Promise.allSettled([this.iLoad(onBoardLoad.iLoad)]);
    }

    iLoad(load: number) {
        return new Promise<void>((resolve, reject) => {
            this.eventEmitter.emitPartialEvent<OnBoardLoad>(
                'onOnBoardLoadUpdate',
                {
                    iLoad: load,
                },
            );

            if (this.offlineMode) {
                resolve();
            } else {
                this.sendCommand(
                    `cc_sink level set ${load}`,
                    () => resolve(),
                    () => {
                        this.get.iLoad();
                        reject();
                    },
                );
            }
        });
    }
}
