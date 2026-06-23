/*
 * Copyright (c) 2024 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { helpers } from '../../tests/helpers';
import { setupMocksWithShellParser } from '../tests/helpers';

describe('PMIC 1300 - Setters Online tests', () => {
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

            // Updates should only be emitted when we get response
            expect(mockOnActiveBatteryModelUpdate).toBeCalledTimes(0);
        });

        test.each([true, false])(
            'startBatteryStatusCheck enabled: %p',
            async enabled => {
                await pmic.fuelGaugeModule?.set.batteryStatusCheckEnabled?.(
                    enabled,
                );

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm_chg_status_check set ${enabled ? '1' : '0'}`,
                    expect.anything(),
                    undefined,
                    true,
                );
            },
        );

        test.each([true, false])(
            'Set fuelGauge batteryHealthEnabled: %p',
            async enabled => {
                await pmic.fuelGaugeModule?.set.batteryHealthEnabled?.(enabled);

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `fuel_gauge health enable set ${enabled ? 'ON' : 'OFF'}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnFuelGaugeUpdate).toBeCalledTimes(0);
            },
        );

        test.each([true, false])(
            'Set fuelGauge batteryReplacementDetection: %p',
            async enabled => {
                await pmic.fuelGaugeModule?.set.batteryReplacementDetection?.(
                    enabled,
                );

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `fuel_gauge health replacement_detection set ${enabled ? 'ON' : 'OFF'}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnFuelGaugeUpdate).toBeCalledTimes(0);
            },
        );

        test.each([true, false])(
            'Set fuelGauge quickConvergenceMode: %p',
            async enabled => {
                await pmic.fuelGaugeModule?.set.quickConvergenceMode?.(enabled);

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `fuel_gauge health quick_convergence set ${enabled ? 'ON' : 'OFF'}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnFuelGaugeUpdate).toBeCalledTimes(0);
            },
        );

        test('Set fuelGauge ratedMinBatteryCapacity: %p', async () => {
            await pmic.fuelGaugeModule?.set.ratedMinBatteryCapacity?.(100);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                'fuel_gauge health rated_min_capacity set 100',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnFuelGaugeUpdate).toBeCalledTimes(0);
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

                // Refresh data due to error
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `fuel_gauge get`,
                    expect.anything(),
                    undefined,
                    true,
                );

                // Updates should only be emitted when we get response
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

            // Refresh data due to error
            expect(mockEnqueueRequest).nthCalledWith(
                2,
                `fuel_gauge model get`,
                expect.anything(),
                undefined,
                true,
            );

            // Updates should only be emitted when we get response
            expect(mockOnActiveBatteryModelUpdate).toBeCalledTimes(0);
        });

        test.each([true, false])(
            'Set fuelGauge batteryHealthEnabled - Fail immediately - enabled: %p',
            async enabled => {
                await expect(
                    pmic.fuelGaugeModule?.set.batteryHealthEnabled?.(enabled),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).nthCalledWith(
                    1,
                    `fuel_gauge health enable set ${enabled ? 'ON' : 'OFF'}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                // Request update on error
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    'fuel_gauge health enable get',
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnFuelGaugeUpdate).toBeCalledTimes(0);
            },
        );

        test.each([true, false])(
            'Set fuelGauge batteryReplacementDetection - Fail immediately - enabled: %p',
            async enabled => {
                await expect(
                    pmic.fuelGaugeModule?.set.batteryReplacementDetection?.(
                        enabled,
                    ),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).nthCalledWith(
                    1,
                    `fuel_gauge health replacement_detection set ${enabled ? 'ON' : 'OFF'}`,
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    'fuel_gauge health replacement_detection get',
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnFuelGaugeUpdate).toBeCalledTimes(0);
            },
        );

        test.each([true, false])(
            'Set fuelGauge quickConvergenceMode - Fail immediately - enabled: %p',
            async enabled => {
                await expect(
                    pmic.fuelGaugeModule?.set.quickConvergenceMode?.(enabled),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).nthCalledWith(
                    1,
                    `fuel_gauge health quick_convergence set ${enabled ? 'ON' : 'OFF'}`,
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    'fuel_gauge health quick_convergence get',
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnFuelGaugeUpdate).toBeCalledTimes(0);
            },
        );

        test('Set fuelGauge ratedMinBatteryCapacity - Fail immediately', async () => {
            await expect(
                pmic.fuelGaugeModule?.set.ratedMinBatteryCapacity?.(100),
            ).rejects.toBeUndefined();

            expect(mockEnqueueRequest).toBeCalledTimes(2);
            expect(mockEnqueueRequest).nthCalledWith(
                1,
                'fuel_gauge health rated_min_capacity set 100',
                expect.anything(),
                undefined,
                true,
            );
            expect(mockEnqueueRequest).nthCalledWith(
                2,
                'fuel_gauge health rated_min_capacity get',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnFuelGaugeUpdate).toBeCalledTimes(0);
        });
    });
});

export {};
