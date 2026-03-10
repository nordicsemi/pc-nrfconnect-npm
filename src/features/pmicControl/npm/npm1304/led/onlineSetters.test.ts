/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { modeValues } from '../../npm1300/led/types';
import { helpers } from '../../tests/helpers';
import { PMIC_1304_LEDS, setupMocksWithShellParser } from '../tests/helpers';

describe('PMIC 1304 - Setters Online tests', () => {
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
            PMIC_1304_LEDS.map(index =>
                modeValues.map((mode, modeIndex) => ({
                    index,
                    mode,
                    modeIndex,
                })),
            ).flat(),
        )('Set ledMode index: %p', async ({ index, mode, modeIndex }) => {
            await pmic.ledModule[index].set.mode?.(mode);

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npmx led mode set ${index} ${modeIndex}`,
                expect.anything(),
                undefined,
                true,
            );

            // Updates should only be emitted when we get response
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
            PMIC_1304_LEDS.map(index =>
                modeValues.map((mode, modeIndex) => ({
                    index,
                    mode,
                    modeIndex,
                })),
            ).flat(),
        )(
            'Set ledMode - Fail immediately - index: %p',
            async ({ index, mode, modeIndex }) => {
                await expect(
                    pmic.ledModule[index].set.mode?.(mode),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npmx led mode set ${index} ${modeIndex}`,
                    expect.anything(),
                    undefined,
                    true,
                );

                // Request update on error
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npmx led mode get ${index}`,
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
