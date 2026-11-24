/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { getRange } from '../../../../../utils/helpers';

export const configCommand = 'npm12xx uicr configuration';
export const lockCommand = 'npm12xx uicr configuration state';
export const programCommand = 'npm12xx uicr program';

export const configChargerDropoutRecoveryKV = [
    ['off', 'Slow'],
    ['on', 'Normal'],
] as const;
export const configChargerDropoutRecoveryKeys =
    configChargerDropoutRecoveryKV.map(kv => kv[0]);
export const configChargerDropoutRecoveryValues =
    configChargerDropoutRecoveryKV.map(kv => kv[1]);
export type ConfigChargerDropoutRecovery =
    (typeof configChargerDropoutRecoveryKeys)[number];

export const configChargerIBatLimLvlKV = [
    ['off', '2 A'],
    ['on', '1 A'],
] as const;
export const configChargerIBatLimLvlKeys = configChargerIBatLimLvlKV.map(
    kv => kv[0],
);
export const configChargerIBatLimLvlValues = configChargerIBatLimLvlKV.map(
    kv => kv[1],
);
export type ConfigChargerIBatLimLvl =
    (typeof configChargerIBatLimLvlKeys)[number];

export const configChargerIChgRangeMax256mA = {
    decimals: 0,
    max: 256,
    min: 1,
    step: 1,
} as const;
export const configChargerIChgRangeMax512mA = {
    decimals: 0,
    max: 512,
    min: 2,
    step: 2,
} as const;
export const configChargerIChgValuesAll = getRange([
    {
        decimals: 0,
        max: 255,
        min: 1,
        step: 1,
    },
    {
        decimals: 0,
        max: 512,
        min: 256,
        step: 2,
    },
]);
export const configChargerIChgValuesMax256mA = getRange([
    configChargerIChgRangeMax256mA,
]);
export const configChargerIChgValuesMax512mA = getRange([
    configChargerIChgRangeMax512mA,
]);

export const configChargerITermLvlKV = [
    ['12.5%', '12.5 %'],
    ['100%', '100 %'],
    ['50%', '50 %'],
    ['25%', '25 %'],
    ['6.25%', '6.25 %'],
    ['3.125%', '3.125 %'],
    ['1.56%', '1.56 %'],
    ['0.78%', '0.78 %'],
] as const;
const configChargerITermLvlKeys = configChargerITermLvlKV.map(kv => kv[0]);
export type ConfigChargerITermLvl = (typeof configChargerITermLvlKeys)[number];

export const configChargerITrickleLvlKV = configChargerITermLvlKV;
const configChargerITrickleLvlKeys = configChargerITermLvlKeys;
export type ConfigChargerITrickleLvl = ConfigChargerITermLvl;

export const configChargerSoftstartCurrentKV = [
    ['40mA', '40 mA'],
    ['20mA', '20 mA'],
    ['80mA', '80 mA'],
    ['160mA', '160 mA'],
] as const;
export const configChargerSoftstartCurrentKeys =
    configChargerSoftstartCurrentKV.map(kv => kv[0]);
export const configChargerSoftstartCurrentValues =
    configChargerSoftstartCurrentKV.map(kv => kv[1]);
export type ConfigChargerSoftstartCurrent =
    (typeof configChargerSoftstartCurrentKeys)[number];

export const configChargerStartupModeKV = [
    ['off', 'Slow'],
    ['on', 'Normal'],
] as const;
export const configChargerStartupModeKeys = configChargerStartupModeKV.map(
    kv => kv[0],
);
export const configChargerStartupModeValues = configChargerStartupModeKV.map(
    kv => kv[1],
);
export type ConfigChargerStartupMode =
    (typeof configChargerStartupModeKeys)[number];

export const configChargerVTermLvlRange = {
    min: 3.5, // V
    max: 4.65,
    step: 0.01,
    decimals: 2,
} as const;
export const configChargerVTermLvlValues = getRange([
    configChargerVTermLvlRange,
]);

export const configChargerVTrickleLvlKV = [
    ['2.9V', '2.9 V'],
    ['2.5V', '2.5 V'],
    ['2.7V', '2.7 V'],
    ['3.1V', '3.1 V'],
] as const;
const configChargerVTrickleLvlKeys = configChargerVTrickleLvlKV.map(
    kv => kv[0],
);
export type ConfigChargerVTrickleLvl =
    (typeof configChargerVTrickleLvlKeys)[number];

export const configChargerVBatLowLvlKV = [
    ['off', '2.1 V'],
    ['on', '1.1 V'],
] as const;
const configChargerVBatLowLvlKeys = configChargerVBatLowLvlKV.map(kv => kv[0]);
export type ConfigChargerVBatLowLvl =
    (typeof configChargerVBatLowLvlKeys)[number];

export const configChargerVWeakLvlRange = {
    min: 2.5, // V
    max: 4.0,
    step: 0.1,
    decimals: 1,
} as const;
export const configChargerVWeakLvlValues = getRange([
    configChargerVWeakLvlRange,
]);

export const configMainOtpLockVersionRange = {
    decimals: 0,
    max: 127,
    min: 0,
    step: 1,
} as const;
const configMainOtpLockVersionValues = getRange([
    configMainOtpLockVersionRange,
]);

export const configRegulatorsBuckILimLvlKV = [
    ['Factory', 'Factory'],
    ['90mA', '90 mA'],
    ['120mA', '120 mA'],
    ['150mA', '150 mA'],
    ['170mA', '170 mA'],
    ['300mA', '300 mA'],
    ['350mA', '350 mA'],
    ['420mA', '420 mA'],
] as const;
const configRegulatorsBuckILimLvlKeys = configRegulatorsBuckILimLvlKV.map(
    kv => kv[0],
);
export type ConfigRegulatorsBuckILimLvl =
    (typeof configRegulatorsBuckILimLvlKeys)[number];

export const configRegulatorsBuckStartupILimLvlKV =
    configRegulatorsBuckILimLvlKV;
const configRegulatorsBuckStartupILimLvlKeys = configRegulatorsBuckILimLvlKeys;
export type ConfigRegulatorsBuckStartupILimLvl =
    (typeof configRegulatorsBuckStartupILimLvlKeys)[number];

export const configRegulatorsBuckPowerModeControlKV = [
    ['off', 'LP'],
    ['on', 'ULP'],
] as const;
const configRegulatorsBuckPowerModeControlKeys =
    configRegulatorsBuckPowerModeControlKV.map(kv => kv[0]);
export type ConfigRegulatorsBuckPowerModeControl =
    (typeof configRegulatorsBuckPowerModeControlKeys)[number];

export const configRegulatorsBuckVOutCompBiasLPModeKV = [
    ['Factory', 'Factory'],
    ['1.3uA', '1.3 uA'],
    ['2.5uA', '2.5 uA'],
    ['3.0uA', '3.0 uA'],
] as const;
export const configRegulatorsBuckVOutCompBiasLPModeKeys =
    configRegulatorsBuckVOutCompBiasLPModeKV.map(kv => kv[0]);
export const configRegulatorsBuckVOutCompBiasLPModeValues =
    configRegulatorsBuckVOutCompBiasLPModeKV.map(kv => kv[1]);
