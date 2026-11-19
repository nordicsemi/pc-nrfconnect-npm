/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

export const pwmFreqKV = [
    ['122Hz', '122 Hz'],
    ['244Hz', '244 Hz'],
    ['488Hz', '488 Hz'],
    ['977Hz', '977 Hz'],
] as const;
export const pwmFreqKeys = pwmFreqKV.map(kv => kv[0]);
export const pwmFreqValues = pwmFreqKV.map(kv => kv[1]);
export type PwmFreq = (typeof pwmFreqKeys)[number];
