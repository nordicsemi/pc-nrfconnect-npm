/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
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
    defaultValues,
    type ILimFicrLvl,
    iLimFicrLvlKV,
    iLimLvlKV,
    type ILimStartFicrLvl,
    iLimStartFicrLvlKV,
    iLimStartLvlKV,
    modeControlKV,
    onOffControlKV,
    pullDownResKV,
    type VOutCompBiasLPModeFicr,
    vOutCompBiasLPModeFicrKV,
    vOutCompBiasLPModeKV,
    type VOutCompBiasULPModeFicr,
    vOutCompBiasULPModeFicrKV,
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
    private _callbacks: (() => void)[];
    private _get: BuckGet;
    private _set: BuckSet;
    readonly index: number;

    constructor({
        dialogHandler,
        eventEmitter,
        index,
        offlineMode,
        sendCommand,
        shellParser,
    }: ModuleParams) {
        this._callbacks = buckCallbacks(eventEmitter, shellParser, index);
        this._get = new BuckGet(sendCommand);
        this._set = new BuckSet(
            dialogHandler,
            eventEmitter,
            offlineMode,
            sendCommand,
            index,
        );
        this.index = index;
    }

    get callbacks() {
        return this._callbacks;
    }

    get defaults(): Buck {
        return {
            activeDischargeResistance: defaultValues.pullDownRes,
            alternateVOut: defaultValues.vOut2,
            alternateVOutControl: defaultValues.alternateVOutControl,
            automaticPassthrough: false,
            cardLabel: 'BUCK',
            enabled: true,
            enabledWhenProfiling: true,
            mode: 'vSet',
            modeControl: defaultValues.modeControl,
            onOffControl: defaultValues.onOffControl,
            onOffSoftwareControlEnabled: true,
            peakCurrentLimit: defaultValues.iLimLvl,
            quickVOutDischarge: false,
            shortCircuitProtection: false,
            softStartPeakCurrentLimit: defaultValues.iLimStartLvl,
            vOutComparatorBiasCurrentLPMode: defaultValues.vOutCompBiasLPMode,
            vOutComparatorBiasCurrentULPMode: defaultValues.vOutCompBiasULPMode,
            vOutNormal: defaultValues.vOut,
            vOutRippleControl: defaultValues.vOutRippleControl,
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
            peakCurrentLimit: (iLimFicr?: ILimFicrLvl) =>
                iLimLvlKV.map(([key, val]) => ({
                    label:
                        key === 'default'
                            ? (iLimFicrLvlKV.find(
                                  ([ficrKey, _]) => ficrKey === iLimFicr,
                              )?.[1] ?? val)
                            : val,
                    value: key,
                })),
            softStartPeakCurrentLimit: (iLimFicr?: ILimStartFicrLvl) =>
                iLimStartLvlKV.map(([key, val]) => ({
                    label:
                        key === 'default'
                            ? (iLimStartFicrLvlKV.find(
                                  ([ficrKey, _]) => ficrKey === iLimFicr,
                              )?.[1] ?? val)
                            : val,
                    value: key,
                })),
            vOutComparatorBiasCurrentLPMode: (
                vOutCompBiasFicr?: VOutCompBiasLPModeFicr,
            ) =>
                vOutCompBiasLPModeKV.map(([key, val]) => ({
                    label:
                        key === 'default'
                            ? (vOutCompBiasLPModeFicrKV.find(
                                  ([ficrKey, _]) =>
                                      ficrKey === vOutCompBiasFicr,
                              )?.[1] ?? val)
                            : val,
                    value: key,
                })),
            vOutComparatorBiasCurrentULPMode: (
                vOutCompBiasFicr?: VOutCompBiasULPModeFicr,
            ) =>
                vOutCompBiasULPModeKV.map(([key, val]) => ({
                    label:
                        key === 'default'
                            ? (vOutCompBiasULPModeFicrKV.find(
                                  ([ficrKey, _]) =>
                                      ficrKey === vOutCompBiasFicr,
                              )?.[1] ?? val)
                            : val,
                    value: key,
                })),
            vOutRippleControl: vOutRippleControlKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
        };
    }
}
