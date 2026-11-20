/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

/* eslint-disable max-classes-per-file */

import {
    type DropdownItem,
    type Range,
    type ShellParser,
} from '@nordicsemiconductor/pc-nrfconnect-shared';
import { z } from 'zod';

import { type RangeOrNumberArray } from '../../../utils/helpers';
import type BaseNpmDevice from './basePmicDevice';
import type {
    AlternateVOutControl as BuckAlternateVOutControl1012,
    ILimLvl as BuckPeakCurrentLimit1012,
    ILimStartStartLvl as BuckSoftStartPeakCurrentLimit1012,
    ModeControl as BuckModeControl1012,
    OnOffControl as BuckOnOffControl1012,
    PullDownRes as BuckActiveDischargeResistance1012,
    VOutCompBiasLPMode as BuckVOutComparatorBiasCurrentLPMode1012,
    VOutCompBiasULPMode as BuckVOutComparatorBiasCurrentULPMode1012,
    VOutRippleControl as BuckVOutRippleControl1012,
} from './npm1012/buck/types';
import {
    type ITermLvl as ChargerITerm1012,
    type ITrickleLvl as ChargerITrickle1012,
    type VBatLowLvl as ChargerVBatLow1012,
    type VTrickleLvl as ChargerVTrickleFast1012,
} from './npm1012/charger/types';
import type {
    GPIODrive as GPIOLEDDrvGPIODrive1012,
    GPIOModeInput as GPIOLEDDrvGPIOModeInput1012,
    GPIOModeOutput as GPIOLEDDrvGPIOModeOutput1012,
    GPIOPolarity as GPIOLEDDrvGPIOPolarity1012,
    GPIOPull as GPIOLEDDrvGPIOPull1012,
    LEDDrive as GPIOLEDDrvLEDDrive1012,
    LEDMode as GPIOLEDDrvLEDMode1012,
} from './npm1012/gpioleddrv/types';
import type {
    OnOffControl as LdoOnOffControl1012,
    SoftStartILimLdsw as LdoSoftStartCurrent1012,
    SoftStartTime as LdoSoftStartTime1012,
} from './npm1012/ldo/types';
import type { PwmFreq as LEDPwmFreq1012 } from './npm1012/led/types';
import type { TimeToActive as TimeToActive1012 } from './npm1012/lowPower/types';
import type {
    LongPressResetDebounce as LongPressResetDebounce1012,
    LongPressResetPinSel as LongPressResetPinSel1012,
    PowerDownWait as PowerDownWait1012,
} from './npm1012/reset/types';
import type {
    VBusDpm as SysRegVBusDpm1012,
    VBusILim as SysRegVBusILim1012,
} from './npm1012/sysReg/types';
import type { Mode as TimerMode1012 } from './npm1012/timerConfig/types';
import type {
    ConfigChargerITermLvl as npm1012UserOtpConfigChargerITermLvl,
    ConfigChargerITrickleLvl as npm1012UserOtpConfigChargerITrickleLvl,
    ConfigChargerVBatLowLvl as npm1012UserOtpConfigChargerVBatLowLvl,
    ConfigChargerVTrickleLvl as npm1012UserOtpConfigChargerVTrickleLvl,
    ConfigRegulatorsBuckVOutSel as npm1012UserOtpConfigRegulatorsBuckVOutSel,
    ConfigRegulatorsColdStartSel as npm1012UserOtpConfigRegulatorsColdStartSel,
    ConfigRegulatorsLdoSoftStartILimLvl as npm1012UserOtpConfigRegulatorsLdoSoftStartILimLvl,
    ConfigRegulatorsLdoSoftStartTime as npm1012UserOtpConfigRegulatorsLdoSoftStartTime,
    ConfigRegulatorsLdoVOutSel as npm1012UserOtpConfigRegulatorsLdoVOutSel,
    ConfigSysFeatPwrWait as npm1012UserOtpConfigSysFeatPwrWait,
    ConfigSysFeatShpHldDebounce as npm1012UserOtpConfigSysFeatShpHldDebounce,
    ConfigSysFeatTwiSlaveAddress as npm1012UserOtpConfigSysFeatTwiSlaveAddress,
    ConfigSysFeatVBusILimLvl as npm1012UserOtpConfigSysFeatVBusILimLvl,
} from './npm1012/userOtp/types';
import type {
    AlternateVOutControl as BuckAlternateVOutControl1210,
    ILimFicrLvl as BuckPeakCurrentLimitFicr1210,
    ILimLvl as BuckPeakCurrentLimit1210,
    ILimStartFicrLvl as BuckSoftStartPeakCurrentLimitFicr1210,
    ILimStartLvl as BuckSoftStartPeakCurrentLimit1210,
    ModeControl as BuckModeControl1210,
    OnOffControl as BuckOnOffControl1210,
    PullDownRes as BuckActiveDischargeResistance1210,
    VOutCompBiasLPMode as BuckVOutComparatorBiasCurrentLPMode1210,
    VOutCompBiasLPModeFicr as BuckVOutComparatorBiasCurrentLPModeFicr1210,
    VOutCompBiasULPMode as BuckVOutComparatorBiasCurrentULPMode1210,
    VOutCompBiasULPModeFicr as BuckVOutComparatorBiasCurrentULPModeFicr1210,
    VOutRippleControl as BuckVOutRippleControl1210,
} from './npm1210/buck/types';
import {
    type DropoutRecovery as ChargerDropoutRecovery1210,
    type IBatLimLvl as ChargerIBatLim1210,
    type ITermLvl as ChargerITerm1210,
    type ITrickleLvl as ChargerITrickle1210,
    type SoftstartCurrent as ChargerSoftstartCurrent1210,
    type StartupMode as ChargerStartupMode1210,
    type VBatLowLvl as ChargerVBatLow1210,
    type VTrickleLvl as ChargerVTrickleFast1210,
} from './npm1210/charger/types';
import type {
    Drive as GPIODrive1210,
    Mode as GPIOMode1210,
    Polarity as GPIOPolarity1210,
    Pull as GPIOPull1210,
} from './npm1210/gpio/types';
import type {
    Drive as LEDDrive1210,
    Mode as LEDMode1210,
    PwmFreq as LEDPwmFreq1210,
} from './npm1210/led/types';
import type {
    ShipVBusFilt as LowPowerConfigShipVBusFilt1210,
    ShipVBusFiltTime as LowPowerConfigShipVBusFiltTime1210,
    ShpHldSlider as LowPowerConfigShpHldSlider1210,
    ShpHldSlideSwitchDelay as LowPowerConfigShpHldSlideSwitchDelay1210,
    ShpHldSlideSwitchPollTime as LowPowerConfigShpHldSlideSwitchPollTime1210,
    ShpHldType as LowPowerConfigShpHldType1210,
    TimeToActive as TimeToActive1210,
    VBusStandbyPinSel as LowPowerConfigVBusStandbyPinSel1210,
} from './npm1210/lowPower/types';
import type {
    LongPressResetDebounce as LongPressResetDebounce1210,
    LongPressResetPinSel as LongPressResetPinSel1210,
    PowerDownWait as PowerDownWait1210,
} from './npm1210/reset/types';
import type {
    VBusDpm as SysRegVBusDpm1210,
    VBusILim as SysRegVBusILim1210,
    VBusILim0And1PinGndSel as SysRegVBusILim0And1PinGndSel1210,
    VBusILim0And1PinMap as SysRegVBusILim0And1PinMap1210,
    VBusILimControl as SysRegVBusILimControl1210,
    VBusPGPinSel as SysRegVBusPGPinSel1210,
} from './npm1210/sysReg/types';
import type { Mode as TimerMode1210 } from './npm1210/timerConfig/types';
import {
    type ConfigChargerDropoutRecovery as npm1210UserOtpConfigChargerDropoutRecovery,
    type ConfigChargerIBatLimLvl as npm1210UserOtpConfigChargerIBatLimLvl,
    type ConfigChargerITermLvl as npm1210UserOtpConfigChargerITermLvl,
    type ConfigChargerITrickleLvl as npm1210UserOtpConfigChargerITrickleLvl,
    type ConfigChargerSoftstartCurrent as npm1210UserOtpConfigChargerSoftstartCurrent,
    type ConfigChargerStartupMode as npm1210UserOtpConfigChargerStartupMode,
    type ConfigChargerVBatLowLvl as npm1210UserOtpConfigChargerVBatLowLvl,
    type ConfigChargerVTrickleLvl as npm1210UserOtpConfigChargerVTrickleLvl,
    type ConfigRegulatorsBuckILimLvl as npm1210UserOtpConfigRegulatorsBuckILimLvl,
    type ConfigRegulatorsBuckPowerModeControl as npm1210UserOtpConfigRegulatorsBuckPowerModeControl,
    type ConfigRegulatorsBuckStartupILimLvl as npm1210UserOtpConfigRegulatorsBuckStartupILimLvl,
    type ConfigRegulatorsBuckVOutCompBiasLPMode as npm1210UserOtpConfigRegulatorsBuckVOutComparatorBiasCurrentLPMode,
    type ConfigRegulatorsBuckVOutCompBiasULPMode as npm1210UserOtpConfigRegulatorsBuckVOutComparatorBiasCurrentULPMode,
    type ConfigRegulatorsBuckVOutSel as npm1210UserOtpConfigRegulatorsBuckVOutSel,
    type ConfigSysFeatLongPressResetDebounce as npm1210UserOtpConfigSysFeatLongPressResetDebounce,
    type ConfigSysFeatLongPressResetPinSel as npm1210UserOtpConfigSysFeatLongPressResetPinSel,
    type ConfigSysFeatPGPinSel as npm1210UserOtpConfigSysFeatPGPinSel,
    type ConfigSysFeatPwrWait as npm1210UserOtpConfigSysFeatPwrWait,
    type ConfigSysFeatShipVBusFilt as npm1210UserOtpConfigSysFeatShipVBusFilt,
    type ConfigSysFeatShipVBusFiltTime as npm1210UserOtpConfigSysFeatShipVBusFiltTime,
    type ConfigSysFeatShpHldDebounce as npm1210UserOtpConfigSysFeatShpHldDebounce,
    type ConfigSysFeatShpHldSlider as npm1210UserOtpConfigSysFeatShpHldSlider,
    type ConfigSysFeatShpHldSlideSwitchPollTime as npm1210UserOtpConfigSysFeatShpHldSlideSwitchPollTime,
    type ConfigSysFeatShpHldType as npm1210UserOtpConfigSysFeatShpHldType,
    type ConfigSysFeatTwiTargetId0Addr as npm1210UserOtpConfigSysFeatTwiTargetId0Addr,
    type ConfigSysFeatTwiTargetId1Addr as npm1210UserOtpConfigSysFeatTwiTargetId1Addr,
    type ConfigSysFeatVBusDpmLvl as npm1210UserOtpConfigSysFeatVBusDpmLvl,
    type ConfigSysFeatVBusILim0And1GndSel as npm1210UserOtpConfigSysFeatVBusILim0And1GndSel,
    type ConfigSysFeatVBusILim0And1PinMap as npm1210UserOtpConfigSysFeatVBusILim0And1PinMap,
    type ConfigSysFeatVBusILimControl as npm1210UserOtpConfigSysFeatVBusILimControl,
    type ConfigSysFeatVBusILimLvl as npm1210UserOtpConfigSysFeatVBusILimLvl,
    type ConfigSysFeatVBusStandbySel as npm1210UserOtpConfigSysFeatVBusStandbyMode,
} from './npm1210/userOtp/types';
import {
    type ITermNpm1300 as ChargerITermNpm1300,
    type VTrickleFast1300 as ChargerVTrickleFast1300,
} from './npm1300/charger/types';
import type {
    GPIODrive1300,
    GPIOMode1300,
    GPIOPull1300,
} from './npm1300/gpio/types';
import type { SoftStartCurrent as LdoSoftStartCurrent1300 } from './npm1300/ldo/types';
import type { Mode as LEDMode1300 } from './npm1300/led/types';
import type { TimeToActive as TimeToActive1300 } from './npm1300/lowPower/types';
import type { LongPressResetPinSel as LongPressResetPinSel1300 } from './npm1300/reset/types';
import { type npm1300TimerMode } from './npm1300/timerConfig/types';
import { type ITermNpm1304 as ChargerITermNpm1304 } from './npm1304/charger/types';
import type { PowerID2100 } from './npm2100/battery';
import type {
    GPIODrive2100,
    GPIOMode2100,
    GPIOPull2100,
    GPIOState2100,
} from './npm2100/gpio/types';
import { type TimeToActive as TimeToActive2100 } from './npm2100/lowPower/types';
import {
    type nPM2100GPIOControlMode,
    type nPM2100GPIOControlPinSelect,
    type nPM2100LdoModeControl,
    type npm2100LongPressResetDebounce as LongPressResetDebounce2100,
    type npm2100ResetPinSelection as LongPressResetPinSel2100,
    type npm2100ResetReason as ResetReason2100,
    type npm2100TimerMode,
    type SoftStartCurrentLDOMode as LdoSoftStartCurrentLDOMode2100,
    type SoftStartCurrentLoadSwitchMode as LdoSoftStartCurrentLoadSwitchMode2100,
} from './npm2100/types';
import { type NpmEventEmitter } from './pmicHelpers';

