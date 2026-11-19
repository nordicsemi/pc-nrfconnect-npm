/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

export const numGPIOs = 5;

export const driveKV = [
    ['normal', '2 mA'],
    ['high', '4 mA'],
] as const;
export const driveKeys = driveKV.map(kv => kv[0]);
export const driveValues = driveKV.map(kv => kv[1]);
export type Drive = (typeof driveKeys)[number];

export const modeKV = [
    ['gpio_in', 'Input - General Purpose'],
    ['buckenable', 'Input - BUCK Enable Control'],
    ['buckmodeset', 'Input - BUCK Mode Control'],
    ['buckvout2set', 'Input - BUCK Vout2 Control'],
    ['pinreset', 'Input - Pin Reset Control'],
    ['longpressreset', 'Input - Long Press Reset Control'],
    ['watchdog_kick', 'Input - Watchdog Kick Control'],
    ['gpio_out_low', 'Output - Driven Low'],
    ['gpio_out_high', 'Output - Driven High'],
    ['buckmodeind', 'Output - BUCK Power Mode Indication'],
    ['irq', 'Output - Interrupt'],
    ['pof', 'Output - Power Fail Warning'],
    ['pwm0', 'Output - PWM from LED0 driver'],
    ['pwm1', 'Output - PWM from LED1 driver'],
    ['pwm2', 'Output - PWM from LED2 driver'],
    ['timer', 'Output - Timer Pre-Warning'],
    ['vbus', 'Output - VBUS Good Indication'],
    ['vbuspresent', 'Output - VBUS Present Indication'],
    ['watchdog_softreset', 'Output - Watchdog Soft Reset'],
    ['watchdog_warning', 'Output - Watchdog Warning'],
] as const;
export const modeKeys = modeKV.map(kv => kv[0]);
export const modeValues = modeKV.map(kv => kv[1]);
export type Mode = (typeof modeKeys)[number];

export const polarityKV = [
    ['activelow', 'Active Low'],
    ['activehigh', 'Active High'],
] as const;
export const polarityKeys = polarityKV.map(kv => kv[0]);
export const polarityValues = polarityKV.map(kv => kv[1]);
export type Polarity = (typeof polarityKeys)[number];

export const pullKV = [
    ['nopull', 'Pull Disabled'],
    ['pulldown', 'Pull-Down'],
    ['pullup', 'Pull-Up'],
] as const;
export const pullKeys = pullKV.map(kv => kv[0]);
export const pullValues = pullKV.map(kv => kv[1]);
export type Pull = (typeof pullKeys)[number];

export const isInputMode = (mode: Mode) =>
    modeKV.some(([k, v]) => k === mode && v.startsWith('Input'));

export const modeKVForIndex = (index: number) =>
    modeKV.filter(([key, _]) => !(index !== 4 && key === 'pinreset'));

export const modeKeysForIndex = (index: number) =>
    modeKVForIndex(index).map(kv => kv[0]);

export const polarityDisabled = (mode: Mode) =>
    mode === 'gpio_in' || mode === 'gpio_out_low' || mode === 'gpio_out_high';
