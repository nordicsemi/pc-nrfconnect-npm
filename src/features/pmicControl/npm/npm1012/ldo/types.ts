/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

export const onOffControlValues = ['Software', 'VSET', 'GPIO'] as const;
export type OnOffControl = (typeof onOffControlValues)[number];

// Ldo / Load Switch 1
export const softStartILimLdsw1KV = [
    ['20mA/25mA', '20mA / 25mA'],
    ['30mA/40mA', '30mA / 40mA'],
    ['50mA/60mA', '50mA / 60mA'],
    ['80mA/100mA', '80mA / 100mA'],
] as const;
export const softStartILimLdsw1Keys = softStartILimLdsw1KV.map(kv => kv[0]);
export type SoftStartILimLdsw1 = (typeof softStartILimLdsw1Keys)[number];

// Load Switch 2
export const softStartILimLoadSw2KV = [
    ['10mA', '10 mA'],
    ['15mA', '15 mA'],
    ['30mA', '30 mA'],
    ['45mA', '45 mA'],
] as const;
export const softStartILimLoadSw2Keys = softStartILimLoadSw2KV.map(kv => kv[0]);
export type SoftStartILimLoadSw2 = (typeof softStartILimLoadSw2Keys)[number];

export type SoftStartILimLdsw = SoftStartILimLdsw1 | SoftStartILimLoadSw2;

// Ldo / Load Switch 1
export const softStartTimeLdsw1KV = [
    ['4.5ms', '4.5 ms'],
    ['7.5ms', '7.5 ms'],
    ['10.5ms', '10.5 ms'],
    ['20.5ms', '20.5 ms'],
] as const;
export const softStartTimeLdsw1Keys = softStartTimeLdsw1KV.map(kv => kv[0]);
export type SoftStartTimeLdsw1 = (typeof softStartTimeLdsw1Keys)[number];

// Load Switch 2
export const softStartTimeLoadSw2KV = [
    ['4.5ms', '4.5 ms'],
    ['7.5ms', '7.5 ms'],
    ['10.5ms', '10.5 ms'],
] as const;
export const softStartTimeLoadSw2Keys = softStartTimeLoadSw2KV.map(kv => kv[0]);
export type SoftStartTimeLoadSw2 = (typeof softStartTimeLoadSw2Keys)[number];

export type SoftStartTime = SoftStartTimeLdsw1 | SoftStartTimeLoadSw2;

export const modeValues = ['Load_switch', 'LDO'] as const;
type Mode = (typeof modeValues)[number];

export const vOutSelValues = ['Software', 'Vset'] as const;
type VOutSel = (typeof vOutSelValues)[number];

export const onOffControlValuesForModeAndVOutSel = (
    index: number,
    mode?: Mode,
    vOutSel?: VOutSel,
) => {
    const valuesWithoutSoftware = onOffControlValues.filter(
        v => v !== 'Software',
    );
    const valuesWithoutSoftwareOrVset = onOffControlValues.filter(
        v => v !== 'Software' && v !== 'VSET',
    );
    const valuesWithoutVset = onOffControlValues.filter(v => v !== 'VSET');

    // Filter out 'Software' and/or 'VSET' option
    if (index === 1) {
        // Load Switch 2
        return valuesWithoutVset;
    }
    if (mode === 'Load_switch' && vOutSel === 'Vset') {
        return valuesWithoutSoftwareOrVset;
    }
    if (vOutSel === 'Software') {
        return valuesWithoutVset;
    }
    if (vOutSel === 'Vset') {
        return valuesWithoutSoftware;
    }
    return onOffControlValues;
};

export const softStartILimKVForIndex = (index: number) =>
    index === 0 ? softStartILimLdsw1KV : softStartILimLoadSw2KV;

export const softStartILimKeysForIndex = (index: number) =>
    softStartILimKVForIndex(index).map(([key, _]) => key);

export const softStartTimeKVForIndex = (index: number) =>
    index === 0 ? softStartTimeLdsw1KV : softStartTimeLoadSw2KV;

export const softStartTimeKeysForIndex = (index: number) =>
    softStartTimeKVForIndex(index).map(([key, _]) => key);
