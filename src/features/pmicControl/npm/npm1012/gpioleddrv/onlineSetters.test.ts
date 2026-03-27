/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { helpers } from '../../tests/helpers';
import { GPIOLEDDrvGPIOMode, GPIOLEDDrvGPIOState } from '../../types';
import {
    PMIC_1012_GPIOLEDDRVS,
    setupMocksWithShellParser,
} from '../tests/helpers';
import {
    gpioDriveKeys,
    gpioPolarityKeys,
    gpioPullKeys,
    ledDriveKeys,
    ledModeKeys,
} from './types';

describe('PMIC 1012 - Setters Online tests', () => {
    const { mockOnGpioLedDrvUpdate, mockEnqueueRequest, pmic } =
        setupMocksWithShellParser();

    const gpioModeTestValues: [GPIOLEDDrvGPIOMode, GPIOLEDDrvGPIOState][] = [
        ['GPIO_IN', 'Input'],
        ['GPIO_OUT_LOW', 'Output'],
    ];

    describe('Setters and effects state - success', () => {
        beforeEach(() => {
            jest.clearAllMocks();

            mockEnqueueRequest.mockImplementation(
                helpers.registerCommandCallbackSuccess,
            );
        });

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                [true, false].map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )('Set gpioDebounce index: %p', async ({ index, value }) => {
            await pmic.gpioLedDrvModule[index].set.gpioDebounce(value);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio debounce set ${index} ${value ? 'on' : 'off'}`,
                expect.anything(),
                undefined,
                true,
            );

            // Updates should only be emitted when we get response
            expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
        });

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                gpioDriveKeys.map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )('Set gpioDrive index: %p', async ({ index, value }) => {
            await pmic.gpioLedDrvModule[index].set.gpioDrive(value);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio drive set ${index} ${value}`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
        });

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                [128].map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )('Set gpioDutyCycle index: %p', async ({ index, value }) => {
            await pmic.gpioLedDrvModule[index].set.gpioDutyCycle(value);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio led duty set ${index} ${value}`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
        });

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                gpioModeTestValues.map(value => ({
                    index,
                    mode: value[0],
                    state: value[1],
                })),
            ).flat(),
        )('Set gpioMode index: %p', async ({ index, mode, state }) => {
            await pmic.gpioLedDrvModule[index].set.gpioMode(mode, state);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio function set ${index} ${mode}`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
        });

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                [true, false].map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )('Set gpioOpenDrain index: %p', async ({ index, value }) => {
            await pmic.gpioLedDrvModule[index].set.gpioOpenDrain(value);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio opendrain set ${index} ${value ? 'on' : 'off'}`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
        });

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                gpioPolarityKeys.map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )('Set gpioPolarity index: %p', async ({ index, value }) => {
            await pmic.gpioLedDrvModule[index].set.gpioPolarity(value);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio polarity set ${index} ${value}`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
        });

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                gpioPullKeys.map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )('Set gpioPull index: %p', async ({ index, value }) => {
            await pmic.gpioLedDrvModule[index].set.gpioPull(value);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio pull set ${index} ${value}`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
        });

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                ledDriveKeys.map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )('Set ledDrive index: %p', async ({ index, value }) => {
            await pmic.gpioLedDrvModule[index].set.ledDrive(value);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio led drive set ${index} ${value}`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
        });

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                [128].map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )('Set ledDutyCycle index: %p', async ({ index, value }) => {
            await pmic.gpioLedDrvModule[index].set.ledDutyCycle(value);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio led duty set ${index} ${value}`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
        });

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                ledModeKeys.map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )('Set ledMode index: %p', async ({ index, value }) => {
            await pmic.gpioLedDrvModule[index].set.ledMode(value);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio led mode set ${index} ${value}`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
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
            PMIC_1012_GPIOLEDDRVS.map(index =>
                [true, false].map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )(
            'Set gpioDebounce - Fail immediately - index: %p',
            async ({ index, value }) => {
                await expect(
                    pmic.gpioLedDrvModule[index].set.gpioDebounce(value),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 gpio debounce set ${index} ${value ? 'on' : 'off'}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                // Request update on error
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 gpio debounce get ${index}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                // Updates should only be emitted when we get response
                expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
            },
        );

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                gpioDriveKeys.map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )(
            'Set gpioDrive - Fail immediately - index: %p',
            async ({ index, value }) => {
                await expect(
                    pmic.gpioLedDrvModule[index].set.gpioDrive(value),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 gpio drive set ${index} ${value}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 gpio drive get ${index}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
            },
        );

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                [128].map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )(
            'Set gpioDutyCycle - Fail immediately - index: %p',
            async ({ index, value }) => {
                await expect(
                    pmic.gpioLedDrvModule[index].set.gpioDutyCycle(value),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 gpio led duty set ${index} ${value}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 gpio led duty get ${index}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
            },
        );

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                gpioModeTestValues.map(value => ({
                    index,
                    mode: value[0],
                    state: value[1],
                })),
            ).flat(),
        )(
            'Set gpioMode - Fail immediately - index: %p',
            async ({ index, mode, state }) => {
                await expect(
                    pmic.gpioLedDrvModule[index].set.gpioMode(mode, state),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 gpio function set ${index} ${mode}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 gpio function get ${index}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
            },
        );

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                [true, false].map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )(
            'Set gpioOpenDrain - Fail immediately - index: %p',
            async ({ index, value }) => {
                await expect(
                    pmic.gpioLedDrvModule[index].set.gpioOpenDrain(value),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 gpio opendrain set ${index} ${value ? 'on' : 'off'}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 gpio opendrain get ${index}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
            },
        );

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                gpioPolarityKeys.map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )(
            'Set gpioPolarity - Fail immediately - index: %p',
            async ({ index, value }) => {
                await expect(
                    pmic.gpioLedDrvModule[index].set.gpioPolarity(value),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 gpio polarity set ${index} ${value}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 gpio polarity get ${index}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
            },
        );

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                gpioPullKeys.map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )(
            'Set gpioPull - Fail immediately - index: %p',
            async ({ index, value }) => {
                await expect(
                    pmic.gpioLedDrvModule[index].set.gpioPull(value),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 gpio pull set ${index} ${value}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 gpio pull get ${index}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
            },
        );

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                ledDriveKeys.map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )(
            'Set ledDrive - Fail immediately - index: %p',
            async ({ index, value }) => {
                await expect(
                    pmic.gpioLedDrvModule[index].set.ledDrive(value),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 gpio led drive set ${index} ${value}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 gpio led drive get ${index}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
            },
        );

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                [128].map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )(
            'Set ledDutyCycle - Fail immediately - index: %p',
            async ({ index, value }) => {
                await expect(
                    pmic.gpioLedDrvModule[index].set.ledDutyCycle(value),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 gpio led duty set ${index} ${value}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 gpio led duty get ${index}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
            },
        );

        test.each(
            PMIC_1012_GPIOLEDDRVS.map(index =>
                ledModeKeys.map(value => ({
                    index,
                    value,
                })),
            ).flat(),
        )(
            'Set ledMode - Fail immediately - index: %p',
            async ({ index, value }) => {
                await expect(
                    pmic.gpioLedDrvModule[index].set.ledMode(value),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 gpio led mode set ${index} ${value}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 gpio led mode get ${index}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(0);
            },
        );
    });
});

export {};
