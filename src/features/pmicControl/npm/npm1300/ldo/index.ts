/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type Range } from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    type Ldo,
    type LdoExport,
    type LdoModule,
    type ModuleParams,
} from '../../types';
import ldoCallbacks from './callbacks';
import { LdoGet } from './getters';
import { LdoSet } from './setters';
import { SoftStartCurrentValues } from './types';

export const toLdoExport = (ldo: Ldo): LdoExport => ({
    activeDischarge: ldo.activeDischarge,
    enabled: ldo.enabled,
    mode: ldo.mode,
    onOffControl: ldo.onOffControl,
    softStart: ldo.softStart,
    softStartCurrent: ldo.softStartCurrent,
    softStartCurrentDropdownDisabled: ldo.softStartCurrentDropdownDisabled,
    voltage: ldo.voltage,
});

const getLdoVoltageRange = () =>
    ({
        min: 1,
        max: 3.3,
        decimals: 1,
        step: 0.1,
    }) as Range;

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
        dialogHandler,
        pmicRevision,
    }: ModuleParams) {
        const softStartCurrentDropdownDisabledLDOMode =
            pmicRevision === undefined || pmicRevision < 2.3;

        this.index = index;
        this._get = new LdoGet(sendCommand, index);
        this._set = new LdoSet(
            eventEmitter,
            sendCommand,
            dialogHandler,
            offlineMode,
            index,
        );
        this._callbacks = ldoCallbacks(
            shellParser,
            eventEmitter,
            index,
            softStartCurrentDropdownDisabledLDOMode,
        );
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

    get values(): LdoModule['values'] {
        return {
            onOffControl: () => [{ label: 'SW', value: 'SW' }],
            softStartCurrent: () =>
                SoftStartCurrentValues.map((item, i) => ({
                    label: `${SoftStartCurrentValues[i]} mA`,
                    value: item,
                })),
        };
    }

    get ranges(): { voltage: Range } {
        return {
            voltage: getLdoVoltageRange(),
        };
    }

    get defaults(): Ldo {
        return ((index: number): Ldo => ({
            activeDischarge: false,
            cardLabel: `Load Switch/LDO ${index + 1}`,
            enabled: false,
            enabledWhenProfiling: false,
            mode: 'Load_switch',
            onOffControl: 'SW',
            onOffSoftwareControlEnabled: true,
            softStart: true,
            softStartCurrent: 25,
            softStartCurrentDropdownDisabled: false,
            voltage: getLdoVoltageRange().min,
        }))(this.index);
    }
}
