/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { helpers } from '../../tests/helpers';
import { PMIC_1012_LEDS, setupMocksWithShellParser } from '../tests/helpers';

describe('PMIC 1012 - Setters Online tests', () => {
    const { mockOnLEDUpdate, mockEnqueueRequest, pmic } =
        setupMocksWithShellParser();

    describe('Setters and effects state - success', () => {
        beforeEach(() => {
            jest.clearAllMocks();

            mockEnqueueRequest.mockImplementation(
                helpers.registerCommandCallbackSuccess,
            );
        });

        test.each(
            PMIC_1012_LEDS.map(index =>
                [true, false].map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )('Set ledBlinkContinuous index: %p', async ({ index, value }) => {
            await pmic.ledModule[index].set.blinkContinuous?.(value);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio led blink continuous set ${value ? 'on' : 'off'}`,
                expect.anything(),
                undefined,
                true,
            );

            // Updates should only be emitted when we get response
            expect(mockOnLEDUpdate).toBeCalledTimes(0);
        });

        test.each(
            PMIC_1012_LEDS.map(index =>
                [true, false].map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )('Set ledBlinkDouble index: %p', async ({ index, value }) => {
            await pmic.ledModule[index].set.blinkDouble?.(value);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio led blink double set ${value ? 'on' : 'off'}`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLEDUpdate).toBeCalledTimes(0);
        });

        test.each(PMIC_1012_LEDS)(
            'Set ledBlinkTimeOff index: %p',
            async index => {
                await pmic.ledModule[index].set.blinkTimeOff?.(1024);

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    'npm1012 gpio led blink timeoff set 1024ms',
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnLEDUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_LEDS)(
            'Set ledBlinkTimeOn index: %p',
            async index => {
                await pmic.ledModule[index].set.blinkTimeOn?.(1024);

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    'npm1012 gpio led blink timeon set 1024ms',
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnLEDUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_LEDS)(
            'Set ledPwmFrequency index: %p',
            async index => {
                await pmic.ledModule[index].set.pwmFrequency?.(488);

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    'npm1012 gpio led pwmfreq set 488Hz',
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnLEDUpdate).toBeCalledTimes(0);
            },
        );

        test.each(
            PMIC_1012_LEDS.map(index =>
                [true, false].map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )('Set ledRgbPhaseShifting index: %p', async ({ index, value }) => {
            await pmic.ledModule[index].set.rgbPhaseShifting?.(value);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio led phaseshift set ${value ? 'on' : 'off'}`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnLEDUpdate).toBeCalledTimes(0);
        });
    });

    describe('Setters and effects state - error', () => {
        beforeEach(() => {
            jest.clearAllMocks();

            mockEnqueueRequest.mockImplementation(
                helpers.registerCommandCallbackError,
            );
        });

        test.each(
            PMIC_1012_LEDS.map(index =>
                [true, false].map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )(
            'Set ledBlinkContinuous - Fail immediately - index: %p',
            async ({ index, value }) => {
                await expect(
                    pmic.ledModule[index].set.blinkContinuous?.(value),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 gpio led blink continuous set ${value ? 'on' : 'off'}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                // Request update on error
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    'npm1012 gpio led blink continuous get',
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnLEDUpdate).toBeCalledTimes(0);
            },
        );

        test.each(
            PMIC_1012_LEDS.map(index =>
                [true, false].map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )(
            'Set ledBlinkDouble - Fail immediately - index: %p',
            async ({ index, value }) => {
                await expect(
                    pmic.ledModule[index].set.blinkDouble?.(value),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 gpio led blink double set ${value ? 'on' : 'off'}`,
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    'npm1012 gpio led blink double get',
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnLEDUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_LEDS)(
            'Set ledBlinkTimeOff - Fail immediately - index: %p',
            async index => {
                await expect(
                    pmic.ledModule[index].set.blinkTimeOff?.(1024),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    'npm1012 gpio led blink timeoff set 1024ms',
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    'npm1012 gpio led blink timeoff get',
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnLEDUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_LEDS)(
            'Set ledBlinkTimeOn - Fail immediately - index: %p',
            async index => {
                await expect(
                    pmic.ledModule[index].set.blinkTimeOn?.(1024),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    'npm1012 gpio led blink timeon set 1024ms',
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    'npm1012 gpio led blink timeon get',
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnLEDUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_LEDS)(
            'Set ledPwmFrequency - Fail immediately - index: %p',
            async index => {
                await expect(
                    pmic.ledModule[index].set.pwmFrequency?.(488),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    'npm1012 gpio led pwmfreq set 488Hz',
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    'npm1012 gpio led pwmfreq get',
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnLEDUpdate).toBeCalledTimes(0);
            },
        );

        test.each(
            PMIC_1012_LEDS.map(index =>
                [true, false].map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )(
            'Set ledRgbPhaseShifting - Fail immediately - index: %p',
            async ({ index, value }) => {
                await expect(
                    pmic.ledModule[index].set.rgbPhaseShifting?.(value),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 gpio led phaseshift set ${value ? 'on' : 'off'}`,
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    'npm1012 gpio led phaseshift get',
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnLEDUpdate).toBeCalledTimes(0);
            },
        );
    });
});

export {};
