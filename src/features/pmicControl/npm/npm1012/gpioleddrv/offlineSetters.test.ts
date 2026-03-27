/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { GPIOLEDDrvGPIOMode, GPIOLEDDrvGPIOState } from '../../types';
import { PMIC_1012_GPIOLEDDRVS, setupMocksBase } from '../tests/helpers';

// UI should get update events immediately and not wait for feedback from shell responses when offline as there is no shell
describe('PMIC 1012 - Setters Offline tests', () => {
    const { mockOnGpioLedDrvUpdate, pmic } = setupMocksBase();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(PMIC_1012_GPIOLEDDRVS)(
        'Set gpioDebounce index: %p',
        async index => {
            await pmic.gpioLedDrvModule[index].set.gpioDebounce(true);

            expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
            expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
                data: { gpioDebounce: true },
                index,
            });
        },
    );

    test.each(PMIC_1012_GPIOLEDDRVS)('Set gpioDrive index: %p', async index => {
        await pmic.gpioLedDrvModule[index].set.gpioDrive('HIGH');

        expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
        expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
            data: { gpioDrive: 'HIGH' },
            index,
        });
    });

    test.each(PMIC_1012_GPIOLEDDRVS)('Set dutyCycle index: %p', async index => {
        await pmic.gpioLedDrvModule[index].set.gpioDutyCycle(128);

        expect(mockOnGpioLedDrvUpdate).nthCalledWith(1, {
            data: { gpioDutyCycle: 128, ledDutyCycle: 128 },
            index,
        });

        await pmic.gpioLedDrvModule[index].set.ledDutyCycle(255);

        expect(mockOnGpioLedDrvUpdate).nthCalledWith(2, {
            data: { gpioDutyCycle: 255, ledDutyCycle: 255 },
            index,
        });

        expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(2);
    });

    const gpioModeTestValues: [GPIOLEDDrvGPIOMode, GPIOLEDDrvGPIOState][] = [
        ['GPIO_IN', 'Input'],
        ['GPIO_OUT_LOW', 'Output'],
    ];

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

        expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
        expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
            data: { gpioMode: mode, gpioState: state },
            index,
        });
    });

    test.each(PMIC_1012_GPIOLEDDRVS)(
        'Set gpioOpenDrain index: %p',
        async index => {
            await pmic.gpioLedDrvModule[index].set.gpioOpenDrain(true);

            expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
            expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
                data: { gpioOpenDrain: true },
                index,
            });
        },
    );

    test.each(PMIC_1012_GPIOLEDDRVS)(
        'Set gpioPolarity index: %p',
        async index => {
            await pmic.gpioLedDrvModule[index].set.gpioPolarity('ACTIVEHIGH');

            expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
            expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
                data: { gpioPolarity: 'ACTIVEHIGH' },
                index,
            });
        },
    );

    test.each(PMIC_1012_GPIOLEDDRVS)('Set gpioPull index: %p', async index => {
        await pmic.gpioLedDrvModule[index].set.gpioPull('PULLDOWN');

        expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
        expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
            data: { gpioPull: 'PULLDOWN' },
            index,
        });
    });

    test.each(PMIC_1012_GPIOLEDDRVS)('Set ledDrive index: %p', async index => {
        await pmic.gpioLedDrvModule[index].set.ledDrive('10mA');

        expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
        expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
            data: { ledDrive: '10mA' },
            index,
        });
    });

    test.each(PMIC_1012_GPIOLEDDRVS)('Set ledMode index: %p', async index => {
        await pmic.gpioLedDrvModule[index].set.ledMode('PWM');

        expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
        expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
            data: { ledMode: 'PWM' },
            index,
        });
    });
});

export {};
