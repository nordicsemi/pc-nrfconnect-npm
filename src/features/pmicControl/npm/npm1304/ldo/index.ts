/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type Range } from '@nordicsemiconductor/pc-nrfconnect-shared';

import ldoCallbacks from '../../npm1300/ldo/callbacks';
import { LdoGet } from '../../npm1300/ldo/getters';
import { LdoSet } from '../../npm1300/ldo/setters';
import { SoftStartCurrentValues } from '../../npm1300/ldo/types';
import { type Ldo, type LdoModule, type ModuleParams } from '../../types';

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
            pmicRevision === undefined || pmicRevision < 1.1;

        this._callbacks = ldoCallbacks(
            shellParser,
            eventEmitter,
            index,
            softStartCurrentDropdownDisabledLDOMode,
        );
        this._get = new LdoGet(sendCommand, index);
        this._set = new LdoSet(
            eventEmitter,
            sendCommand,
            dialogHandler,
            offlineMode,
            index,
        );
        this.index = index;
    }

    get callbacks() {
        return this._callbacks;
    }

    get defaults(): Ldo {
        return ((index: number): Ldo => ({
            activeDischarge: false,
            cardLabel: `Load Switch/LDO ${index + 1}`,
            enabled: false,
            mode: 'Load_switch',
            onOffControl: 'SW',
            onOffSoftwareControlEnabled: true,
            softStart: true,
            softStartCurrent: 25,
            softStartCurrentDropdownDisabled: false,
            voltage: getLdoVoltageRange().min,
        }))(this.index);
    }

    get get() {
        return this._get;
    }

    get set() {
        return this._set;
    }

    get ranges(): LdoModule['ranges'] {
        return {
            voltage: getLdoVoltageRange(),
        };
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
}
