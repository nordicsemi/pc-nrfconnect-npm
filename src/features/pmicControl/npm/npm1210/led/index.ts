/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    type LED,
    type LedExport,
    type LedModule,
    type ModuleParams,
} from '../../types';
import { LedActions } from './actions';
import ledCallbacks from './callbacks';
import { LedGet } from './getters';
import { LedSet } from './setters';
import {
    blinkTimeRange,
    configCardIndex,
    driveKV,
    dutyCycleRange,
    modeKV,
    pwmFreqKV,
} from './types';

/* eslint-disable no-underscore-dangle */

export const toLedExport = (config: LED): LedExport => ({
    blinkContinuous: config.blinkContinuous,
    blinkDouble: config.blinkDouble,
    blinkTimeOff: config.blinkTimeOff,
    blinkTimeOn: config.blinkTimeOn,
    drive: config.drive,
    dutyCycle: config.dutyCycle,
    mode: config.mode,
    pwmFrequency: config.pwmFrequency,
    rgbPhaseShifting: config.rgbPhaseShifting,
});

export default class Module implements LedModule {
    readonly index: number;
    private _actions: LedActions;
    private _callbacks: (() => void)[];
    private _get: LedGet;
    private _set: LedSet;

    constructor({
        index,
        sendCommand,
        eventEmitter,
        offlineMode,
        shellParser,
    }: ModuleParams) {
        this._callbacks = ledCallbacks(eventEmitter, shellParser, index);
        this._actions = new LedActions(sendCommand);
        this._get = new LedGet(sendCommand, index);
        this._set = new LedSet(eventEmitter, offlineMode, sendCommand, index);
        this.index = index;
    }

    get actions() {
        return this._actions;
    }

    get callbacks() {
        return this._callbacks;
    }

    get defaults(): LED {
        return this.index === configCardIndex
            ? {
                  blinkContinuous: false,
                  blinkActionEnabled: true,
                  blinkDouble: false,
                  blinkTimeOff: blinkTimeRange.min,
                  blinkTimeOn: blinkTimeRange.min,
                  cardLabel: 'LED(s)',
                  pwmFrequency: '977Hz',
                  rgbPhaseShifting: false,
              }
            : {
                  cardLabel: `LED${this.index}`,
                  drive: '2.5mA',
                  dutyCycle: 0,
                  mode: 'off',
              };
    }

    get get() {
        return this._get;
    }

    get ranges() {
        return this.index === configCardIndex
            ? {
                  blinkTime: blinkTimeRange,
              }
            : {
                  dutyCycle: dutyCycleRange,
              };
    }

    get set() {
        return this._set;
    }

    get values() {
        return this.index === configCardIndex
            ? {
                  pwmFrequency: pwmFreqKV.map(([key, val]) => ({
                      label: val,
                      value: key,
                  })),
              }
            : {
                  drive: driveKV.map(([key, val]) => ({
                      label: val,
                      value: key,
                  })),
                  mode: modeKV.map(([key, val]) => ({
                      label: val,
                      value: key,
                  })),
              };
    }
}
