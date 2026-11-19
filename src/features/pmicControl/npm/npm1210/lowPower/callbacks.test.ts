/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type LowPowerConfig } from '../../types';
import { setupMocksWithShellParser } from '../tests/helpers';
import {
    shipVBusFiltKeys,
    shipVBusFiltTimeKeys,
    shpHldSliderKeys,
    shpHldSlideSwitchDelayKeys,
    shpHldSlideSwitchPollTimeKeys,
    shpHldTypeKeys,
    timeToActiveKeys,
    vBusStandbyPinSelKeys,
} from './types';

describe('PMIC 1210 - Command callbacks', () => {
    const { eventHandlers, mockOnReboot, mockOnLowPowerUpdate } =
        setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(['ship_mode set on', 'vbat state set hibernate'])(
        'npm12xx low_power_ctrl %p',
        mode => {
            const command = `npm12xx low_power_ctrl ${mode}`;
            const callback =
                eventHandlers.mockRegisterCommandCallbackHandler(command);

            callback?.onSuccess(`Value: ${mode}`, command);

            expect(mockOnReboot).toBeCalledTimes(1);
            expect(mockOnReboot).toBeCalledWith(true);
        },
    );

    test.each(
        [false, true].flatMap(value => [
            { append: 'get', expected: value },
            { append: `set ${value ? 'on' : 'off'}`, expected: value },
        ]),
    )(
        'npm12xx low_power_ctrl shphld hibernate_wakeup %p',
        ({ append, expected }) => {
            const command = `npm12xx low_power_ctrl shphld hibernate_wakeup ${append}`;
            const callback =
                eventHandlers.mockRegisterCommandCallbackHandler(command);

            callback?.onSuccess(`Value: ${expected ? 'on' : 'off'}`, command);

            expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
            expect(mockOnLowPowerUpdate).toBeCalledWith({
                hibernateWakeupByButton: expected,
            } satisfies Partial<LowPowerConfig>);
        },
    );

    test.each(
        shipVBusFiltKeys.flatMap(value => [
            { append: 'get', expected: value },
            { append: `set ${value}`, expected: value },
        ]),
    )('npm12xx low_power_ctrl vbus shipfilt %p', ({ append, expected }) => {
        const command = `npm12xx low_power_ctrl vbus shipfilt ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${expected}`, command);

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            shipVBusFilt: expected,
        } satisfies Partial<LowPowerConfig>);
    });

    test.each(
        shipVBusFiltTimeKeys.flatMap(value => [
            { append: 'get', expected: value },
            { append: `set ${value}`, expected: value },
        ]),
    )('npm12xx low_power_ctrl vbus shipfiltset %p', ({ append, expected }) => {
        const command = `npm12xx low_power_ctrl vbus shipfiltset ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${expected}`, command);

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            shipVBusFiltTime: expected,
        } satisfies Partial<LowPowerConfig>);
    });

    test.each(
        shpHldSlideSwitchDelayKeys.flatMap(value => [
            { append: 'get', expected: value },
            { append: `set ${value}`, expected: value },
        ]),
    )('npm12xx low_power_ctrl shphld delay %p', ({ append, expected }) => {
        const command = `npm12xx low_power_ctrl shphld delay ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${expected}`, command);

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            shpHldSlideSwitchDelay: expected,
        } satisfies Partial<LowPowerConfig>);
    });

    test.each(
        shpHldSlideSwitchPollTimeKeys.flatMap(value => [
            { append: 'get', expected: value },
            { append: `set ${value}`, expected: value },
        ]),
    )('npm12xx low_power_ctrl shphld polltime %p', ({ append, expected }) => {
        const command = `npm12xx low_power_ctrl shphld polltime ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${expected}`, command);

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            shpHldSlideSwitchPollTime: expected,
        } satisfies Partial<LowPowerConfig>);
    });

    test.each(
        shpHldSliderKeys.flatMap(value => [
            { append: 'get', expected: value },
            { append: `set ${value}`, expected: value },
        ]),
    )('npm12xx low_power_ctrl shphld slider %p', ({ append, expected }) => {
        const command = `npm12xx low_power_ctrl shphld slider ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${expected}`, command);

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            shpHldSlider: expected,
        } satisfies Partial<LowPowerConfig>);
    });

    test.each(
        shpHldTypeKeys.flatMap(value => [
            { append: 'get', expected: value },
            { append: `set ${value}`, expected: value },
        ]),
    )('npm12xx low_power_ctrl shphld type %p', ({ append, expected }) => {
        const command = `npm12xx low_power_ctrl shphld type ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${expected}`, command);

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            shpHldType: expected,
        } satisfies Partial<LowPowerConfig>);
    });

    test.each(
        [false, true].flatMap(value => [
            { append: 'get', expected: value },
            { append: `set ${value ? 'on' : 'off'}`, expected: value },
        ]),
    )(
        'npm12xx low_power_ctrl suspend_pin pull_down %p',
        ({ append, expected }) => {
            const command = `npm12xx low_power_ctrl suspend_pin pull_down ${append}`;
            const callback =
                eventHandlers.mockRegisterCommandCallbackHandler(command);

            callback?.onSuccess(`Value: ${expected ? 'on' : 'off'}`, command);

            expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
            expect(mockOnLowPowerUpdate).toBeCalledWith({
                suspendPinPullDown: expected,
            } satisfies Partial<LowPowerConfig>);
        },
    );

    test.each(
        timeToActiveKeys
            .map(key => [
                { append: `get`, expected: key },
                { append: `set ${key}`, expected: key },
            ])
            .flat(),
    )('npm12xx low_power_ctrl shphld debounce %p', ({ append, expected }) => {
        const command = `npm12xx low_power_ctrl shphld debounce ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${expected}`, command);

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            timeToActive: expected,
        });
    });

    test.each(
        [false, true].flatMap(value => [
            { append: 'get', expected: value },
            { append: `set ${value ? 'on' : 'off'}`, expected: value },
        ]),
    )(
        'npm12xx low_power_ctrl vbus hibernate_wait %p',
        ({ append, expected }) => {
            const command = `npm12xx low_power_ctrl vbus hibernate_wait ${append}`;
            const callback =
                eventHandlers.mockRegisterCommandCallbackHandler(command);

            callback?.onSuccess(`Value: ${expected ? 'on' : 'off'}`, command);

            expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
            expect(mockOnLowPowerUpdate).toBeCalledWith({
                vbusHibernateWait: expected,
            } satisfies Partial<LowPowerConfig>);
        },
    );

    test.each(
        vBusStandbyPinSelKeys.flatMap(value => [
            { append: 'get', expected: value },
            { append: `set ${value}`, expected: value },
        ]),
    )(
        'npm12xx low_power_ctrl vbus standby_pinsel %p',
        ({ append, expected }) => {
            const command = `npm12xx low_power_ctrl vbus standby_pinsel ${append}`;
            const callback =
                eventHandlers.mockRegisterCommandCallbackHandler(command);

            callback?.onSuccess(`Value: ${expected}`, command);

            expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
            expect(mockOnLowPowerUpdate).toBeCalledWith({
                vbusStandbyPinSel: expected,
            } satisfies Partial<LowPowerConfig>);
        },
    );

    test.each(
        [false, true].flatMap(value => [
            { append: 'get', expected: value },
            { append: `set ${value ? 'on' : 'off'}`, expected: value },
        ]),
    )('npm12xx low_power_ctrl vbus standby_wait %p', ({ append, expected }) => {
        const command = `npm12xx low_power_ctrl vbus standby_wait ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${expected ? 'on' : 'off'}`, command);

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith({
            vbusStandbyWait: expected,
        } satisfies Partial<LowPowerConfig>);
    });

    test.each([
        {
            expected: {
                vbusHibernateWaitingForChargeComplete: false,
                vbusStandbyWaitingForChargeComplete: false,
            } satisfies Partial<LowPowerConfig>,
            response: 'No_request',
        },
        {
            expected: {
                vbusHibernateWaitingForChargeComplete: true,
                vbusStandbyWaitingForChargeComplete: true,
            } satisfies Partial<LowPowerConfig>,
            response: 'Hibernate_waiting,Standby_waiting',
        },
    ])('npm12xx low_power_ctrl vbus status %p', ({ expected, response }) => {
        const command = `npm12xx low_power_ctrl vbus status get`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${response}`, command);

        expect(mockOnLowPowerUpdate).toBeCalledTimes(1);
        expect(mockOnLowPowerUpdate).toBeCalledWith(expected);
    });
});

export {};
