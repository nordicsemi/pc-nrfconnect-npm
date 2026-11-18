/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { getRange } from '../../../../../utils/helpers';

export const batterySizeRange = {
    decimals: 0,
    max: 3000,
    min: 4, // mAh
    step: 1,
} as const;

export const iChgRangeMax128mA = {
    decimals: 1,
    max: 128,
    min: 0.5,
    step: 0.5,
} as const;
export const iChgRangeMax256mA = {
    decimals: 0,
    max: 256,
    min: 1,
    step: 1,
} as const;
export const iChgValuesMax128mA = getRange([iChgRangeMax128mA]);
export const iChgValuesMax256mA = getRange([iChgRangeMax256mA]);
export const iChgValuesAll = getRange([
    {
        decimals: 1,
        max: 128,
        min: 0.5,
        step: 0.5,
    },
    {
        decimals: 0,
        max: 256,
        min: 129,
        step: 1,
    },
]);

export const iTermLvlKV = [
    ['0.78%', '0.78 %'],
    ['1.56%', '1.56 %'],
    ['3.125%', '3.125 %'],
    ['6.25%', '6.25 %'],
    ['12.5%', '12.5 %'],
    ['25%', '25 %'],
    ['50%', '50 %'],
    ['100%', '100 %'],
] as const;
export const iTermLvlKeys = iTermLvlKV.map(kv => kv[0]);
export const iTermLvlValues = iTermLvlKV.map(kv => kv[1]);
export type ITermLvl = (typeof iTermLvlKeys)[number];

export const iThrottleLvlRange = {
    decimals: 1,
    max: 87.5,
    min: 12.5, // % of IChg
    step: 12.5,
} as const;
export const iThrottleLvlValues = getRange([iThrottleLvlRange]);

export const iTrickleLvlKV = iTermLvlKV;
export const iTrickleLvlKeys = iTermLvlKeys;
export const iTrickleLvlValues = iTermLvlValues;
export type ITrickleLvl = (typeof iTrickleLvlKeys)[number];

export const jeitaRange = {
    decimals: 0,
    max: 60,
    min: -20, // celcius
    step: 1,
} as const;

export const tChgLvlRange = {
    decimals: 0,
    max: 110,
    min: 50, // celcius
    step: 1,
} as const;
export const tChgLvlValues = getRange([tChgLvlRange]);

export const tOutChargeLvlRange = {
    decimals: 0,
    max: 10,
    min: 1, // hours
    step: 1,
} as const;
export const tOutChargeLvlValues = getRange([tOutChargeLvlRange]);

export const tOutTrickleLvlRange = {
    decimals: 0,
    max: 120,
    min: 10, // minutes
    step: 10,
} as const;
export const tOutTrickleLvlValues = getRange([tOutTrickleLvlRange]);

export const vBatLowLvlKV = [
    ['1.1V', '1.1 V'],
    ['2.1V', '2.1 V'],
] as const;
export const vBatLowLvlKeys = vBatLowLvlKV.map(kv => kv[0]);
export const vBatLowLvlValues = vBatLowLvlKV.map(kv => kv[1]);
export type VBatLowLvl = (typeof vBatLowLvlKeys)[number];

export const vLowerCutOffLvlRange = {
    decimals: 2,
    max: 3.6,
    min: 2.7, // V
    step: 0.05,
} as const;
export const vLowerCutOffLvlValues = getRange([vLowerCutOffLvlRange]);

export const vTermLvlRange = {
    decimals: 2,
    max: 4.65,
    min: 3.5, // V
    step: 0.01,
} as const;
export const vTermLvlValues = getRange([vTermLvlRange]);

export const vThrottleLvlRange = {
    decimals: 0,
    max: 400,
    min: 25, // mV
    step: 25,
} as const;
export const vThrottleLvlValues = getRange([vThrottleLvlRange]);

export const vTrickleLvlKV = [
    ['2.9', '2.9 V'],
    ['2.5', '2.5 V'],
    ['2.7', '2.7 V'],
    ['3.1', '3.1 V'],
] as const;
export const vTrickleLvlKeys = vTrickleLvlKV.map(kv => kv[0]);
export const vTrickleLvlValues = vTrickleLvlKV.map(kv => kv[1]);
export type VTrickleLvl = (typeof vTrickleLvlKeys)[number];

export const vWeakLvlRange = {
    decimals: 1,
    max: 4.0,
    min: 2.5, // V
    step: 0.1,
} as const;
export const vWeakLvlValues = getRange([vWeakLvlRange]);

export const iChgLvlCurrentToInteger = (
    iChg: number,
    iChgDouble: boolean,
): number | undefined => {
    const index = iChgDouble
        ? iChgValuesMax256mA.findIndex(v => v === iChg)
        : iChgValuesMax128mA.findIndex(v => v === iChg);
    return index >= 0 ? index : undefined;
};

type DefaultValues = {
    iChg: number;
    iChgCool: number;
    iChgDouble: boolean;
    iChgWarm: number;
    iTermLvl: ITermLvl;
    iThrottleLvl: number;
    iTrickleLvl: ITrickleLvl;
    tChgReduce: number;
    tChgResume: number;
    tCold: number;
    tCool: number;
    tHot: number;
    tOutCharge: number;
    tOutTrickle: number;
    tWarm: number;
    vBatLowLvl: VBatLowLvl;
    vTermLvl: number;
    vTermCoolLvl: number;
    vTermWarmLvl: number;
    vThrottleLvl: number;
    vTrickleLvl: VTrickleLvl;
    vWeakLvl: number;
};

export const defaultValues: DefaultValues = {
    iChg: iChgValuesAll[0],
    iChgCool: iChgValuesAll[0],
    iChgDouble: false,
    iChgWarm: iChgValuesAll[0],
    iTermLvl: '12.5%',
    iThrottleLvl: iThrottleLvlRange.min,
    iTrickleLvl: '12.5%',
    tChgReduce: 110,
    tChgResume: 100,
    tCold: 0,
    tCool: 10,
    tHot: 60,
    tOutCharge: tOutChargeLvlRange.min,
    tOutTrickle: tOutTrickleLvlRange.min,
    tWarm: 45,
    vBatLowLvl: '2.1V',
    vTermLvl: vTermLvlValues[0],
    vTermCoolLvl: vTermLvlValues[0],
    vTermWarmLvl: vTermLvlValues[0],
    vThrottleLvl: vThrottleLvlRange.min,
    vTrickleLvl: '2.9',
    vWeakLvl: vWeakLvlRange.min,
};
