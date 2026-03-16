/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { helpers } from '../../tests/helpers';
import { setupMocksWithShellParser } from '../tests/helpers';

describe('PMIC 1012 - Setters Online tests', () => {
    const {
        mockOnActiveBatteryModelUpdate,
        mockOnFuelGaugeUpdate,
        mockEnqueueRequest,
        pmic,
    } = setupMocksWithShellParser();
    describe('Setters and effects state - success', () => {
        beforeEach(() => {
            jest.clearAllMocks();

            mockEnqueueRequest.mockImplementation(
                helpers.registerCommandCallbackSuccess,
            );
        });

        test.each([true, false])(
            'Set setFuelGaugeEnabled enabled: %p',
            async enabled => {
                await pmic.fuelGaugeModule?.set.enabled(enabled);

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `fuel_gauge set ${enabled ? '1' : '0'}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                // Updates should only be emitted when we get response
                expect(mockOnFuelGaugeUpdate).toBeCalledTimes(0);
            },
        );

        test('Set setActiveBatteryModel', async () => {
            await pmic.fuelGaugeModule?.set.activeBatteryModel(
                'someProfileName',
            );

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `fuel_gauge model set "someProfileName"`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnActiveBatteryModelUpdate).toBeCalledTimes(0);
        });
    });

    describe('Setters and effects state - error', () => {
        beforeEach(() => {
            jest.clearAllMocks();

            mockEnqueueRequest.mockImplementation(
                helpers.registerCommandCallbackError,
            );
        });

        test.each([true, false])(
            'Set setFuelGaugeEnabled - Fail immediately - enabled: %p',
            async enabled => {
                await expect(
                    pmic.fuelGaugeModule?.set.enabled(enabled),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `fuel_gauge set ${enabled ? '1' : '0'}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                // Request update on error
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `fuel_gauge get`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnFuelGaugeUpdate).toBeCalledTimes(0);
            },
        );

        test('Set setActiveBatteryModel - Fail immediately', async () => {
            await expect(
                pmic.fuelGaugeModule?.set.activeBatteryModel('someProfileName'),
            ).rejects.toBeUndefined();

            expect(mockEnqueueRequest).toBeCalledTimes(2);
            expect(mockEnqueueRequest).toBeCalledWith(
                `fuel_gauge model set "someProfileName"`,
                expect.anything(),
                undefined,
                true,
            );

            // Request update on error
            expect(mockEnqueueRequest).nthCalledWith(
                2,
                `fuel_gauge model get`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnActiveBatteryModelUpdate).toBeCalledTimes(0);
        });
    });
});

export {};
