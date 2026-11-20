/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    type LowPowerConfig,
    type LowPowerExport,
    type LowPowerModule,
    type ModuleParams,
} from '../../types';
import { LowPowerActions } from './actions';
import shipModeCallbacks from './callbacks';
import { LowPowerGet } from './getters';
import { LowPowerSet } from './setters';
import {
    shipVBusFiltKV,
    shipVBusFiltTimeKV,
    shpHldSliderKV,
    shpHldSlideSwitchDelayKV,
    shpHldSlideSwitchPollTimeKV,
    shpHldTypeKV,
    timeToActiveKV,
    vBusStandbyCtrlKV,
    vBusStandbySelKV,
} from './types';

export const toLowPowerExport = (config: LowPowerConfig): LowPowerExport => ({
    hibernateWakeupByButton: config.hibernateWakeupByButton,
    timeToActive: config.timeToActive,
    vbusHibernateWait: config.vbusHibernateWait,
    vbusStandbyWait: config.vbusStandbyWait,
});

/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

export default class Module implements LowPowerModule {
    private _actions: LowPowerActions;
    private _callbacks: (() => void)[];
    private _get: LowPowerGet;
    private _set: LowPowerSet;

    constructor({
        eventEmitter,
        offlineMode,
        sendCommand,
        shellParser,
    }: ModuleParams) {
        this._actions = new LowPowerActions(
            eventEmitter,
            sendCommand,
            offlineMode,
        );
        this._callbacks = shipModeCallbacks(eventEmitter, shellParser);
        this._get = new LowPowerGet(sendCommand);
        this._set = new LowPowerSet(eventEmitter, offlineMode, sendCommand);
    }

    get actions() {
        return this._actions;
    }

    get callbacks() {
        return this._callbacks;
    }

    get defaults(): LowPowerConfig {
        return {
            hibernateWakeupByButton: false,
            operatingMode: 'active',
            shipVBusFilt: 'default',
            shipVBusFiltTime: '5ms',
            shpHldSlideSwitchDelay: '200ms',
            shpHldSlideSwitchPollTime: '50ms',
            shpHldSlider: 'continuous',
            shpHldType: 'button',
            suspendPinPullDown: false,
            timeToActive: 'off',
            vbusHibernateWait: false,
            vbusHibernateWaitingForChargeComplete: false,
            vbusStandbyCtrl: 'pin',
            vbusStandbySel: 'standby1',
            vbusStandbyWait: false,
            vbusStandbyWaitingForChargeComplete: false,
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
            shipVBusFilt: shipVBusFiltKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            shipVBusFiltTime: shipVBusFiltTimeKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            shpHldSlideSwitchDelay: shpHldSlideSwitchDelayKV.map(
                ([key, val]) => ({
                    label: val,
                    value: key,
                }),
            ),
            shpHldSlideSwitchPollTime: shpHldSlideSwitchPollTimeKV.map(
                ([key, val]) => ({
                    label: val,
                    value: key,
                }),
            ),
            shpHldSlider: shpHldSliderKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            shpHldType: shpHldTypeKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            timeToActive: timeToActiveKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            vbusStandbyCtrl: vBusStandbyCtrlKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            vbusStandbySel: vBusStandbySelKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
        };
    }
}
