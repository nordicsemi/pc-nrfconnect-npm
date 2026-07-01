/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type FuelGauge } from '../../types';
import { setupMocksBase } from '../tests/helpers';

// UI should get update events immediately and not wait for feedback from shell responses when offline as there is no shell
describe('PMIC 1012 - Setters Offline tests', () => {
    const { mockOnFuelGaugeUpdate, pmic } = setupMocksBase();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Set fuelGauge batteryHealthEnabled', async () => {
        await pmic.fuelGaugeModule?.set.batteryHealthEnabled?.(false);

        expect(mockOnFuelGaugeUpdate).toBeCalledTimes(1);
        expect(mockOnFuelGaugeUpdate).toBeCalledWith({
            batteryHealthEnabled: false,
        } satisfies Partial<FuelGauge>);
    });

    test('Set fuelGauge batteryReplacementDetection', async () => {
        await pmic.fuelGaugeModule?.set.batteryReplacementDetection?.(false);

        expect(mockOnFuelGaugeUpdate).toBeCalledTimes(1);
        expect(mockOnFuelGaugeUpdate).toBeCalledWith({
            batteryReplacementDetection: false,
        } satisfies Partial<FuelGauge>);
    });

    test('Set fuelGauge enabled', async () => {
        await pmic.fuelGaugeModule?.set.enabled(false);

        expect(mockOnFuelGaugeUpdate).toBeCalledTimes(1);
        expect(mockOnFuelGaugeUpdate).toBeCalledWith({
            enabled: false,
        } satisfies Partial<FuelGauge>);
    });

    test('Set fuelGauge quickConvergenceMode', async () => {
        await pmic.fuelGaugeModule?.set.quickConvergenceMode?.(false);

        expect(mockOnFuelGaugeUpdate).toBeCalledTimes(1);
        expect(mockOnFuelGaugeUpdate).toBeCalledWith({
            quickConvergenceMode: false,
        } satisfies Partial<FuelGauge>);
    });

    test('Set fuelGauge ratedMinBatteryCapacity', async () => {
        await pmic.fuelGaugeModule?.set.ratedMinBatteryCapacity?.(100.1);

        expect(mockOnFuelGaugeUpdate).toBeCalledTimes(1);
        expect(mockOnFuelGaugeUpdate).toBeCalledWith({
            ratedMinBatteryCapacity: 100.1,
        } satisfies Partial<FuelGauge>);
    });
});

export {};
