/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

export const alternateVOutControlKV = [
    ['GPIO', 'GPIO'],
    ['OFF', 'Off'],
    ['SOFTWARE', 'Software'],
] as const;
export const alternateVOutControlKeys = alternateVOutControlKV.map(kv => kv[0]);
export const alternateVOutControlValues = alternateVOutControlKV.map(
    kv => kv[1],
);
export type AlternateVOutControl = (typeof alternateVOutControlKeys)[number];

export const iLimFicrLvlKV = [
    ['60mA', 'Factory (60 mA)'],
    ['90mA', 'Factory (90 mA)'],
    ['120mA', 'Factory (120 mA)'],
    ['150mA', 'Factory (150 mA)'],
    ['170mA', 'Factory (170 mA)'],
    ['300mA', 'Factory (300 mA)'],
    ['350mA', 'Factory (350 mA)'],
    ['420mA', 'Factory (420 mA)'],
] as const;
export const iLimFicrLvlKeys = iLimFicrLvlKV.map(kv => kv[0]);
export const iLimFicrLvlValues = iLimFicrLvlKV.map(kv => kv[1]);
export type ILimFicrLvl = (typeof iLimFicrLvlKeys)[number];

export const iLimLvlKV = [
    ['default', 'Factory'],
    ['90mA', '90 mA'],
    ['120mA', '120 mA'],
    ['150mA', '150 mA'],
    ['170mA', '170 mA'],
    ['300mA', '300 mA'],
    ['350mA', '350 mA'],
    ['420mA', '420 mA'],
] as const;
export const iLimLvlKeys = iLimLvlKV.map(kv => kv[0]);
export const iLimLvlValues = iLimLvlKV.map(kv => kv[1]);
export type ILimLvl = (typeof iLimLvlKeys)[number];

export const iLimStartFicrLvlKV = iLimFicrLvlKV;
export const iLimStartFicrLvlKeys = iLimFicrLvlKeys;
export const iLimStartFicrLvlValues = iLimFicrLvlValues;
export type ILimStartFicrLvl = (typeof iLimStartFicrLvlKeys)[number];

export const iLimStartLvlKV = iLimLvlKV;
export const iLimStartLvlKeys = iLimLvlKeys;
export const iLimStartLvlValues = iLimLvlValues;
export type ILimStartLvl = (typeof iLimStartLvlKeys)[number];

export const modeControlKV = [
    ['GPIO', 'GPIO'],
    ['LP', 'LP'],
    ['ULP', 'ULP'],
] as const;
export const modeControlKeys = modeControlKV.map(kv => kv[0]);
export const modeControlValues = modeControlKV.map(kv => kv[1]);
export type ModeControl = (typeof modeControlKeys)[number];

export const onOffControlKV = [
    ['GPIO', 'GPIO'],
    ['SOFTWARE', 'Software'],
    ['VSET', 'VSET'],
] as const;
export const onOffControlKeys = onOffControlKV.map(kv => kv[0]);
export const onOffControlValues = onOffControlKV.map(kv => kv[1]);
export type OnOffControl = (typeof onOffControlKeys)[number];

export const pullDownResKV = [
    ['Off', 'Off'],
    ['250Ohm', '250 Ohm'],
    ['500Ohm', '500 Ohm'],
    ['1000Ohm', '1000 Ohm'],
    ['2000Ohm', '2000 Ohm'],
] as const;
export const pullDownResKeys = pullDownResKV.map(kv => kv[0]);
export const pullDownResValues = pullDownResKV.map(kv => kv[1]);
export type PullDownRes = (typeof pullDownResKeys)[number];

export const vOutCompBiasLPModeKV = [
    ['default', 'Factory'],
    ['1.3uA', '1.3 µA'],
    ['2.5uA', '2.5 µA'],
    ['3.0uA', '3.0 µA'],
] as const;
export const vOutCompBiasLPModeKeys = vOutCompBiasLPModeKV.map(kv => kv[0]);
export const vOutCompBiasLPModeValues = vOutCompBiasLPModeKV.map(kv => kv[1]);
export type VOutCompBiasLPMode = (typeof vOutCompBiasLPModeKeys)[number];