export type PartialUpdate<T> = { index: number; data: Partial<T> };

export const GPIOValues = [
    'GPIO0',
    'GPIO1',
    'GPIO2',
    'GPIO3',
    'GPIO4',
    'GPIO5',
] as const;

export const LdoOnOffControlValues = ['SW'] as const;

export const BoostModeControlValues = [
    'AUTO',
    'NOHP',
    'LP',
    'HP',
    'PASS',
] as const;
export const BoostPinModeValues = ['LP', 'HP', 'PASS', 'NOHP'] as const;
export const BoostPinSelectionValues = [
    'OFF',
    'GPIO0LO',
    'GPIO0HI',
    'GPIO1LO',
    'GPIO1HI',
] as const;

export const VSETValues = ['VSET1', 'VSET2'] as const;

export const BuckModeControlValues = ['Auto', 'PWM', 'PFM'] as const;
export const BuckOnOffControlValues = ['Off', 'Software'] as const;
export const BuckRetentionControlValues = ['Off'] as const;

type GPIONames = (typeof GPIOValues)[number];
export type RebootMode = 'cold' | 'warm';
export const LdoModeValues = ['Load_switch', 'LDO'] as const;
export type LdoMode = (typeof LdoModeValues)[number];
export type LdoSoftStartCurrent =
    | number
    | LdoSoftStartCurrent1012
    | LdoSoftStartCurrent1300;
export type LdoSoftStartCurrentLdoMode = LdoSoftStartCurrentLDOMode2100;
export type LdoSoftStartCurrentLoadSwitchMode =
    LdoSoftStartCurrentLoadSwitchMode2100;
export type LdoSoftStartTime = LdoSoftStartTime1012;
export type LdoGPIOControlPinSelect = nPM2100GPIOControlPinSelect;
export type LdoGPIOControlMode = nPM2100GPIOControlMode;
export type LdoModeControl = nPM2100LdoModeControl;
export type LdoOnOffControl =
    | (typeof LdoOnOffControlValues)[number]
    | GPIONames
    | LdoOnOffControl1012;

export const LdoVOutSelValues = ['Software', 'Vset'] as const;
export type LdoVOutSel = (typeof LdoVOutSelValues)[number];

export const BoostVOutSelValues = ['Vset', 'Software'] as const;
export type BoostVOutSel = (typeof BoostVOutSelValues)[number];
export type BoostModeControl = (typeof BoostModeControlValues)[number];
export type BoostPinMode = (typeof BoostPinModeValues)[number];
export type BoostPinSelection = (typeof BoostPinSelectionValues)[number];

export type BuckMode = 'vSet' | 'software';
export type BuckModeControl =
    | (typeof BuckModeControlValues)[number]
    | GPIONames
    | BuckModeControl1012
    | BuckModeControl1210;
export type BuckOnOffControl =
    | (typeof BuckOnOffControlValues)[number]
    | GPIONames
    | (typeof VSETValues)[number]
    | BuckOnOffControl1012
    | BuckOnOffControl1210;
export type BuckRetentionControl =
    | (typeof BuckRetentionControlValues)[number]
    | GPIONames;
export type BuckAlternateVOutControl =
    | BuckAlternateVOutControl1012
    | BuckAlternateVOutControl1210;
export type BuckVOutRippleControl =
    | BuckVOutRippleControl1012
    | BuckVOutRippleControl1210;
export type BuckPeakCurrentLimit =
    | BuckPeakCurrentLimit1012
    | BuckPeakCurrentLimit1210;
export type BuckPeakCurrentLimitFicr = BuckPeakCurrentLimitFicr1210;
export type BuckSoftStartPeakCurrentLimit =
    | BuckSoftStartPeakCurrentLimit1012
    | BuckSoftStartPeakCurrentLimit1210;
export type BuckSoftStartPeakCurrentLimitFicr =
    BuckSoftStartPeakCurrentLimitFicr1210;
export type BuckActiveDischargeResistance =
    | BuckActiveDischargeResistance1012
    | BuckActiveDischargeResistance1210;
export type BuckVOutComparatorBiasLPCurrent =
    | BuckVOutComparatorBiasCurrentLPMode1012
    | BuckVOutComparatorBiasCurrentLPMode1210;
export type BuckVOutComparatorBiasLPCurrentFicr =
    BuckVOutComparatorBiasCurrentLPModeFicr1210;
export type BuckVOutComparatorBiasULPCurrent =
    | BuckVOutComparatorBiasCurrentULPMode1012
    | BuckVOutComparatorBiasCurrentULPMode1210;
export type BuckVOutComparatorBiasULPCurrentFicr =
    BuckVOutComparatorBiasCurrentULPModeFicr1210;

export type ChargerDropoutRecovery = ChargerDropoutRecovery1210;
export type ChargerIBatLim = number | ChargerIBatLim1210;
export type ChargerITerm =
    | ChargerITerm1012
    | ChargerITerm1210
    | ChargerITermNpm1300
    | ChargerITermNpm1304;
export type ChargerITrickle = ChargerITrickle1012 | ChargerITrickle1210;
export type ChargerSoftstartCurrent = ChargerSoftstartCurrent1210;
export type ChargerStartupMode = ChargerStartupMode1210;
export type ChargerVTrickleFast =
    | ChargerVTrickleFast1012
    | ChargerVTrickleFast1210
    | ChargerVTrickleFast1300;
export type ChargerVBatLow = ChargerVBatLow1012 | ChargerVBatLow1210;

export const NTCValues = ['Ignore NTC', '10 kΩ', '47 kΩ', '100 kΩ'] as const;
export type NTCThermistor = (typeof NTCValues)[number];

export type ModuleSettings = {
    charger: boolean;
    maxEnergyExtraction: boolean;
    noOfBoosts: number;
    noOfBucks: number;
    noOfLdos: number;
    noOfLEDs: number;
    noOfBatterySlots: number;
    noOfGPIOs: number;
};

export type CCProfilingState =
    | 'Off'
    | 'Running'
    | 'vCutOff'
    | 'POF'
    | 'ThermalError'
    | 'Ready'
    | 'NOT VSYS';

export type ProfilingEvent = {
    timestamp: number;
    data: ProfilingEventData;
};

export type ProfilingEventData = {
    iLoad: number;
    vLoad: number;
    tBat: number;
    cycle: number;
    seq: number;
    rep: number;
    tload: number;
};

export type IrqEvent = {
    type: string;
    event: string;
};

export type PowerID = PowerID2100;

export type FuelGauge = {
    enabled: boolean;
    notChargingSamplingRate: number;
    reportingRate: number;

    activeBatterModel?: BatteryModel;
    actualCapacity?: number;
    batteryHealthEnabled?: boolean;
    batteryReplacementDetection?: boolean;
    chargingSamplingRate?: number;
    cycleCount?: number;
    discardPosiiveDeltaZ?: boolean;
    estimatedBatteryResistance?: number;
    quickConvergenceMode?: boolean;
    ratedMinBatteryCapacity?: number;
};

export type Charger = {
    vTerm: number;
    vTrickleFast: ChargerVTrickleFast;
    iChg: number;
    enabled: boolean;
    enableRecharging: boolean;
    enableVBatLow: boolean;
    iTerm: ChargerITerm;
    jeitaILabelCold: ChargerJeitaILabel;
    jeitaILabelCool: ChargerJeitaILabel;
    jeitaILabelNominal: ChargerJeitaILabel;
    jeitaILabelWarm: ChargerJeitaILabel;
    jeitaILabelHot: ChargerJeitaILabel;
    jeitaVLabelCold: ChargerJeitaVLabel;
    jeitaVLabelCool: ChargerJeitaVLabel;
    jeitaVLabelNominal: ChargerJeitaVLabel;
    jeitaVLabelWarm: ChargerJeitaVLabel;
    jeitaVLabelHot: ChargerJeitaVLabel;
    tChgResume: number;
    tCold: number;
    tCool: number;
    tWarm: number;
    tHot: number;

    dropoutRecovery?: ChargerDropoutRecovery;
    enableAdvancedChargingProfile?: boolean;
    enableBatteryDischargeCurrentLimit?: boolean;
    enableChargeCurrentThrottling?: boolean;
    enableChgEnPinControl?: boolean;
    enableChgEnPinPullDown?: boolean;
    enableNtcMonitoring?: boolean;
    enableSafetyTimersResetByChgEnPin?: boolean;
    enableWeakBatteryCharging?: boolean;
    iBatLim?: ChargerIBatLim;
    iChgCool?: number;
    iChgDouble?: boolean;
    iChgWarm?: number;
    iThrottle?: number;
    iTrickle?: ChargerITrickle;
    ntcBeta?: number;
    ntcThermistor?: NTCThermistor;
    softstartCurrent?: ChargerSoftstartCurrent;
    startupMode?: ChargerStartupMode;
    tChgReduce?: number;
    tChgStop?: number;
    tOutCharge?: number;
    tOutTrickle?: number;
    vBatLow?: ChargerVBatLow;
    vTermCool?: number;
    vTermR?: number;
    vTermWarm?: number;
    vThrottle?: number;
    vWeak?: number;
};

export type OnBoardLoad = {
    iLoad: number;
};

export type Boost = {
    vOutVSet: number;
    vOutSoftware: number;
    vOutSelect: BoostVOutSel;
    modeControl: BoostModeControl;
    pinSelection: BoostPinSelection;
    pinMode: BoostPinMode;
    pinModeEnabled: boolean;
    overCurrentProtection: boolean;
};

export type Buck = {
    vOutNormal: number;
    mode: BuckMode;
    modeControl: BuckModeControl;
    onOffControl: BuckOnOffControl;
    onOffSoftwareControlEnabled: boolean;
    enabled: boolean;
    cardLabel: string;
    vOutSubscriptLabel: string;
    vSetSubscriptLabel: string;

    activeDischarge?: boolean;
    activeDischargeResistance?: BuckActiveDischargeResistance;
    alternateVOut?: number;
    alternateVOutControl?: BuckAlternateVOutControl;
    automaticPassthrough?: boolean;
    enabledWhenProfiling?: boolean;
    peakCurrentLimit?: BuckPeakCurrentLimit;
    peakCurrentLimitFicr?: BuckPeakCurrentLimitFicr;
    quickVOutDischarge?: boolean;
    retentionControl?: BuckRetentionControl;
    shortCircuitProtection?: boolean;
    softStartPeakCurrentLimit?: BuckSoftStartPeakCurrentLimit;
    softStartPeakCurrentLimitFicr?: BuckSoftStartPeakCurrentLimitFicr;
    vOutComparatorBiasCurrentLPMode?: BuckVOutComparatorBiasLPCurrent;
    vOutComparatorBiasCurrentLPModeFicr?: BuckVOutComparatorBiasLPCurrentFicr;
    vOutComparatorBiasCurrentULPMode?: BuckVOutComparatorBiasULPCurrent;
    vOutComparatorBiasCurrentULPModeFicr?: BuckVOutComparatorBiasULPCurrentFicr;
    vOutRetention?: number;
    vOutRippleControl?: BuckVOutRippleControl;
};