export type ConfigRegulatorsBuckVOutCompBiasLPMode =
    (typeof configRegulatorsBuckVOutCompBiasLPModeKeys)[number];

export const configRegulatorsBuckVOutCompBiasULPModeKV = [
    ['Factory', 'Factory'],
    ['50nA', '50 nA'],
    ['100nA', '100 nA'],
    ['275nA', '275 nA'],
] as const;
export const configRegulatorsBuckVOutCompBiasULPModeKeys =
    configRegulatorsBuckVOutCompBiasULPModeKV.map(kv => kv[0]);
export const configRegulatorsBuckVOutCompBiasULPModeValues =
    configRegulatorsBuckVOutCompBiasULPModeKV.map(kv => kv[1]);
export type ConfigRegulatorsBuckVOutCompBiasULPMode =
    (typeof configRegulatorsBuckVOutCompBiasULPModeKeys)[number];

export const configRegulatorsBuckVOutLvlRange = {
    decimals: 2,
    max: 3.3,
    min: 1,
    step: 0.05,
} as const;
export const configRegulatorsBuckVOutLvlValues = getRange([
    configRegulatorsBuckVOutLvlRange,
]);

export const configRegulatorsBuckVOutSelKV = [
    ['off', 'VSET'],
    ['on', 'Software'],
] as const;
const configRegulatorsBuckVOutSelKeys = configRegulatorsBuckVOutSelKV.map(
    kv => kv[0],
);
export type ConfigRegulatorsBuckVOutSel =
    (typeof configRegulatorsBuckVOutSelKeys)[number];

export const configSysFeatLongPressResetDebounceKV = [
    ['10s', '10 s'],
    ['3s', '3 s'],
    ['5s', '5 s'],
    ['20s', '20 s'],
] as const;
export const configSysFeatLongPressResetDebounceKeys =
    configSysFeatLongPressResetDebounceKV.map(kv => kv[0]);
export const configSysFeatLongPressResetDebounceValues =
    configSysFeatLongPressResetDebounceKV.map(kv => kv[1]);
export type ConfigSysFeatLongPressResetDebounce =
    (typeof configSysFeatLongPressResetDebounceKeys)[number];

export const configSysFeatLongPressResetPinSelKV = [
    ['Shphld', 'EN/SHPHLD'],
    ['Gpio', 'GPIO'],
    ['Both', 'GPIO and EN/SHPHLD'],
    ['Off', 'Disabled'],
] as const;
export const configSysFeatLongPressResetPinSelKeys =
    configSysFeatLongPressResetPinSelKV.map(kv => kv[0]);
export const configSysFeatLongPressResetPinSelValues =
    configSysFeatLongPressResetPinSelKV.map(kv => kv[1]);
export type ConfigSysFeatLongPressResetPinSel =
    (typeof configSysFeatLongPressResetPinSelKeys)[number];

export const configSysFeatPGPinSelKV = [
    ['VbusGood', 'VBUS GOOD'],
    ['VbusPresent', 'VBUS PRESENT'],
    ['Low', 'Low'],
    ['NotUsed', 'Disabled'],
] as const;
const configSysFeatPGPinSelKeys = configSysFeatPGPinSelKV.map(kv => kv[0]);
export type ConfigSysFeatPGPinSel = (typeof configSysFeatPGPinSelKeys)[number];

export const configSysFeatPwrWaitKV = [
    ['350ms', '350 ms'],
    ['250ms', '250 ms'],
    ['150ms', '150 ms'],
    ['50ms', '50 ms'],
] as const;
const configSysFeatPwrWaitKeys = configSysFeatPwrWaitKV.map(kv => kv[0]);
export type ConfigSysFeatPwrWait = (typeof configSysFeatPwrWaitKeys)[number];

export const configSysFeatShipVBusFiltKV = [
    ['off', 'Default'],
    ['on', 'Long'],
] as const;
const configSysFeatShipVBusFiltKeys = configSysFeatShipVBusFiltKV.map(
    kv => kv[0],
);
export type ConfigSysFeatShipVBusFilt =
    (typeof configSysFeatShipVBusFiltKeys)[number];

export const configSysFeatShipVBusFiltTimeKV = [
    ['off', '5 ms'],
    ['on', '2 ms'],
] as const;
const configSysFeatShipVBusFiltTimeKeys = configSysFeatShipVBusFiltTimeKV.map(
    kv => kv[0],
);
export type ConfigSysFeatShipVBusFiltTime =
    (typeof configSysFeatShipVBusFiltTimeKeys)[number];

export const configSysFeatShpHldDebounceKV = [
    ['50ms', '50 ms'],
    ['100ms', '100 ms'],
    ['500ms', '500 ms'],
    ['1000ms', '1000 ms'],
] as const;
const configSysFeatShpHldDebounceKeys = configSysFeatShpHldDebounceKV.map(
    kv => kv[0],
);
export type ConfigSysFeatShpHldDebounce =
    (typeof configSysFeatShpHldDebounceKeys)[number];

export const configSysFeatShpHldSlideSwitchPollTimeKV = [
    ['off', '50 ms'],
    ['on', '100 ms'],
] as const;
const configSysFeatShpHldSlideSwitchPollTimeKeys =
    configSysFeatShpHldSlideSwitchPollTimeKV.map(kv => kv[0]);
export type ConfigSysFeatShpHldSlideSwitchPollTime =
    (typeof configSysFeatShpHldSlideSwitchPollTimeKeys)[number];

export const configSysFeatShpHldSliderKV = [
    ['off', 'Continuous'],
    ['on', 'Polled'],
] as const;
const configSysFeatShpHldSliderKeys = configSysFeatShpHldSliderKV.map(
    kv => kv[0],
);
export type ConfigSysFeatShpHldSlider =
    (typeof configSysFeatShpHldSliderKeys)[number];

export const configSysFeatShpHldTypeKV = [
    ['off', 'Push button'],
    ['on', 'Slide switch'],
] as const;
const configSysFeatShpHldTypeKeys = configSysFeatShpHldTypeKV.map(kv => kv[0]);
export type ConfigSysFeatShpHldType =
    (typeof configSysFeatShpHldTypeKeys)[number];

export const configSysFeatTwiTargetId0AddrKV = [
    ['off', '0x6A'],
    ['on', '0x6B'],
] as const;
const configSysFeatTwiTargetId0AddrKeys = configSysFeatTwiTargetId0AddrKV.map(
    kv => kv[0],
);
export type ConfigSysFeatTwiTargetId0Addr =
    (typeof configSysFeatTwiTargetId0AddrKeys)[number];

export const configSysFeatTwiTargetId1AddrKV = [
    ['off', '0x50'],
    ['on', '0x51'],
] as const;
const configSysFeatTwiTargetId1AddrKeys = configSysFeatTwiTargetId1AddrKV.map(
    kv => kv[0],
);
export type ConfigSysFeatTwiTargetId1Addr =
    (typeof configSysFeatTwiTargetId1AddrKeys)[number];

