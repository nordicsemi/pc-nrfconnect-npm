/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    PMIC_1012_GPIOLEDDRVS,
    setupMocksWithShellParser,
} from '../tests/helpers';

describe('PMIC 1012 - Request update commands', () => {
    const { mockEnqueueRequest, pmic } = setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(PMIC_1012_GPIOLEDDRVS)(
        'Request update gpioDebounce index: %p',
        index => {
            pmic.gpioLedDrvModule[index].get.gpioDebounce();

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio debounce get ${index}`,
                expect.anything(),
                undefined,
                true,
            );
        },
    );

    test.each(PMIC_1012_GPIOLEDDRVS)(
        'Request update gpioDrive index: %p',
        index => {
            pmic.gpioLedDrvModule[index].get.gpioDrive();

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio drive get ${index}`,
                expect.anything(),
                undefined,
                true,
            );
        },
    );

    test.each(PMIC_1012_GPIOLEDDRVS)(
        'Request update gpioDutyCycle index: %p',
        index => {
            pmic.gpioLedDrvModule[index].get.gpioDutyCycle();

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio led duty get ${index}`,
                expect.anything(),
                undefined,
                true,
            );
        },
    );

    test.each(PMIC_1012_GPIOLEDDRVS)(
        'Request update gpioMode index: %p',
        index => {
            pmic.gpioLedDrvModule[index].get.gpioMode();

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio function get ${index}`,
                expect.anything(),
                undefined,
                true,
            );
        },
    );

    test.each(PMIC_1012_GPIOLEDDRVS)(
        'Request update gpioOpendrain index: %p',
        index => {
            pmic.gpioLedDrvModule[index].get.gpioOpenDrain();

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio opendrain get ${index}`,
                expect.anything(),
                undefined,
                true,
            );
        },
    );

    test.each(PMIC_1012_GPIOLEDDRVS)(
        'Request update gpioPolarity index: %p',
        index => {
            pmic.gpioLedDrvModule[index].get.gpioPolarity();

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio polarity get ${index}`,
                expect.anything(),
                undefined,
                true,
            );
        },
    );

    test.each(PMIC_1012_GPIOLEDDRVS)(
        'Request update gpioPull index: %p',
        index => {
            pmic.gpioLedDrvModule[index].get.gpioPull();

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio pull get ${index}`,
                expect.anything(),
                undefined,
                true,
            );
        },
    );

    test.each(PMIC_1012_GPIOLEDDRVS)(
        'Request update ledDrive index: %p',
        index => {
            pmic.gpioLedDrvModule[index].get.ledDrive();

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio led drive get ${index}`,
                expect.anything(),
                undefined,
                true,
            );
        },
    );

    test.each(PMIC_1012_GPIOLEDDRVS)(
        'Request update ledDutyCycle index: %p',
        index => {
            pmic.gpioLedDrvModule[index].get.ledDutyCycle();

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio led duty get ${index}`,
                expect.anything(),
                undefined,
                true,
            );
        },
    );

    test.each(PMIC_1012_GPIOLEDDRVS)(
        'Request update ledMode index: %p',
        index => {
            pmic.gpioLedDrvModule[index].get.ledMode();

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `npm1012 gpio led mode get ${index}`,
                expect.anything(),
                undefined,
                true,
            );
        },
    );
});

export {};
