/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { PMIC_1300_LEDS, setupMocksBase } from '../tests/helpers';
import { modeValues } from './types';

// UI should get update events immediately and not wait for feedback from shell responses when offline as there is no shell
describe('PMIC 1300 - Setters Offline tests', () => {
    const { mockOnLEDUpdate, pmic } = setupMocksBase();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(
        PMIC_1300_LEDS.map(index =>
            modeValues.map(mode => ({
                index,
                mode,
            })),
        ).flat(),
    )('Set ledMode index: %p', async ({ index, mode }) => {
        await pmic.ledModule[index].set.mode?.(mode);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: { mode },
            index,
        });
    });
});

export {};
