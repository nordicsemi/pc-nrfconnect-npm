/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { PMIC_1012_LEDS, setupMocksBase } from '../tests/helpers';

// UI should get update events immediately and not wait for feedback from shell responses when offline as there is no shell
describe('PMIC 1012 - Setters Offline tests', () => {
    const { mockOnLEDUpdate, pmic } = setupMocksBase();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(PMIC_1012_LEDS)(
        'Set setLedBlinkContinuous index: %p',
        async index => {
            await pmic.ledModule[index].set.blinkContinuous?.(true);

            expect(mockOnLEDUpdate).toBeCalledTimes(1);
            expect(mockOnLEDUpdate).toBeCalledWith({
                data: { blinkContinuous: true },
                index,
            });
        },
    );

    test.each(PMIC_1012_LEDS)(
        'Set setLedBlinkDouble index: %p',
        async index => {
            await pmic.ledModule[index].set.blinkDouble?.(true);

            expect(mockOnLEDUpdate).toBeCalledTimes(1);
            expect(mockOnLEDUpdate).toBeCalledWith({
                data: { blinkDouble: true },
                index,
            });
        },
    );

    test.each(PMIC_1012_LEDS)(
        'Set setLedBlinkTimeOff index: %p',
        async index => {
            await pmic.ledModule[index].set.blinkTimeOff?.(1024);

            expect(mockOnLEDUpdate).toBeCalledTimes(1);
            expect(mockOnLEDUpdate).toBeCalledWith({
                data: { blinkTimeOff: 1024 },
                index,
            });
        },
    );

    test.each(PMIC_1012_LEDS)(
        'Set setLedBlinkTimeOn index: %p',
        async index => {
            await pmic.ledModule[index].set.blinkTimeOn?.(1024);

            expect(mockOnLEDUpdate).toBeCalledTimes(1);
            expect(mockOnLEDUpdate).toBeCalledWith({
                data: { blinkTimeOn: 1024 },
                index,
            });
        },
    );

    test.each(PMIC_1012_LEDS)(
        'Set setLedPwmFrequency index: %p',
        async index => {
            await pmic.ledModule[index].set.pwmFrequency?.(488);

            expect(mockOnLEDUpdate).toBeCalledTimes(1);
            expect(mockOnLEDUpdate).toBeCalledWith({
                data: { pwmFrequency: 488 },
                index,
            });
        },
    );

    test.each(PMIC_1012_LEDS)(
        'Set setLedRgbPhaseShifting index: %p',
        async index => {
            await pmic.ledModule[index].set.rgbPhaseShifting?.(true);

            expect(mockOnLEDUpdate).toBeCalledTimes(1);
            expect(mockOnLEDUpdate).toBeCalledWith({
                data: { rgbPhaseShifting: true },
                index,
            });
        },
    );
});

export {};
