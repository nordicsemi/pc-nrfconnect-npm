/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

export const modeKV = [
    ['general_purpose', 'General purpose'],
    ['wakeup', 'Wake-up'],
    ['watchdog_powercycle', 'Watchdog Power Cycle'],
    ['watchdog_reset', 'Watchdog Reset'],
] as const;
export const modeKeys = modeKV.map(kv => kv[0]);
export const modeValues = modeKV.map(kv => kv[1]);
export type Mode = (typeof modeKeys)[number];
