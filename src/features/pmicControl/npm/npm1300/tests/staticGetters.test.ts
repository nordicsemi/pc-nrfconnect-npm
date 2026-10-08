/*
 * Copyright (c) 2023 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { setupMocksBase } from './helpers';

describe('PMIC 1300 - Static getters', () => {
    const { pmic } = setupMocksBase();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Device Type', () => expect(pmic.deviceType).toBe('npm1300'));

    test('On-board load module', () => {
        expect(pmic.onBoardLoadModule).toBeDefined();
        expect(pmic.onBoardLoadModule?.ranges.iLoad).toStrictEqual({
            min: 0,
            max: 99,
            decimals: 2,
            step: 0.01,
        });
    });
});

export {};
