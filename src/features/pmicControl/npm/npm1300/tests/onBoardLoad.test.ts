/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { helpers } from '../../tests/helpers';
import { setupMocksWithShellParser } from './helpers';

describe('PMIC 1300 - On-board load', () => {
    const { mockEnqueueRequest, pmic } = setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
        mockEnqueueRequest.mockImplementation(
            helpers.registerCommandCallbackSuccess,
        );
    });

    test('Sets active load with cc_sink command', async () => {
        await pmic.onBoardLoadModule?.set.iLoad(1);

        expect(mockEnqueueRequest).toHaveBeenCalledWith(
            'cc_sink level set 1',
            expect.anything(),
            undefined,
            true,
        );
    });
});

export {};
