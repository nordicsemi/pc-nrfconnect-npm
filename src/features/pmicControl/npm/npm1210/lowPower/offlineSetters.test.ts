/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type LowPowerConfig } from '../../types';
import { setupMocksBase } from '../tests/helpers';
import {
    shipVBusFiltDisable,
    shpHldSliderDisable,
    shpHldSlideSwitchDelayDisable,
    shpHldSlideSwitchPollTimeDisable,
} from './types';

// UI should get update events immediately and not wait for feedback from shell responses when offline as there is no shell
describe('PMIC 1210 - Setters Offline tests', () => {
    const { mockOnLowPowerUpdate, pmic } = setupMocksBase();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Set hibernateWakeupByButton', async () => {
        await pmic.lowPowerModule?.set.hibernateWakeupByButton?.(true);

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            hibernateWakeupByButton: true,
        } satisfies Partial<LowPowerConfig>);
    });

    test('Set shipVBusFilt', async () => {
        await pmic.lowPowerModule?.set.shipVBusFilt?.('long');

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            shipVBusFilt: 'long',
        } satisfies Partial<LowPowerConfig>);
    });

    test('Set shipVBusFiltTime', async () => {
        await pmic.lowPowerModule?.set.shipVBusFiltTime?.('5ms');

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            shipVBusFiltTime: '5ms',
        } satisfies Partial<LowPowerConfig>);
    });

    test('Set shpHldSlideSwitchDelay', async () => {
        await pmic.lowPowerModule?.set.shpHldSlideSwitchDelay?.('8s');

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            shpHldSlideSwitchDelay: '8s',
        } satisfies Partial<LowPowerConfig>);
    });

    test('Set shpHldSlideSwitchPollTime', async () => {
        await pmic.lowPowerModule?.set.shpHldSlideSwitchPollTime?.('100ms');

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            shpHldSlideSwitchPollTime: '100ms',
        } satisfies Partial<LowPowerConfig>);
    });

    test('Set shpHldSlider', async () => {
        await pmic.lowPowerModule?.set.shpHldSlider?.('poll');

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            shpHldSlider: 'poll',
        } satisfies Partial<LowPowerConfig>);
    });

    test('Set shpHldType', async () => {
        const testVal = 'slideswitch';
        await pmic.lowPowerModule?.set.shpHldType?.(testVal);

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            shipVBusFiltDisabled: shipVBusFiltDisable(testVal),
            shpHldSlideSwitchDelayDisabled:
                shpHldSlideSwitchDelayDisable(testVal),
            shpHldSlideSwitchPollTimeDisabled:
                shpHldSlideSwitchPollTimeDisable(testVal),
            shpHldSliderDisabled: shpHldSliderDisable(testVal),
            shpHldType: testVal,
        } satisfies Partial<LowPowerConfig>);
    });

    test('Set suspendPinPullDown', async () => {
        await pmic.lowPowerModule?.set.suspendPinPullDown?.(true);

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            suspendPinPullDown: true,
        } satisfies Partial<LowPowerConfig>);
    });

    test('Set timeToActive', async () => {
        await pmic.lowPowerModule?.set.timeToActive('50ms');

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({ timeToActive: '50ms' });
    });

    test('Set vbusHibernateWait', async () => {
        await pmic.lowPowerModule?.set.vbusHibernateWait?.(true);

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            vbusHibernateWait: true,
            vbusHibernateWaitingForChargeComplete: false,
        } satisfies Partial<LowPowerConfig>);
    });

    test('Set vbusStandbyCtrl', async () => {
        await pmic.lowPowerModule?.set.vbusStandbyCtrl?.('software');

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            vbusStandbyCtrl: 'software',
        } satisfies Partial<LowPowerConfig>);
    });

    test('Set vbusStandbySel', async () => {
        await pmic.lowPowerModule?.set.vbusStandbySel?.('standby2');

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            vbusStandbySel: 'standby2',
        } satisfies Partial<LowPowerConfig>);
    });

    test('Set vbusStandbyWait', async () => {
        await pmic.lowPowerModule?.set.vbusStandbyWait?.(true);

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            vbusStandbyWait: true,
            vbusStandbyWaitingForChargeComplete: false,
        } satisfies Partial<LowPowerConfig>);
    });
});

export {};
