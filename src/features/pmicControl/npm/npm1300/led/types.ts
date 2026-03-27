/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

export const modeValues = [
    'Charger error',
    'Charging',
    'Host',
    'Not used',
] as const;
export type Mode = (typeof modeValues)[number];
