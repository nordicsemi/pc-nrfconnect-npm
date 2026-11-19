/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { helpers } from '../../tests/helpers';
import { type LowPowerConfig, type PmicDialog } from '../../types';
import { setupMocksWithShellParser } from '../tests/helpers';

describe('PMIC 1210 - Setters Online tests', () => {
    const {
        mockDialogHandler,
        mockOnLowPowerUpdate,
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

        test.each([false, true])(
            'Set hibernateWakeupByButton: %p',
            async value => {
                await pmic.lowPowerModule?.set.hibernateWakeupByButton?.(value);

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm12xx low_power_ctrl shphld hibernate_wakeup set ${value ? 'on' : 'off'}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                // Updates should only be emitted when we get response
                expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
            },
        );

        test('Set shipVBusFilt', async () => {
            await pmic.lowPowerModule?.set.shipVBusFilt?.('long');

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                'npm12xx low_power_ctrl vbus shipfilt set long',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test('Set shipVBusFiltTime', async () => {
            await pmic.lowPowerModule?.set.shipVBusFiltTime?.('5ms');

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                'npm12xx low_power_ctrl vbus shipfiltset set 5ms',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test('Set shpHldSlideSwitchDelay', async () => {
            await pmic.lowPowerModule?.set.shpHldSlideSwitchDelay?.('8s');

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                'npm12xx low_power_ctrl shphld delay set 8s',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test('Set shpHldSlideSwitchPollTime', async () => {
            await pmic.lowPowerModule?.set.shpHldSlideSwitchPollTime?.('100ms');

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                'npm12xx low_power_ctrl shphld polltime set 100ms',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test('Set shpHldSlider', async () => {
            await pmic.lowPowerModule?.set.shpHldSlider?.('poll');

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                'npm12xx low_power_ctrl shphld slider set poll',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test('Set shpHldType', async () => {
            await pmic.lowPowerModule?.set.shpHldType?.('slideswitch');

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                'npm12xx low_power_ctrl shphld type set slideswitch',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test.each([false, true])('Set suspendPinPullDown: %p', async value => {
            await pmic.lowPowerModule?.set.suspendPinPullDown?.(value);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm12xx low_power_ctrl suspend_pin pull_down set ${value ? 'on' : 'off'}`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test('Set timeToActive', async () => {
            await pmic.lowPowerModule?.set.timeToActive('50ms');

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                'npm12xx low_power_ctrl shphld debounce set 50ms',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test.each([false, true])('Set vbusHibernateWait: %p', async value => {
            await pmic.lowPowerModule?.set.vbusHibernateWait?.(value);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm12xx low_power_ctrl vbus hibernate_wait set ${value ? 'on' : 'off'}`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
            expect(mockOnLowPowerUpdate).toBeCalledWith({
                vbusHibernateWait: value,
                vbusHibernateWaitingForChargeComplete: false,
            } satisfies Partial<LowPowerConfig>);
        });

        test('Set vbusStandbyPinSel', async () => {
            await pmic.lowPowerModule?.set.vbusStandbyPinSel?.('standby2');

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                'npm12xx low_power_ctrl vbus standby_pinsel set standby2',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test.each([false, true])('Set vbusStandbyWait: %p', async value => {
            await pmic.lowPowerModule?.set.vbusStandbyWait?.(value);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm12xx low_power_ctrl vbus standby_wait set ${value ? 'on' : 'off'}`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
            expect(mockOnLowPowerUpdate).toBeCalledWith({
                vbusStandbyWait: value,
                vbusStandbyWaitingForChargeComplete: false,
            } satisfies Partial<LowPowerConfig>);
        });
    });

    describe('Setters and effects state - error', () => {
        beforeEach(() => {
            jest.clearAllMocks();

            mockEnqueueRequest.mockImplementation(
                helpers.registerCommandCallbackError,
            );
        });

        test('Set hibernateWakeupByButton - Fail immediately', async () => {
            await expect(
                pmic.lowPowerModule?.set.hibernateWakeupByButton?.(true),
            ).rejects.toBeUndefined();

            expect(mockEnqueueRequest).toBeCalledTimes(2);
            expect(mockEnqueueRequest).nthCalledWith(
                1,
                'npm12xx low_power_ctrl shphld hibernate_wakeup set on',
                expect.anything(),
                undefined,
                true,
            );

            // Request update on error
            expect(mockEnqueueRequest).nthCalledWith(
                2,
                'npm12xx low_power_ctrl shphld hibernate_wakeup get',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test('Set shipVBusFilt - Fail immediately', async () => {
            await expect(
                pmic.lowPowerModule?.set.shipVBusFilt?.('long'),
            ).rejects.toBeUndefined();

            expect(mockEnqueueRequest).toBeCalledTimes(2);
            expect(mockEnqueueRequest).nthCalledWith(
                1,
                'npm12xx low_power_ctrl vbus shipfilt set long',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockEnqueueRequest).nthCalledWith(
                2,
                'npm12xx low_power_ctrl vbus shipfilt get',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test('Set shipVBusFiltTime - Fail immediately', async () => {
            await expect(
                pmic.lowPowerModule?.set.shipVBusFiltTime?.('5ms'),
            ).rejects.toBeUndefined();

            expect(mockEnqueueRequest).toBeCalledTimes(2);
            expect(mockEnqueueRequest).nthCalledWith(
                1,
                'npm12xx low_power_ctrl vbus shipfiltset set 5ms',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockEnqueueRequest).nthCalledWith(
                2,
                'npm12xx low_power_ctrl vbus shipfiltset get',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test('Set shpHldSlider - Fail immediately', async () => {
            await expect(
                pmic.lowPowerModule?.set.shpHldSlider?.('poll'),
            ).rejects.toBeUndefined();

            expect(mockEnqueueRequest).toBeCalledTimes(2);
            expect(mockEnqueueRequest).nthCalledWith(
                1,
                'npm12xx low_power_ctrl shphld slider set poll',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockEnqueueRequest).nthCalledWith(
                2,
                'npm12xx low_power_ctrl shphld slider get',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test('Set shpHldType - Fail immediately', async () => {
            await expect(
                pmic.lowPowerModule?.set.shpHldType?.('slideswitch'),
            ).rejects.toBeUndefined();

            expect(mockEnqueueRequest).toBeCalledTimes(2);
            expect(mockEnqueueRequest).nthCalledWith(
                1,
                'npm12xx low_power_ctrl shphld type set slideswitch',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockEnqueueRequest).nthCalledWith(
                2,
                'npm12xx low_power_ctrl shphld type get',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test('Set shpHldSlideSwitchDelay - Fail immediately', async () => {
            await expect(
                pmic.lowPowerModule?.set.shpHldSlideSwitchDelay?.('8s'),
            ).rejects.toBeUndefined();

            expect(mockEnqueueRequest).toBeCalledTimes(2);
            expect(mockEnqueueRequest).nthCalledWith(
                1,
                'npm12xx low_power_ctrl shphld delay set 8s',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockEnqueueRequest).nthCalledWith(
                2,
                'npm12xx low_power_ctrl shphld delay get',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test('Set shpHldSlideSwitchPollTime - Fail immediately', async () => {
            await expect(
                pmic.lowPowerModule?.set.shpHldSlideSwitchPollTime?.('100ms'),
            ).rejects.toBeUndefined();

            expect(mockEnqueueRequest).toBeCalledTimes(2);
            expect(mockEnqueueRequest).nthCalledWith(
                1,
                'npm12xx low_power_ctrl shphld polltime set 100ms',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockEnqueueRequest).nthCalledWith(
                2,
                'npm12xx low_power_ctrl shphld polltime get',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test('Set suspendPinPullDown - Fail immediately', async () => {
            await expect(
                pmic.lowPowerModule?.set.suspendPinPullDown?.(true),
            ).rejects.toBeUndefined();

            expect(mockEnqueueRequest).toBeCalledTimes(2);
            expect(mockEnqueueRequest).nthCalledWith(
                1,
                'npm12xx low_power_ctrl suspend_pin pull_down set on',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockEnqueueRequest).nthCalledWith(
                2,
                'npm12xx low_power_ctrl suspend_pin pull_down get',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test('Set timeToActive - Fail immediately', async () => {
            mockDialogHandler.mockImplementationOnce((dialog: PmicDialog) => {
                dialog.onConfirm();
            });

            await expect(
                pmic.lowPowerModule?.set.timeToActive('50ms'),
            ).rejects.toBeUndefined();

            expect(mockEnqueueRequest).toBeCalledTimes(2);
            expect(mockEnqueueRequest).nthCalledWith(
                1,
                'npm12xx low_power_ctrl shphld debounce set 50ms',
                expect.anything(),
                undefined,
                true,
            );
            expect(mockEnqueueRequest).nthCalledWith(
                2,
                'npm12xx low_power_ctrl shphld debounce get',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test('Set vbusHibernateWait - Fail immediately', async () => {
            await expect(
                pmic.lowPowerModule?.set.vbusHibernateWait?.(true),
            ).rejects.toBeUndefined();

            expect(mockEnqueueRequest).toBeCalledTimes(2);
            expect(mockEnqueueRequest).nthCalledWith(
                1,
                'npm12xx low_power_ctrl vbus hibernate_wait set on',
                expect.anything(),
                undefined,
                true,
            );
            expect(mockEnqueueRequest).nthCalledWith(
                2,
                'npm12xx low_power_ctrl vbus hibernate_wait get',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test('Set vbusStandbyPinSel - Fail immediately', async () => {
            await expect(
                pmic.lowPowerModule?.set.vbusStandbyPinSel?.('standby2'),
            ).rejects.toBeUndefined();

            expect(mockEnqueueRequest).toBeCalledTimes(2);
            expect(mockEnqueueRequest).nthCalledWith(
                1,
                'npm12xx low_power_ctrl vbus standby_pinsel set standby2',
                expect.anything(),
                undefined,
                true,
            );
            expect(mockEnqueueRequest).nthCalledWith(
                2,
                'npm12xx low_power_ctrl vbus standby_pinsel get',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });

        test('Set vbusStandbyWait - Fail immediately', async () => {
            await expect(
                pmic.lowPowerModule?.set.vbusStandbyWait?.(true),
            ).rejects.toBeUndefined();

            expect(mockEnqueueRequest).toBeCalledTimes(2);
            expect(mockEnqueueRequest).nthCalledWith(
                1,
                'npm12xx low_power_ctrl vbus standby_wait set on',
                expect.anything(),
                undefined,
                true,
            );
            expect(mockEnqueueRequest).nthCalledWith(
                2,
                'npm12xx low_power_ctrl vbus standby_wait get',
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLowPowerUpdate).toBeCalledTimes(0);
        });
    });
});

export {};