export const configSysFeatVBusDpmLvlKV = [
    ['4.4V', '4.4 V'],
    ['4.3V', '4.3 V'],
    ['4.5V', '4.5 V'],
    ['4.6V', '4.6 V'],
] as const;
const configSysFeatVBusDpmLvlKeys = configSysFeatVBusDpmLvlKV.map(kv => kv[0]);
export type ConfigSysFeatVBusDpmLvl =
    (typeof configSysFeatVBusDpmLvlKeys)[number];

export const configSysFeatVBusILim0And1GndSelKV = [
    ['Default', 'Default'],
    ['45mA', '45 mA'],
    ['100mA', '100 mA'],
    ['500mA', '500 mA'],
] as const;
const configSysFeatVBusILim0And1GndSelKeys =
    configSysFeatVBusILim0And1GndSelKV.map(kv => kv[0]);
export type ConfigSysFeatVBusILim0And1GndSel =
    (typeof configSysFeatVBusILim0And1GndSelKeys)[number];

export const configSysFeatVBusILim0And1PinMapKV = [
    ['off', 'High Range'],
    ['on', 'Low Range'],
] as const;
const configSysFeatVBusILim0And1PinMapKeys =
    configSysFeatVBusILim0And1PinMapKV.map(kv => kv[0]);
export type ConfigSysFeatVBusILim0And1PinMap =
    (typeof configSysFeatVBusILim0And1PinMapKeys)[number];

export const configSysFeatVBusILimControlKV = [
    ['off', 'ILIM0/ILIM1 Pins'],
    ['on', 'Register'],
] as const;
const configSysFeatVBusILimControlKeys = configSysFeatVBusILimControlKV.map(
    kv => kv[0],
);
export type ConfigSysFeatVBusILimControl =
    (typeof configSysFeatVBusILimControlKeys)[number];

export const configSysFeatVBusILimLvlKV = [
    ['45mA', '45 mA'],
    ['10mA', '10 mA'],
    ['100mA', '100 mA'],
    ['500mA', '500 mA'],
    ['850mA', '850 mA'],
] as const;
const configSysFeatVBusILimLvlKeys = configSysFeatVBusILimLvlKV.map(
    kv => kv[0],
);
export type ConfigSysFeatVBusILimLvl =
    (typeof configSysFeatVBusILimLvlKeys)[number];

export const configSysFeatVBusStandbySelKV = [
    ['off', 'Standby 1'],
    ['on', 'Standby 2'],
] as const;
const configSysFeatVBusStandbySelKeys = configSysFeatVBusStandbySelKV.map(
    kv => kv[0],
);
export type ConfigSysFeatVBusStandbySel =
    (typeof configSysFeatVBusStandbySelKeys)[number];

export const configValueIsDefault = (
    key: ConfigKey,
    value: Config[ConfigKey],
    iChgDouble?: boolean,
): boolean | undefined => {
    if (isIChgLvlKey(key)) {
        if (typeof value !== 'number' || iChgDouble === undefined) {
            return undefined;
        }
        return iChgLvlCurrentIsDefault(value, iChgDouble);
    }
    return value === defaultProperties[key].default;
};

const convertToStringDefault = (value: Config[ConfigKey]) =>
    typeof value === 'boolean' ? `${value ? 'on' : 'off'}` : `${value}`;
const convertToStringFromBoolToOnOffInverted = (value: Config[ConfigKey]) => {
    switch (value) {
        case true:
            return 'off';
        case false:
            return 'on';
    }
    return undefined;
};
const convertToStringGpio4PinResetEnable = (value: Config[ConfigKey]) => {
    switch (value) {
        case true:
            return '0x55';
        case false:
            return '0xaa';
    }
    return undefined;
};

export const isIChgLvlKey = (key: ConfigKey) =>
    key === 'chargerIChgLvl' ||
    key === 'chargerIChgCoolLvl' ||
    key === 'chargerIChgWarmLvl';

export const iChgLvlCurrentToInteger = (
    iChg: number,
    iChgDouble: boolean,
): number | undefined => {
    const index = iChgDouble
        ? configChargerIChgValuesMax512mA.findIndex(v => v === iChg)
        : configChargerIChgValuesMax256mA.findIndex(v => v === iChg);
    return index >= 0 ? index : undefined;
};
export const iChgLvlIntegerToCurrent = (
    iChgInt: number,
    iChgDouble: boolean,
): number | undefined => {
    if (
        iChgInt === undefined ||
        !Number.isInteger(iChgInt) ||
        iChgInt < 0 ||
        iChgInt > 255
    ) {
        return undefined;
    }
    const current = iChgDouble ? iChgInt * 2 + 2 : iChgInt + 1;
    return current;
};
export const iChgLvlCurrentIsDefault = (
    iChg: number,
    iChgDouble: boolean,
): boolean | undefined => {
    const lvlInt = iChgLvlCurrentToInteger(iChg, iChgDouble);
    if (lvlInt === undefined) return undefined;
    return lvlInt === 0;
};

const parseValueFromMessage = (msg: string): string | undefined =>
    msg.split(':')[1]?.trim();
const parseFloat = (msg: string): number | undefined => {
    const res = parseValueFromMessage(msg);
    return res !== undefined ? Number.parseFloat(res) : undefined;
};
const parseOnOff = (msg: string) => {
    const res = parseValueFromMessage(msg)?.toLowerCase();
    switch (res) {
        case 'on':
            return true;
        case 'off':
            return false;
    }
    return undefined;
};
const parseOnOffInverted = (msg: string) => {
    const res = parseValueFromMessage(msg)?.toLowerCase();
    switch (res) {
        case 'off':
            return true;
        case 'on':
            return false;
    }
    return undefined;
};
export const parseLockState = (msg: string) => {
    const res = parseValueFromMessage(msg)?.toLowerCase();
    switch (res) {
        case 'written':
            return true;
        case 'notwritten':
            return false;
    }
    return undefined;
};

