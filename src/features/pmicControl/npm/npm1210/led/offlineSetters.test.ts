/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { PMIC_1210_LEDS, setupMocksBase } from '../tests/helpers';

// UI should get update events immediately and not wait for feedback from shell responses when offline as there is no shell
describe('PMIC 1210 - Setters Offline tests', () => {
    const { mockOnLEDUpdate, pmic } = setupMocksBase();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(PMIC_1210_LEDS)(
        'Set ledBlinkContinuous index: %p',
        async index => {
            await pmic.ledModule[index].set.blinkContinuous?.(true);

            expect(mockOnLEDUpdate).toBeCalledTimes(1);
            expect(mockOnLEDUpdate).toBeCalledWith({
                data: { blinkContinuous: true },
                index,
            });
        },
    );

    test.each(PMIC_1210_LEDS)('Set ledBlinkDouble index: %p', async index => {
        await pmic.ledModule[index].set.blinkDouble?.(true);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: { blinkDouble: true },
            index,
        });
    });

    test.each(PMIC_1210_LEDS)('Set ledBlinkTimeOff index: %p', async index => {
        await pmic.ledModule[index].set.blinkTimeOff?.(1024);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: { blinkTimeOff: 1024 },
            index,
        });
    });

    test.each(PMIC_1210_LEDS)('Set ledBlinkTimeOn index: %p', async index => {
        await pmic.ledModule[index].set.blinkTimeOn?.(1024);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: { blinkTimeOn: 1024 },
            index,
        });
    });

    test.each(PMIC_1210_LEDS)('Set ledDrive index: %p', async index => {
        await pmic.ledModule[index].set.drive?.('5mA');

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: { drive: '5mA' },
            index,
        });
    });

    test.each(PMIC_1210_LEDS)('Set ledDutyCycle index: %p', async index => {
        await pmic.ledModule[index].set.dutyCycle?.(2);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: { dutyCycle: 2 },
            index,
        });
    });

    test.each(PMIC_1210_LEDS)('Set ledMode index: %p', async index => {
        await pmic.ledModule[index].set.mode?.('blink');

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: {
                mode: 'blink',
            },
            index,
        });
    });

    test.each(PMIC_1210_LEDS)('Set ledPwmFrequency index: %p', async index => {
        await pmic.ledModule[index].set.pwmFrequency?.('488Hz');

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: { pwmFrequency: '488Hz' },
            index,
        });
    });

    test.each(PMIC_1210_LEDS)(
        'Set ledRgbPhaseShifting index: %p',
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
