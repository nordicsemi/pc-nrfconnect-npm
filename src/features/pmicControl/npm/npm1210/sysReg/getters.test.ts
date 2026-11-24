/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { setupMocksWithShellParser } from '../tests/helpers';

describe('PMIC 1210 - Request update commands', () => {
    const { mockEnqueueRequest, pmic } = setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Request update vBusDpm', () => {
        pmic.sysRegModule?.get.vBusDpm();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'npm12xx sysreg vbusdpm get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update vBusILim', () => {
        pmic.sysRegModule?.get.vBusILim();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'npm12xx sysreg vbusilim software get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update vBusStatus', () => {
        pmic.sysRegModule?.get.vBusStatus();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'npm12xx sysreg vbus_status get',
            expect.anything(),
            undefined,
            true,
        );
    });
});

export {};