const parseChargerDropoutRecovery = (msg: string) =>
    configChargerDropoutRecoveryKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseChargerIBatLimLvl = (msg: string) =>
    configChargerIBatLimLvlKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseChargerSoftstartCurrent = (msg: string) =>
    configChargerSoftstartCurrentKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseChargerStartupMode = (msg: string) =>
    configChargerStartupModeKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseChargerITermLvl = (msg: string) =>
    configChargerITermLvlKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseChargerITrickleLvl = (msg: string) =>
    configChargerITrickleLvlKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseChargerVBatLowLvl = (msg: string) =>
    configChargerVBatLowLvlKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseChargerVTrickleLvl = (msg: string) =>
    configChargerVTrickleLvlKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseGpio4PinResetEnable = (msg: string) => {
    const val = Number.parseInt(parseValueFromMessage(msg) ?? '', 10);
    if (val === 0x55) {
        return true;
    }
    if (!Number.isNaN(val) && val >= 0 && val <= 255) {
        return false;
    }
    return undefined;
};
const parseRegulatorsBuckILimLvl = (msg: string) =>
    configRegulatorsBuckILimLvlKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseRegulatorsBuckPowerModeControl = (msg: string) =>
    configRegulatorsBuckPowerModeControlKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseRegulatorsBuckStartupILimLvl = (msg: string) =>
    configRegulatorsBuckStartupILimLvlKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseRegulatorsBuckVOutCompBiasLPMode = (msg: string) =>
    configRegulatorsBuckVOutCompBiasLPModeKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseRegulatorsBuckVOutCompBiasULPMode = (msg: string) =>
    configRegulatorsBuckVOutCompBiasULPModeKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseRegulatorsBuckVOutSel = (msg: string) =>
    configRegulatorsBuckVOutSelKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatLongPressResetDebounce = (msg: string) =>
    configSysFeatLongPressResetDebounceKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatLongPressResetPinSel = (msg: string) =>
    configSysFeatLongPressResetPinSelKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatPGPinSel = (msg: string) =>
    configSysFeatPGPinSelKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatPwrWait = (msg: string) =>
    configSysFeatPwrWaitKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatShipVBusFilt = (msg: string) =>
    configSysFeatShipVBusFiltKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatShipVBusFiltTime = (msg: string) =>
    configSysFeatShipVBusFiltTimeKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatShpHldDebounce = (msg: string) =>
    configSysFeatShpHldDebounceKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatShpHldSlideSwitchPollTime = (msg: string) =>
    configSysFeatShpHldSlideSwitchPollTimeKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatShpHldSlider = (msg: string) =>
    configSysFeatShpHldSliderKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatShpHldType = (msg: string) =>
    configSysFeatShpHldTypeKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatTwiTargetId0Addr = (msg: string) =>
    configSysFeatTwiTargetId0AddrKeys.find(
        v =>
            v.toLowerCase() ===
            parseValueFromMessage(msg)?.toLowerCase()?.toLowerCase(),
    );
const parseSysFeatTwiTargetId1Addr = (msg: string) =>
    configSysFeatTwiTargetId1AddrKeys.find(
        v =>
            v.toLowerCase() ===
            parseValueFromMessage(msg)?.toLowerCase()?.toLowerCase(),
    );
const parseSysFeatVBusDpmLvl = (msg: string) =>
    configSysFeatVBusDpmLvlKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatVBusILim0And1GndSel = (msg: string) =>
    configSysFeatVBusILim0And1GndSelKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatVBusILim0And1PinMap = (msg: string) =>
    configSysFeatVBusILim0And1PinMapKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatVBusILimControl = (msg: string) =>
    configSysFeatVBusILimControlKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatVBusILimLvl = (msg: string) =>
    configSysFeatVBusILimLvlKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatVBusStandbySel = (msg: string) =>
    configSysFeatVBusStandbySelKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );

export type Config = {
    chargerChgEnPinSafetyTimersResetEnable: boolean;
    chargerDropoutRecovery: ConfigChargerDropoutRecovery;
    chargerEnable: boolean;
    chargerIBatLimLvl: ConfigChargerIBatLimLvl;
    chargerIChgCoolLvl: number;
    chargerIChgDouble: boolean;
    chargerIChgLvl: number;
    chargerIChgWarmLvl: number;
    chargerITermLvl: ConfigChargerITermLvl;
    chargerITrickleLvl: ConfigChargerITrickleLvl;
    chargerJeitaEnable: boolean;
    chargerSoftstartCurrent: ConfigChargerSoftstartCurrent;
    chargerStartupMode: ConfigChargerStartupMode;
    chargerVBatLowChgEnable: boolean;
    chargerVBatLowLvl: ConfigChargerVBatLowLvl;
    chargerVTermCoolLvl: number;
    chargerVTermLvl: number;
    chargerVTermWarmLvl: number;
    chargerVTrickleLvl: ConfigChargerVTrickleLvl;
    chargerVWeakLvl: number;
    chargerWeakChgEnable: boolean;
    gpio0InputBufferAndPullDownEnable: boolean;
    gpio1InputBufferAndPullDownEnable: boolean;
    gpio2InputBufferAndPullDownEnable: boolean;
    gpio3InputBufferAndPullDownEnable: boolean;
    gpio4InputBufferAndPullDownEnable: boolean;
    gpio4PinResetEnable: boolean;
    mainOtpLockState: boolean;
    mainOtpLockVersion: number;
    regulatorsBuckILimLvl: ConfigRegulatorsBuckILimLvl;
    regulatorsBuckPowerModeControl: ConfigRegulatorsBuckPowerModeControl;
    regulatorsBuckStartupILimLvl: ConfigRegulatorsBuckStartupILimLvl;
    regulatorsBuckVOutComparatorBiasCurrentLPMode: ConfigRegulatorsBuckVOutCompBiasLPMode;
    regulatorsBuckVOutComparatorBiasCurrentULPMode: ConfigRegulatorsBuckVOutCompBiasULPMode;
    regulatorsBuckVOutLvl: number;
    regulatorsBuckVOutSel: ConfigRegulatorsBuckVOutSel;
    sysFeatBootMonEnable: boolean;
    sysFeatHibernateWakeupByButtonEnable: boolean;
    sysFeatLongPressResetDebounce: ConfigSysFeatLongPressResetDebounce;
    sysFeatLongPressResetPinSel: ConfigSysFeatLongPressResetPinSel;
    sysFeatPGPinSel: ConfigSysFeatPGPinSel;
    sysFeatPwrWait: ConfigSysFeatPwrWait;
    sysFeatShipVBusFilt: ConfigSysFeatShipVBusFilt;
    sysFeatShipVBusFiltTime: ConfigSysFeatShipVBusFiltTime;
    sysFeatShpHldDebounce: ConfigSysFeatShpHldDebounce;
    sysFeatShpHldDebounceEnable: boolean;
    sysFeatShpHldSlideSwitchPollTime: ConfigSysFeatShpHldSlideSwitchPollTime;
    sysFeatShpHldSlider: ConfigSysFeatShpHldSlider;
    sysFeatShpHldType: ConfigSysFeatShpHldType;
    sysFeatTwiTargetId0Addr: ConfigSysFeatTwiTargetId0Addr;
    sysFeatTwiTargetId1Addr: ConfigSysFeatTwiTargetId1Addr;
    sysFeatVBusDpmEnable: boolean;
    sysFeatVBusDpmLvl: ConfigSysFeatVBusDpmLvl;
    sysFeatVBusILim0And1GndSel: ConfigSysFeatVBusILim0And1GndSel;
    sysFeatVBusILim0And1PinMap: ConfigSysFeatVBusILim0And1PinMap;
    sysFeatVBusILimControl: ConfigSysFeatVBusILimControl;
    sysFeatVBusILimLvl: ConfigSysFeatVBusILimLvl;
    sysFeatVBusStandbyMode: ConfigSysFeatVBusStandbySel;
};
export type ConfigKey = keyof Config;

type ConfigProperties = {
    [K in ConfigKey]: {
        convertToString: (value: Config[ConfigKey]) => string | undefined;
        default: Config[K];
        fwKey: string;
        parser: (msg: string) => Config[K] | undefined;
        values: readonly Config[K][];
    };
};

const boolValues = [false, true] as const;

