/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    type Ldo,
    type LdoExport,
    type LdoMode,
    type LdoModule,
    type LdoVOutSel,
    type ModuleParams,
} from '../../types';
import ldoCallbacks from './callbacks';
import { LdoGet } from './getters';
import { LdoSet } from './setters';
import {
    onOffControlValuesForModeAndVOutSel,
    softStartILimKVForIndex,
    softStartTimeKVForIndex,
} from './types';

const ldoDefaults = (index: number): Ldo => {
    const common: Ldo = {
        activeDischarge: false,
        cardLabel: `Load Switch/LDO ${index + 1}`,
        enabled: false,
        enabledWhenProfiling: false,
        onOffControl: 'Software',
        onOffSoftwareControlEnabled: true,
        overcurrentProtection: false,
        softStart: true,
        softStartTime: '4.5ms',
    };

    // Load Switch 2
    if (index === 1) {
        return {
            ...common,
            cardLabel: 'Load Switch 2',
            softStartCurrent: '10mA',
        };
    }

    return {
        ...common,
        mode: 'Load_switch',
        softStartCurrent: '20mA/25mA',
        softStartCurrentUILabel: 'Soft Start Current Limit (LDO / Load Switch)',
        vOutSel: 'Vset',
        voltage: voltageRange.min,
        weakPullDown: false,
    };
};

export const toLdoExport = (ldo: Ldo): LdoExport => ({
    activeDischarge: ldo.activeDischarge,
    enabled: ldo.enabled,
    mode: ldo.mode,
    onOffControl: ldo.onOffControl,
    overcurrentProtection: ldo.overcurrentProtection,
    softStart: ldo.softStart,
    softStartCurrent: ldo.softStartCurrent,
    softStartTime: ldo.softStartTime,
    vOutSel: ldo.vOutSel,
    voltage: ldo.voltage,
    weakPullDown: ldo.weakPullDown,
});

const voltageRange = {
    min: 1,
    max: 3.3,
    decimals: 2,
    step: 0.05,
};

/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

export default class Module implements LdoModule {
    index: number;
    private _get: LdoGet;
    private _set: LdoSet;
    private _callbacks: (() => void)[];
    constructor({
        index,
        sendCommand,
        eventEmitter,
        offlineMode,
        shellParser,
    }: ModuleParams) {
        this.index = index;
        this._get = new LdoGet(sendCommand, index);
        this._set = new LdoSet(eventEmitter, sendCommand, offlineMode, index);
        this._callbacks = ldoCallbacks(shellParser, eventEmitter, index);
    }

    get get() {
        return this._get;
    }

    get set() {
        return this._set;
    }

    get callbacks() {
        return this._callbacks;
    }

    get values() {
        return {
            onOffControl: (mode?: LdoMode, vOutSel?: LdoVOutSel) =>
                onOffControlValuesForModeAndVOutSel(
                    this.index,
                    mode,
                    vOutSel,
                ).map(val => ({
                    label: val,
                    value: val,
                })),
            softStartCurrent: softStartILimKVForIndex(this.index).map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            softStartTime: softStartTimeKVForIndex(this.index).map(
                ([key, val]) => ({
                    label: val,
                    value: key,
                }),
            ),
        };
    }

    get ranges() {
        return {
            voltage: voltageRange,
        };
    }

    get defaults(): Ldo {
        return ldoDefaults(this.index);
    }
}
