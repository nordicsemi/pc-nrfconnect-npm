/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    type ModuleParams,
    type ResetConfig,
    type ResetExport,
    type ResetModule,
} from '../../types';
import resetCallbacks from './callbacks';
import { ResetGet } from './getters';
import { ResetSet } from './setters';
import {
    longPressResetDebounceKV,
    longPressResetPinSelKV,
    powerDownWaitKV,
} from './types';

export const toResetExport = (config: ResetConfig): ResetExport => ({
    longPressResetPinSel: config.longPressResetPinSel,
    longPressResetDebounce: config.longPressResetDebounce,
    longPressResetEnable: config.longPressResetEnable,
    powerDownWait: config.powerDownWait,
});

/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

export default class Module implements ResetModule {
    private _callbacks: (() => void)[];
    private _get: ResetGet;
    private _set: ResetSet;

    constructor({
        eventEmitter,
        offlineMode,
        sendCommand,
        shellParser,
    }: ModuleParams) {
        this._callbacks = resetCallbacks(eventEmitter, shellParser);
        this._get = new ResetGet(sendCommand);
        this._set = new ResetSet(eventEmitter, offlineMode, sendCommand);
    }

    get actions() {
        return {};
    }

    get callbacks() {
        return this._callbacks;
    }

    get defaults(): ResetConfig {
        return {
            longPressResetDebounce: '3s',
            longPressResetDebounceSelDisabled: true,
            longPressResetEnable: true,
            longPressResetPinSel: 'off',
            powerDownWait: '350ms',
        };
    }

    get get() {
        return this._get;
    }

    get set() {
        return this._set;
    }

    get values() {
        return {
            longPressResetDebounce: longPressResetDebounceKV.map(
                ([key, val]) => ({
                    label: val,
                    value: key,
                }),
            ),
            longPressResetPinSel: longPressResetPinSelKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            powerDownWait: powerDownWaitKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
        };
    }
}