export type Ldo = {
    activeDischarge: boolean;
    cardLabel: string;
    enabled: boolean;
    onOffControl: LdoOnOffControl;
    onOffSoftwareControlEnabled: boolean;

    enabledWhenProfiling?: boolean;
    halt?: boolean;
    mode?: LdoMode;
    modeControl?: LdoModeControl;
    overcurrentProtection?: boolean;
    pinMode?: LdoGPIOControlMode;
    pinSel?: LdoGPIOControlPinSelect;
    ramp?: boolean;
    softStart?: boolean;
    softStartCurrent?: LdoSoftStartCurrent;
    softStartCurrentUILabel?: string;
    softStartCurrentDropdownDisabled?: boolean;
    softStartCurrentLdoMode?: LdoSoftStartCurrentLdoMode;
    softStartCurrentLoadSwitchMode?: LdoSoftStartCurrentLoadSwitchMode;
    softStartTime?: LdoSoftStartTime;
    vOutSel?: LdoVOutSel;
    voltage?: number;
    weakPullDown?: boolean;
};

export type GPIODrive = GPIODrive1210 | GPIODrive1300 | GPIODrive2100;
export type GPIOMode = GPIOMode1210 | GPIOMode1300 | GPIOMode2100;
export type GPIOPolarity = GPIOPolarity1210;
export type GPIOPull = GPIOPull1210 | GPIOPull1300 | GPIOPull2100;
export type GPIOState = GPIOState2100;

export type GPIO = {
    debounce: boolean;
    debounceEnabled: boolean;
    drive: GPIODrive;
    driveEnabled: boolean;
    mode: GPIOMode;
    openDrain: boolean;
    openDrainEnabled: boolean;
    pull: GPIOPull;
    pullEnabled: boolean;

    polarity?: GPIOPolarity;
    polarityEnabled?: boolean;
    state?: GPIOState;
    stateShown?: boolean;
};

export type LEDMode = LEDMode1210 | LEDMode1300;
export type LEDDrive = LEDDrive1210;
export type LEDPwmFreq = LEDPwmFreq1012 | LEDPwmFreq1210;

export type LED = {
    cardLabel: string;

    blinkActionEnabled?: boolean;
    blinkContinuous?: boolean;
    blinkDouble?: boolean;
    blinkTimeOff?: number;
    blinkTimeOn?: number;
    drive?: LEDDrive;
    dutyCycle?: number;
    dutyCycleEnabled?: boolean;
    mode?: LEDMode;
    pwmFrequency?: LEDPwmFreq;
    rgbPhaseShifting?: boolean;
};

export const GPIOLEDDrvStateValues = ['GPIO', 'LED'] as const;
export type GPIOLEDDrvState = (typeof GPIOLEDDrvStateValues)[number];

export const GPIOLEDDrvGPIOStateValues = ['Input', 'Output'] as const;
export type GPIOLEDDrvGPIOState = (typeof GPIOLEDDrvGPIOStateValues)[number];

export type GPIOLEDDrvGPIODrive = GPIOLEDDrvGPIODrive1012;
export type GPIOLEDDrvGPIOMode =
    | GPIOLEDDrvGPIOModeInput1012
    | GPIOLEDDrvGPIOModeOutput1012;
export type GPIOLEDDrvGPIOPolarity = GPIOLEDDrvGPIOPolarity1012;
export type GPIOLEDDrvGPIOPull = GPIOLEDDrvGPIOPull1012;

export type GPIOLEDDrvLEDDrive = GPIOLEDDrvLEDDrive1012;
export type GPIOLEDDrvLEDMode = GPIOLEDDrvLEDMode1012;

export type GPIOLEDDrv = {
    gpioDebounce: boolean;
    gpioDrive: GPIOLEDDrvGPIODrive;
    gpioDutyCycle: number;
    gpioMode: GPIOLEDDrvGPIOMode;
    gpioOpenDrain: boolean;
    gpioPolarity: GPIOLEDDrvGPIOPolarity;
    gpioPull: GPIOLEDDrvGPIOPull;
    gpioState: GPIOLEDDrvGPIOState;

    ledDrive: GPIOLEDDrvLEDDrive;
    ledDutyCycle: number;
    ledMode: GPIOLEDDrvLEDMode;

    state: GPIOLEDDrvState;
};

export const POFPolarityValues = ['Active low', 'Active high'] as const;
export type POFPolarity = (typeof POFPolarityValues)[number];

export type POF = {
    enabled?: boolean;
    polarity?: POFPolarity;
    resetThreshold: number;
    warnActive?: boolean;
    warnThreshold?: number;
};

export type SysRegVBusDpm = SysRegVBusDpm1012 | SysRegVBusDpm1210;
export type SysRegVBusILim = SysRegVBusILim1012 | SysRegVBusILim1210;
export type SysRegVBusILimControl = SysRegVBusILimControl1210;
export type SysRegVBusILim0And1PinGndSel = SysRegVBusILim0And1PinGndSel1210;
export type SysRegVBusILim0And1PinMap = SysRegVBusILim0And1PinMap1210;
export type SysRegVBusPGPinSel = SysRegVBusPGPinSel1210;

export const vBusStatusValues = [
    'Good',
    'Overvoltage',
    'Present',
    'Undervoltage',
] as const;
export type VBusStatus = (typeof vBusStatusValues)[number];

export type SysReg = {
    vBusDpm: SysRegVBusDpm;
    vBusGood: boolean;
    vBusILim: SysRegVBusILim;
    vBusPresent: boolean;

    vBusILimControl?: SysRegVBusILimControl;
    vBusILim0And1PinGndSel?: SysRegVBusILim0And1PinGndSel;
    vBusILim0And1PinMap?: SysRegVBusILim0And1PinMap;
    vBusILim0PinPullDownEnable?: boolean;
    vBusILim1PinPullDownEnable?: boolean;
    vBusILimSoftwareControlDisabled?: boolean;
    vBusPGPinSel?: SysRegVBusPGPinSel;
};

export type TimerMode =
    | TimerMode1012
    | TimerMode1210
    | npm1300TimerMode
    | npm2100TimerMode;

export const TimerPrescalerValues = ['Slow', 'Fast'] as const;
export type TimerPrescaler = (typeof TimerPrescalerValues)[number];

export type TimerConfig = {
    mode: TimerMode;
    period: number;

    enabled?: boolean;
    prescaler?: TimerPrescaler;
};

export enum ChargerJeitaILabel {
    coldIOff,

    coolIChgCool,
    coolIChg50percent,
    coolICool,

    nominalIChg,

    warmIChg,
    warmIChgWarm,

    hotIOff,
}

export enum ChargerJeitaVLabel {
    coldVNA,

    coolVTerm,
    coolVTermCool,

    nominalVTerm,

    warmVTermR,
    warmVTermWarm,
    warmVTerm100mVOff,

    hotVNA,
}

export type TimeToActive =
    | TimeToActive1012
    | TimeToActive1210
    | TimeToActive1300
    | TimeToActive2100;

export type OperatingMode =
    | 'active'
    | 'ship'
    | 'vbatHibernate'
    | 'vbusHibernate'
    | 'vbusStandby1'
    | 'vbusStandby2';

export type LowPowerConfigShipVBusFilt = LowPowerConfigShipVBusFilt1210;
export type LowPowerConfigShipVBusFiltTime = LowPowerConfigShipVBusFiltTime1210;
export type LowPowerConfigShpHldSlideSwitchDelay =
    LowPowerConfigShpHldSlideSwitchDelay1210;
export type LowPowerConfigShpHldSlideSwitchPollTime =
    LowPowerConfigShpHldSlideSwitchPollTime1210;
export type LowPowerConfigShpHldSlider = LowPowerConfigShpHldSlider1210;
export type LowPowerConfigShpHldType = LowPowerConfigShpHldType1210;
export type LowPowerConfigVBusStandbyPinSel =
    LowPowerConfigVBusStandbyPinSel1210;

export type LowPowerConfig = {
    timeToActive: TimeToActive;

    hibernateWakeupByButton?: boolean;
    invPolarity?: boolean;
    operatingMode?: OperatingMode;
    powerButtonEnable?: boolean;
    shipVBusFilt?: LowPowerConfigShipVBusFilt;
    shipVBusFiltTime?: LowPowerConfigShipVBusFiltTime;
    shpHldSlideSwitchDelay?: LowPowerConfigShpHldSlideSwitchDelay;
    shpHldSlideSwitchPollTime?: LowPowerConfigShpHldSlideSwitchPollTime;
    shpHldSlider?: LowPowerConfigShpHldSlider;
    shpHldType?: LowPowerConfigShpHldType;
    suspendPinPullDown?: boolean;
    vbusHibernateWait?: boolean;
    vbusHibernateWaitingForChargeComplete?: boolean;
    vbusStandbyPinSel?: LowPowerConfigVBusStandbyPinSel;
    vbusStandbyWait?: boolean;
    vbusStandbyWaitingForChargeComplete?: boolean;
};

export type ResetConfig = {
    longPressResetPinSel: LongPressResetPinSel;

    longPressResetDebounce?: LongPressResetDebounce;
    longPressResetDebounceSelDisabled?: boolean;
    longPressResetEnable?: boolean;
    powerDownWait?: PowerDownWait;
    resetReason?: ResetReason;
};

export type LongPressResetPinSel =
    | LongPressResetPinSel1012
    | LongPressResetPinSel1210
    | LongPressResetPinSel1300
    | LongPressResetPinSel2100;

export type LongPressResetDebounce =
    | LongPressResetDebounce1012
    | LongPressResetDebounce1210
    | LongPressResetDebounce2100;

export type PowerDownWait = PowerDownWait1012 | PowerDownWait1210;

export type ResetReason = ResetReason2100;

export type AdcSample = {
    timestamp: number;
    vBat: number;
    iBat?: number;
    tBat?: number;
    tDie?: number;
    soc?: number;
    tte?: number;
    ttf?: number;
};

export type BatteryModelCharacterization = {
    temperature?: number;
    capacity: number;
};

export type BatteryClass = 'LiPo' | 'Primary';

export type BatteryModel = {
    name: string;
    characterizations: BatteryModelCharacterization[];
    slotIndex?: number;
    batteryClass?: BatteryClass;
};

export const USBDetectStatusValues = [
    'No USB connection',
    'USB 100/500 mA',
    '1.5A High Power',
    '3A High Power',
] as const;
export type USBDetectStatus = (typeof USBDetectStatusValues)[number];

export type USBPower = {
    detectStatus: USBDetectStatus;
    currentLimiter: number;
};

export type ErrorLogs = {
    resetCause?: string[];
    chargerError?: string[];
    sensorError?: string[];
};

export type SupportedErrorLogs = {
    reset: boolean;
    charger: boolean;
    sensor: boolean;
};

// 'pmic-connected' -> Shell ok - PMIC Online
// 'pmic-disconnected' -> Shell ok - PMIC disconnected
// 'pmic-pending-reboot' -> Shell ok - PMIC need restart to proceed
// 'pmic-pending-rebooting' -> Shell ok - PMIC will reboot soon
// 'ek-disconnected' -> Shell off - PMIC disconnected
export type PmicState =
    | 'ek-disconnected'
    | 'pmic-connected'
    | 'pmic-disconnected'
    | 'pmic-pending-reboot'
    | 'pmic-pending-rebooting';