export const defaultProperties: ConfigProperties = {
    chargerChgEnPinSafetyTimersResetEnable: {
        convertToString: convertToStringDefault,
        default: false,
        fwKey: 'CHARGER.SETUP.PINTIMERRST',
        parser: parseOnOff,
        values: boolValues,
    },
    chargerDropoutRecovery: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'CHARGER.SETUP.DROPOUT',
        parser: parseChargerDropoutRecovery,
        values: configChargerDropoutRecoveryKeys,
    },
    chargerEnable: {
        convertToString: convertToStringDefault,
        fwKey: 'CHARGER.ENABLE.CHARGE',
        parser: parseOnOff,
        default: false,
        values: boolValues,
    },
    chargerIBatLimLvl: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'CHARGER.SETUP.ILIMBATLVL',
        parser: parseChargerIBatLimLvl,
        values: configChargerIBatLimLvlKeys,
    },
    chargerIChgCoolLvl: {
        convertToString: convertToStringDefault,
        default: 1.0,
        fwKey: 'CHARGER.ISETCOOL.LVL',
        parser: parseFloat,
        values: configChargerIChgValuesAll,
    },
    chargerIChgDouble: {
        convertToString: convertToStringDefault,
        default: false,
        fwKey: 'CHARGER.ENABLE.ISETDOUBLE',
        parser: parseOnOff,
        values: boolValues,
    },
    chargerIChgLvl: {
        convertToString: convertToStringDefault,
        default: 1.0,
        fwKey: 'CHARGER.ISET.LVL',
        parser: parseFloat,
        values: configChargerIChgValuesAll,
    },
    chargerIChgWarmLvl: {
        convertToString: convertToStringDefault,
        default: 1.0,
        fwKey: 'CHARGER.ISETWARM.LVL',
        parser: parseFloat,
        values: configChargerIChgValuesAll,
    },
    chargerITermLvl: {
        convertToString: convertToStringDefault,
        default: '12.5%',
        fwKey: 'CHARGER.ITERM.LVL',
        parser: parseChargerITermLvl,
        values: configChargerITermLvlKeys,
    },
    chargerITrickleLvl: {
        convertToString: convertToStringDefault,
        default: '12.5%',
        fwKey: 'CHARGER.ITRICKLE.LVL',
        parser: parseChargerITrickleLvl,
        values: configChargerITrickleLvlKeys,
    },
    chargerJeitaEnable: {
        convertToString: convertToStringDefault,
        default: false,
        fwKey: 'CHARGER.ENABLE.JEITA',
        parser: parseOnOff,
        values: boolValues,
    },
    chargerSoftstartCurrent: {
        convertToString: convertToStringDefault,
        default: '40mA',
        fwKey: 'CHARGER.SETUP.SOFTSTARTSEL',
        parser: parseChargerSoftstartCurrent,
        values: configChargerSoftstartCurrentKeys,
    },
    chargerStartupMode: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'CHARGER.SETUP.STARTUP',
        parser: parseChargerStartupMode,
        values: configChargerStartupModeKeys,
    },
    chargerVBatLowChgEnable: {
        convertToString: convertToStringFromBoolToOnOffInverted,
        default: true,
        fwKey: 'CHARGER.ENABLE.VBATLOWCHG',
        parser: parseOnOffInverted,
        values: boolValues,
    },
    chargerVBatLowLvl: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'CHARGER.ENABLE.VBATLOWLVL',
        parser: parseChargerVBatLowLvl,
        values: configChargerVBatLowLvlKeys,
    },
    chargerVTermCoolLvl: {
        convertToString: convertToStringDefault,
        default: 3.5,
        fwKey: 'CHARGER.VTERMCOOL.LVL',
        parser: parseFloat,
        values: configChargerVTermLvlValues,
    },
    chargerVTermLvl: {
        convertToString: convertToStringDefault,
        default: 3.5,
        fwKey: 'CHARGER.VTERM.LVL',
        parser: parseFloat,
        values: configChargerVTermLvlValues,
    },
    chargerVTermWarmLvl: {
        convertToString: convertToStringDefault,
        default: 3.5,
        fwKey: 'CHARGER.VTERMWARM.LVL',
        parser: parseFloat,
        values: configChargerVTermLvlValues,
    },
    chargerVTrickleLvl: {
        convertToString: convertToStringDefault,
        default: '2.9V',
        fwKey: 'CHARGER.VTRICKLE.LVL',
        parser: parseChargerVTrickleLvl,
        values: configChargerVTrickleLvlKeys,
    },
    chargerVWeakLvl: {
        convertToString: convertToStringDefault,
        default: 2.5,
        fwKey: 'CHARGER.VWEAK.LVL',
        parser: parseFloat,
        values: configChargerVWeakLvlValues,
    },
    chargerWeakChgEnable: {
        convertToString: convertToStringDefault,
        default: false,
        fwKey: 'CHARGER.ENABLE.WEAKCHG',
        parser: parseOnOff,
        values: boolValues,
    },
    gpio0InputBufferAndPullDownEnable: {
        convertToString: convertToStringFromBoolToOnOffInverted,
        default: true,
        fwKey: 'MAIN.START.GPIO0',
        parser: parseOnOffInverted,
        values: boolValues,
    },
    gpio1InputBufferAndPullDownEnable: {
        convertToString: convertToStringFromBoolToOnOffInverted,
        default: true,
        fwKey: 'MAIN.START.GPIO1',
        parser: parseOnOffInverted,
        values: boolValues,
    },
    gpio2InputBufferAndPullDownEnable: {
        convertToString: convertToStringFromBoolToOnOffInverted,
        default: true,
        fwKey: 'MAIN.START.GPIO2',
        parser: parseOnOffInverted,
        values: boolValues,
    },
    gpio3InputBufferAndPullDownEnable: {
        convertToString: convertToStringFromBoolToOnOffInverted,
        default: true,
        fwKey: 'MAIN.START.GPIO3',
        parser: parseOnOffInverted,
        values: boolValues,
    },
    gpio4InputBufferAndPullDownEnable: {
        convertToString: convertToStringFromBoolToOnOffInverted,
        default: true,
        fwKey: 'MAIN.START.GPIO4',
        parser: parseOnOffInverted,
        values: boolValues,
    },
    gpio4PinResetEnable: {
        convertToString: convertToStringGpio4PinResetEnable,
        default: false,
        fwKey: 'GPIO.RESET.GPIO4',
        parser: parseGpio4PinResetEnable,
        values: boolValues,
    },
    mainOtpLockState: {
        convertToString: convertToStringDefault,
        default: false,
        fwKey: 'OTP.LOCK.STATE',
        parser: parseOnOff,
        values: boolValues,
    },
    mainOtpLockVersion: {
        convertToString: convertToStringDefault,
        fwKey: 'OTP.LOCK.VERSION',
        parser: parseFloat,
        default: 0,
        values: configMainOtpLockVersionValues,
    },
    regulatorsBuckILimLvl: {
        convertToString: convertToStringDefault,
        default: 'Factory',
        fwKey: 'BUCK.ILIM.LVL',
        parser: parseRegulatorsBuckILimLvl,
        values: configRegulatorsBuckILimLvlKeys,
    },
    regulatorsBuckPowerModeControl: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'BUCK.VSET.PWRMODE',
        parser: parseRegulatorsBuckPowerModeControl,
        values: configRegulatorsBuckPowerModeControlKeys,
    },
    regulatorsBuckStartupILimLvl: {
        convertToString: convertToStringDefault,
        default: 'Factory',
        fwKey: 'BUCK.ILIM.STARTLVL',
        parser: parseRegulatorsBuckStartupILimLvl,
        values: configRegulatorsBuckStartupILimLvlKeys,
    },
    regulatorsBuckVOutComparatorBiasCurrentLPMode: {
        convertToString: convertToStringDefault,
        default: 'Factory',
        fwKey: 'BUCK.BIAS.LP',
        parser: parseRegulatorsBuckVOutCompBiasLPMode,
        values: configRegulatorsBuckVOutCompBiasLPModeKeys,
    },
    regulatorsBuckVOutComparatorBiasCurrentULPMode: {
        convertToString: convertToStringDefault,
        default: 'Factory',
        fwKey: 'BUCK.BIAS.ULP',
        parser: parseRegulatorsBuckVOutCompBiasULPMode,
        values: configRegulatorsBuckVOutCompBiasULPModeKeys,
    },
    regulatorsBuckVOutLvl: {
        convertToString: convertToStringDefault,
        default: 1.0,
        fwKey: 'BUCK.VOUT.LVL',
        parser: parseFloat,
        values: configRegulatorsBuckVOutLvlValues,
    },
    regulatorsBuckVOutSel: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'BUCK.VSET.SEL',
        parser: parseRegulatorsBuckVOutSel,
        values: configRegulatorsBuckVOutSelKeys,
    },
    sysFeatBootMonEnable: {
        convertToString: convertToStringDefault,
        default: false,
        fwKey: 'RESET.CONFIG.BOOTMON',
        parser: parseOnOff,
        values: boolValues,
    },
    sysFeatHibernateWakeupByButtonEnable: {
        convertToString: convertToStringFromBoolToOnOffInverted,
        default: true,
        fwKey: 'RESET.SHPHLD.WAKEUP',
        parser: parseOnOffInverted,
        values: boolValues,
    },
    sysFeatLongPressResetDebounce: {
        convertToString: convertToStringDefault,
        default: '10s',
        fwKey: 'RESET.LONGPRESS.DEBOUNCE',
        parser: parseSysFeatLongPressResetDebounce,
        values: configSysFeatLongPressResetDebounceKeys,
    },
    sysFeatLongPressResetPinSel: {
        convertToString: convertToStringDefault,
        default: 'Shphld',
        fwKey: 'RESET.LONGPRESS.PINSEL',
        parser: parseSysFeatLongPressResetPinSel,
        values: configSysFeatLongPressResetPinSelKeys,
    },
    sysFeatPGPinSel: {
        convertToString: convertToStringDefault,
        default: 'VbusGood',
        fwKey: 'MAIN.PGPIN.SEL',
        parser: parseSysFeatPGPinSel,
        values: configSysFeatPGPinSelKeys,
    },
    sysFeatPwrWait: {
        convertToString: convertToStringDefault,
        default: '350ms',
        fwKey: 'RESET.CONFIG.TPWRDN',
        parser: parseSysFeatPwrWait,
        values: configSysFeatPwrWaitKeys,
    },
    sysFeatShipVBusFilt: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'RESET.SHIP.SHIPVBUSFILT',
        parser: parseSysFeatShipVBusFilt,
        values: configSysFeatShipVBusFiltKeys,
    },
    sysFeatShipVBusFiltTime: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'RESET.SHIP.SHIPVBUSFILTSEL',
        parser: parseSysFeatShipVBusFiltTime,
        values: configSysFeatShipVBusFiltTimeKeys,
    },
    sysFeatShpHldDebounce: {
        convertToString: convertToStringDefault,
        default: '50ms',
        fwKey: 'RESET.SHPHLD.DEBOUNCE',
        parser: parseSysFeatShpHldDebounce,
        values: configSysFeatShpHldDebounceKeys,
    },
    sysFeatShpHldDebounceEnable: {
        convertToString: convertToStringFromBoolToOnOffInverted,
        default: true,
        fwKey: 'RESET.SHPHLD.DEBOUNCESEL',
        parser: parseOnOffInverted,
        values: boolValues,
    },
    sysFeatShpHldSlideSwitchPollTime: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'RESET.SHPHLD.POLLTIME',
        parser: parseSysFeatShpHldSlideSwitchPollTime,
        values: configSysFeatShpHldSlideSwitchPollTimeKeys,
    },
    sysFeatShpHldSlider: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'RESET.SHPHLD.SLIDER',
        parser: parseSysFeatShpHldSlider,
        values: configSysFeatShpHldSliderKeys,
    },
    sysFeatShpHldType: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'RESET.SHPHLD.TYPE',
        parser: parseSysFeatShpHldType,
        values: configSysFeatShpHldTypeKeys,
    },
    sysFeatTwiTargetId0Addr: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'MAIN.TWITARGETID.LSB0',
        parser: parseSysFeatTwiTargetId0Addr,
        values: configSysFeatTwiTargetId0AddrKeys,
    },
    sysFeatTwiTargetId1Addr: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'MAIN.TWITARGETID.LSB1',
        parser: parseSysFeatTwiTargetId1Addr,
        values: configSysFeatTwiTargetId1AddrKeys,
    },
    sysFeatVBusDpmEnable: {
        convertToString: convertToStringDefault,
        default: false,
        fwKey: 'SYSREG.VBUSDPM.ENABLE',
        parser: parseOnOff,
        values: boolValues,
    },
    sysFeatVBusDpmLvl: {
        convertToString: convertToStringDefault,
        default: '4.4V',
        fwKey: 'SYSREG.VBUSDPM.LVL',
        parser: parseSysFeatVBusDpmLvl,
        values: configSysFeatVBusDpmLvlKeys,
    },
    sysFeatVBusILim0And1GndSel: {
        convertToString: convertToStringDefault,
        default: 'Default',
        fwKey: 'SYSREG.VBUSILIMCONFIG.PINGND',
        parser: parseSysFeatVBusILim0And1GndSel,
        values: configSysFeatVBusILim0And1GndSelKeys,
    },
    sysFeatVBusILim0And1PinMap: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'SYSREG.VBUSILIMCONFIG.PINMAP',
        parser: parseSysFeatVBusILim0And1PinMap,
        values: configSysFeatVBusILim0And1PinMapKeys,
    },
    sysFeatVBusILimControl: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'SYSREG.VBUSILIMCONFIG.ENABLE',
        parser: parseSysFeatVBusILimControl,
        values: configSysFeatVBusILimControlKeys,
    },
    sysFeatVBusILimLvl: {
        convertToString: convertToStringDefault,
        default: '45mA',
        fwKey: 'SYSREG.VBUSILIMINIT.LVL',
        parser: parseSysFeatVBusILimLvl,
        values: configSysFeatVBusILimLvlKeys,
    },
    sysFeatVBusStandbyMode: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'RESET.STANDBYSEL.STANDBYSEL',
        parser: parseSysFeatVBusStandbySel,
        values: configSysFeatVBusStandbySelKeys,
    },
};

