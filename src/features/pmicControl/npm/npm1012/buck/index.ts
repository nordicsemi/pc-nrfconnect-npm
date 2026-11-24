/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    type Buck,
    type BuckExport,
    type BuckMode,
    type BuckModule,
    type ModuleParams,
} from '../../types';
import buckCallbacks from './callbacks';
import { BuckGet } from './getters';
import { BuckSet } from './setters';
import {
    alternateVOutControlKV,
    iLimLvlKV,
    iLimStartLvlKV,
    modeControlKV,
    onOffControlKV,
    pullDownResKV,
    vOutCompBiasLPModeKV,
    vOutCompBiasULPModeKV,
    vOutRange,
    vOutRippleControlKV,
} from './types';

/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

export const toBuckExport = (buck: Buck): BuckExport => ({
    activeDischargeResistance: buck.activeDischargeResistance,
    alternateVOut: buck.alternateVOut,
    alternateVOutControl: buck.alternateVOutControl,
    automaticPassthrough: buck.automaticPassthrough,
    enabled: buck.enabled,
    mode: buck.mode,
    modeControl: buck.modeControl,
    onOffControl: buck.onOffControl,
    peakCurrentLimit: buck.peakCurrentLimit,
    quickVOutDischarge: buck.quickVOutDischarge,
    retentionControl: buck.retentionControl,
    shortCircuitProtection: buck.shortCircuitProtection,
    softStartPeakCurrentLimit: buck.softStartPeakCurrentLimit,
    vOutComparatorBiasCurrentLPMode: buck.vOutComparatorBiasCurrentLPMode,
    vOutComparatorBiasCurrentULPMode: buck.vOutComparatorBiasCurrentULPMode,
    vOutNormal: buck.vOutNormal,
    vOutRippleControl: buck.vOutRippleControl,
});

export default class Module implements BuckModule {
    readonly index: number;
    private _callbacks: (() => void)[];
    private _get: BuckGet;
    private _set: BuckSet;

    constructor({
        dialogHandler,
        eventEmitter,
        index,
        offlineMode,
        sendCommand,
        shellParser,
    }: ModuleParams) {
        this.index = index;
        this._callbacks = buckCallbacks(eventEmitter, shellParser, index);
        this._get = new BuckGet(sendCommand);
        this._set = new BuckSet(
            dialogHandler,
            eventEmitter,
            offlineMode,
            sendCommand,
            index,
        );
    }

    get callbacks() {
        return this._callbacks;
    }

    get defaults(): Buck {
        return {
            activeDischargeResistance: 'OFF',
            alternateVOut: vOutRange.min,
            alternateVOutControl: 'OFF',
            automaticPassthrough: false,
            cardLabel: 'BUCK',
            enabled: true,
            enabledWhenProfiling: true, // in the default EK configuration VDDIO is connected to the buck output
            mode: 'vSet',
            modeControl: 'LP',
            onOffControl: 'VSET',
            onOffSoftwareControlEnabled: true,
            peakCurrentLimit: '66mA',
            quickVOutDischarge: false,
            shortCircuitProtection: false,
            softStartPeakCurrentLimit: '66mA',
            vOutComparatorBiasCurrentLPMode: '0.8uA',
            vOutComparatorBiasCurrentULPMode: '28nA',
            vOutNormal: vOutRange.min,
            vOutRippleControl: 'NOMINAL',
            vOutSubscriptLabel: 'OUT',
            vSetSubscriptLabel: 'SET',
        };
    }

    get get() {
        return this._get;
    }

    get set() {
        return this._set;
    }

    get ranges(): BuckModule['ranges'] {
        return {
            voltage: vOutRange,
            alternateVOut: vOutRange,
        };
    }

    get values(): BuckModule['values'] {
        const onOffControlValues = (mode: BuckMode) => {
            const items = onOffControlKV.map(([key, val]) => ({
                label: val,
                value: key,
            }));
            switch (mode) {
                case 'software':
                    return items.filter(item => item.value !== 'VSET');
                case 'vSet':
                    return items.filter(item => item.value !== 'SOFTWARE');
                default:
                    return [];
            }
        };

        return {
            activeDischargeResistance: pullDownResKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            alternateVOutControl: alternateVOutControlKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            modeControl: modeControlKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            onOffControl: onOffControlValues,
            peakCurrentLimit: () =>
                iLimLvlKV.map(([key, val]) => ({
                    label: val,
                    value: key,
                })),
            softStartPeakCurrentLimit: () =>
                iLimStartLvlKV.map(([key, val]) => ({
                    label: val,
                    value: key,
                })),
            vOutComparatorBiasCurrentLPMode: () =>
                vOutCompBiasLPModeKV.map(([key, val]) => ({
                    label: val,
                    value: key,
                })),
            vOutComparatorBiasCurrentULPMode: () =>
                vOutCompBiasULPModeKV.map(([key, val]) => ({
                    label: val,
                    value: key,
                })),
            vOutRippleControl: vOutRippleControlKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
        };
    }
}