export type PmicChargingState = {
    toBeDefinedBetter?: boolean; // Documentation is wrong for this and should not be used to detected if battery is connected or not
    batteryFull: boolean;
    trickleCharge: boolean;
    constantCurrentCharging: boolean;
    constantVoltageCharging: boolean;
    batteryRechargeNeeded: boolean;
    dieTempHigh: boolean;
    supplementModeActive: boolean;
};

export interface ProfileDownload {
    state: 'downloading' | 'aborted' | 'aborting' | 'applied' | 'failed';
    completeChunks?: number;
    totalChunks?: number;
    alertMessage?: string;
    slot?: number;
}
export interface BatteryHealthProfileLoadUpdate {
    alertMessage?: string;
    state: 'downloading' | 'aborted' | 'aborting' | 'applied' | 'failed';
}

export type UserOtpConfigChargerDropoutRecovery =
    npm1210UserOtpConfigChargerDropoutRecovery;
export type UserOtpConfigChargerIBatLimLvl =
    npm1210UserOtpConfigChargerIBatLimLvl;
export type UserOtpConfigChargerSoftstartCurrent =
    npm1210UserOtpConfigChargerSoftstartCurrent;
export type UserOtpConfigChargerStartupMode =
    npm1210UserOtpConfigChargerStartupMode;
export type UserOtpConfigChargerITermLvl =
    | npm1012UserOtpConfigChargerITermLvl
    | npm1210UserOtpConfigChargerITermLvl;
export type UserOtpConfigChargerITrickleLvl =
    | npm1012UserOtpConfigChargerITrickleLvl
    | npm1210UserOtpConfigChargerITrickleLvl;
export type UserOtpConfigChargerVBatLowLvl =
    | npm1012UserOtpConfigChargerVBatLowLvl
    | npm1210UserOtpConfigChargerVBatLowLvl;
export type UserOtpConfigChargerVTrickleLvl =
    | npm1012UserOtpConfigChargerVTrickleLvl
    | npm1210UserOtpConfigChargerVTrickleLvl;
export type UserOtpConfigRegulatorsBuckILimLvl =
    npm1210UserOtpConfigRegulatorsBuckILimLvl;
export type UserOtpConfigRegulatorsBuckPowerModeControl =
    npm1210UserOtpConfigRegulatorsBuckPowerModeControl;
export type UserOtpConfigRegulatorsBuckStartupILimLvl =
    npm1210UserOtpConfigRegulatorsBuckStartupILimLvl;
export type UserOtpConfigRegulatorsBuckVOutComparatorBiasCurrentLPMode =
    npm1210UserOtpConfigRegulatorsBuckVOutComparatorBiasCurrentLPMode;
export type UserOtpConfigRegulatorsBuckVOutComparatorBiasCurrentULPMode =
    npm1210UserOtpConfigRegulatorsBuckVOutComparatorBiasCurrentULPMode;
export type UserOtpConfigRegulatorsBuckVOutSel =
    | npm1012UserOtpConfigRegulatorsBuckVOutSel
    | npm1210UserOtpConfigRegulatorsBuckVOutSel;
export type UserOtpConfigRegulatorsLdoSoftStartILimLvl =
    npm1012UserOtpConfigRegulatorsLdoSoftStartILimLvl;
export type UserOtpConfigRegulatorsLdoSoftStartTime =
    npm1012UserOtpConfigRegulatorsLdoSoftStartTime;
export type UserOtpConfigRegulatorsLdoVOutSel =
    npm1012UserOtpConfigRegulatorsLdoVOutSel;
export type UserOtpConfigRegulatorsColdStartSel =
    npm1012UserOtpConfigRegulatorsColdStartSel;
export type UserOtpConfigSysFeatLongPressResetDebounce =
    npm1210UserOtpConfigSysFeatLongPressResetDebounce;
export type UserOtpConfigSysFeatLongPressResetPinSel =
    npm1210UserOtpConfigSysFeatLongPressResetPinSel;
export type UserOtpConfigSysFeatPGPinSel = npm1210UserOtpConfigSysFeatPGPinSel;
export type UserOtpConfigSysFeatPwrWait =
    | npm1012UserOtpConfigSysFeatPwrWait
    | npm1210UserOtpConfigSysFeatPwrWait;
export type UserOtpConfigSysFeatShipVBusFilt =
    npm1210UserOtpConfigSysFeatShipVBusFilt;
export type UserOtpConfigSysFeatShipVBusFiltTime =
    npm1210UserOtpConfigSysFeatShipVBusFiltTime;
export type UserOtpConfigSysFeatShpHldDebounce =
    | npm1012UserOtpConfigSysFeatShpHldDebounce
    | npm1210UserOtpConfigSysFeatShpHldDebounce;
export type UserOtpConfigSysFeatShpHldSlideSwitchPollTime =
    npm1210UserOtpConfigSysFeatShpHldSlideSwitchPollTime;
export type UserOtpConfigSysFeatShpHldSlider =
    npm1210UserOtpConfigSysFeatShpHldSlider;
export type UserOtpConfigSysFeatShpHldType =
    npm1210UserOtpConfigSysFeatShpHldType;
export type UserOtpConfigSysFeatTwiSlaveAddress =
    npm1012UserOtpConfigSysFeatTwiSlaveAddress;
export type UserOtpConfigSysFeatTwiTargetId0Addr =
    npm1210UserOtpConfigSysFeatTwiTargetId0Addr;
export type UserOtpConfigSysFeatTwiTargetId1Addr =
    npm1210UserOtpConfigSysFeatTwiTargetId1Addr;
export type UserOtpConfigSysFeatVBusDpmLvl =
    npm1210UserOtpConfigSysFeatVBusDpmLvl;
export type UserOtpConfigSysFeatVBusILim0And1GndSel =
    npm1210UserOtpConfigSysFeatVBusILim0And1GndSel;
export type UserOtpConfigSysFeatVBusILim0And1PinMap =
    npm1210UserOtpConfigSysFeatVBusILim0And1PinMap;
export type UserOtpConfigSysFeatVBusILimControl =
    npm1210UserOtpConfigSysFeatVBusILimControl;
export type UserOtpConfigSysFeatVBusILimLvl =
    | npm1012UserOtpConfigSysFeatVBusILimLvl
    | npm1210UserOtpConfigSysFeatVBusILimLvl;
export type UserOtpConfigSysFeatVBusStandbyMode =
    npm1210UserOtpConfigSysFeatVBusStandbyMode;

export type UserOtpConfig = {
    charger: boolean;
    chargerEnable: boolean;
    chargerIChgCoolLvl: number;
    chargerIChgDouble: boolean;
    chargerIChgLvl: number;
    chargerIChgWarmLvl: number;
    chargerITermLvl: UserOtpConfigChargerITermLvl;
    chargerITrickleLvl: UserOtpConfigChargerITrickleLvl;
    chargerJeitaEnable: boolean;
    chargerVBatLowChgEnable: boolean;
    chargerVBatLowLvl: UserOtpConfigChargerVBatLowLvl;
    chargerVTermCoolLvl: number;
    chargerVTermLvl: number;
    chargerVTermWarmLvl: number;
    chargerVTrickleLvl: UserOtpConfigChargerVTrickleLvl;
    chargerVWeakLvl: number;
    chargerWeakChgEnable: boolean;
    gpio: boolean;
    gpio0InputBufferAndPullDownEnable: boolean;
    gpio1InputBufferAndPullDownEnable: boolean;
    gpio2InputBufferAndPullDownEnable: boolean;
    mainOtp: boolean;
    mainOtpLockState: boolean;
    mainOtpLockVersion: number;
    regulators: boolean;
    regulatorsBuckVOutLvl: number;
    regulatorsBuckVOutSel: UserOtpConfigRegulatorsBuckVOutSel;
    sysFeat: boolean;
    sysFeatBootMonEnable: boolean;
    sysFeatHibernateWakeupByButtonEnable: boolean;
    sysFeatPwrWait: UserOtpConfigSysFeatPwrWait;
    sysFeatShpHldDebounce: UserOtpConfigSysFeatShpHldDebounce;
    sysFeatShpHldDebounceEnable: boolean;
    sysFeatVBusILimLvl: UserOtpConfigSysFeatVBusILimLvl;

    chargerChgEnPinSafetyTimersResetEnable?: boolean;
    chargerDropoutRecovery?: UserOtpConfigChargerDropoutRecovery;
    chargerIBatLimLvl?: UserOtpConfigChargerIBatLimLvl;
    chargerSoftstartCurrent?: UserOtpConfigChargerSoftstartCurrent;
    chargerStartupMode?: UserOtpConfigChargerStartupMode;
    gpio3InputBufferAndPullDownEnable?: boolean;
    gpio4InputBufferAndPullDownEnable?: boolean;
    gpio4PinResetEnable?: boolean;
    regulatorsBuckILimLvl?: UserOtpConfigRegulatorsBuckILimLvl;
    regulatorsBuckPowerModeControl?: UserOtpConfigRegulatorsBuckPowerModeControl;
    regulatorsBuckStartupILimLvl?: UserOtpConfigRegulatorsBuckStartupILimLvl;
    regulatorsBuckVOutComparatorBiasCurrentLPMode?: UserOtpConfigRegulatorsBuckVOutComparatorBiasCurrentLPMode;
    regulatorsBuckVOutComparatorBiasCurrentULPMode?: UserOtpConfigRegulatorsBuckVOutComparatorBiasCurrentULPMode;
    regulatorsColdStartSel?: UserOtpConfigRegulatorsColdStartSel;
    regulatorsLdoSoftStartILimLvl?: UserOtpConfigRegulatorsLdoSoftStartILimLvl;
    regulatorsLdoSoftStartTime?: UserOtpConfigRegulatorsLdoSoftStartTime;
    regulatorsLdoVOutSel?: UserOtpConfigRegulatorsLdoVOutSel;
    sysFeatLongPressResetDebounce?: UserOtpConfigSysFeatLongPressResetDebounce;
    sysFeatLongPressResetPinSel?: UserOtpConfigSysFeatLongPressResetPinSel;
    sysFeatPGPinSel?: UserOtpConfigSysFeatPGPinSel;
    sysFeatShipVBusFilt?: UserOtpConfigSysFeatShipVBusFilt;
    sysFeatShipVBusFiltTime?: UserOtpConfigSysFeatShipVBusFiltTime;
    sysFeatShpHldSlideSwitchPollTime?: UserOtpConfigSysFeatShpHldSlideSwitchPollTime;
    sysFeatShpHldSlider?: UserOtpConfigSysFeatShpHldSlider;
    sysFeatShpHldType?: UserOtpConfigSysFeatShpHldType;
    sysFeatTwiSlaveAddress?: UserOtpConfigSysFeatTwiSlaveAddress;
    sysFeatTwiTargetId0Addr?: UserOtpConfigSysFeatTwiTargetId0Addr;
    sysFeatTwiTargetId1Addr?: UserOtpConfigSysFeatTwiTargetId1Addr;
    sysFeatVBusDpmEnable?: boolean;
    sysFeatVBusDpmLvl?: UserOtpConfigSysFeatVBusDpmLvl;
    sysFeatVBusILim0And1GndSel?: UserOtpConfigSysFeatVBusILim0And1GndSel;
    sysFeatVBusILim0And1PinMap?: UserOtpConfigSysFeatVBusILim0And1PinMap;
    sysFeatVBusILimControl?: UserOtpConfigSysFeatVBusILimControl;
    sysFeatVBusStandbyMode?: UserOtpConfigSysFeatVBusStandbyMode;
};