export const configKeys = Object.keys(defaultProperties) as ConfigKey[];
export const configKeysWithFwSupport = configKeys.filter(
    key => defaultProperties[key].fwKey.length !== 0,
);

type ConfigTestValues = {
    [K in ConfigKey]: {
        values: readonly { input: string; output: Config[K] }[];
    };
};

const onOffBoolTestValues = [
    { input: 'ON', output: true },
    { input: 'OFF', output: false },
] as const;
const onOffTestValues = [
    { input: 'ON', output: 'on' },
    { input: 'OFF', output: 'off' },
] as const;

const iChgTestValues = [{ input: '10.5', output: 10.5 }] as const;
const vTermTestValues = [
    {
        input: configChargerVTermLvlRange.min.toString(),
        output: configChargerVTermLvlRange.min,
    },
    {
        input: configChargerVTermLvlRange.max.toString(),
        output: configChargerVTermLvlRange.max,
    },
] as const;

export const configTestValues: ConfigTestValues = {
    chargerChgEnPinSafetyTimersResetEnable: { values: onOffBoolTestValues },
    chargerDropoutRecovery: { values: onOffTestValues },
    chargerEnable: { values: onOffBoolTestValues },
    chargerIBatLimLvl: { values: onOffTestValues },
    chargerIChgCoolLvl: { values: iChgTestValues },
    chargerIChgDouble: { values: onOffBoolTestValues },
    chargerIChgLvl: { values: iChgTestValues },
    chargerIChgWarmLvl: { values: iChgTestValues },
    chargerITermLvl: { values: [{ input: '3.125%', output: '3.125%' }] },
    chargerITrickleLvl: { values: [{ input: '3.125%', output: '3.125%' }] },
    chargerSoftstartCurrent: { values: [{ input: '80mA', output: '80mA' }] },
    chargerStartupMode: { values: onOffTestValues },
    chargerJeitaEnable: { values: onOffBoolTestValues },
    chargerVBatLowChgEnable: { values: onOffBoolTestValues },
    chargerVBatLowLvl: { values: onOffTestValues },
    chargerVTermCoolLvl: { values: vTermTestValues },
    chargerVTermLvl: { values: vTermTestValues },
    chargerVTermWarmLvl: { values: vTermTestValues },
    chargerVTrickleLvl: { values: [{ input: '2.7V', output: '2.7V' }] },
    chargerVWeakLvl: { values: [{ input: '2.7V', output: 2.7 }] },
    chargerWeakChgEnable: { values: onOffBoolTestValues },
    gpio0InputBufferAndPullDownEnable: { values: onOffBoolTestValues },
    gpio1InputBufferAndPullDownEnable: { values: onOffBoolTestValues },
    gpio2InputBufferAndPullDownEnable: { values: onOffBoolTestValues },
    gpio3InputBufferAndPullDownEnable: { values: onOffBoolTestValues },
    gpio4InputBufferAndPullDownEnable: { values: onOffBoolTestValues },
    gpio4PinResetEnable: { values: onOffBoolTestValues },
    mainOtpLockState: { values: onOffBoolTestValues },
    mainOtpLockVersion: { values: [{ input: '2', output: 2 }] },
    regulatorsBuckILimLvl: { values: [{ input: '120mA', output: '120mA' }] },
    regulatorsBuckPowerModeControl: {
        values: [{ input: 'on', output: 'on' }],
    },
    regulatorsBuckStartupILimLvl: {
        values: [{ input: '120mA', output: '120mA' }],
    },
    regulatorsBuckVOutComparatorBiasCurrentLPMode: {
        values: [{ input: '1.3uA', output: '1.3uA' }],
    },
    regulatorsBuckVOutComparatorBiasCurrentULPMode: {
        values: [{ input: '50nA', output: '50nA' }],
    },
    regulatorsBuckVOutLvl: { values: [{ input: '1.05V', output: 1.05 }] },
    regulatorsBuckVOutSel: {
        values: onOffTestValues,
    },
    sysFeatBootMonEnable: { values: onOffBoolTestValues },
    sysFeatHibernateWakeupByButtonEnable: { values: onOffBoolTestValues },
    sysFeatLongPressResetDebounce: { values: [{ input: '5s', output: '5s' }] },
    sysFeatLongPressResetPinSel: {
        values: [{ input: 'Gpio', output: 'Gpio' }],
    },
    sysFeatPGPinSel: { values: [{ input: 'Low', output: 'Low' }] },
    sysFeatPwrWait: { values: [{ input: '150ms', output: '150ms' }] },
    sysFeatShipVBusFilt: {
        values: onOffTestValues,
    },
    sysFeatShipVBusFiltTime: {
        values: onOffTestValues,
    },
    sysFeatShpHldDebounce: {
        values: [{ input: '500ms', output: '500ms' }],
    },
    sysFeatShpHldSlideSwitchPollTime: {
        values: onOffTestValues,
    },
    sysFeatShpHldSlider: {
        values: onOffTestValues,
    },
    sysFeatShpHldType: {
        values: onOffTestValues,
    },
    sysFeatShpHldDebounceEnable: { values: onOffBoolTestValues },
    sysFeatTwiTargetId0Addr: {
        values: [
            { input: 'OFF', output: 'off' },
            { input: 'ON', output: 'on' },
        ],
    },
    sysFeatTwiTargetId1Addr: {
        values: [
            { input: 'OFF', output: 'off' },
            { input: 'ON', output: 'on' },
        ],
    },
    sysFeatVBusDpmEnable: { values: onOffBoolTestValues },
    sysFeatVBusDpmLvl: { values: [{ input: '4.5V', output: '4.5V' }] },
    sysFeatVBusILim0And1GndSel: {
        values: [{ input: '100mA', output: '100mA' }],
    },
    sysFeatVBusILim0And1PinMap: {
        values: onOffTestValues,
    },
    sysFeatVBusILimControl: {
        values: onOffTestValues,
    },
    sysFeatVBusILimLvl: { values: [{ input: '10mA', output: '10mA' }] },
    sysFeatVBusStandbyMode: {
        values: [{ input: 'on', output: 'on' }],
    },
} as const;

