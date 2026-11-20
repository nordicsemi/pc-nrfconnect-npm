/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    type ModuleParams,
    type TimerConfig,
    type TimerConfigModule,
} from '../../types';
import timerCallbacks from './callbacks';
import { TimerConfigGet } from './getters';
import { TimerConfigSet } from './setters';
import { modeKV } from './types';

/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

export default class Module implements TimerConfigModule {
    private _callbacks: (() => void)[];
    private _get: TimerConfigGet;
    private _set: TimerConfigSet;

    constructor({
        eventEmitter,
        offlineMode,
        sendCommand,
        shellParser,
    }: ModuleParams) {
        this._callbacks = timerCallbacks(eventEmitter, shellParser);
        this._get = new TimerConfigGet(sendCommand);
        this._set = new TimerConfigSet(eventEmitter, offlineMode, sendCommand);
    }

    get callbacks() {
        return this._callbacks;
    }

    get defaults(): TimerConfig {
        return {
            enabled: false,
            mode: 'general_purpose',
            period: 15,
        };
    }

    get get() {
        return this._get;
    }

    get ranges() {
        return {
            periodRange: () => ({
                decimals: 3,
                max: 262143985, // (max_reg_value / 64) * 1000
                min: 15, // (1 / 64) * 1000
                step: 1,
            }),
        };
    }

    get set() {
        return this._set;
    }

    get values() {
        return {
            mode: modeKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
        };
    }
}