export type UserOtpConfigKey = keyof UserOtpConfig;
export type UserOtpSetting<T> = {
    hide: boolean;
    lock: boolean;
    program: boolean;
    value: T;
};
export type UserOtpConfigSettingUpdatePayload = {
    key: UserOtpConfigKey;
    update: Partial<UserOtpSetting<UserOtpConfig[UserOtpConfigKey]>>;
};
export type UserOtpConfigSettings = {
    [K in keyof UserOtpConfig]: UserOtpSetting<UserOtpConfig[K]>;
};
export type UserOtp = {
    otpLocked: boolean;
    settings: UserOtpConfigSettings;
    updateInProgress: boolean;

    regulatorsLdoSoftStartILimLvlLabel?: string;
};
export type UserOtpGetConfigValueArgs = {
    key: UserOtpConfigKey;
};
export type UserOtpGetConfigLockArgs = UserOtpGetConfigValueArgs;
export type UserOtpSetConfigProgramArgs = {
    key: UserOtpConfigKey;
    value: boolean;
};
export type UserOtpSetConfigValueKVArgs = {
    key: UserOtpConfigKey;
    value: UserOtpConfig[UserOtpConfigKey];
};
export type UserOtpSetConfigValueExtraArgs = {
    otpLocked: boolean;
    settingLocked: boolean;

    chargerIChgState?: {
        iChgCoolLvl: number;
        iChgDouble: boolean;
        iChgDoubleLocked: boolean;
        iChgLvl: number;
        iChgWarmLvl: number;
    };
};

export interface UserOtpModule {
    actions: {
        configureAndExport: (
            settings: UserOtpConfigSettings,
        ) => Promise<string>;
        read: () => void;
        write: (settings: UserOtpConfigSettings, dryRun: boolean) => void;

        programConfigValue?: (
            kvArgs: UserOtpSetConfigValueKVArgs,
        ) => Promise<void>;
    };
    callbacks: (() => void)[];
    defaults: UserOtp;
    get: {
        configValue: (args: UserOtpGetConfigValueArgs) => void;
        configLock: (args: UserOtpGetConfigLockArgs) => void;
    };
    ranges: {
        configChargerIChgLvl: number[];
        configChargerIChgCoolLvl: number[];
        configChargerIChgWarmLvl: number[];
        configChargerVTermLvl: Range;
        configChargerVTermCoolLvl: Range;
        configChargerVTermWarmLvl: Range;
        configChargerVWeakLvl: Range;
        configOtpControlLockVersion: Range;
        configRegulatorsBuckVOutLvl: Range;
    };
    set: {
        configProgram: (args: UserOtpSetConfigProgramArgs) => Promise<void>;
        configValue: (
            kvArgs: UserOtpSetConfigValueKVArgs,
            extraArgs: UserOtpSetConfigValueExtraArgs,
        ) => Promise<void>;
    };
    values: {
        configChargerITermLvl: {
            label: string;
            value: UserOtpConfigChargerITermLvl;
        }[];
        configChargerITrickleLvl: {
            label: string;
            value: UserOtpConfigChargerITrickleLvl;
        }[];
        configChargerVBatLowLvl: {
            label: string;
            value: UserOtpConfigChargerVBatLowLvl;
        }[];
        configChargerVTrickleLvl: {
            label: string;
            value: UserOtpConfigChargerVTrickleLvl;
        }[];
        configRegulatorsBuckVOutSel: {
            label: string;
            value: UserOtpConfigRegulatorsBuckVOutSel;
        }[];
        configSysFeatPwrWait: {
            label: string;
            value: UserOtpConfigSysFeatPwrWait;
        }[];
        configSysFeatShpHldDebounce: {
            label: string;
            value: UserOtpConfigSysFeatShpHldDebounce;
        }[];
        configSysFeatVBusILimLvl: {
            label: string;
            value: UserOtpConfigSysFeatVBusILimLvl;
        }[];

        configChargerDropoutRecovery?: {
            label: string;
            value: UserOtpConfigChargerDropoutRecovery;
        }[];
        configChargerIBatLimLvl?: {
            label: string;
            value: UserOtpConfigChargerIBatLimLvl;
        }[];
        configChargerSoftstartCurrent?: {
            label: string;
            value: UserOtpConfigChargerSoftstartCurrent;
        }[];
        configChargerStartupMode?: {
            label: string;
            value: UserOtpConfigChargerStartupMode;
        }[];
        configRegulatorsBuckILimLvl?: {
            label: string;
            value: UserOtpConfigRegulatorsBuckILimLvl;
        }[];
        configRegulatorsBuckPowerModeControl?: {
            label: string;
            value: UserOtpConfigRegulatorsBuckPowerModeControl;
        }[];
        configRegulatorsBuckStartupILimLvl?: {
            label: string;
            value: UserOtpConfigRegulatorsBuckStartupILimLvl;
        }[];
        configRegulatorsBuckVOutComparatorBiasCurrentLPMode?: {
            label: string;
            value: UserOtpConfigRegulatorsBuckVOutComparatorBiasCurrentLPMode;
        }[];
        configRegulatorsBuckVOutComparatorBiasCurrentULPMode?: {
            label: string;
            value: UserOtpConfigRegulatorsBuckVOutComparatorBiasCurrentULPMode;
        }[];
        configRegulatorsColdStartSel?: {
            label: string;
            value: UserOtpConfigRegulatorsColdStartSel;
        }[];
        configRegulatorsLdoVOutSel?: {
            label: string;
            value: UserOtpConfigRegulatorsLdoVOutSel;
        }[];
        configRegulatorsLdoSoftStartILimLvl?: {
            label: string;
            value: UserOtpConfigRegulatorsLdoSoftStartILimLvl;
        }[];
        configRegulatorsLdoSoftStartTime?: {
            label: string;
            value: UserOtpConfigRegulatorsLdoSoftStartTime;
        }[];
        configSysFeatLongPressResetDebounce?: {
            label: string;
            value: UserOtpConfigSysFeatLongPressResetDebounce;
        }[];
        configSysFeatLongPressResetPinSel?: {
            label: string;
            value: UserOtpConfigSysFeatLongPressResetPinSel;
        }[];
        configSysFeatPGPinSel?: {
            label: string;
            value: UserOtpConfigSysFeatPGPinSel;
        }[];
        configSysFeatShipVBusFilt?: {
            label: string;
            value: UserOtpConfigSysFeatShipVBusFilt;
        }[];
        configSysFeatShipVBusFiltTime?: {
            label: string;
            value: UserOtpConfigSysFeatShipVBusFiltTime;
        }[];
        configSysFeatShpHldSlideSwitchPollTime?: {
            label: string;
            value: UserOtpConfigSysFeatShpHldSlideSwitchPollTime;
        }[];
        configSysFeatShpHldSlider?: {
            label: string;
            value: UserOtpConfigSysFeatShpHldSlider;
        }[];
        configSysFeatShpHldType?: {
            label: string;
            value: UserOtpConfigSysFeatShpHldType;
        }[];
        configSysFeatTwiSlaveAddress?: {
            label: string;
            value: UserOtpConfigSysFeatTwiSlaveAddress;
        }[];
        configSysFeatTwiTargetId0Addr?: {
            label: string;
            value: UserOtpConfigSysFeatTwiTargetId0Addr;
        }[];
        configSysFeatTwiTargetId1Addr?: {
            label: string;
            value: UserOtpConfigSysFeatTwiTargetId0Addr;
        }[];
        configSysFeatVBusDpmLvl?: {
            label: string;
            value: UserOtpConfigSysFeatVBusDpmLvl;
        }[];
        configSysFeatVBusILim0And1GndSel?: {
            label: string;
            value: UserOtpConfigSysFeatVBusILim0And1GndSel;
        }[];
        configSysFeatVBusILim0And1PinMap?: {
            label: string;
            value: UserOtpConfigSysFeatVBusILim0And1PinMap;
        }[];
        configSysFeatVBusILimControl?: {
            label: string;
            value: UserOtpConfigSysFeatVBusILimControl;
        }[];
        configSysFeatVBusStandbyMode?: {
            label: string;
            value: UserOtpConfigSysFeatVBusStandbyMode;
        }[];
    };
}

export type FixedListRange = number[] | FixedListRangeWithLabel;
export type FixedListRangeWithLabel = number[] & {
    toLabel: (value: number) => string;
};

export type RangeOrFixedListRange = Range | FixedListRange;

export const isFixedListRange = (
    range: RangeOrFixedListRange,
): range is FixedListRange => Array.isArray(range);

export const isFixedListRangeWithLabel = (
    range: RangeOrFixedListRange,
): range is FixedListRangeWithLabel =>
    Array.isArray(range) &&
    (range as FixedListRangeWithLabel).toLabel !== undefined;

export const isRangeType = (range: RangeOrFixedListRange): range is Range =>
    !Array.isArray(range);

export interface FuelGaugeModule {
    get: {
        all: () => void;
        enabled: () => void;
        activeBatteryModel: () => void;
        storedBatteryModel: () => void;

        batteryHealthAll?: () => void;
        batteryHealthEnabled?: () => void;
        batteryReplacementDetection?: () => void;
        discardPosiiveDeltaZ?: () => void;
        quickConvergenceMode?: () => void;
        ratedMinBatteryCapacity?: () => void;
    };
    set: {
        all: (config: FuelGaugeExport) => Promise<void>;
        enabled: (enabled: boolean) => Promise<void>;
        activeBatteryModel: (name: string) => Promise<void>;

        adcSample?: (
            reportingRate: number,
            samplingInterval: number,
        ) => Promise<void>;
        batteryHealthEnabled?: (value: boolean) => Promise<void>;
        batteryReplacementDetection?: (value: boolean) => Promise<void>;
        batteryStatusCheckEnabled?: (enabled: boolean) => Promise<void>;
        discardPosiiveDeltaZ?: (value: boolean) => void;
        quickConvergenceMode?: (value: boolean) => Promise<void>;
        ratedMinBatteryCapacity?: (value: number) => Promise<void>;
    };
    actions: {
        abortDownloadFuelGaugeProfile: () => Promise<void>;
        applyDownloadFuelGaugeProfile: (slot?: number) => Promise<void>;
        downloadFuelGaugeProfile: (
            profile: Buffer,
            slot?: number,
        ) => Promise<void>;
        reset: () => Promise<void>;

        abortLoadBatteryHealthProfile?: () => Promise<void>;
        loadBatteryHealthProfile?: (
            profile: Buffer,
            batteryModelName: string,
            slot?: number,
        ) => Promise<void>;
        resetBatteryHealthData?: () => Promise<void>;
    };
    ranges: {
        ratedMinBatteryCapacity?: Range;
        samplingInterval?: Range;
    };
    callbacks: (() => void)[];
    defaults: FuelGauge;
}

export type ModuleParams = {
    index: number;
    shellParser: ShellParser | undefined;
    eventEmitter: NpmEventEmitter;
    sendCommand: (
        command: string,
        onSuccess?: (response: string, command: string) => void,
        onError?: (response: string, command: string) => void,
    ) => void;
    dialogHandler: ((dialog: PmicDialog) => void) | null;
    offlineMode: boolean;
    npmDevice: BaseNpmDevice;
    pmicRevision: number | undefined;
};

export interface IModule<T> {
    new (params: ModuleParams): T;
}

export type ChargerModuleSet = new (
    eventEmitter: NpmEventEmitter,
    sendCommand: (
        command: string,
        onSuccess?: (response: string, command: string) => void,
        onError?: (response: string, command: string) => void,
    ) => void,
    offlineMode: boolean,
    get: ChargerModuleGetBase,
) => ChargerModuleSetBase;

export abstract class ChargerModuleSetBase {
    constructor(
        protected eventEmitter: NpmEventEmitter,
        protected sendCommand: (
            command: string,
            onSuccess?: (response: string, command: string) => void,
            onError?: (response: string, command: string) => void,
        ) => void,
        protected offlineMode: boolean,
        protected get: ChargerModuleGetBase,
    ) {}

