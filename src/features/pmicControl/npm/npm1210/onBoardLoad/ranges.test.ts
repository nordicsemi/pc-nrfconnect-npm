/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { setupMocksBase } from '../tests/helpers';

describe('PMIC 1210 - Static getters', () => {
    const { pmic } = setupMocksBase();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('onBoardLoadModule iLoad range', () =>
        expect(pmic.onBoardLoadModule?.ranges.iLoad).toStrictEqual({
            min: 0,
            max: 500,
            decimals: 2,
            step: 0.01,
        }));
});

export {};
