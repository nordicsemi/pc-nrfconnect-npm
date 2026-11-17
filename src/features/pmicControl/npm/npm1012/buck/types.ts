/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
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

export const iLimLvlKV = [
    ['66mA', '66 mA'],
    ['91mA', '91 mA'],
    ['117mA', '117 mA'],
    ['142mA', '142 mA'],
    ['167mA', '167 mA'],
    ['192mA', '192 mA'],
    ['217mA', '217 mA'],
    ['291mA', '291 mA'],
] as const;
export const iLimLvlKeys = iLimLvlKV.map(kv => kv[0]);
export const iLimLvlValues = iLimLvlKV.map(kv => kv[1]);
export type ILimLvl = (typeof iLimLvlKeys)[number];

export const iLimStartLvlKV = iLimLvlKV;
export const iLimStartLvlKeys = iLimLvlKeys;
export const iLimStartLvlValues = iLimLvlValues;
export type ILimStartStartLvl = (typeof iLimStartLvlKeys)[number];

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
    ['OFF', 'Off'],
    ['250Ohm', '250 Ohm'],
    ['500Ohm', '500 Ohm'],
    ['1000Ohm', '1000 Ohm'],
    ['2000Ohm', '2000 Ohm'],
] as const;
export const pullDownResKeys = pullDownResKV.map(kv => kv[0]);
export const pullDownResValues = pullDownResKV.map(kv => kv[1]);
export type PullDownRes = (typeof pullDownResKeys)[number];

export const vOutCompBiasLPModeKV = [
    ['0.8uA', '0.8 µA'],
    ['1.4uA', '1.4 µA'],
    ['2.5uA', '2.5 µA'],
    ['3.0uA', '3.0 µA'],
] as const;
export const vOutCompBiasLPModeKeys = vOutCompBiasLPModeKV.map(kv => kv[0]);
export const vOutCompBiasLPModeValues = vOutCompBiasLPModeKV.map(kv => kv[1]);
export type VOutCompBiasLPMode = (typeof vOutCompBiasLPModeKeys)[number];

export const vOutCompBiasULPModeKV = [
    ['28nA', '28 nA'],
    ['35nA', '35 nA'],
    ['50nA', '50 nA'],
    ['95nA', '95 nA'],
] as const;
export const vOutCompBiasULPModeKeys = vOutCompBiasULPModeKV.map(kv => kv[0]);
export const vOutCompBiasULPModeValues = vOutCompBiasULPModeKV.map(kv => kv[1]);
export type VOutCompBiasULPMode = (typeof vOutCompBiasULPModeKeys)[number];

export const vOutRange = {
    decimals: 2,
    max: 3.3,
    min: 1,
    step: 0.05,
} as const;

export const vOutRippleControlKV = [
    ['HIGH', 'High'],
    ['LOW', 'Low'],
    ['NOMINAL', 'Nominal'],
] as const;
export const vOutRippleControlKeys = vOutRippleControlKV.map(kv => kv[0]);
export const vOutRippleControlValues = vOutRippleControlKV.map(kv => kv[1]);
export type VOutRippleControl = (typeof vOutRippleControlKeys)[number];

type Defaults = {
    alternateVOutControl: AlternateVOutControl;
    iLimLvl: ILimLvl;
    iLimStartLvl: ILimStartStartLvl;
    modeControl: ModeControl;
    onOffControl: OnOffControl;
    pullDownRes: PullDownRes;
    vOut2: number;
    vOut: number;
    vOutCompBiasLPMode: VOutCompBiasLPMode;
    vOutCompBiasULPMode: VOutCompBiasULPMode;
    vOutRippleControl: VOutRippleControl;
};

export const defaultValues: Defaults = {
    alternateVOutControl: 'OFF',
    iLimLvl: '66mA',
    iLimStartLvl: '66mA',
    modeControl: 'LP',
    onOffControl: 'VSET',
    pullDownRes: 'OFF',
    vOut2: vOutRange.min,
    vOut: vOutRange.min,
    vOutCompBiasLPMode: '0.8uA',
    vOutCompBiasULPMode: '28nA',
    vOutRippleControl: 'NOMINAL',
};
