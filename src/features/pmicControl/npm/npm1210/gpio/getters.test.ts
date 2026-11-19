/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { PMIC_1210_GPIOS, setupMocksWithShellParser } from '../tests/helpers';

describe('PMIC 1210 - Request update commands', () => {
    const { mockEnqueueRequest, pmic } = setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(PMIC_1210_GPIOS)(
        'Request update gpioDebounce index: %p',
        index => {
            pmic.gpioModule[index].get.debounce();

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm12xx gpio debounce get ${index}`,
                expect.anything(),
                undefined,
                true,
            );
        },
    );

    test.each(PMIC_1210_GPIOS)('Request update gpioDrive index: %p', index => {
        pmic.gpioModule[index].get.drive();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx gpio drive get ${index}`,
            expect.anything(),
            undefined,
            true,
        );
    });

    test.each(PMIC_1210_GPIOS)('Request update gpioMode index: %p', index => {
        pmic.gpioModule[index].get.mode();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx gpio function get ${index}`,
            expect.anything(),
            undefined,
            true,
        );
    });

    test.each(PMIC_1210_GPIOS)(
        'Request update gpioOpenDrain index: %p',
        index => {
            pmic.gpioModule[index].get.openDrain();

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm12xx gpio opendrain get ${index}`,
                expect.anything(),
                undefined,
                true,
            );
        },
    );

    test.each(PMIC_1210_GPIOS)(
        'Request update gpioPolarity index: %p',
        index => {
            pmic.gpioModule[index].get.polarity?.();

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm12xx gpio polarity get ${index}`,
                expect.anything(),
                undefined,
                true,
            );
        },
    );

    test.each(PMIC_1210_GPIOS)('Request update gpioPull index: %p', index => {
        pmic.gpioModule[index].get.pull();

        expect(mockEnqueueRequest).toBeCalledTimes(1);
        expect(mockEnqueueRequest).toBeCalledWith(
            `npm12xx gpio pull get ${index}`,
            expect.anything(),
            undefined,
            true,
        );
    });
});

export {};
