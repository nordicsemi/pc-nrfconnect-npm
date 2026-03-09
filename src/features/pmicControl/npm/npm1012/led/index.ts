/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { LED, LedModule, ModuleParams } from '../../types';
import { LedActions } from './actions';
import ledCallbacks from './callbacks';
import { LedGet } from './getters';
import { LedSet } from './setters';

/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

const pwmFrequencyValues = [122, 244, 488, 977] as readonly number[];

export default class Module implements LedModule {
    readonly index: number;
    private _actions: LedActions;
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
        this._actions = new LedActions(sendCommand);
        this._get = new LedGet(sendCommand);
        this._set = new LedSet(eventEmitter, sendCommand, offlineMode, index);
        this._callbacks = ledCallbacks(shellParser, eventEmitter, index);
        this.index = index;
    }

    get actions() {
        return this._actions;
    }

    get callbacks() {
        return this._callbacks;
    }

    get defaults(): LED {
        return {
            cardLabel: 'LED(s)',

            blinkContinuous: false,
            blinkDouble: false,
            blinkTimeOff: this.ranges.blinkTime.min,
            blinkTimeOn: this.ranges.blinkTime.min,
            pwmFrequency: pwmFrequencyValues[0],
            rgbPhaseShifting: false,
        };
    }

    get get() {
        return this._get;
    }

    get ranges() {
        return {
            blinkTime: {
                min: 8,
                max: 2048,
                decimals: 0,
                step: 8,
            },
        };
    }

    get set() {
        return this._set;
    }

    get values(): LedModule['values'] {
        return {
            pwmFrequency: pwmFrequencyValues.map(item => ({
                label: `${item} Hz`,
                value: item,
            })),
        };
    }
}
