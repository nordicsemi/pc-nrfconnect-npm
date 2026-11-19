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

    test('Request update hibernateWakeupByButton', () => {
        pmic.lowPowerModule?.get.hibernateWakeupByButton?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx low_power_ctrl shphld hibernate_wakeup get`,
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update shipVBusFilt', () => {
        pmic.lowPowerModule?.get.shipVBusFilt?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx low_power_ctrl vbus shipfilt get`,
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update shipVBusFiltTime', () => {
        pmic.lowPowerModule?.get.shipVBusFiltTime?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx low_power_ctrl vbus shipfiltset get`,
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update shpHldSlideSwitchDelay', () => {
        pmic.lowPowerModule?.get.shpHldSlideSwitchDelay?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx low_power_ctrl shphld delay get`,
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update shpHldSlideSwitchPollTime', () => {
        pmic.lowPowerModule?.get.shpHldSlideSwitchPollTime?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx low_power_ctrl shphld polltime get`,
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update shpHldSlider', () => {
        pmic.lowPowerModule?.get.shpHldSlider?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx low_power_ctrl shphld slider get`,
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update shpHldType', () => {
        pmic.lowPowerModule?.get.shpHldType?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx low_power_ctrl shphld type get`,
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update suspendPinPullDown', () => {
        pmic.lowPowerModule?.get.suspendPinPullDown?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx low_power_ctrl suspend_pin pull_down get`,
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update shipModeTimeToActive', () => {
        pmic.lowPowerModule?.get.timeToActive();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx low_power_ctrl shphld debounce get`,
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update vbusHibernateWait', () => {
        pmic.lowPowerModule?.get.vbusHibernateWait?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx low_power_ctrl vbus hibernate_wait get`,
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update vbusStandbyPinSel', () => {
        pmic.lowPowerModule?.get.vbusStandbyPinSel?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx low_power_ctrl vbus standby_pinsel get`,
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update vbusStandbyWait', () => {
        pmic.lowPowerModule?.get.vbusStandbyWait?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx low_power_ctrl vbus standby_wait get`,
            expect.anything(),
            undefined,
            true,
        );
    });

    test('Request update vbusStatus', () => {
        pmic.lowPowerModule?.get.vbusStatus?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx low_power_ctrl vbus status get`,
            expect.anything(),
            undefined,
            true,
        );
    });
});

export {};
