/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams, type SysReg, type SysRegModule } from '../../types';
import SysRegCallbacks from './callbacks';
import { SysRegGet } from './getters';
import { SysRegSet } from './setters';
import {
    vBusDpmKV,
    vBusILim0And1PinGndSelKV,
    vBusILim0And1PinMapKV,
    vBusILimControlKV,
    vBusILimKV,
    vBusPGPinSelKV,
} from './types';

/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

export default class Module implements SysRegModule {
    private _callbacks: (() => void)[];
    private _get: SysRegGet;
    private _set: SysRegSet;

    constructor({
        eventEmitter,
        offlineMode,
        sendCommand,
        shellParser,
    }: ModuleParams) {
        const get = new SysRegGet(sendCommand);
        this._callbacks = SysRegCallbacks(eventEmitter, shellParser, get);
        this._get = get;
        this._set = new SysRegSet(eventEmitter, offlineMode, sendCommand);
    }

    get callbacks() {
        return this._callbacks;
    }

    get defaults(): SysReg {
        return {
            vBusDpm: '4.4V',
            vBusGood: false,
            vBusILim0And1PinGndSel: 'default',
            vBusILim0And1PinMap: 'highrange',
            vBusILim0PinPullDownEnable: false,
            vBusILim1PinPullDownEnable: false,
            vBusILim: '100mA',
            vBusILimControl: 'software',
            vBusILimSoftwareControlDisabled: false,
            vBusPGPinSel: 'vbusgood',
            vBusPresent: false,
        };
    }

    get get() {
        return this._get;
    }

    get set() {
        return this._set;
    }

    get values(): SysRegModule['values'] {
        return {
            vBusDpm: vBusDpmKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            vBusILim: vBusILimKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            vBusILim0And1PinGndSel: vBusILim0And1PinGndSelKV.map(
                ([key, val]) => ({
                    label: val,
                    value: key,
                }),
            ),
            vBusILim0And1PinMap: vBusILim0And1PinMapKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            vBusILimControl: vBusILimControlKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            vBusPGPinSel: vBusPGPinSelKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
        };
    }
}
