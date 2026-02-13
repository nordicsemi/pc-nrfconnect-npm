/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type Range } from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    type Ldo,
    type LdoExport,
    type LdoMode,
    type LdoModule,
    type LdoSoftStartCurrent,
    type ModuleParams,
} from '../../types';
import {
    nPM2100GPIOControlModeValues,
    nPM2100GPIOControlPinSelectValues,
    nPM2100LdoModeControlValues,
    softStartCurrentLDOModeKeys,
    softStartCurrentLDOModeValues,
    softStartCurrentLoadSwitchModeKeys,
    softStartCurrentLoadSwitchModeValues,
} from '../types';
import ldoCallbacks from './ldoCallbacks';
import { LdoGet } from './ldoGet';
import { LdoSet } from './ldoSet';

/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

const ldoDefaults = (index: number): Ldo => ({
    activeDischarge: false,
    cardLabel: `Load Switch/LDO ${index + 1}`,
    enabled: false,
    halt: false,
    mode: 'Load_switch',
    modeControl: 'auto',
    onOffControl: 'SW',
    onOffSoftwareControlEnabled: true,
    overcurrentProtection: true,
    pinMode: 'HP/OFF',
    pinSel: 'GPIO0HI',
    ramp: false,
    softStart: true,
    softStartCurrentLDOMode: 75,
    softStartCurrentLoadSwitchMode: 75,
    voltage: getLdoVoltageRange().min,
});

export const toLdoExport = (ldo: Ldo): LdoExport => ({
    activeDischarge: ldo.activeDischarge,
    enabled: ldo.enabled,
    halt: ldo.halt,
    mode: ldo.mode,
    modeControl: ldo.modeControl,
    onOffControl: ldo.onOffControl,
    overcurrentProtection: ldo.overcurrentProtection,
    pinMode: ldo.pinMode,
    pinSel: ldo.pinSel,
    ramp: ldo.ramp,
    softStart: ldo.softStart,
    softStartCurrentLDOMode: ldo.softStartCurrentLDOMode,
    softStartCurrentLoadSwitchMode: ldo.softStartCurrentLoadSwitchMode,
    voltage: ldo.voltage,
});

const getLdoVoltageRange = () =>
    ({
        min: 0.8,
        max: 3,
        decimals: 1,
        step: 0.1,
    }) as Range;

export default class Module implements LdoModule {
    index: number;
    private _get: LdoGet;
    private _set: LdoSet;
    private _callbacks: (() => void)[];
    constructor({
        sendCommand,
        eventEmitter,
        dialogHandler,
        offlineMode,
        index,
        shellParser,
    }: ModuleParams) {
        this.index = index;
        this._get = new LdoGet(sendCommand);
        this._set = new LdoSet(
            eventEmitter,
            sendCommand,
            dialogHandler,
            offlineMode,
        );
        this._callbacks = ldoCallbacks(shellParser, eventEmitter);
    }

    get get(): LdoGet {
        return this._get;
    }
    get set(): LdoSet {
        return this._set;
    }
    get callbacks(): (() => void)[] {
        return this._callbacks;
    }
    get ranges(): { voltage: Range } {
        return {
            voltage: getLdoVoltageRange(),
        };
    }
    get values(): LdoModule['values'] {
        const getSoftStartCurrentValues = (mode?: LdoMode) => {
            if (mode === undefined) {
                return [{ label: 'n/a', value: 0 }];
            }

            if (mode === 'LDO') {
                return softStartCurrentLDOModeValues.map((item, i) => ({
                    label: `${softStartCurrentLDOModeKeys[i]}`,
                    value: item as LdoSoftStartCurrent,
                }));
            }

            return softStartCurrentLoadSwitchModeValues.map((item, i) => ({
                label: `${softStartCurrentLoadSwitchModeKeys[i]}`,
                value: item as LdoSoftStartCurrent,
            }));
        };
        return {
            modeControl: nPM2100LdoModeControlValues.map(item => ({
                label: item,
                value: item,
            })),
            pinMode: nPM2100GPIOControlModeValues.map(item => ({
                label: item,
                value: item,
            })),
            pinSel: nPM2100GPIOControlPinSelectValues.map(item => ({
                label: item,
                value: item,
            })),
            softStartCurrent: getSoftStartCurrentValues,
        };
    }
    get defaults(): Ldo {
        return ldoDefaults(this.index);
    }
}
