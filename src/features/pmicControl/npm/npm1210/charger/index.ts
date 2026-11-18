/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    type Charger,
    ChargerJeitaILabel,
    ChargerJeitaVLabel,
    type ChargerModule as ChargerModuleBase,
    type ChargerModuleGetBase,
    type ChargerModuleRanges,
    type ChargerModuleSetBase,
    type ChargerModuleValues,
    type ModuleParams,
} from '../../types';
import chargerCallbacks from './callbacks';
import { ChargerGet } from './getters';
import { ChargerSet } from './setters';
import {
    batterySizeRange,
    defaultValues,
    dropoutRecoveryKV,
    iBatLimLvlKV,
    iChgValuesAll,
    iTermLvlKV,
    iThrottleLvlValues,
    iTrickleLvlKV,
    jeitaRange,
    softstartCurrentKV,
    startupModeKV,
    tChgLvlRange,
    tOutChargeLvlValues,
    tOutTrickleLvlValues,
    vBatLowLvlKV,
    vLowerCutOffLvlRange,
    vTermLvlValues,
    vThrottleLvlValues,
    vTrickleLvlKV,
    vWeakLvlRange,
} from './types';

/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

export default class Module implements ChargerModuleBase {
    private _callbacks: (() => void)[];
    private _get: ChargerModuleGetBase;
    private _set: ChargerModuleSetBase;

    constructor({
        eventEmitter,
        offlineMode,
        sendCommand,
        shellParser,
    }: ModuleParams) {
        this._callbacks = chargerCallbacks(eventEmitter, shellParser);
        this._get = new ChargerGet(sendCommand);
        this._set = new ChargerSet(
            eventEmitter,
            sendCommand,
            offlineMode,
            this._get,
        );
    }

    get callbacks() {
        return this._callbacks;
    }

    get defaults(): Charger {
        return {
            dropoutRecovery: defaultValues.dropoutRecovery,
            enableAdvancedChargingProfile: false,
            enableChargeCurrentThrottling: false,
            enableChgEnPinControl: false,
            enableChgEnPinPullDown: false,
            enableNtcMonitoring: false,
            enableRecharging: false,
            enableSafetyTimersResetByChgEnPin: false,
            enableVBatLow: false,
            enableWeakBatteryCharging: false,
            enabled: false,
            iBatLim: defaultValues.iBatLim,
            iChg: defaultValues.iChg,
            iChgCool: defaultValues.iChgCool,
            iChgDouble: false,
            iChgWarm: defaultValues.iChgWarm,
            iTerm: defaultValues.iTermLvl,
            iThrottle: defaultValues.iThrottleLvl,
            iTrickle: defaultValues.iTrickleLvl,
            softstartCurrent: defaultValues.softstartCurrent,
            startupMode: defaultValues.startupMode,
            jeitaILabelCold: ChargerJeitaILabel.coldIOff,
            jeitaILabelCool: ChargerJeitaILabel.coolIChg50percent,
            jeitaILabelHot: ChargerJeitaILabel.hotIOff,
            jeitaILabelNominal: ChargerJeitaILabel.nominalIChg,
            jeitaILabelWarm: ChargerJeitaILabel.warmIChg,
            jeitaVLabelCold: ChargerJeitaVLabel.coldVNA,
            jeitaVLabelCool: ChargerJeitaVLabel.coolVTerm,
            jeitaVLabelHot: ChargerJeitaVLabel.hotVNA,
            jeitaVLabelNominal: ChargerJeitaVLabel.nominalVTerm,
            jeitaVLabelWarm: ChargerJeitaVLabel.warmVTerm100mVOff,
            tChgReduce: defaultValues.tChgReduce,
            tChgResume: defaultValues.tChgResume,
            tCold: defaultValues.tCold,
            tCool: defaultValues.tCool,
            tHot: defaultValues.tHot,
            tOutCharge: defaultValues.tOutCharge,
            tOutTrickle: defaultValues.tOutTrickle,
            tWarm: defaultValues.tWarm,
            vBatLow: defaultValues.vBatLowLvl,
            vTerm: defaultValues.vTermLvl,
            vTermCool: defaultValues.vTermCoolLvl,
            vTermWarm: defaultValues.vTermWarmLvl,
            vThrottle: defaultValues.vThrottleLvl,
            vTrickleFast: defaultValues.vTrickleLvl,
            vWeak: defaultValues.vWeakLvl,
        };
    }

    get get() {
        return this._get;
    }

    get set() {
        return this._set;
    }

    get ranges(): ChargerModuleRanges {
        return {
            batterySize: batterySizeRange,
            chipThermal: tChgLvlRange,
            current: iChgValuesAll,
            jeita: jeitaRange,
            vLowerCutOff: vLowerCutOffLvlRange,
            vWeak: vWeakLvlRange,
            voltage: vTermLvlValues,
        };
    }

    get values(): ChargerModuleValues {
        return {
            dropoutRecovery: dropoutRecoveryKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            iBatLim: iBatLimLvlKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            iTerm: iTermLvlKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            iThrottle: iThrottleLvlValues.map(val => ({
                label: `${val}%`,
                value: val,
            })),
            iTrickle: iTrickleLvlKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            softstartCurrent: softstartCurrentKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            startupMode: startupModeKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            tOutCharge: tOutChargeLvlValues.map(val => ({
                label: `${val} hours`,
                value: val,
            })),
            tOutTrickle: tOutTrickleLvlValues.map(val => ({
                label: `${val} minutes`,
                value: val,
            })),
            vBatLow: vBatLowLvlKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            vThrottle: vThrottleLvlValues.map(val => ({
                label: `${val} mV`,
                value: val,
            })),
            vTrickleFast: vTrickleLvlKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
        };
    }
}