type UicrBits = {
    [K in ConfigKey]: {
        bitOffset: number;
        numBits: number;
        values: Config[K][] | undefined; // when undefined, special handling needed in actions.configureAndExport() to find the corresponding register value
    };
};

export const uicrBits: UicrBits = {
    chargerChgEnPinSafetyTimersResetEnable: {
        bitOffset: 87,
        numBits: 1,
        values: [false, true],
    },
    chargerEnable: { bitOffset: 22, numBits: 1, values: [false, true] },
    chargerDropoutRecovery: {
        bitOffset: 90,
        numBits: 1,
        values: configChargerDropoutRecoveryKeys,
    },
    chargerIBatLimLvl: {
        bitOffset: 88,
        numBits: 1,
        values: configChargerIBatLimLvlKeys,
    },
    chargerIChgCoolLvl: { bitOffset: 46, numBits: 8, values: undefined },
    chargerIChgDouble: { bitOffset: 29, numBits: 1, values: [false, true] },
    chargerIChgLvl: { bitOffset: 30, numBits: 8, values: undefined },
    chargerIChgWarmLvl: { bitOffset: 38, numBits: 8, values: undefined },
    chargerITermLvl: {
        bitOffset: 54,
        numBits: 3,
        values: configChargerITermLvlKeys,
    },
    chargerITrickleLvl: {
        bitOffset: 57,
        numBits: 3,
        values: configChargerITrickleLvlKeys,
    },
    chargerJeitaEnable: { bitOffset: 23, numBits: 1, values: [false, true] },
    chargerSoftstartCurrent: {
        bitOffset: 91,
        numBits: 2,
        values: configChargerSoftstartCurrentKeys,
    },
    chargerStartupMode: {
        bitOffset: 89,
        numBits: 1,
        values: configChargerStartupModeKeys,
    },
    chargerVBatLowChgEnable: {
        bitOffset: 24,
        numBits: 1,
        values: [true, false],
    },
    chargerVBatLowLvl: {
        bitOffset: 25,
        numBits: 1,
        values: configChargerVBatLowLvlKeys,
    },
    chargerVTermCoolLvl: {
        bitOffset: 74,
        numBits: 7,
        values: configChargerVTermLvlValues,
    },
    chargerVTermLvl: {
        bitOffset: 60,
        numBits: 7,
        values: configChargerVTermLvlValues,
    },
    chargerVTermWarmLvl: {
        bitOffset: 67,
        numBits: 7,
        values: configChargerVTermLvlValues,
    },
    chargerVTrickleLvl: {
        bitOffset: 81,
        numBits: 2,
        values: configChargerVTrickleLvlKeys,
    },
    chargerVWeakLvl: {
        bitOffset: 83,
        numBits: 4,
        values: configChargerVWeakLvlValues,
    },
    chargerWeakChgEnable: { bitOffset: 26, numBits: 1, values: [false, true] },
    gpio0InputBufferAndPullDownEnable: {
        bitOffset: 5,
        numBits: 1,
        values: [true, false],
    },
    gpio1InputBufferAndPullDownEnable: {
        bitOffset: 6,
        numBits: 1,
        values: [true, false],
    },
    gpio2InputBufferAndPullDownEnable: {
        bitOffset: 7,
        numBits: 1,
        values: [true, false],
    },
    gpio3InputBufferAndPullDownEnable: {
        bitOffset: 8,
        numBits: 1,
        values: [true, false],
    },
    gpio4InputBufferAndPullDownEnable: {
        bitOffset: 9,
        numBits: 1,
        values: [true, false],
    },
    gpio4PinResetEnable: {
        bitOffset: 93,
        numBits: 8,
        values: undefined,
    },
    mainOtpLockState: { bitOffset: 141, numBits: 1, values: [false, true] },
    mainOtpLockVersion: {
        bitOffset: 142,
        numBits: 7,
        values: configMainOtpLockVersionValues,
    },
    regulatorsBuckILimLvl: {
        bitOffset: 126,
        numBits: 3,
        values: configRegulatorsBuckILimLvlKeys,
    },
    regulatorsBuckPowerModeControl: {
        bitOffset: 119,
        numBits: 1,
        values: configRegulatorsBuckPowerModeControlKeys,
    },
    regulatorsBuckStartupILimLvl: {
        bitOffset: 129,
        numBits: 3,
        values: configRegulatorsBuckStartupILimLvlKeys,
    },
    regulatorsBuckVOutComparatorBiasCurrentLPMode: {
        bitOffset: 132,
        numBits: 2,
        values: configRegulatorsBuckVOutCompBiasLPModeKeys,
    },
    regulatorsBuckVOutComparatorBiasCurrentULPMode: {
        bitOffset: 134,
        numBits: 2,
        values: configRegulatorsBuckVOutCompBiasULPModeKeys,
    },
    regulatorsBuckVOutLvl: { bitOffset: 120, numBits: 6, values: undefined },
    regulatorsBuckVOutSel: {
        bitOffset: 118,
        numBits: 1,
        values: configRegulatorsBuckVOutSelKeys,
    },
    sysFeatBootMonEnable: { bitOffset: 101, numBits: 1, values: [false, true] },
    sysFeatHibernateWakeupByButtonEnable: {
        bitOffset: 111,
        numBits: 1,
        values: [true, false],
    },
    sysFeatLongPressResetDebounce: {
        bitOffset: 106,
        numBits: 2,
        values: configSysFeatLongPressResetDebounceKeys,
    },
    sysFeatLongPressResetPinSel: {
        bitOffset: 104,
        numBits: 2,
        values: configSysFeatLongPressResetPinSelKeys,
    },
    sysFeatPGPinSel: {
        bitOffset: 10,
        numBits: 2,
        values: configSysFeatPGPinSelKeys,
    },
    sysFeatPwrWait: {
        bitOffset: 102,
        numBits: 2,
        values: configSysFeatPwrWaitKeys,
    },
    sysFeatShipVBusFilt: {
        bitOffset: 115,
        numBits: 1,
        values: configSysFeatShipVBusFiltKeys,
    },
    sysFeatShipVBusFiltTime: {
        bitOffset: 116,
        numBits: 1,
        values: configSysFeatShipVBusFiltTimeKeys,
    },
    sysFeatShpHldDebounce: {
        bitOffset: 109,
        numBits: 2,
        values: configSysFeatShpHldDebounceKeys,
    },
    sysFeatShpHldDebounceEnable: {
        bitOffset: 108,
        numBits: 1,
        values: [true, false],
    },
    sysFeatShpHldSlideSwitchPollTime: {
        bitOffset: 114,
        numBits: 1,
        values: configSysFeatShpHldSlideSwitchPollTimeKeys,
    },
    sysFeatShpHldSlider: {
        bitOffset: 113,
        numBits: 1,
        values: configSysFeatShpHldSliderKeys,
    },
    sysFeatShpHldType: {
        bitOffset: 112,
        numBits: 1,
        values: configSysFeatShpHldTypeKeys,
    },
    sysFeatTwiTargetId0Addr: {
        bitOffset: 0,
        numBits: 1,
        values: configSysFeatTwiTargetId0AddrKeys,
    },
    sysFeatTwiTargetId1Addr: {
        bitOffset: 1,
        numBits: 1,
        values: configSysFeatTwiTargetId1AddrKeys,
    },
    sysFeatVBusDpmEnable: {
        bitOffset: 19,
        numBits: 1,
        values: [false, true],
    },
    sysFeatVBusDpmLvl: {
        bitOffset: 20,
        numBits: 2,
        values: configSysFeatVBusDpmLvlKeys,
    },
    sysFeatVBusILim0And1GndSel: {
        bitOffset: 17,
        numBits: 2,
        values: configSysFeatVBusILim0And1GndSelKeys,
    },
    sysFeatVBusILim0And1PinMap: {
        bitOffset: 16,
        numBits: 1,
        values: configSysFeatVBusILim0And1PinMapKeys,
    },
    sysFeatVBusILimControl: {
        bitOffset: 15,
        numBits: 1,
        values: configSysFeatVBusILimControlKeys,
    },
    sysFeatVBusILimLvl: {
        bitOffset: 12,
        numBits: 3,
        values: configSysFeatVBusILimLvlKeys,
    },
    sysFeatVBusStandbyMode: {
        bitOffset: 117,
        numBits: 1,
        values: configSysFeatVBusStandbySelKeys,
    },
};
