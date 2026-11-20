/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { PMIC_1210_LEDS, setupMocksWithShellParser } from '../tests/helpers';

describe('PMIC 1210 - Request update commands', () => {
    const { mockEnqueueRequest, pmic } = setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(PMIC_1210_LEDS)('Get ledBlinkContinuous index: %p', index => {
        pmic.ledModule[index].get.blinkContinuous?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'npm12xx led blink continuous get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test.each(PMIC_1210_LEDS)('Get ledBlinkDouble index: %p', index => {
        pmic.ledModule[index].get.blinkDouble?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'npm12xx led blink double get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test.each(PMIC_1210_LEDS)('Get ledBlinkTimeOff index: %p', index => {
        pmic.ledModule[index].get.blinkTimeOff?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'npm12xx led blink timeoff get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test.each(PMIC_1210_LEDS)('Get ledBlinkTimeOn index: %p', index => {
        pmic.ledModule[index].get.blinkTimeOn?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'npm12xx led blink timeon get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test.each(PMIC_1210_LEDS)('Get ledDrive index: %p', index => {
        pmic.ledModule[index].get.drive?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx led drive get ${index}`,
            expect.anything(),
            undefined,
            true,
        );
    });

    test.each(PMIC_1210_LEDS)('Get ledDuty index: %p', index => {
        pmic.ledModule[index].get.dutyCycle?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx led duty get ${index}`,
            expect.anything(),
            undefined,
            true,
        );
    });

    test.each(PMIC_1210_LEDS)('Get ledMode index: %p', index => {
        pmic.ledModule[index].get.mode?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx led mode get ${index}`,
            expect.anything(),
            undefined,
            true,
        );
    });

    test.each(PMIC_1210_LEDS)('Get ledPwmFrequency index: %p', index => {
        pmic.ledModule[index].get.pwmFrequency?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'npm12xx led pwmfreq get',
            expect.anything(),
            undefined,
            true,
        );
    });

    test.each(PMIC_1210_LEDS)('Get ledRgbPhaseShifting index: %p', index => {
        pmic.ledModule[index].get.rgbPhaseShifting?.();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            'npm12xx led phaseshift get',
            expect.anything(),
            undefined,
            true,
        );
    });
});

export {};
