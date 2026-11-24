/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { PMIC_1210_LEDS, setupMocksWithShellParser } from '../tests/helpers';
import { configCardIndex, driveKeys, modeKeys } from './types';

describe('PMIC 1210 - Command callbacks', () => {
    const { eventHandlers, mockOnLEDUpdate } = setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(
        PMIC_1210_LEDS.flatMap(index =>
            driveKeys.flatMap(value => [
                {
                    index,
                    append: `get ${index}`,
                    value,
                },
                {
                    index,
                    append: `set ${index} ${value}`,
                    value,
                },
            ]),
        ),
    )('npm12xx led drive %p', ({ index, append, value }) => {
        const command = `npm12xx led drive ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: { drive: value },
            index,
        });
    });

    test.each(
        PMIC_1210_LEDS.flatMap(index =>
            [1].flatMap(value => [
                {
                    index,
                    append: `get ${index}`,
                    value,
                },
                {
                    index,
                    append: `set ${index} ${value}`,
                    value,
                },
            ]),
        ),
    )('npm12xx led duty %p', ({ index, append, value }) => {
        const command = `npm12xx led duty ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: { dutyCycle: value },
            index,
        });
    });

    test.each(
        PMIC_1210_LEDS.flatMap(index =>
            modeKeys.flatMap(value => [
                {
                    index,
                    append: `get ${index}`,
                    value,
                },
                {
                    index,
                    append: `set ${index} ${value}`,
                    value,
                },
            ]),
        ),
    )('npm12xx led mode %p', ({ index, append, value }) => {
        const command = `npm12xx led mode ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: { mode: value },
            index,
        });
    });

    test.each(
        [configCardIndex].flatMap(index =>
            [true, false].flatMap(value => [
                {
                    index,
                    append: 'get',
                    value,
                },
                {
                    index,
                    append: `set ${value ? 'on' : 'off'}`,
                    value,
                },
            ]),
        ),
    )('npm12xx led blink continuous %p', ({ index, append, value }) => {
        const command = `npm12xx led blink continuous ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value ? 'on' : 'off'}`, command);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: { blinkContinuous: value },
            index,
        });
    });

    test.each(
        [configCardIndex]
            .map(index =>
                [true, false]
                    .map(value => [
                        {
                            index,
                            append: 'get',
                            value,
                        },
                        {
                            index,
                            append: `set ${value ? 'on' : 'off'}`,
                            value,
                        },
                    ])
                    .flat(),
            )
            .flat(),
    )('npm12xx led blink double %p', ({ index, append, value }) => {
        const command = `npm12xx led blink double ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value ? 'on' : 'off'}`, command);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: { blinkDouble: value },
            index,
        });
    });

    test.each(
        [configCardIndex]
            .map(index =>
                [1024]
                    .map(value => [
                        {
                            index,
                            append: 'get',
                            value,
                        },
                        {
                            index,
                            append: `set ${value}`,
                            value,
                        },
                    ])
                    .flat(),
            )
            .flat(),
    )('npm12xx led blink timeon %p', ({ index, append, value }) => {
        const command = `npm12xx led blink timeon ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: {
                blinkTimeOn: value,
            },
            index,
        });
    });

    test.each(
        [configCardIndex]
            .map(index =>
                [1024]
                    .map(value => [
                        {
                            index,
                            append: 'get',
                            value,
                        },
                        {
                            index,
                            append: `set ${value}`,
                            value,
                        },
                    ])
                    .flat(),
            )
            .flat(),
    )('npm12xx led blink timeoff %p', ({ index, append, value }) => {
        const command = `npm12xx led blink timeoff ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: {
                blinkTimeOff: value,
            },
            index,
        });
    });

    test.each(
        [configCardIndex]
            .map(index =>
                ['488Hz']
                    .map(value => [
                        {
                            index,
                            append: 'get',
                            value,
                        },
                        {
                            index,
                            append: `set ${value}`,
                            value,
                        },
                    ])
                    .flat(),
            )
            .flat(),
    )('npm12xx led pwmfreq %p', ({ index, append, value }) => {
        const command = `npm12xx led pwmfreq ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: {
                pwmFrequency: value,
            },
            index,
        });
    });

    test.each(
        [configCardIndex]
            .map(index =>
                [true, false]
                    .map(value => [
                        {
                            index,
                            append: 'get',
                            value,
                        },
                        {
                            index,
                            append: `set ${value ? 'on' : 'off'}`,
                            value,
                        },
                    ])
                    .flat(),
            )
            .flat(),
    )('npm12xx led phaseshift %p', ({ index, append, value }) => {
        const command = `npm12xx led phaseshift ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value ? 'on' : 'off'}`, command);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: { rgbPhaseShifting: value },
            index,
        });
    });
});

export {};
