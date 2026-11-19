/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type GPIO, type GpioModule, type ModuleParams } from '../../types';
import gpioCallbacks from './callbacks';
import { GpioGet } from './getters';
import { GpioSet } from './setters';
import { driveKV, modeKVForIndex, polarityKV, pullKV } from './types';

/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

export default class Module implements GpioModule {
    private _callbacks: (() => void)[];
    private _get: GpioGet;
    private _set: GpioSet;

    readonly index: number;

    constructor({
        index,
        sendCommand,
        eventEmitter,
        offlineMode,
        shellParser,
    }: ModuleParams) {
        this._callbacks = gpioCallbacks(eventEmitter, shellParser, index);
        this._get = new GpioGet(sendCommand, index);
        this._set = new GpioSet(eventEmitter, offlineMode, sendCommand, index);

        this.index = index;
    }

    get callbacks() {
        return this._callbacks;
    }

    get defaults(): GPIO {
        return {
            debounce: false,
            debounceEnabled: true,
            drive: 'normal',
            driveEnabled: false,
            mode: 'gpio_in',
            openDrain: false,
            openDrainEnabled: true,
            pull: 'nopull',
            pullEnabled: true,
        };
    }

    get get() {
        return this._get;
    }

    get set() {
        return this._set;
    }

    get values(): GpioModule['values'] {
        return {
            drive: driveKV.map(([key, val]) => ({ label: val, value: key })),
            mode: modeKVForIndex(this.index).map(([key, val]) => ({
                label: val,
                value: key,
            })),
            polarity: polarityKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            pull: pullKV.map(([key, val]) => ({ label: val, value: key })),
        };
    }
}
