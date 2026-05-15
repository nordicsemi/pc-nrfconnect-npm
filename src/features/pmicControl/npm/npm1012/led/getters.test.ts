/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { PMIC_1012_LEDS, setupMocksWithShellParser } from '../tests/helpers';

describe('PMIC 1012 - Request update commands', () => {
    const { mockEnqueueRequest, pmic } = setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(PMIC_1012_LEDS)('Get ledBlinkContinuous index: %p', index => {
        pmic.ledModule[index].get.blinkContinuous?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'npm1012 gpio led blink continuous get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test.each(PMIC_1012_LEDS)('Get ledBlinkDouble index: %p', index => {
        pmic.ledModule[index].get.blinkDouble?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'npm1012 gpio led blink double get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test.each(PMIC_1012_LEDS)('Get ledBlinkTimeOff index: %p', index => {
        pmic.ledModule[index].get.blinkTimeOff?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'npm1012 gpio led blink timeoff get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test.each(PMIC_1012_LEDS)('Get ledBlinkTimeOn index: %p', index => {
        pmic.ledModule[index].get.blinkTimeOn?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'npm1012 gpio led blink timeon get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test.each(PMIC_1012_LEDS)('Get ledPwmFrequency index: %p', index => {
        pmic.ledModule[index].get.pwmFrequency?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'npm1012 gpio led pwmfreq get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test.each(PMIC_1012_LEDS)('Get ledRgbPhaseShifting index: %p', index => {
        pmic.ledModule[index].get.rgbPhaseShifting?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'npm1012 gpio led phaseshift get',
            expect.anything(),
            undefined,
            true,
        );
    });
});

export {};
