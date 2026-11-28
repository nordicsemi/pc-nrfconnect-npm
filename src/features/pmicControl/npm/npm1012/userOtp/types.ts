/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { getRange } from '../../../../../utils/helpers';

export const configCommand = 'npm1012 uicr configuration';
export const lockCommand = 'npm1012 uicr configuration state';
export const programCommand = 'npm1012 uicr program';

const configChargerIChgRangeMax128mA = {
    min: 0.5,
    max: 128,
    step: 0.5,
    decimals: 1,
} as const;
const configChargerIChgRangeMax256mA = {
    min: 1,
    max: 256,
    step: 1,
    decimals: 0,
} as const;
const configChargerIChgValuesMax128mA = getRange([
    configChargerIChgRangeMax128mA,
]);
const configChargerIChgValuesMax256mA = getRange([
    configChargerIChgRangeMax256mA,
]);
export const configChargerIChgValuesAll = getRange([
    {
        min: 0.5,
        max: 128,
        step: 0.5,
        decimals: 1,
    },
    {
        min: 129,
        max: 256,
        step: 1,
        decimals: 0,
    },
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
    ['2.9 V', '2.9 V'],
    ['2.5 V', '2.5 V'],
    ['2.7 V', '2.7 V'],
    ['3.1 V', '3.1 V'],
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

export const configRegulatorsColdStartSelKV = [
    ['Buck', 'BUCK'],
    ['None', 'VSYS'],
    ['Ldosw', 'LDO1'],
    ['Both', 'BUCK and LDO1'],
] as const;
const configRegulatorsColdStartSelKeys = configRegulatorsColdStartSelKV.map(
    kv => kv[0],
);
export type ConfigRegulatorsColdStartSel =
    (typeof configRegulatorsColdStartSelKeys)[number];

export const configRegulatorsLdoSoftStartILimLvlKV = [
    ['20mA/25mA', '20mA / 25mA'],
    ['30mA/40mA', '30mA / 40mA'],
    ['50mA/60mA', '50mA / 60mA'],
    ['80mA/100mA', '80mA / 100mA'],
] as const;
const configRegulatorsLdoSoftStartILimLvlKeys =
    configRegulatorsLdoSoftStartILimLvlKV.map(kv => kv[0]);
export type ConfigRegulatorsLdoSoftStartILimLvl =
    (typeof configRegulatorsLdoSoftStartILimLvlKeys)[number];

export const configRegulatorsLdoSoftStartTimeKV = [
    ['20.5ms', '20.5 ms'],
    ['4.5ms', '4.5 ms'],
    ['7.5ms', '7.5 ms'],
    ['10.5ms', '10.5 ms'],
] as const;
const configRegulatorsLdoSoftStartTimeKeys =
    configRegulatorsLdoSoftStartTimeKV.map(kv => kv[0]);
export type ConfigRegulatorsLdoSoftStartTime =
    (typeof configRegulatorsLdoSoftStartTimeKeys)[number];

export const configRegulatorsLdoVOutSelKV = [
    ['off', 'VSET'],
    ['on', 'Software'],
] as const;
const configRegulatorsLdoVOutSelKeys = configRegulatorsLdoVOutSelKV.map(
    kv => kv[0],
);
export type ConfigRegulatorsLdoVOutSel =
    (typeof configRegulatorsLdoVOutSelKeys)[number];

export const configSysFeatPwrWaitKV = [
    ['350ms', '350 ms'],
    ['250ms', '250 ms'],
    ['150ms', '150 ms'],
    ['50ms', '50 ms'],
] as const;
const configSysFeatPwrWaitKeys = configSysFeatPwrWaitKV.map(kv => kv[0]);
export type ConfigSysFeatPwrWait = (typeof configSysFeatPwrWaitKeys)[number];

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

export const configSysFeatTwiSlaveAddressKV = [
    ['off', '0x6A'],
    ['on', '0x6B'],
] as const;
const configSysFeatTwiSlaveAddressKeys = configSysFeatTwiSlaveAddressKV.map(
    kv => kv[0],
);
export type ConfigSysFeatTwiSlaveAddress =
    (typeof configSysFeatTwiSlaveAddressKeys)[number];

export const configSysFeatVBusILimLvlKV = [
    ['100mA', '100 mA'],
    ['10mA', '10 mA'],
    ['225mA', '225 mA'],
    ['300mA', '300 mA'],
] as const;
const configSysFeatVBusILimLvlKeys = configSysFeatVBusILimLvlKV.map(
    kv => kv[0],
);
export type ConfigSysFeatVBusILimLvl =
    (typeof configSysFeatVBusILimLvlKeys)[number];

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

export const isIChgLvlKey = (key: ConfigKey) =>
    key === 'chargerIChgLvl' ||
    key === 'chargerIChgCoolLvl' ||
    key === 'chargerIChgWarmLvl';

export const iChgLvlCurrentToInteger = (
    iChg: number,
    iChgDouble: boolean,
): number | undefined => {
    const index = iChgDouble
        ? configChargerIChgValuesMax256mA.findIndex(v => v === iChg)
        : configChargerIChgValuesMax128mA.findIndex(v => v === iChg);
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
    const current = iChgDouble ? iChgInt + 1 : iChgInt * 0.5 + 0.5;
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
const parseRegulatorsBuckVOutSel = (msg: string) =>
    configRegulatorsBuckVOutSelKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseRegulatorsColdStartSel = (msg: string) =>
    configRegulatorsColdStartSelKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );

const parseRegulatorsLdoSoftStartILimLvl = (msg: string) =>
    configRegulatorsLdoSoftStartILimLvlKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseRegulatorsLdoSoftStartTime = (msg: string) =>
    configRegulatorsLdoSoftStartTimeKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseRegulatorsLdoVOutSel = (msg: string) =>
    configRegulatorsLdoVOutSelKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatPwrWait = (msg: string) =>
    configSysFeatPwrWaitKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatShpHldDebounce = (msg: string) =>
    configSysFeatShpHldDebounceKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatTwiSlaveAddress = (msg: string) =>
    configSysFeatTwiSlaveAddressKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );
const parseSysFeatVBusILimLvl = (msg: string) =>
    configSysFeatVBusILimLvlKeys.find(
        v => v.toLowerCase() === parseValueFromMessage(msg)?.toLowerCase(),
    );

export type Config = {
    chargerEnable: boolean;
    chargerIChgCoolLvl: number;
    chargerIChgDouble: boolean;
    chargerIChgLvl: number;
    chargerIChgWarmLvl: number;
    chargerITermLvl: ConfigChargerITermLvl;
    chargerITrickleLvl: ConfigChargerITrickleLvl;
    chargerJeitaEnable: boolean;
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
    mainOtpLockState: boolean;
    mainOtpLockVersion: number;
    regulatorsBuckVOutLvl: number;
    regulatorsBuckVOutSel: ConfigRegulatorsBuckVOutSel;
    regulatorsColdStartSel: ConfigRegulatorsColdStartSel;
    regulatorsLdoSoftStartILimLvl: ConfigRegulatorsLdoSoftStartILimLvl;
    regulatorsLdoSoftStartTime: ConfigRegulatorsLdoSoftStartTime;
    regulatorsLdoVOutSel: ConfigRegulatorsLdoVOutSel;
    sysFeatBootMonEnable: boolean;
    sysFeatPwrWait: ConfigSysFeatPwrWait;
    sysFeatShpHldDebounce: ConfigSysFeatShpHldDebounce;
    sysFeatShpHldDebounceEnable: boolean;
    sysFeatHibernateWakeupByButtonEnable: boolean;
    sysFeatTwiSlaveAddress: ConfigSysFeatTwiSlaveAddress;
    sysFeatVBusILimLvl: ConfigSysFeatVBusILimLvl;
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
    chargerEnable: {
        convertToString: convertToStringDefault,
        default: false,
        fwKey: 'CHARGER.ENABLE.CHARGE',
        parser: parseOnOff,
        values: boolValues,
    },
    chargerIChgCoolLvl: {
        convertToString: convertToStringDefault,
        default: 0.5,
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
        default: 0.5,
        fwKey: 'CHARGER.ISET.LVL',
        parser: parseFloat,
        values: configChargerIChgValuesAll,
    },
    chargerIChgWarmLvl: {
        convertToString: convertToStringDefault,
        default: 0.5,
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
        default: '2.9 V',
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
    regulatorsColdStartSel: {
        convertToString: convertToStringDefault,
        default: 'Buck',
        fwKey: 'MAIN.START.SEL',
        parser: parseRegulatorsColdStartSel,
        values: configRegulatorsColdStartSelKeys,
    },
    regulatorsLdoSoftStartILimLvl: {
        convertToString: convertToStringDefault,
        default: '20mA/25mA',
        fwKey: 'LDOSW.CONFIG0.ILIMLVL',
        parser: parseRegulatorsLdoSoftStartILimLvl,
        values: configRegulatorsLdoSoftStartILimLvlKeys,
    },
    regulatorsLdoSoftStartTime: {
        convertToString: convertToStringDefault,
        default: '20.5ms',
        fwKey: 'LDOSW.CONFIG0.SOFTSTARTTIME',
        parser: parseRegulatorsLdoSoftStartTime,
        values: configRegulatorsLdoSoftStartTimeKeys,
    },
    regulatorsLdoVOutSel: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'LDOSW.CONFIG0.SEL',
        parser: parseRegulatorsLdoVOutSel,
        values: configRegulatorsLdoVOutSelKeys,
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
    sysFeatPwrWait: {
        convertToString: convertToStringDefault,
        default: '350ms',
        fwKey: 'RESET.CONFIG.TPWRDN',
        parser: parseSysFeatPwrWait,
        values: configSysFeatPwrWaitKeys,
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
    sysFeatTwiSlaveAddress: {
        convertToString: convertToStringDefault,
        default: 'off',
        fwKey: 'MAIN.TWITARGETID.LSB',
        parser: parseSysFeatTwiSlaveAddress,
        values: configSysFeatTwiSlaveAddressKeys,
    },
    sysFeatVBusILimLvl: {
        convertToString: convertToStringDefault,
        default: '100mA',
        fwKey: 'SYSREG.VBUSILIM.LVL',
        parser: parseSysFeatVBusILimLvl,
        values: configSysFeatVBusILimLvlKeys,
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

const onOffTestValues = [
    { input: 'ON', output: true },
    { input: 'OFF', output: false },
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
    chargerEnable: { values: onOffTestValues },
    chargerIChgCoolLvl: { values: iChgTestValues },
    chargerIChgLvl: { values: iChgTestValues },
    chargerIChgWarmLvl: { values: iChgTestValues },
    chargerITermLvl: { values: [{ input: '3.125%', output: '3.125%' }] },
    chargerITrickleLvl: { values: [{ input: '3.125%', output: '3.125%' }] },
    chargerJeitaEnable: { values: onOffTestValues },
    chargerVBatLowChgEnable: { values: onOffTestValues },
    chargerVBatLowLvl: { values: [{ input: 'on', output: 'on' }] },
    chargerVTermCoolLvl: { values: vTermTestValues },
    chargerVTermLvl: { values: vTermTestValues },
    chargerVTermWarmLvl: { values: vTermTestValues },
    chargerVTrickleLvl: { values: [{ input: '2.7 V', output: '2.7 V' }] },
    chargerVWeakLvl: { values: [{ input: '2.7V', output: 2.7 }] },
    chargerWeakChgEnable: { values: onOffTestValues },
    gpio0InputBufferAndPullDownEnable: { values: onOffTestValues },
    gpio1InputBufferAndPullDownEnable: { values: onOffTestValues },
    gpio2InputBufferAndPullDownEnable: { values: onOffTestValues },
    mainOtpLockState: { values: onOffTestValues },
    mainOtpLockVersion: { values: [{ input: '2', output: 2 }] },
    regulatorsBuckVOutLvl: { values: [{ input: '1.05V', output: 1.05 }] },
    regulatorsBuckVOutSel: {
        values: [{ input: 'on', output: 'on' }],
    },
    regulatorsColdStartSel: { values: [{ input: 'Ldosw', output: 'Ldosw' }] },
    regulatorsLdoSoftStartILimLvl: {
        values: [{ input: '30mA/40mA', output: '30mA/40mA' }],
    },
    regulatorsLdoSoftStartTime: {
        values: [{ input: '7.5ms', output: '7.5ms' }],
    },
    regulatorsLdoVOutSel: {
        values: [{ input: 'on', output: 'on' }],
    },
    sysFeatBootMonEnable: { values: onOffTestValues },
    sysFeatHibernateWakeupByButtonEnable: { values: onOffTestValues },
    sysFeatPwrWait: { values: [{ input: '150ms', output: '150ms' }] },
    sysFeatShpHldDebounce: {
        values: [{ input: '500ms', output: '500ms' }],
    },
    sysFeatShpHldDebounceEnable: { values: onOffTestValues },
    sysFeatTwiSlaveAddress: {
        values: [
            { input: 'OFF', output: 'off' },
            { input: 'ON', output: 'on' },
        ],
    },
    sysFeatVBusILimLvl: { values: [{ input: '10mA', output: '10mA' }] },

    chargerIChgDouble: { values: [] },
} as const;

type UicrBits = {
    [K in ConfigKey]: {
        bitOffset: number;
        numBits: number;
        values: Config[K][] | undefined;
    };
};

export const uicrBits: UicrBits = {
    chargerEnable: { bitOffset: 8, numBits: 1, values: [false, true] },
    chargerIChgCoolLvl: { bitOffset: 32, numBits: 8, values: undefined },
    chargerIChgDouble: { bitOffset: 15, numBits: 1, values: [false, true] },
    chargerIChgLvl: { bitOffset: 16, numBits: 8, values: undefined },
    chargerIChgWarmLvl: { bitOffset: 24, numBits: 8, values: undefined },
    chargerITermLvl: {
        bitOffset: 40,
        numBits: 3,
        values: configChargerITermLvlKeys,
    },
    chargerITrickleLvl: {
        bitOffset: 43,
        numBits: 3,
        values: configChargerITrickleLvlKeys,
    },
    chargerJeitaEnable: { bitOffset: 9, numBits: 1, values: [false, true] },
    chargerVBatLowChgEnable: {
        bitOffset: 10,
        numBits: 1,
        values: [true, false],
    },
    chargerVBatLowLvl: {
        bitOffset: 11,
        numBits: 1,
        values: configChargerVBatLowLvlKeys,
    },
    chargerVTermCoolLvl: {
        bitOffset: 60,
        numBits: 7,
        values: configChargerVTermLvlValues,
    },
    chargerVTermLvl: {
        bitOffset: 46,
        numBits: 7,
        values: configChargerVTermLvlValues,
    },
    chargerVTermWarmLvl: {
        bitOffset: 53,
        numBits: 7,
        values: configChargerVTermLvlValues,
    },
    chargerVTrickleLvl: {
        bitOffset: 67,
        numBits: 2,
        values: configChargerVTrickleLvlKeys,
    },
    chargerVWeakLvl: {
        bitOffset: 69,
        numBits: 4,
        values: configChargerVWeakLvlValues,
    },
    chargerWeakChgEnable: { bitOffset: 12, numBits: 1, values: [false, true] },
    gpio0InputBufferAndPullDownEnable: {
        bitOffset: 3,
        numBits: 1,
        values: [true, false],
    },
    gpio1InputBufferAndPullDownEnable: {
        bitOffset: 4,
        numBits: 1,
        values: [true, false],
    },
    gpio2InputBufferAndPullDownEnable: {
        bitOffset: 5,
        numBits: 1,
        values: [true, false],
    },
    mainOtpLockState: { bitOffset: 92, numBits: 1, values: [false, true] },
    mainOtpLockVersion: {
        bitOffset: 93,
        numBits: 7,
        values: configMainOtpLockVersionValues,
    },
    regulatorsBuckVOutLvl: { bitOffset: 74, numBits: 6, values: undefined },
    regulatorsBuckVOutSel: {
        bitOffset: 73,
        numBits: 1,
        values: configRegulatorsBuckVOutSelKeys,
    },
    regulatorsColdStartSel: {
        bitOffset: 1,
        numBits: 2,
        values: configRegulatorsColdStartSelKeys,
    },
    regulatorsLdoSoftStartILimLvl: {
        bitOffset: 81,
        numBits: 2,
        values: configRegulatorsLdoSoftStartILimLvlKeys,
    },
    regulatorsLdoSoftStartTime: {
        bitOffset: 83,
        numBits: 2,
        values: configRegulatorsLdoSoftStartTimeKeys,
    },
    regulatorsLdoVOutSel: {
        bitOffset: 80,
        numBits: 2,
        values: configRegulatorsLdoVOutSelKeys,
    },
    sysFeatBootMonEnable: { bitOffset: 85, numBits: 1, values: [false, true] },
    sysFeatHibernateWakeupByButtonEnable: {
        bitOffset: 91,
        numBits: 1,
        values: [true, false],
    },
    sysFeatPwrWait: {
        bitOffset: 86,
        numBits: 2,
        values: configSysFeatPwrWaitKeys,
    },
    sysFeatShpHldDebounce: {
        bitOffset: 89,
        numBits: 2,
        values: configSysFeatShpHldDebounceKeys,
    },
    sysFeatShpHldDebounceEnable: {
        bitOffset: 88,
        numBits: 1,
        values: [true, false],
    },
    sysFeatTwiSlaveAddress: {
        bitOffset: 0,
        numBits: 1,
        values: configSysFeatTwiSlaveAddressKeys,
    },
    sysFeatVBusILimLvl: {
        bitOffset: 6,
        numBits: 2,
        values: configSysFeatVBusILimLvlKeys,
    },
};
