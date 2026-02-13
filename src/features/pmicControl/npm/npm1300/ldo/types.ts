/*
 * Copyright (c) 2024 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

export enum SoftStartCurrent {
    '25 mA' = 25,
    '50 mA' = 50,
    '75 mA' = 75,
    '100 mA' = 100,
}

export const SoftStartCurrentValues = Object.keys(SoftStartCurrent)
    .filter(key => !Number.isNaN(Number(key)))
    .map(Number);
export const SoftStartCurrentKeys = Object.values(SoftStartCurrent).filter(
    key => Number.isNaN(Number(key)),
);
