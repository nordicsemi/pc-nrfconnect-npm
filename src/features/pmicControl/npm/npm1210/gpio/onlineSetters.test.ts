/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { helpers } from '../../tests/helpers';
import { type PmicDialog } from '../../types';
import { PMIC_1210_GPIOS, setupMocksWithShellParser } from '../tests/helpers';
import { driveKeys, modeKeys, pullKeys } from './types';

describe('PMIC 1210 - Setters Online tests', () => {
    const { mockDialogHandler, mockOnGpioUpdate, mockEnqueueRequest, pmic } =
        setupMocksWithShellParser();
    describe('Setters and effects state - success', () => {
        beforeEach(() => {
            jest.clearAllMocks();

            mockEnqueueRequest.mockImplementation(
                helpers.registerCommandCallbackSuccess,
            );
        });

        test.each(
            PMIC_1210_GPIOS.map(index =>
                [true, false].map(debounce => ({
                    index,
                    debounce,
                })),
            ).flat(),
        )('Set gpioDebounce index: %p', async ({ index, debounce }) => {
            await pmic.gpioModule[index].set.debounce(debounce);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm12xx gpio debounce set ${index} ${debounce ? 'on' : 'off'}`,
                expect.anything(),
                undefined,
                true,
            );

            // Updates should only be emitted when we get response
            expect(mockOnGpioUpdate).toBeCalledTimes(0);
        });

        test.each(
            PMIC_1210_GPIOS.map(index =>
                driveKeys.map(drive => ({
                    index,
                    drive,
                })),
            ).flat(),
        )('Set gpioDrive index: %p', async ({ index, drive }) => {
            await pmic.gpioModule[index].set.drive(drive);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm12xx gpio drive set ${index} ${drive}`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnGpioUpdate).toBeCalledTimes(0);
        });

        test.each(
            PMIC_1210_GPIOS.map(index =>
                [true, false].map(openDrain => ({
                    index,
                    openDrain,
                })),
            ).flat(),
        )('Set gpioOpenDrain index: %p', async ({ index, openDrain }) => {
            await pmic.gpioModule[index].set.openDrain(openDrain);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm12xx gpio opendrain set ${index} ${
                    openDrain ? 'on' : 'off'
                }`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnGpioUpdate).toBeCalledTimes(0);
        });

        test.each(
            PMIC_1210_GPIOS.map(index =>
                modeKeys.map(mode => ({
                    index,
                    mode,
                })),
            ).flat(),
        )('Set gpioMode index: %p', async ({ index, mode }) => {
            await pmic.gpioModule[index].set.mode(mode);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm12xx gpio function set ${index} ${mode}`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnGpioUpdate).toBeCalledTimes(0);
        });

        test.each(
            PMIC_1210_GPIOS.map(index =>
                pullKeys.map(pull => ({
                    index,
                    pull,
                })),
            ).flat(),
        )('Set gpioPull index: %p', async ({ index, pull }) => {
            await pmic.gpioModule[index].set.pull(pull);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm12xx gpio pull set ${index} ${pull}`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnGpioUpdate).toBeCalledTimes(0);
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
            PMIC_1210_GPIOS.map(index =>
                modeKeys.map(mode => ({
                    index,
                    mode,
                })),
            ).flat(),
        )(
            'Set gpioMode - Fail immediately - index: %p',
            async ({ index, mode }) => {
                mockDialogHandler.mockImplementationOnce(
                    (dialog: PmicDialog) => {
                        dialog.onConfirm();
                    },
                );

                await expect(
                    pmic.gpioModule[index].set.mode(mode),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm12xx gpio function set ${index} ${mode}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                // Request update on error
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm12xx gpio function get ${index}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                // Updates should only be emitted when we get response
                expect(mockOnGpioUpdate).toBeCalledTimes(0);
            },
        );

        test.each(
            PMIC_1210_GPIOS.map(index =>
                driveKeys.map(drive => ({
                    index,
                    drive,
                })),
            ).flat(),
        )(
            'Set gpioDrive - Fail immediately - index: %p',
            async ({ index, drive }) => {
                mockDialogHandler.mockImplementationOnce(
                    (dialog: PmicDialog) => {
                        dialog.onConfirm();
                    },
                );

                await expect(
                    pmic.gpioModule[index].set.drive(drive),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm12xx gpio drive set ${index} ${drive}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm12xx gpio drive get ${index}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnGpioUpdate).toBeCalledTimes(0);
            },
        );

        test.each(
            PMIC_1210_GPIOS.map(index =>
                pullKeys.map(pull => ({
                    index,
                    pull,
                })),
            ).flat(),
        )(
            'Set gpioPull - Fail immediately - index: %p',
            async ({ index, pull }) => {
                mockDialogHandler.mockImplementationOnce(
                    (dialog: PmicDialog) => {
                        dialog.onConfirm();
                    },
                );

                await expect(
                    pmic.gpioModule[index].set.pull(pull),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm12xx gpio pull set ${index} ${pull}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm12xx gpio pull get ${index}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnGpioUpdate).toBeCalledTimes(0);
            },
        );

        test.each(
            PMIC_1210_GPIOS.map(index =>
                [true, false].map(debounce => ({
                    index,
                    debounce,
                })),
            ).flat(),
        )(
            'Set gpioDebounce - Fail immediately - index: %p',
            async ({ index, debounce }) => {
                mockDialogHandler.mockImplementationOnce(
                    (dialog: PmicDialog) => {
                        dialog.onConfirm();
                    },
                );

                await expect(
                    pmic.gpioModule[index].set.debounce(debounce),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm12xx gpio debounce set ${index} ${
                        debounce ? 'on' : 'off'
                    }`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm12xx gpio debounce get ${index}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnGpioUpdate).toBeCalledTimes(0);
            },
        );

        test.each(
            PMIC_1210_GPIOS.map(index =>
                [true, false].map(openDrain => ({
                    index,
                    openDrain,
                })),
            ).flat(),
        )(
            'Set gpioOpenDrain - Fail immediately - index: %p',
            async ({ index, openDrain }) => {
                mockDialogHandler.mockImplementationOnce(
                    (dialog: PmicDialog) => {
                        dialog.onConfirm();
                    },
                );

                await expect(
                    pmic.gpioModule[index].set.openDrain(openDrain),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm12xx gpio opendrain set ${index} ${
                        openDrain ? 'on' : 'off'
                    }`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm12xx gpio opendrain get ${index}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnGpioUpdate).toBeCalledTimes(0);
            },
        );
    });
});

export {};
