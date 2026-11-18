/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    type ModuleParams,
    type OnBoardLoad,
    type OnBoardLoadModule,
} from '../../types';
import ldoCallbacks from './callbacks';
import { OnBoardLoadGet } from './getters';
import { OnBoardLoadSet } from './setters';

/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

export default class Module implements OnBoardLoadModule {
    private _callbacks: (() => void)[];
    private _get: OnBoardLoadGet;
    private _set: OnBoardLoadSet;

    constructor({
        eventEmitter,
        offlineMode,
        sendCommand,
        shellParser,
    }: ModuleParams) {
        this._callbacks = ldoCallbacks(eventEmitter, shellParser);
        this._get = new OnBoardLoadGet(sendCommand);
        this._set = new OnBoardLoadSet(eventEmitter, offlineMode, sendCommand);
    }

    get callbacks() {
        return this._callbacks;
    }

    get defaults(): OnBoardLoad {
        return {
            iLoad: 0,
        };
    }

    get get() {
        return this._get;
    }

    get ranges() {
        return {
            iLoad: {
                decimals: 2,
                max: 500,
                min: 0,
                step: 0.01,
            },
        };
    }

    get set() {
        return this._set;
    }
}
