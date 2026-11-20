/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

export const configCardIndex = 3;

export const blinkTimeRange = {
    decimals: 0,
    max: 2048,
    min: 8,
    step: 8,
} as const;

export const dutyCycleRange = {
    decimals: 0,
    max: 4095,
    min: 0,
    step: 1,
} as const;

export const driveKV = [
    ['2.5mA', '2.5 mA'],
    ['5mA', '5 mA'],
] as const;
export const driveKeys = driveKV.map(kv => kv[0]);
export const driveValues = driveKV.map(kv => kv[1]);
export type Drive = (typeof driveKeys)[number];

export const modeKV = [
    ['off', 'Off'],
    ['on', 'On - Static'],
    ['pwm', 'On - PWM Controlled'],
    ['blink', 'Blinking LED'],
    ['charge', 'Charging Indication'],
    ['error', 'Charging Error Indication'],
    ['vbus', 'VBUS Good Indication'],
] as const;
export const modeKeys = modeKV.map(kv => kv[0]);
export const modeValues = modeKV.map(kv => kv[1]);
export type Mode = (typeof modeKeys)[number];

export const pwmFreqKV = [
    ['122Hz', '122 Hz'],
    ['244Hz', '244 Hz'],
    ['488Hz', '488 Hz'],
    ['977Hz', '977 Hz'],
] as const;
export const pwmFreqKeys = pwmFreqKV.map(kv => kv[0]);
export const pwmFreqValues = pwmFreqKV.map(kv => kv[1]);
export type PwmFreq = (typeof pwmFreqKeys)[number];

export const dutyCycleDisabled = (mode: Mode) =>
    mode === 'off' || mode === 'on';
