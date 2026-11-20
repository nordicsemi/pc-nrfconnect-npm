/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

export const vBusDpmKV = [
    ['off', 'Disabled'],
    ['4.3V', '4.3 V'],
    ['4.4V', '4.4 V'],
    ['4.5V', '4.5 V'],
    ['4.6V', '4.6 V'],
] as const;
export const vBusDpmKeys = vBusDpmKV.map(kv => kv[0]);
export const vBusDpmValues = vBusDpmKV.map(kv => kv[1]);
export type VBusDpm = (typeof vBusDpmKeys)[number];

export const vBusILimKV = [
    ['10mA', '10 mA'],
    ['45mA', '45 mA'],
    ['100mA', '100 mA'],
    ['500mA', '500 mA'],
    ['850mA', '850 mA'],
] as const;
export const vBusILimKeys = vBusILimKV.map(kv => kv[0]);
export const vBusILimValues = vBusILimKV.map(kv => kv[1]);
export type VBusILim = (typeof vBusILimKeys)[number];

export const vBusILim0And1PinGndSelKV = [
    ['default', 'Default'],
    ['45mA', '45 mA'],
    ['100mA', '100 mA'],
    ['500mA', '500 mA'],
] as const;
export const vBusILim0And1PinGndSelKeys = vBusILim0And1PinGndSelKV.map(
    kv => kv[0],
);
export const vBusILim0And1PinGndSelValues = vBusILim0And1PinGndSelKV.map(
    kv => kv[1],
);
export type VBusILim0And1PinGndSel =
    (typeof vBusILim0And1PinGndSelKeys)[number];

export const vBusILim0And1PinMapKV = [
    ['highrange', 'High Range'],
    ['lowrange', 'Low Range'],
] as const;
export const vBusILim0And1PinMapKeys = vBusILim0And1PinMapKV.map(kv => kv[0]);
export const vBusILim0And1PinMapValues = vBusILim0And1PinMapKV.map(kv => kv[1]);
export type VBusILim0And1PinMap = (typeof vBusILim0And1PinMapKeys)[number];

export const vBusILimControlKV = [
    ['pin', 'ILIM0/ILIM1 Pins'],
    ['software', 'Register'],
] as const;
export const vBusILimControlKeys = vBusILimControlKV.map(kv => kv[0]);
export const vBusILimControlValues = vBusILimControlKV.map(kv => kv[1]);
export type VBusILimControl = (typeof vBusILimControlKeys)[number];

export const vBusILimSourceKV = [
    ['vbusiliminit', 'VbusIlimInit'],
    ['pins', 'Pins'],
    ['vbusiliminc', 'VbusIlimInc'],
    ['notvalid', 'NotValid'],
] as const;
export const vBusILimSourceKeys = vBusILimSourceKV.map(kv => kv[0]);
export const vBusILimSourceValues = vBusILimSourceKV.map(kv => kv[1]);
export type VBusILimSource = (typeof vBusILimSourceKeys)[number];

export const vBusPGPinSelKV = [
    ['unused', 'Disabled'],
    ['vbusgood', 'VBUS GOOD'],
    ['vbuspresent', 'VBUS PRESENT'],
    ['low', 'LOW'],
] as const;
export const vBusPGPinSelKeys = vBusPGPinSelKV.map(kv => kv[0]);
export const vBusPGPinSelValues = vBusPGPinSelKV.map(kv => kv[1]);
export type VBusPGPinSel = (typeof vBusPGPinSelKeys)[number];