export const vOutCompBiasLPModeFicrKV = [
    ['0.8uA', 'Factory (0.8 µA)'],
    ['1.3uA', 'Factory (1.3 µA)'],
    ['2.5uA', 'Factory (2.5 µA)'],
    ['3.0uA', 'Factory (3.0 µA)'],
] as const;
export const vOutCompBiasLPModeFicrKeys = vOutCompBiasLPModeFicrKV.map(
    kv => kv[0],
);
export const vOutCompBiasLPModeFicrValues = vOutCompBiasLPModeFicrKV.map(
    kv => kv[1],
);
export type VOutCompBiasLPModeFicr =
    (typeof vOutCompBiasLPModeFicrKeys)[number];

export const vOutCompBiasULPModeKV = [
    ['default', 'Factory'],
    ['50nA', '50 nA'],
    ['100nA', '100 nA'],
    ['275nA', '275 nA'],
] as const;
export const vOutCompBiasULPModeKeys = vOutCompBiasULPModeKV.map(kv => kv[0]);
export const vOutCompBiasULPModeValues = vOutCompBiasULPModeKV.map(kv => kv[1]);
export type VOutCompBiasULPMode = (typeof vOutCompBiasULPModeKeys)[number];

export const vOutCompBiasULPModeFicrKV = [
    ['35nA', 'Factory (35 nA)'],
    ['50nA', 'Factory (50 nA)'],
    ['100nA', 'Factory (100 nA)'],
    ['275nA', 'Factory (275 nA)'],
] as const;
export const vOutCompBiasULPModeFicrKeys = vOutCompBiasULPModeFicrKV.map(
    kv => kv[0],
);
export const vOutCompBiasULPModeFicrValues = vOutCompBiasULPModeFicrKV.map(
    kv => kv[1],
);
export type VOutCompBiasULPModeFicr =
    (typeof vOutCompBiasULPModeFicrKeys)[number];

export const vOutRange = {
    decimals: 2,
    max: 3.3,
    min: 1,
    step: 0.05,
} as const;

export const vOutRippleControlKV = [
    ['High', 'High'],
    ['Low', 'Low'],
    ['Nominal', 'Nominal'],
] as const;
export const vOutRippleControlKeys = vOutRippleControlKV.map(kv => kv[0]);
export const vOutRippleControlValues = vOutRippleControlKV.map(kv => kv[1]);
export type VOutRippleControl = (typeof vOutRippleControlKeys)[number];

type Defaults = {
    alternateVOutControl: AlternateVOutControl;
    iLimFicrLvl: ILimFicrLvl;
    iLimLvl: ILimLvl;
    iLimStartFicrLvl: ILimStartFicrLvl;
    iLimStartLvl: ILimStartLvl;
    modeControl: ModeControl;
    onOffControl: OnOffControl;
    pullDownRes: PullDownRes;
    vOut2: number;
    vOut: number;
    vOutCompBiasLPMode: VOutCompBiasLPMode;
    vOutCompBiasLPModeFicr: VOutCompBiasLPModeFicr;
    vOutCompBiasULPMode: VOutCompBiasULPMode;
    vOutCompBiasULPModeFicr: VOutCompBiasULPModeFicr;
    vOutRippleControl: VOutRippleControl;
};

export const defaultValues: Defaults = {
    alternateVOutControl: 'OFF',
    iLimFicrLvl: '60mA',
    iLimLvl: 'default',
    iLimStartFicrLvl: '60mA',
    iLimStartLvl: 'default',
    modeControl: 'LP',
    onOffControl: 'VSET',
    pullDownRes: 'Off',
    vOut2: vOutRange.min,
    vOut: vOutRange.min,
    vOutCompBiasLPMode: 'default',
    vOutCompBiasLPModeFicr: '0.8uA',
    vOutCompBiasULPMode: 'default',
    vOutCompBiasULPModeFicr: '35nA',
    vOutRippleControl: 'Nominal',
};