    abstract all(charger: Charger): Promise<void>;
    abstract vTerm(value: number, chargerEnabled?: boolean): Promise<void>;
    abstract iChg(
        value: number,
        iChgDouble?: boolean,
        chargerEnabled?: boolean,
    ): Promise<void>;
    abstract enabled(value: boolean): Promise<void>;
    abstract vTrickleFast(
        value: ChargerVTrickleFast,
        chargerEnabled?: boolean,
    ): Promise<void>;
    abstract iTerm(
        iTerm: ChargerITerm,
        chargerEnabled?: boolean,
    ): Promise<void>;
    abstract enabledRecharging(value: boolean): Promise<void>;
    abstract enabledVBatLow(value: boolean): Promise<void>;
    abstract tChgResume(value: number): Promise<void>;
    abstract tCold(value: number): Promise<void>;
    abstract tCool(value: number): Promise<void>;
    abstract tWarm(value: number): Promise<void>;
    abstract tHot(value: number): Promise<void>;

    dropoutRecovery?(value: ChargerDropoutRecovery): Promise<void>;
    enableAdvancedChargingProfile?(value: boolean): Promise<void>;
    enableBatteryDischargeCurrentLimit?(value: boolean): Promise<void>;
    enableChargeCurrentThrottling?(value: boolean): Promise<void>;
    enableChgEnPinControl?(value: boolean): Promise<void>;
    enableChgEnPinPullDown?(value: boolean): Promise<void>;
    enableNtcMonitoring?(value: boolean): Promise<void>;
    enableSafetyTimersResetByChgEnPin?(value: boolean): Promise<void>;
    enabledWeakBatteryCharging?(value: boolean): Promise<void>;
    iBatLim?(value: ChargerIBatLim): Promise<void>;
    iChgCool?(
        value: number,
        iChgDouble?: boolean,
        chargerEnabled?: boolean,
    ): Promise<void>;
    iChgWarm?(
        value: number,
        iChgDouble?: boolean,
        chargerEnabled?: boolean,
    ): Promise<void>;
    iThrottle?(value: number): Promise<void>;
    iTrickle?(value: ChargerITrickle): Promise<void>;
    nTCBeta?(value: number): Promise<void>;
    nTCThermistor?(mode: NTCThermistor, autoSetBeta?: boolean): Promise<void>;
    softstartCurrent?(value: ChargerSoftstartCurrent): Promise<void>;
    startupMode?(value: ChargerStartupMode): Promise<void>;
    tChgReduce?(value: number): Promise<void>;
    tChgStop?(value: number): Promise<void>;
    tOutCharge?(value: number): Promise<void>;
    tOutTrickle?(value: number): Promise<void>;
    vBatLow?(value: ChargerVBatLow): Promise<void>;
    vTermCool?(value: number): Promise<void>;
    vTermR?(value: number): Promise<void>;
    vTermWarm?(value: number): Promise<void>;
    vThrottle?(value: number): Promise<void>;
    vWeak?(value: number): Promise<void>;
}

export type ChargerModuleGet = new (
    sendCommand: (
        command: string,
        onSuccess?: (response: string, command: string) => void,
        onError?: (response: string, command: string) => void,
    ) => void,
) => ChargerModuleGetBase;

export abstract class ChargerModuleGetBase {
    constructor(
        protected sendCommand: (
            command: string,
            onSuccess?: (response: string, command: string) => void,
            onError?: (response: string, command: string) => void,
        ) => void,
    ) {}

    abstract all(): void;
    abstract state(): void;
    abstract vTerm(): void;
    abstract iChg(): void;
    abstract enabled(): void;
    abstract vTrickleFast(): void;
    abstract iTerm(): void;
    abstract enabledRecharging(): void;
    abstract enabledVBatLow(): void;
    abstract tChgResume(): void;
    abstract tCold(): void;
    abstract tCool(): void;
    abstract tWarm(): void;
    abstract tHot(): void;

    dropoutRecovery?(): void;
    enabledAdvancedChargingProfile?(): void;
    enabledBatteryDischargeCurrentLimit?(): void;
    enabledChargeCurrentThrottling?(): void;
    enableChgEnPinControl?(): void;
    enableChgEnPinPullDown?(): void;
    enabledNtcMonitoring?(): void;
    enableSafetyTimersResetByChgEnPin?(): void;
    enabledWeakBatteryCharging?(): void;
    iBatLim?(): void;
    iChgCool?(): void;
    iChgDouble?(): void;
    iChgWarm?(): void;
    iThrottle?(): void;
    iTrickle?(): void;
    iTrickle?(): void;
    nTCBeta?(): void;
    nTCThermistor?(): void;
    softstartCurrent?(): void;
    startupMode?(): void;
    tChgReduce?(): void;
    tChgStop?(): void;
    tOutCharge?(): void;
    tOutTrickle?(): void;
    vBatLow?(): void;
    vTermCool?(): void;
    vTermR?(): void;
    vTermWarm?(): void;
    vThrottle?(): void;
    vWeak?(): void;
}

export type ChargerModuleRanges = {
    voltage: number[];
    jeita: Range;
    chipThermal: Range;
    current: RangeOrNumberArray;
    vLowerCutOff: Range;
    batterySize: Range;

    iBatLim?: FixedListRange;
    nTCBeta?: Range;
    vTermR?: number[];
    vWeak?: Range;
};

export type ChargerModuleValues = {
    iTerm: { label: string; value: ChargerITerm }[];
    vTrickleFast: { label: string; value: ChargerVTrickleFast }[];

    dropoutRecovery?: { label: string; value: ChargerDropoutRecovery }[];
    iBatLim?: { label: string; value: ChargerIBatLim }[];
    iThrottle?: { label: string; value: number }[];
    iTrickle?: { label: string; value: ChargerITrickle }[];
    softstartCurrent?: { label: string; value: ChargerSoftstartCurrent }[];
    startupMode?: { label: string; value: ChargerStartupMode }[];
    tOutCharge?: { label: string; value: number }[];
    tOutTrickle?: { label: string; value: number }[];
    vBatLow?: { label: string; value: ChargerVBatLow }[];
    vThrottle?: { label: string; value: number }[];
};

export interface ChargerModule {
    get: ChargerModuleGetBase;
    set: ChargerModuleSetBase;
    callbacks: (() => void)[];
    ranges: ChargerModuleRanges;
    defaults: Charger;
    values: ChargerModuleValues;
}

export interface BoostModule {
    index: number;
    get: {
        all: () => void;
        vOutVSet: () => void;
        vOutSoftware: () => void;
        vOutSel: () => void;
        modeControl: () => void;
        pinSelection: () => void;
        pinMode: () => void;
        overCurrent: () => void;
    };
    set: {
        all: (config: BoostExport) => Promise<void>;
        vOut: (value: number) => Promise<void>;
        vOutSel: (mode: BoostVOutSel) => Promise<void>;
        modeControl: (modeControl: BoostModeControl) => Promise<void>;
        pinSelection: (pinSelection: BoostPinSelection) => Promise<void>;
        pinMode: (pinMode: BoostPinMode) => Promise<void>;
        overCurrent: (enabled: boolean) => Promise<void>;
    };
    callbacks: (() => void)[];
    ranges: {
        voltage: Range;
    };
    defaults: Boost;
}

export interface BuckModule {
    index: number;
    get: {
        all: () => void;
        vOutNormal: () => void;
        mode: () => void;
        enabled: () => void;
        modeControl: () => void;
        onOffControl: () => void;

        activeDischarge?: () => void;
        activeDischargeResistance?: () => void;
        alternateVOutControl?: () => void;
        automaticPassthrough?: () => void;
        peakCurrentLimit?: () => void;
        quickVOutDischarge?: () => void;
        retentionControl?: () => void;
        shortCircuitProtection?: () => void;
        softStartPeakCurrentLimit?: () => void;
        alternateVOut?: () => void;
        vOutComparatorBiasCurrentLPMode?: () => void;
        vOutComparatorBiasCurrentULPMode?: () => void;
        vOutRetention?: () => void;
        vOutRippleControl?: () => void;
    };
    set: {
        all: (config: BuckExport) => Promise<void>;
        vOutNormal: (value: number) => Promise<void>;
        mode: (mode: BuckMode) => Promise<void>;
        modeControl: (modeControl: BuckModeControl) => Promise<void>;
        onOffControl: (onOffControl: BuckOnOffControl) => Promise<void>;
        enabled: (enabled: boolean) => Promise<void>;

        activeDischarge?: (activeDischarge: boolean) => Promise<void>;
        activeDischargeResistance?: (
            value: BuckActiveDischargeResistance,
        ) => Promise<void>;
        alternateVOut?: (value: number) => Promise<void>;
        alternateVOutControl?: (
            value: BuckAlternateVOutControl,
        ) => Promise<void>;
        automaticPassthrough?: (value: boolean) => Promise<void>;
        peakCurrentLimit?: (value: BuckPeakCurrentLimit) => Promise<void>;
        quickVOutDischarge?: (value: boolean) => Promise<void>;
        shortCircuitProtection?: (value: boolean) => Promise<void>;
        softStartPeakCurrentLimit?: (
            value: BuckSoftStartPeakCurrentLimit,
        ) => Promise<void>;
        retentionControl?: (
            retentionControl: BuckRetentionControl,
        ) => Promise<void>;
        vOutComparatorBiasCurrentLPMode?: (
            value: BuckVOutComparatorBiasLPCurrent,
        ) => Promise<void>;
        vOutComparatorBiasCurrentULPMode?: (
            value: BuckVOutComparatorBiasULPCurrent,
        ) => Promise<void>;
        vOutRetention?: (value: number) => Promise<void>;
        vOutRippleControl?: (value: BuckVOutRippleControl) => Promise<void>;
    };
    callbacks: (() => void)[];
    ranges: {
        voltage: Range;

        alternateVOut?: Range;
        retVOut?: Range;
    };
    values: {
        activeDischargeResistance?: {
            label: string;
            value: BuckActiveDischargeResistance;
        }[];
        alternateVOutControl?: {
            label: string;
            value: BuckAlternateVOutControl;
        }[];
        modeControl: { label: string; value: BuckModeControl }[];
        onOffControl: (
            mode: BuckMode,
        ) => { label: string; value: BuckOnOffControl }[];
        peakCurrentLimit?: (
            iLimFicr?: BuckPeakCurrentLimitFicr,
        ) => { label: string; value: BuckPeakCurrentLimit }[];
        retentionControl?: { label: string; value: BuckRetentionControl }[];
        softStartPeakCurrentLimit?: (
            iLimFicr?: BuckSoftStartPeakCurrentLimitFicr,
        ) => {
            label: string;
            value: BuckSoftStartPeakCurrentLimit;
        }[];
        vOutComparatorBiasCurrentLPMode?: (
            ficrVal?: BuckVOutComparatorBiasLPCurrentFicr,
        ) => { label: string; value: BuckVOutComparatorBiasLPCurrent }[];
        vOutComparatorBiasCurrentULPMode?: (
            ficrVal?: BuckVOutComparatorBiasULPCurrentFicr,
        ) => { label: string; value: BuckVOutComparatorBiasULPCurrent }[];
        vOutRippleControl?: { label: string; value: BuckVOutRippleControl }[];
    };
    defaults: Buck;
}

export type LdoSetExtraArgs = {
    currState: {
        mode?: Ldo['mode'];
        onOffControl?: Ldo['onOffControl'];
        vOutSel?: Ldo['vOutSel'];
    };
};

