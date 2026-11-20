/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    type ModuleParams,
    type UserOtp,
    type UserOtpModule,
} from '../../types';
import { UserOtpActions } from './actions';
import { UserOtpGet } from './getters';
import { UserOtpSet } from './setters';
import {
    configChargerIChgValuesAll,
    configChargerITermLvlKV,
    configChargerITrickleLvlKV,
    configChargerVBatLowLvlKV,
    configChargerVTermLvlRange,
    configChargerVTrickleLvlKV,
    configChargerVWeakLvlRange,
    configMainOtpLockVersionRange,
    configRegulatorsBuckVOutLvlRange,
    configRegulatorsBuckVOutSelKV,
    configRegulatorsColdStartSelKV,
    configRegulatorsLdoSoftStartILimLvlKV,
    configRegulatorsLdoSoftStartTimeKV,
    configRegulatorsLdoVOutSelKV,
    configSysFeatPwrWaitKV,
    configSysFeatShpHldDebounceKV,
    configSysFeatTwiSlaveAddressKV,
    configSysFeatVBusILimLvlKV,
    defaultProperties,
} from './types';

/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

export default class Module implements UserOtpModule {
    private _actions: UserOtpActions;
    private _callbacks: (() => void)[];
    private _get: UserOtpGet;
    private _set: UserOtpSet;

    constructor({
        dialogHandler,
        eventEmitter,
        offlineMode,
        sendCommand,
        shellParser,
    }: ModuleParams) {
        this._actions = new UserOtpActions(
            dialogHandler,
            eventEmitter,
            offlineMode,
            sendCommand,
            shellParser,
        );
        this._callbacks = [];
        this._get = new UserOtpGet(eventEmitter, offlineMode, shellParser);
        this._set = new UserOtpSet(eventEmitter);
    }

    get actions() {
        return this._actions;
    }

    get callbacks() {
        return this._callbacks;
    }

