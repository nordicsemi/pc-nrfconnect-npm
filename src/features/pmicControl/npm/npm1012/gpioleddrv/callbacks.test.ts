/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    PMIC_1012_GPIOLEDDRVS,
    setupMocksWithShellParser,
} from '../tests/helpers';

describe('PMIC 1012 - Command callbacks', () => {
    const { eventHandlers, mockOnGpioLedDrvUpdate } =
        setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(
        PMIC_1012_GPIOLEDDRVS.map(index =>
            [true, false]
                .map(value => [
                    {
                        index,
                        append: `get ${index}`,
                        value,
                    },
                    {
                        index,
                        append: `set ${index} ${value ? 'on' : 'off'}`,
                        value,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm1012 gpio debounce %p', ({ index, append, value }) => {
        const command = `npm1012 gpio debounce ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value ? 'on' : 'off'}`, command);

        expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
        expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
            data: { gpioDebounce: value },
            index,
        });
    });

    test.each(
        PMIC_1012_GPIOLEDDRVS.map(index =>
            ['HIGH']
                .map(value => [
                    {
                        index,
                        append: `get ${index}`,
                        value,
                    },
                    {
                        index,
                        append: `set ${index} ${value}`,
                        value,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm1012 gpio drive %p', ({ index, append, value }) => {
        const command = `npm1012 gpio drive ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
        expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
            data: {
                gpioDrive: value,
            },
            index,
        });
    });

    test.each(
        PMIC_1012_GPIOLEDDRVS.map(index =>
            [128]
                .map(value => [
                    {
                        index,
                        append: `get ${index}`,
                        value,
                    },
                    {
                        index,
                        append: `set ${index} ${value}`,
                        value,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm1012 gpio led duty %p', ({ index, append, value }) => {
        const command = `npm1012 gpio led duty ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
        expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
            data: {
                gpioDutyCycle: value,
                ledDutyCycle: value,
            },
            index,
        });
    });

    test.each(
        PMIC_1012_GPIOLEDDRVS.map(index =>
            [
                ['GPIO', 'Input', 'GPIO_IN'],
                ['GPIO', 'Output', 'GPIO_OUT_LOW'],
            ]
                .map(value => [
                    {
                        append: `get ${index}`,
                        gpioState: value[1],
                        index,
                        mode: value[2],
                        state: value[0],
                    },
                    {
                        append: `set ${index} ${value[2]}`,
                        gpioState: value[1],
                        index,
                        mode: value[2],
                        state: value[0],
                    },
                ])
                .flat(),
        ).flat(),
    )(
        'npm1012 gpio function %p',
        ({ append, gpioState, index, mode, state }) => {
            const command = `npm1012 gpio function ${append}`;
            const callback =
                eventHandlers.mockRegisterCommandCallbackHandler(command);

            callback?.onSuccess(`Value: ${mode}`, command);

            expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
            expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
                data: {
                    gpioMode: mode,
                    gpioState,
                    state,
                },
                index,
            });
        },
    );

    test.each(
        PMIC_1012_GPIOLEDDRVS.map(index =>
            ['LED']
                .map(value => [
                    {
                        index,
                        append: `get ${index}`,
                        value,
                    },
                    {
                        index,
                        append: `set ${index} ${value}`,
                        value,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm1012 gpio function %p', ({ index, append, value }) => {
        const command = `npm1012 gpio function ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
        expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
            data: {
                state: value,
            },
            index,
        });
    });

    test.each(
        PMIC_1012_GPIOLEDDRVS.map(index =>
            [true, false]
                .map(value => [
                    {
                        index,
                        append: `get ${index}`,
                        value,
                    },
                    {
                        index,
                        append: `set ${index} ${value ? 'on' : 'off'}`,
                        value,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm1012 gpio opendrain %p', ({ index, append, value }) => {
        const command = `npm1012 gpio opendrain ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value ? 'on' : 'off'}`, command);

        expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
        expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
            data: { gpioOpenDrain: value },
            index,
        });
    });

    test.each(
        PMIC_1012_GPIOLEDDRVS.map(index =>
            ['ACTIVEHIGH']
                .map(value => [
                    {
                        index,
                        append: `get ${index}`,
                        value,
                    },
                    {
                        index,
                        append: `set ${index} ${value}`,
                        value,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm1012 gpio polarity %p', ({ index, append, value }) => {
        const command = `npm1012 gpio polarity ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
        expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
            data: {
                gpioPolarity: value,
            },
            index,
        });
    });

    test.each(
        PMIC_1012_GPIOLEDDRVS.map(index =>
            ['PULLDOWN']
                .map(value => [
                    {
                        index,
                        append: `get ${index}`,
                        value,
                    },
                    {
                        index,
                        append: `set ${index} ${value}`,
                        value,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm1012 gpio pull %p', ({ index, append, value }) => {
        const command = `npm1012 gpio pull ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
        expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
            data: {
                gpioPull: value,
            },
            index,
        });
    });

    test.each(
        PMIC_1012_GPIOLEDDRVS.map(index =>
            ['5mA']
                .map(value => [
                    {
                        index,
                        append: `get ${index}`,
                        value,
                    },
                    {
                        index,
                        append: `set ${index} ${value}`,
                        value,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm1012 gpio led drive %p', ({ index, append, value }) => {
        const command = `npm1012 gpio led drive ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
        expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
            data: {
                ledDrive: value,
            },
            index,
        });
    });

    test.each(
        PMIC_1012_GPIOLEDDRVS.map(index =>
            ['PWM']
                .map(value => [
                    {
                        index,
                        append: `get ${index}`,
                        value,
                    },
                    {
                        index,
                        append: `set ${index} ${value}`,
                        value,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm1012 gpio led mode %p', ({ index, append, value }) => {
        const command = `npm1012 gpio led mode ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnGpioLedDrvUpdate).toBeCalledTimes(1);
        expect(mockOnGpioLedDrvUpdate).toBeCalledWith({
            data: {
                ledMode: value,
            },
            index,
        });
    });
});
export {};