export interface LdoModule {
    index: number;
    get: {
        all: () => void;
        enabled: () => void;

        activeDischarge?: () => void;
        halt?: () => void;
        mode?: () => void;
        modeControl?: () => void;
        onOffControl?: () => void;
        overcurrentProtection?: () => void;
        pinMode?: () => void;
        pinSel?: () => void;
        ramp?: () => void;
        softStart?: () => void;
        softStartCurrent?: () => void;
        softStartCurrentLdoMode?: () => void;
        softStartCurrentLoadSwitchMode?: () => void;
        softStartTime?: () => void;
        vOutSel?: () => void;
        voltage?: () => void;
        weakPullDown?: () => void;
    };
    set: {
        all: (config: LdoExport) => Promise<void>;
        enabled: (
            enabled: boolean,
            extraArgs?: LdoSetExtraArgs,
        ) => Promise<void>;

        activeDischarge?: (activeDischarge: boolean) => Promise<void>;
        halt?: (halt: boolean) => Promise<void>;
        mode?: (mode: LdoMode, extraArgs?: LdoSetExtraArgs) => Promise<void>;
        modeControl?: (modeCtrl: LdoModeControl) => Promise<void>;
        onOffControl?: (
            onOffControl: LdoOnOffControl,
            extraArgs?: LdoSetExtraArgs,
        ) => Promise<void>;
        overcurrentProtection?: (ocp: boolean) => Promise<void>;
        pinMode?: (pinMode: LdoGPIOControlMode) => Promise<void>;
        pinSel?: (pinSel: LdoGPIOControlPinSelect) => Promise<void>;
        ramp?: (ramp: boolean) => Promise<void>;
        softStart?: (enabled: boolean) => Promise<void>;
        softStartCurrent?: (value: LdoSoftStartCurrent) => Promise<void>;
        softStartCurrentLdoMode?: (
            value: LdoSoftStartCurrentLdoMode,
        ) => Promise<void>;
        softStartCurrentLoadSwitchMode?: (
            value: LdoSoftStartCurrentLoadSwitchMode,
        ) => Promise<void>;
        softStartTime?: (value: LdoSoftStartTime) => Promise<void>;
        vOutSel?: (
            mode: LdoVOutSel,
            extraArgs?: LdoSetExtraArgs,
        ) => Promise<void>;
        voltage?: (value: number, extraArgs?: LdoSetExtraArgs) => Promise<void>;
        weakPullDown?: (enable: boolean) => Promise<void>;
    };
    callbacks: (() => void)[];
    ranges: {
        voltage?: Range;
    };
    values: {
        modeControl?: { label: string; value: LdoModeControl }[];
        onOffControl?: (
            mode?: LdoMode,
            vOutSel?: LdoVOutSel,
        ) => { label: string; value: LdoOnOffControl }[];
        pinMode?: { label: string; value: LdoGPIOControlMode }[];
        pinSel?: { label: string; value: LdoGPIOControlPinSelect }[];
        softStartCurrent?: {
            label: string;
            value: LdoSoftStartCurrent;
        }[];
        softStartCurrentLdoMode?: {
            label: string;
            value: LdoSoftStartCurrentLdoMode;
        }[];
        softStartCurrentLoadSwitchMode?: {
            label: string;
            value: LdoSoftStartCurrentLoadSwitchMode;
        }[];
        softStartTime?: { label: string; value: LdoSoftStartTime }[];
    };
    defaults: Ldo;
}

export interface OnBoardLoadModule {
    get: {
        all: () => void;
        iLoad: () => void;
    };
    set: {
        all: (onBoardLoad: OnBoardLoad) => Promise<void>;
        iLoad: (value: number) => Promise<void>;
    };
    callbacks: (() => void)[];
    ranges: {
        iLoad: Range;
    };
    defaults: OnBoardLoad;
}

export interface GpioLedDrvModule {
    defaults: GPIOLEDDrv;
    index: number;

    callbacks: (() => void)[];
    get: {
        all: () => void;

        gpioDebounce: () => void;
        gpioDrive: () => void;
        gpioDutyCycle: () => void;
        gpioMode: () => void;
        gpioOpenDrain: () => void;
        gpioPolarity: () => void;
        gpioPull: () => void;
        gpioState: () => void;

        ledDrive: () => void;
        ledDutyCycle: () => void;
        ledMode: () => void;

        state: () => void;
    };
    ranges: {
        gpioDutyCycle: Range;

        ledDutyCycle: Range;
    };
    set: {
        all: (value: GPIOLEDDrv) => Promise<void>;

        gpioDebounce: (value: boolean) => Promise<void>;
        gpioDrive: (value: GPIOLEDDrvGPIODrive) => Promise<void>;
        gpioDutyCycle: (value: number) => Promise<void>;
        gpioMode: (
            mode: GPIOLEDDrvGPIOMode,
            state: GPIOLEDDrvGPIOState,
        ) => Promise<void>;
        gpioOpenDrain: (value: boolean) => Promise<void>;
        gpioPolarity: (value: GPIOLEDDrvGPIOPolarity) => Promise<void>;
        gpioPull: (value: GPIOLEDDrvGPIOPull) => Promise<void>;
        gpioState: (value: GPIOLEDDrvGPIOState) => Promise<void>;

        ledDrive: (value: GPIOLEDDrvLEDDrive) => Promise<void>;
        ledDutyCycle: (value: number) => Promise<void>;
        ledMode: (value: GPIOLEDDrvLEDMode) => Promise<void>;

        state: (value: GPIOLEDDrvState) => Promise<void>;
    };
    values: {
        gpioDrive: { label: string; value: GPIOLEDDrvGPIODrive }[];
        gpioMode: (
            state: GPIOLEDDrvGPIOState,
        ) => { label: string; value: GPIOLEDDrvGPIOMode }[];
        gpioPolarity: { label: string; value: GPIOLEDDrvGPIOPolarity }[];
        gpioPull: { label: string; value: GPIOLEDDrvGPIOPull }[];

        ledDrive: { label: string; value: GPIOLEDDrvLEDDrive }[];
        ledMode: { label: string; value: GPIOLEDDrvLEDMode }[];
    };
}

export type GpioModule = {
    index: number;
    get: {
        all: () => void;
        debounce: () => void;
        drive: () => void;
        mode: () => void;
        openDrain: () => void;
        pull: () => void;

        polarity?: () => void;
        state?: () => void;
    };
    set: {
        all: (gpio: GPIOExport) => Promise<void>;
        debounce: (debounce: boolean) => Promise<void>;
        drive: (drive: GPIODrive) => Promise<void>;
        mode: (mode: GPIOMode) => Promise<void>;
        openDrain: (openDrain: boolean) => Promise<void>;
        pull: (pull: GPIOPull) => Promise<void>;

        polarity?: (value: GPIOPolarity) => Promise<void>;
        state?: (state: GPIOState) => Promise<void>;
    };
    values: {
        drive: { label: string; value: GPIODrive }[];
        mode: { label: string; value: GPIOMode }[];
        pull: { label: string; value: GPIOPull }[];

        polarity?: { label: string; value: GPIOPolarity }[];
        state?: { label: string; value: GPIOState }[];
    };
    callbacks: (() => void)[];
    defaults: GPIO;
};

export interface LedModule {
    defaults: LED;
    index: number;

    actions: {
        blink?: () => void;
    };
    callbacks: (() => void)[];
    get: {
        all: () => void;

        blinkContinuous?: () => void;
        blinkDouble?: () => void;
        blinkTimeOff?: () => void;
        blinkTimeOn?: () => void;
        drive?: () => void;
        dutyCycle?: () => void;
        mode?: () => void;
        pwmFrequency?: () => void;
        rgbPhaseShifting?: () => void;
    };
    ranges: {
        blinkTime?: Range;
        dutyCycle?: Range;
    };
    set: {
        all: (config: LedExport) => Promise<void>;

        blinkContinuous?: (value: boolean) => Promise<void>;
        blinkDouble?: (value: boolean) => Promise<void>;
        blinkTimeOff?: (value: number) => Promise<void>;
        blinkTimeOn?: (value: number) => Promise<void>;
        drive?: (value: LEDDrive) => Promise<void>;
        dutyCycle?: (value: number) => Promise<void>;
        mode?: (value: LEDMode) => Promise<void>;
        pwmFrequency?: (value: LEDPwmFreq) => Promise<void>;
        rgbPhaseShifting?: (value: boolean) => Promise<void>;
    };
    values: {
        drive?: { label: string; value: LEDDrive }[];
        mode?: { label: string; value: LEDMode }[];
        pwmFrequency?: { label: string; value: LEDPwmFreq }[];
    };
}

export interface PofModule {
    callbacks: (() => void)[];
    defaults: POF;
    get: {
        all: () => void;
        resetThreshold: () => void;

        enabled?: () => void;
        polarity?: () => void;
        status?: () => void;
        warnThreshold?: () => void;
    };
    set: {
        all: (value: POF) => Promise<void>;
        resetThreshold: (value: number) => Promise<void>;

        enabled?: (value: boolean) => Promise<void>;
        polarity?: (value: POFPolarity) => Promise<void>;
        warnThreshold?: (value: number) => Promise<void>;
    };
    ranges: {
        resetThreshold: Range;
        warnThreshold?: Range;
    };
    values: {
        polarity?: { label: string; value: POFPolarity }[];
    };
}

export interface SysRegModule {
    callbacks: (() => void)[];
    defaults: SysReg;
    get: {
        all: () => void;
        vBusDpm: () => void;
        vBusILim: () => void;
        vBusStatus: () => void;
    };
    set: {
        all: (config: SysReg) => Promise<void>;
        vBusDpm: (value: SysRegVBusDpm) => Promise<void>;
        vBusILim: (value: SysRegVBusILim) => Promise<void>;

        vBusILim0And1PinGndSel?: (
            value: SysRegVBusILim0And1PinGndSel,
        ) => Promise<void>;
        vBusILim0And1PinMap?: (
            value: SysRegVBusILim0And1PinMap,
        ) => Promise<void>;
        vBusILim0PinPullDownEnable?: (value: boolean) => Promise<void>;
        vBusILim1PinPullDownEnable?: (value: boolean) => Promise<void>;
        vBusILimControl?: (value: SysRegVBusILimControl) => Promise<void>;
        vBusPGPinSel?: (value: SysRegVBusPGPinSel) => Promise<void>;
    };
    values: {
        vBusDpm: { label: string; value: SysRegVBusDpm }[];
        vBusILim: { label: string; value: SysRegVBusILim }[];

        vBusILim0And1PinGndSel?: {
            label: string;
            value: SysRegVBusILim0And1PinGndSel;
        }[];
        vBusILim0And1PinMap?: {
            label: string;
            value: SysRegVBusILim0And1PinMap;
        }[];
        vBusILimControl?: { label: string; value: SysRegVBusILimControl }[];
        vBusPGPinSel?: { label: string; value: SysRegVBusPGPinSel }[];
    };
}

export type TimerConfigModule = {
    get: {
        all: () => void;
        mode: () => void;
        period: () => void;

        enabled?: () => void;
        prescaler?: () => void;
    };
    set: {
        all(timerConfig: TimerConfig): Promise<void>;
        mode(mode: TimerMode): Promise<void>;
        period(period: number): Promise<void>;

        enabled?(enabled: boolean): Promise<void>;
        prescaler?(prescaler: TimerPrescaler): Promise<void>;
    };
    values: {
        mode: { label: string; value: TimerMode }[];
    };
    callbacks: (() => void)[];
    ranges: {
        periodRange: (prescalerMultiplier: number) => Range;
    };
    defaults: TimerConfig;
    getPrescalerMultiplier?: (timerConfig: TimerConfig) => number;
};

export type BatteryModule = {
    get: {
        all: () => void;
        batteryInput: () => void;
        powerid: () => void;
    };
    callbacks: (() => void)[];
};

