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
    configChargerDropoutRecoveryKV,
    configChargerIBatLimLvlKV,
    configChargerIChgValuesAll,
    configChargerITermLvlKV,
    configChargerITrickleLvlKV,
    configChargerSoftstartCurrentKV,
    configChargerStartupModeKV,
    configChargerVBatLowLvlKV,
    configChargerVTermLvlRange,
    configChargerVTrickleLvlKV,
    configChargerVWeakLvlRange,
    configMainOtpLockVersionRange,
    configRegulatorsBuckILimLvlKV,
    configRegulatorsBuckPowerModeControlKV,
    configRegulatorsBuckStartupILimLvlKV,
    configRegulatorsBuckVOutCompBiasLPModeKV,
    configRegulatorsBuckVOutCompBiasULPModeKV,
    configRegulatorsBuckVOutLvlRange,
    configRegulatorsBuckVOutSelKV,
    configSysFeatLongPressResetDebounceKV,
    configSysFeatLongPressResetPinSelKV,
    configSysFeatPGPinSelKV,
    configSysFeatPwrWaitKV,
    configSysFeatShipVBusFiltKV,
    configSysFeatShipVBusFiltTimeKV,
    configSysFeatShpHldDebounceKV,
    configSysFeatShpHldSliderKV,
    configSysFeatShpHldSlideSwitchPollTimeKV,
    configSysFeatShpHldTypeKV,
    configSysFeatTwiTargetId0AddrKV,
    configSysFeatTwiTargetId1AddrKV,
    configSysFeatVBusDpmLvlKV,
    configSysFeatVBusILim0And1GndSelKV,
    configSysFeatVBusILim0And1PinMapKV,
    configSysFeatVBusILimControlKV,
    configSysFeatVBusILimLvlKV,
    configSysFeatVBusStandbySelKV,
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
        sendCommand,
        eventEmitter,
        offlineMode,
        shellParser,
        dialogHandler,
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
                chargerChgEnPinSafetyTimersResetEnable: {
                    ...settingDefaults,
                    value: defaultProperties
                        .chargerChgEnPinSafetyTimersResetEnable.default,
                },
                chargerDropoutRecovery: {
                    ...settingDefaults,
                    value: defaultProperties.chargerDropoutRecovery.default,
                },
                chargerEnable: {
                    ...settingDefaults,
                    value: defaultProperties.chargerEnable.default,
                },
                chargerIBatLimLvl: {
                    ...settingDefaults,
                    value: defaultProperties.chargerIBatLimLvl.default,
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
                chargerSoftstartCurrent: {
                    ...settingDefaults,
                    value: defaultProperties.chargerSoftstartCurrent.default,
                },
                chargerStartupMode: {
                    ...settingDefaults,
                    value: defaultProperties.chargerStartupMode.default,
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
                gpio3InputBufferAndPullDownEnable: {
                    ...settingDefaults,
                    value: defaultProperties.gpio3InputBufferAndPullDownEnable
                        .default,
                },
                gpio4InputBufferAndPullDownEnable: {
                    ...settingDefaults,
                    value: defaultProperties.gpio4InputBufferAndPullDownEnable
                        .default,
                },
                gpio4PinResetEnable: {
                    ...settingDefaults,
                    value: defaultProperties.gpio4PinResetEnable.default,
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
                regulatorsBuckILimLvl: {
                    ...settingDefaults,
                    value: defaultProperties.regulatorsBuckILimLvl.default,
                },
                regulatorsBuckPowerModeControl: {
                    ...settingDefaults,
                    value: defaultProperties.regulatorsBuckPowerModeControl
                        .default,
                },
                regulatorsBuckStartupILimLvl: {
                    ...settingDefaults,
                    value: defaultProperties.regulatorsBuckStartupILimLvl
                        .default,
                },
                regulatorsBuckVOutComparatorBiasCurrentLPMode: {
                    ...settingDefaults,
                    value: defaultProperties
                        .regulatorsBuckVOutComparatorBiasCurrentLPMode.default,
                },
                regulatorsBuckVOutComparatorBiasCurrentULPMode: {
                    ...settingDefaults,
                    value: defaultProperties
                        .regulatorsBuckVOutComparatorBiasCurrentULPMode.default,
                },
                regulatorsBuckVOutLvl: {
                    ...settingDefaults,
                    value: defaultProperties.regulatorsBuckVOutLvl.default,
                },
                regulatorsBuckVOutSel: {
                    ...settingDefaults,
                    value: defaultProperties.regulatorsBuckVOutSel.default,
                },
                sysFeat: { ...settingDefaults, value: false },
                sysFeatBootMonEnable: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatBootMonEnable.default,
                },
                sysFeatLongPressResetDebounce: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatLongPressResetDebounce
                        .default,
                },
                sysFeatLongPressResetPinSel: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatLongPressResetPinSel
                        .default,
                },
                sysFeatPGPinSel: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatPGPinSel.default,
                },
                sysFeatPwrWait: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatPwrWait.default,
                },
                sysFeatShipVBusFilt: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatShipVBusFilt.default,
                },
                sysFeatShipVBusFiltTime: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatShipVBusFiltTime.default,
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
                sysFeatShpHldSlideSwitchPollTime: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatShpHldSlideSwitchPollTime
                        .default,
                },
                sysFeatShpHldSlider: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatShpHldSlider.default,
                },
                sysFeatShpHldType: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatShpHldType.default,
                },
                sysFeatHibernateWakeupByButtonEnable: {
                    ...settingDefaults,
                    value: defaultProperties
                        .sysFeatHibernateWakeupByButtonEnable.default,
                },
                sysFeatTwiTargetId0Addr: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatTwiTargetId0Addr.default,
                },
                sysFeatTwiTargetId1Addr: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatTwiTargetId1Addr.default,
                },
                sysFeatVBusDpmEnable: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatVBusDpmEnable.default,
                },
                sysFeatVBusDpmLvl: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatVBusDpmLvl.default,
                },
                sysFeatVBusILim0And1GndSel: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatVBusILim0And1GndSel.default,
                },
                sysFeatVBusILim0And1PinMap: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatVBusILim0And1PinMap.default,
                },
                sysFeatVBusILimControl: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatVBusILimControl.default,
                },
                sysFeatVBusILimLvl: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatVBusILimLvl.default,
                },
                sysFeatVBusStandbyMode: {
                    ...settingDefaults,
                    value: defaultProperties.sysFeatVBusStandbyMode.default,
                },
            },
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
            configChargerDropoutRecovery: configChargerDropoutRecoveryKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configChargerIBatLimLvl: configChargerIBatLimLvlKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configChargerITermLvl: configChargerITermLvlKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configChargerITrickleLvl: configChargerITrickleLvlKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configChargerSoftstartCurrent: configChargerSoftstartCurrentKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configChargerStartupMode: configChargerStartupModeKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configChargerVBatLowLvl: configChargerVBatLowLvlKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configChargerVTrickleLvl: configChargerVTrickleLvlKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configRegulatorsBuckILimLvl: configRegulatorsBuckILimLvlKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configRegulatorsBuckPowerModeControl:
                configRegulatorsBuckPowerModeControlKV.map(([key, val]) => ({
                    label: val,
                    value: key,
                })),
            configRegulatorsBuckStartupILimLvl:
                configRegulatorsBuckStartupILimLvlKV.map(([key, val]) => ({
                    label: val,
                    value: key,
                })),
            configRegulatorsBuckVOutComparatorBiasCurrentLPMode:
                configRegulatorsBuckVOutCompBiasLPModeKV.map(([key, val]) => ({
                    label: val,
                    value: key,
                })),
            configRegulatorsBuckVOutComparatorBiasCurrentULPMode:
                configRegulatorsBuckVOutCompBiasULPModeKV.map(([key, val]) => ({
                    label: val,
                    value: key,
                })),
            configRegulatorsBuckVOutSel: configRegulatorsBuckVOutSelKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configSysFeatLongPressResetDebounce:
                configSysFeatLongPressResetDebounceKV.map(([key, val]) => ({
                    label: val,
                    value: key,
                })),
            configSysFeatLongPressResetPinSel:
                configSysFeatLongPressResetPinSelKV.map(([key, val]) => ({
                    label: val,
                    value: key,
                })),
            configSysFeatPGPinSel: configSysFeatPGPinSelKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configSysFeatPwrWait: configSysFeatPwrWaitKV.map(([key, val]) => ({
                label: val,
                value: key,
            })),
            configSysFeatShipVBusFilt: configSysFeatShipVBusFiltKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configSysFeatShipVBusFiltTime: configSysFeatShipVBusFiltTimeKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configSysFeatShpHldDebounce: configSysFeatShpHldDebounceKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configSysFeatShpHldSlideSwitchPollTime:
                configSysFeatShpHldSlideSwitchPollTimeKV.map(([key, val]) => ({
                    label: val,
                    value: key,
                })),
            configSysFeatShpHldSlider: configSysFeatShpHldSliderKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configSysFeatShpHldType: configSysFeatShpHldTypeKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configSysFeatTwiTargetId0Addr: configSysFeatTwiTargetId0AddrKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configSysFeatTwiTargetId1Addr: configSysFeatTwiTargetId1AddrKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configSysFeatVBusDpmLvl: configSysFeatVBusDpmLvlKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configSysFeatVBusILim0And1GndSel:
                configSysFeatVBusILim0And1GndSelKV.map(([key, val]) => ({
                    label: val,
                    value: key,
                })),
            configSysFeatVBusILim0And1PinMap:
                configSysFeatVBusILim0And1PinMapKV.map(([key, val]) => ({
                    label: val,
                    value: key,
                })),
            configSysFeatVBusILimControl: configSysFeatVBusILimControlKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configSysFeatVBusILimLvl: configSysFeatVBusILimLvlKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
            configSysFeatVBusStandbyMode: configSysFeatVBusStandbySelKV.map(
                ([key, val]) => ({ label: val, value: key }),
            ),
        };
    }
}
