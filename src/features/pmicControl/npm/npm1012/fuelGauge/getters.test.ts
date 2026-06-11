/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ShellParserCallbacks as Callbacks } from '@nordicsemiconductor/pc-nrfconnect-shared';

import { type BatteryModel } from '../../types';
import { setupMocksWithShellParser } from '../tests/helpers';

describe('PMIC 1012 - Request update commands', () => {
    const { mockEnqueueRequest, pmic } = setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Request update fuelGauge activeBatteryModel', () => {
        pmic.fuelGaugeModule?.get.activeBatteryModel();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'fuel_gauge model get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update fuelGauge batteryHealthEnabled', () => {
        pmic.fuelGaugeModule?.get.batteryHealthEnabled?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'fuel_gauge health enable get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update fuelGauge batteryReplacementDetection', () => {
        pmic.fuelGaugeModule?.get.batteryReplacementDetection?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'fuel_gauge health replacement_detection get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update fuelGauge enabled', () => {
        pmic.fuelGaugeModule?.get.enabled();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'fuel_gauge get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update fuelGauge quickConvergenceMode', () => {
        pmic.fuelGaugeModule?.get.quickConvergenceMode?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'fuel_gauge health quick_convergence get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update fuelGauge ratedMinBatteryCapacity', () => {
        pmic.fuelGaugeModule?.get.ratedMinBatteryCapacity?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'fuel_gauge health rated_min_capacity get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update fuelGauge storedBatteryModel', () => {
        pmic.fuelGaugeModule?.get.storedBatteryModel();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'fuel_gauge model list',
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update fuelGauge storedBatteryModel - hardcodedBatteryModels', async () => {
        mockEnqueueRequest.mockImplementationOnce(
            (
                _command: string,
                callbacks?: Callbacks,

                _timeout?: number,

                _unique?: boolean,
            ) => {
                callbacks?.onSuccess(
                    `Currently active battery model:
                            name="LP803448",T={5.00 C,25.00 C,45.00 C},Q={1413.40 mAh,1518.28 mAh,1500.11 mAh}
                    Hardcoded battery models:
                            name="LP803448",T={5.00 C,25.00 C,45.00 C},Q={1413.40 mAh,1518.28 mAh,1500.11 mAh}
                            name="LP502540",T={25.00 C},Q={563.08 mAh}
                    Battery models stored in database:
                            Slot 0: Empty
                            Slot 1: Empty
                            Slot 2: Empty`,
                    'fuel_gauge model list',
                );
                return Promise.resolve();
            },
        );

        await expect(pmic.getHardcodedBatteryModels()).resolves.toStrictEqual([
            {
                name: 'LP803448',
                characterizations: [
                    {
                        temperature: 45,
                        capacity: 1500.11,
                    },
                    {
                        temperature: 25,
                        capacity: 1518.28,
                    },
                    {
                        temperature: 5,
                        capacity: 1413.4,
                    },
                ],
                slotIndex: undefined,
            },
            {
                name: 'LP502540',
                characterizations: [
                    {
                        temperature: 25,
                        capacity: 563.08,
                    },
                ],
                slotIndex: undefined,
            },
        ] as BatteryModel[]);

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'fuel_gauge model list',
            expect.anything(),
            undefined,
            true,
        );
    });
});

export {};