    get defaults(): UserOtp {
        const settingDefaults = { hide: false, lock: false, program: false };

        return {
            otpLocked: false,
            settings: {
                charger: { ...settingDefaults, value: false },
                chargerEnable: {
                    ...settingDefaults,
                    value: defaultProperties.chargerEnable.default,
                },
                chargerIChgCoolLvl: {
                    ...settingDefaults,
                    value: defaultProperties.chargerIChgCoolLvl.default,
                },
                chargerIChgDouble: { ...settingDefaults, value: false },
                chargerIChgLvl: {
                    ...settingDefaults,
                    value: defaultProperties.chargerIChgLvl.default,
                },
                chargerIChgWarmLvl: {
                    ...settingDefaults,
                    value: defaultProperties.chargerIChgWarmLvl.default,
                },
                chargerITermLvl: {
                    ...settingDefaults,
                    value: defaultProperties.chargerITermLvl.default,
                },
                chargerITrickleLvl: {
                    ...settingDefaults,
                    value: defaultProperties.chargerITrickleLvl.default,
                },
                chargerJeitaEnable: {
                    ...settingDefaults,
                    value: defaultProperties.chargerJeitaEnable.default,
                },
                chargerVBatLowChgEnable: {
                    ...settingDefaults,
                    value: defaultProperties.chargerVBatLowChgEnable.default,
                },
                chargerVBatLowLvl: {
                    ...settingDefaults,
                    value: defaultProperties.chargerVBatLowLvl.default,
                },
                chargerVTermCoolLvl: {
                    ...settingDefaults,
                    value: defaultProperties.chargerVTermCoolLvl.default,
                },
                chargerVTermLvl: {
                    ...settingDefaults,
                    value: defaultProperties.chargerVTermLvl.default,
                },
                chargerVTermWarmLvl: {
                    ...settingDefaults,
                    value: defaultProperties.chargerVTermWarmLvl.default,
                },
                chargerVTrickleLvl: {
                    ...settingDefaults,
                    value: defaultProperties.chargerVTrickleLvl.default,
                },
                chargerVWeakLvl: {
                    ...settingDefaults,
                    value: defaultProperties.chargerVWeakLvl.default,
                },
                chargerWeakChgEnable: {
                    ...settingDefaults,
                    value: defaultProperties.chargerWeakChgEnable.default,
                },
                gpio: { ...settingDefaults, value: false },
                gpio0InputBufferAndPullDownEnable: {
                    ...settingDefaults,
                    value: defaultProperties.gpio0InputBufferAndPullDownEnable
                        .default,
                },
                gpio1InputBufferAndPullDownEnable: {
                    ...settingDefaults,
                    value: defaultProperties.gpio1InputBufferAndPullDownEnable
                        .default,
                },
                gpio2InputBufferAndPullDownEnable: {
                    ...settingDefaults,
                    value: defaultProperties.gpio2InputBufferAndPullDownEnable
                        .default,
                },
                mainOtp: { ...settingDefaults, value: false },
                mainOtpLockState: {
                    ...settingDefaults,
                    value: defaultProperties.mainOtpLockState.default,
                },
                mainOtpLockVersion: {
                    ...settingDefaults,
                    value: defaultProperties.mainOtpLockVersion.default,
                },
                regulators: { ...settingDefaults, value: false },
                regulatorsBuckVOutLvl: {
                    ...settingDefaults,
                    value: defaultProperties.regulatorsBuckVOutLvl.default,
                },
                regulatorsBuckVOutSel: {
                    ...settingDefaults,
                    value: defaultProperties.regulatorsBuckVOutSel.default,
                },
                regulatorsColdStartSel: {
                    ...settingDefaults,
                    value: defaultProperties.regulatorsColdStartSel.default,
                },
                regulatorsLdoSoftStartILimLvl: {
                    ...settingDefaults,
                    value: defaultProperties.regulatorsLdoSoftStartILimLvl
                        .default,
                },
                regulatorsLdoSoftStartTime: {
                    ...settingDefaults,
                    value: defaultProperties.regulatorsLdoSoftStartTime.default,
                },
                regulatorsLdoVOutSel: {
                    ...settingDefaults,
                    value: defaultProperties.regulatorsLdoVOutSel.default,
                },
                sysFeat: { ...settingDefaults, value: false },
                sysFeatBootMonEnable: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatBootMonEnable.default,
                },
                sysFeatPwrWait: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatPwrWait.default,
                },
                sysFeatShpHldDebounce: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatShpHldDebounce.default,
                },
                sysFeatShpHldDebounceEnable: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatShpHldDebounceEnable
                        .default,
                },
                sysFeatHibernateWakeupByButtonEnable: {
                    ...settingDefaults,
                    value: defaultProperties
                        .sysFeatHibernateWakeupByButtonEnable.default,
                },
                sysFeatTwiSlaveAddress: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatTwiSlaveAddress.default,
                },
                sysFeatVBusILimLvl: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatVBusILimLvl.default,
                },
            },
            regulatorsLdoSoftStartILimLvlLabel:
                'LOADSW1/LDO1 Soft Start Current Limit (LDO / Load Switch)',
            updateInProgress: false,
        };
    }

    get get() {
        return this._get;
    }

    get ranges(): UserOtpModule['ranges'] {
        return {
            configChargerIChgLvl: configChargerIChgValuesAll,
            configChargerIChgCoolLvl: configChargerIChgValuesAll,
            configChargerIChgWarmLvl: configChargerIChgValuesAll,
            configChargerVTermLvl: configChargerVTermLvlRange,
            configChargerVTermCoolLvl: configChargerVTermLvlRange,
            configChargerVTermWarmLvl: configChargerVTermLvlRange,
            configChargerVWeakLvl: configChargerVWeakLvlRange,
            configOtpControlLockVersion: configMainOtpLockVersionRange,
            configRegulatorsBuckVOutLvl: configRegulatorsBuckVOutLvlRange,
        };
    }

    get set() {
        return this._set;
    }

    get values(): UserOtpModule['values'] {
        return {
            configChargerITermLvl: configChargerITermLvlKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configChargerITrickleLvl: configChargerITrickleLvlKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configChargerVBatLowLvl: configChargerVBatLowLvlKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configChargerVTrickleLvl: configChargerVTrickleLvlKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configRegulatorsBuckVOutSel: configRegulatorsBuckVOutSelKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configRegulatorsColdStartSel: configRegulatorsColdStartSelKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configRegulatorsLdoSoftStartILimLvl:
                configRegulatorsLdoSoftStartILimLvlKV.map(([key, val]) => ({
                    label: val,
                    value: key,
                })),
            configRegulatorsLdoSoftStartTime:
                configRegulatorsLdoSoftStartTimeKV.map(([key, val]) => ({
                    label: val,
                    value: key,
                })),
            configRegulatorsLdoVOutSel: configRegulatorsLdoVOutSelKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configSysFeatPwrWait: configSysFeatPwrWaitKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            configSysFeatShpHldDebounce: configSysFeatShpHldDebounceKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configSysFeatTwiSlaveAddress: configSysFeatTwiSlaveAddressKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configSysFeatVBusILimLvl: configSysFeatVBusILimLvlKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
        };
    }
}