export type LowPowerModule = {
    actions: {
        enterBreakToWake?: () => void;
        enterHibernatePtMode?: () => void;
        enterShipHibernateMode?: () => Promise<void>;
        enterShipMode?: () => Promise<void>;
        enterVbusHibernateMode?: (
            waitForChargeComplete?: boolean,
        ) => Promise<void>;
        enterVbusStandby1Mode?: (
            waitForChargeComplete?: boolean,
        ) => Promise<void>;
        enterVbusStandby2Mode?: (
            waitForChargeComplete?: boolean,
        ) => Promise<void>;
        exitVbusStandby1Mode?: () => Promise<void>;
        exitVbusStandby2Mode?: () => Promise<void>;
    };
    get: {
        all: () => void;
        timeToActive: () => void;

        hibernateWakeupByButton?: () => void;
        shipVBusFilt?: () => void;
        shipVBusFiltTime?: () => void;
        shpHldSlideSwitchDelay?: () => void;
        shpHldSlideSwitchPollTime?: () => void;
        shpHldSlider?: () => void;
        shpHldType?: () => void;
        suspendPinPullDown?: () => void;
        vbusHibernateWait?: () => void;
        vbusStandbyPinSel?: () => void;
        vbusStandbyWait?: () => void;
        vbusStatus?: () => void;
    };
    set: {
        all: (lowPower: LowPowerConfig) => Promise<void>;
        timeToActive: (timeToActive: TimeToActive) => Promise<void>;

        hibernateWakeupByButton?: (value: boolean) => Promise<void>;
        powerButtonEnable?: (powerButtonEnable: boolean) => Promise<void>;
        shipVBusFilt?: (value: LowPowerConfigShipVBusFilt) => Promise<void>;
        shipVBusFiltTime?: (
            value: LowPowerConfigShipVBusFiltTime,
        ) => Promise<void>;
        shpHldSlideSwitchDelay?: (
            value: LowPowerConfigShpHldSlideSwitchDelay,
        ) => Promise<void>;
        shpHldSlideSwitchPollTime?: (
            value: LowPowerConfigShpHldSlideSwitchPollTime,
        ) => Promise<void>;
        shpHldSlider?: (value: LowPowerConfigShpHldSlider) => Promise<void>;
        shpHldType?: (value: LowPowerConfigShpHldType) => Promise<void>;
        suspendPinPullDown?: (value: boolean) => Promise<void>;
        vbusHibernateWait?: (value: boolean) => Promise<void>;
        vbusStandbyPinSel?: (
            value: LowPowerConfigVBusStandbyPinSel,
        ) => Promise<void>;
        vbusStandbyWait?: (value: boolean) => Promise<void>;
    };
    values: {
        timeToActive: { label: string; value: TimeToActive }[];

        shipVBusFilt?: { label: string; value: LowPowerConfigShipVBusFilt }[];
        shipVBusFiltTime?: {
            label: string;
            value: LowPowerConfigShipVBusFiltTime;
        }[];
        shpHldSlideSwitchDelay?: {
            label: string;
            value: LowPowerConfigShpHldSlideSwitchDelay;
        }[];
        shpHldSlideSwitchPollTime?: {
            label: string;
            value: LowPowerConfigShpHldSlideSwitchPollTime;
        }[];
        shpHldSlider?: { label: string; value: LowPowerConfigShpHldSlider }[];
        shpHldType?: { label: string; value: LowPowerConfigShpHldType }[];
        vbusStandbyPinSel?: {
            label: string;
            value: LowPowerConfigVBusStandbyPinSel;
        }[];
    };
    callbacks: (() => void)[];
    defaults: LowPowerConfig;
};

export type ResetModule = {
    get: {
        all: () => void;
        longPressResetPinSel: () => void;

        longPressResetDebounce?: () => void;
        longPressResetEnable?: () => void;
        powerDownWait?: () => void;
        resetReason?: () => void;
    };
    set: {
        all: (reset: ResetConfig) => Promise<void>;
        longPressResetPinSel: (value: LongPressResetPinSel) => Promise<void>;

        longPressResetDebounce?: (
            value: LongPressResetDebounce,
        ) => Promise<void>;
        longPressResetEnable?: (value: boolean) => Promise<void>;
        powerDownWait?: (value: PowerDownWait) => Promise<void>;
    };
    actions: {
        powerCycle?: () => Promise<void>;
    };
    values: {
        longPressResetPinSel: DropdownItem<LongPressResetPinSel>[];

        longPressResetDebounce?: DropdownItem<LongPressResetDebounce>[];
        powerDownWait?: DropdownItem<PowerDownWait>[];
    };
    callbacks: (() => void)[];
    defaults: ResetConfig;
};

export type UsbCurrentLimiterModule = {
    get: {
        all: () => void;
        vBusInCurrentLimiter: () => void;
        usbPowered: () => void;
    };
    set: {
        all(usb: USBPowerExport): Promise<void>;
        vBusInCurrentLimiter(amps: number): Promise<void>;
    };
    callbacks: (() => void)[];
    defaults: USBPower;
    ranges: {
        vBusInLimiter: number[];
    };
};

export interface PmicDialog {
    uuid?: string;
    type?: 'alert' | 'alert-circle' | 'information';
    message: string | React.ReactNode;
    optionalLabel?: string;
    optionalDisabled?: boolean;
    optionalClosesDialog?: boolean;
    confirmLabel: string;
    confirmDisabled?: boolean;
    confirmClosesDialog?: boolean;
    cancelLabel?: string;
    cancelDisabled?: boolean;
    cancelClosesDialog?: boolean;
    title: string;
    onConfirm: () => void | Promise<void>;
    onCancel?: () => void | Promise<void>;
    onOptional?: () => void | Promise<void>;
    doNotAskAgainStoreID?: string;
    progress?: number;
}

export const zodSchemaNpmMode = z.union([
    z.literal('npm1012'),
    z.literal('npm1210'),
    z.literal('npm1300'),
    z.literal('npm1304'),
    z.literal('npm2100'),
]);
export type NpmModel = z.infer<typeof zodSchemaNpmMode>;

export type FuelGaugeExport = Omit<
    FuelGauge,
    'notChargingSamplingRate' | 'reportingRate' | 'activeBatterModel'
>;
export type BoostExport = Omit<Boost, 'pinModeEnabled' | 'vOutVSet'>;
export type LdoExport = Omit<Ldo, 'cardLabel' | 'onOffSoftwareControlEnabled'>;
export type BuckExport = Omit<
    Buck,
    | 'onOffSoftwareControlEnabled'
    | 'cardLabel'
    | 'vSetSubscriptLabel'
    | 'vOutSubscriptLabel'
>;
export type GPIOExport = Omit<
    GPIO,
    | 'pullEnabled'
    | 'driveEnabled'
    | 'openDrainEnabled'
    | 'debounceEnabled'
    | 'stateShown'
>;
export type GPIOLEDDrvExport = Omit<GPIOLEDDrv, ''>;
export type USBPowerExport = Omit<USBPower, 'detectStatus'>;
export type LedExport = Omit<LED, 'cardLabel'>;
export type LowPowerExport = Omit<
    LowPowerConfig,
    | 'operatingMode'
    | 'vbusHibernateWaitingForChargeComplete'
    | 'vbusStandbyWaitingForChargeComplete'
>;
export type ResetExport = Omit<
    ResetConfig,
    'longPressResetDebounceSelDisabled'
>;
export type SysRegExport = Omit<SysReg, ''>;

export interface NpmExportV1 {
    boosts: BoostExport[];
    charger?: Charger;
    bucks: BuckExport[];
    ldos: LdoExport[];
    gpios: GPIOExport[];
    leds: LED[];
    pof?: POF;
    lowPower?: LowPowerConfig;
    reset?: ResetConfig;
    timerConfig?: TimerConfig;
    fuelGaugeSettings: FuelGaugeExport;
    firmwareVersion: string;
    deviceType: NpmModel;
    usbPower?: USBPowerExport;
    fuelGauge: boolean; // legacy setting deprecated in v2.0.0
    fuelGaugeChargingSamplingRate: number; // legacy setting deprecated in v2.0.0
}

export interface NpmExportV2 {
    boosts: BoostExport[];
    charger?: Charger;
    bucks?: BuckExport[];
    ldos?: LdoExport[];
    gpios: GPIOExport[];
    gpioLedDrvs?: GPIOLEDDrvExport[];
    leds?: LedExport[];
    pof?: POF;
    onBoardLoad?: OnBoardLoad;
    lowPower?: LowPowerExport;
    reset?: ResetExport;
    sysReg?: SysRegExport;
    timerConfig?: TimerConfig;
    fuelGaugeSettings: FuelGaugeExport;
    firmwareVersion: string;
    deviceType: NpmModel;
    usbPower?: USBPowerExport;
    fileFormatVersion: 2;
}

export type NpmExportLatest = NpmExportV2;

export type AnyNpmExport = NpmExportV1 | NpmExportV2 | NpmExportLatest;

export interface LoggingEvent {
    timestamp: number;
    logLevel: string;
    module: string;
    message: string;
}

export interface AdcSampleSettings {
    samplingRate: number;
    reportRate: number;
}

export interface CCProfile {
    tLoad: number;
    tRest: number;
    iLoad: number;
    iRest: number;
    cycles?: number;
    vCutoff?: number;
}

export interface RestingCCProfile extends CCProfile {
    cycles: number;
}

export interface Profile {
    name: string;
    vLowerCutOff: number;
    vUpperCutOff: number;
    capacity: number;
    ratedChargingCurrent: number;
    ntcThermistor: NTCThermistor;
    temperatures: number[];
    baseDirectory: string;
    restingProfiles: RestingCCProfile[];
    profilingProfiles: CCProfile[];
    iTerm: ChargerITerm;
}

export type BatteryProfiler = {
    release: () => void;
    setProfile: (
        reportIntervalCc: number,
        reportIntervalNtc: number,
        vCutoff: number,
        profiles: CCProfile[],
    ) => Promise<void>;
    canProfile: () => Promise<true | 'MissingSyncBoard' | 'ActiveLoadNotVSYS'>;
    startProfiling: () => Promise<void>;
    stopProfiling: () => Promise<void>;
    isProfiling: () => Promise<boolean>;
    getProfilingState: () => CCProfilingState;
    onProfilingStateChange: (
        handler: (state: CCProfilingState, error?: string) => void,
    ) => () => void;
    onProfilingEvent: (
        handler: (state: ProfilingEvent, error?: string) => void,
    ) => () => void;
    pofError: () => void;
    restingProfile(): RestingCCProfile[];
    loadProfile(
        capacity: number,
        vUpperCutOff: number,
        vLowerCutOff: number,
        vTerm: number,
    ): CCProfile[];
};

interface DocumentationItem {
    title: React.ReactNode;
    content: React.ReactElement[];
}

export type Documentation = {
    [key: string]: {
        [key: string]: DocumentationItem[];
    };
};

export type NpmPeripherals = {
    ChargerModule?: IModule<ChargerModule>;
    maxEnergyExtraction: boolean;
    noOfBatterySlots: number;
    ldos?: {
        Module: IModule<LdoModule>;
        count: number;
    };
    bucks?: {
        Module: IModule<BuckModule>;
        count: number;
    };
    gpios?: {
        Module: IModule<GpioModule>;
        count: number;
    };
    gpioLedDrvs?: {
        Module: IModule<GpioLedDrvModule>;
        count: number;
    };
    boosts?: {
        Module: IModule<BoostModule>;
        count: number;
    };
    leds?: {
        Module: IModule<LedModule>;
        count: number;
    };
    BatteryProfiler?: IModule<BatteryProfiler>;
    PofModule?: IModule<PofModule>;
    UsbCurrentLimiterModule?: IModule<UsbCurrentLimiterModule>;
    TimerConfigModule?: IModule<TimerConfigModule>;
    BatteryModule?: IModule<BatteryModule>;
    LowPowerModule?: IModule<LowPowerModule>;
    ResetModule?: IModule<ResetModule>;
    SysRegModule?: IModule<SysRegModule>;
    FuelGaugeModule?: IModule<FuelGaugeModule>;
    OnBoardLoadModule?: IModule<OnBoardLoadModule>;
    UserOtpModule?: IModule<UserOtpModule>;
};
