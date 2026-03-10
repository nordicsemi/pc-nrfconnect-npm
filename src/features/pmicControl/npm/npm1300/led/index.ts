/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { LED, LedModule, ModuleParams } from '../../types';
import ledCallbacks from './callbacks';
import { LedGet } from './getters';
import { LedSet } from './setters';
import { Mode, modeValues } from './types';

/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

const defaultModes: Mode[] = ['Charger error', 'Charging', 'Host'];

export default class Module implements LedModule {
    readonly index: number;
    private _get: LedGet;
    private _set: LedSet;
    private _callbacks: (() => void)[];

    constructor({
        index,
        sendCommand,
        eventEmitter,
        offlineMode,
        shellParser,
    }: ModuleParams) {
        this._get = new LedGet(sendCommand, index);
        this._set = new LedSet(eventEmitter, sendCommand, offlineMode, index);
        this._callbacks = ledCallbacks(shellParser, eventEmitter, index);
        this.index = index;
    }

    get actions() {
        return {};
    }

    get callbacks() {
        return this._callbacks;
    }

    get defaults(): LED {
        return {
            cardLabel: `LED ${this.index}`,
            mode: defaultModes[this.index],
        };
    }

    get get() {
        return this._get;
    }

    get ranges() {
        return {};
    }

    get set() {
        return this._set;
    }

    get values(): LedModule['values'] {
        return {
            mode: modeValues.map(item => ({
                label: item,
                value: item,
            })),
        };
    }
}
