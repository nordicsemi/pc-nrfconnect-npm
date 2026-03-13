/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

const gpioDriveKV = [
    ['HIGH', '4 mA'],
    ['NORMAL', '2 mA'],
] as const;
export const gpioDriveKeys = gpioDriveKV.map(kv => kv[0]);
export const gpioDriveValues = gpioDriveKV.map(kv => kv[1]);
export type GPIODrive = (typeof gpioDriveKeys)[number];

const gpioModeInputKV = [
    ['GPIO_IN', 'General Purpose'],
    ['BUCKENABLE', 'BUCK Enable Control'],
    ['BUCKMODESET', 'BUCK Mode Control'],
    ['BUCKVOUT2SET', 'BUCK Vout2 Control'],
    ['LDSW1ENABLE', 'Load Switch/LDO 1 Enable Control'],
    ['LDSW2ENABLE', 'Load Switch 2 Enable Control'],
    ['LONGPRESSRESET', 'PMIC Reset Control'],
] as const;
export const gpioModeInputKeys = gpioModeInputKV.map(kv => kv[0]);
export const gpioModeInputValues = gpioModeInputKV.map(kv => kv[1]);
export type GPIOModeInput = (typeof gpioModeInputKeys)[number];

const gpioModeOutputKV = [
    ['GPIO_OUT_LOW', 'Driven Low'],
    ['GPIO_OUT_HIGH', 'Driven High'],
    ['BUCKVOUTIND', 'BUCK Power Mode Indication'],
    ['IRQ', 'Interrupt'],
    ['POF', 'Power Fail Warning'],
    ['PWM', 'PWM'],
    ['TIMER', 'Timer Pre-Warning'],
    ['VBUS', 'VBUS Good Indication'],
    ['VBUSPRESENT', 'VBUS PRESENT Indication'],
    ['WATCHDOG_SOFT_RESET', 'Watchdog Soft Reset'],
    ['WATCHDOG_WARNING', 'Watchdog Warning'],
] as const;
export const gpioModeOutputKeys = gpioModeOutputKV.map(kv => kv[0]);
export const gpioModeOutputValues = gpioModeOutputKV.map(kv => kv[1]);
export type GPIOModeOutput = (typeof gpioModeOutputKeys)[number];

const gpioPullKV = [
    ['PULLDOWN', 'Pull-Down'],
    ['PULLUP', 'Pull-Up'],
    ['NOPULL', 'Pull Disabled'],
] as const;
export const gpioPullKeys = gpioPullKV.map(kv => kv[0]);
export const gpioPullValues = gpioPullKV.map(kv => kv[1]);
export type GPIOPull = (typeof gpioPullKeys)[number];

const gpioPolarityKV = [
    ['ACTIVEHIGH', 'Active High'],
    ['ACTIVELOW', 'Active Low'],
] as const;
export const gpioPolarityKeys = gpioPolarityKV.map(kv => kv[0]);
export const gpioPolarityValues = gpioPolarityKV.map(kv => kv[1]);
export type GPIOPolarity = (typeof gpioPolarityKeys)[number];

const ledDriveKV = [
    ['5mA', '5 mA'],
    ['10mA', '10 mA'],
] as const;
export const ledDriveKeys = ledDriveKV.map(kv => kv[0]);
export const ledDriveValues = ledDriveKV.map(kv => kv[1]);
export type LEDDrive = (typeof ledDriveKeys)[number];

const ledModeKV = [
    ['BLINK', 'Blinking LED'],
    ['CHARGE', 'Charging Indication'],
    ['ERROR', 'Charging Error Indication'],
    ['OFF', 'Off'],
    ['ON', 'On - Static'],
    ['PWM', 'On - PWM Controlled'],
    ['VBUS', 'VBUS Good Indication'],
] as const;
export const ledModeKeys = ledModeKV.map(kv => kv[0]);
export const ledModeValues = ledModeKV.map(kv => kv[1]);
export type LEDMode = (typeof ledModeKeys)[number];
