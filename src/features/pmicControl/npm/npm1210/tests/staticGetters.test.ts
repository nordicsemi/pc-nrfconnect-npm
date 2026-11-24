/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { setupMocksBase } from './helpers';

describe('PMIC 1210 - Static getters', () => {
    const { pmic } = setupMocksBase();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Device Type', () => expect(pmic.deviceType).toBe('npm1210'));
});

export {};
