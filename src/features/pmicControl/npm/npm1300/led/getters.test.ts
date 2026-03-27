/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { PMIC_1300_LEDS, setupMocksWithShellParser } from '../tests/helpers';

describe('PMIC 1300 - Request update commands', () => {
    const { mockEnqueueRequest, pmic } = setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(PMIC_1300_LEDS)('Get ledMode index: %p', index => {
        pmic.ledModule[index].get.mode?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npmx led mode get ${index}`,
            expect.anything(),
            undefined,
            true,
        );
    });
});

export {};
