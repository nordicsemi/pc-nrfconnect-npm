/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { PMIC_1012_LEDS, setupMocksWithShellParser } from '../tests/helpers';

describe('PMIC 1012 - Command callbacks', () => {
    const { eventHandlers, mockOnLEDUpdate } = setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(
        PMIC_1012_LEDS.map(index =>
            [true, false]
                .map(value => [
                    {
                        index,
                        append: 'get',
                        value,
                    },
                    {
                        index,
                        append: `set ${value ? 'on' : 'off'}`,
                        value,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm1012 gpio led blink continuous %p', ({ index, append, value }) => {
        const command = `npm1012 gpio led blink continuous ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value ? 'on' : 'off'}.`, command);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: { blinkContinuous: value },
            index,
        });
    });

    test.each(
        PMIC_1012_LEDS.map(index =>
            [true, false]
                .map(value => [
                    {
                        index,
                        append: 'get',
                        value,
                    },
                    {
                        index,
                        append: `set ${value ? 'on' : 'off'}`,
                        value,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm1012 gpio led blink double %p', ({ index, append, value }) => {
        const command = `npm1012 gpio led blink double ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value ? 'on' : 'off'}.`, command);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: { blinkDouble: value },
            index,
        });
    });

    test.each(
        PMIC_1012_LEDS.map(index =>
            [1024]
                .map(value => [
                    {
                        index,
                        append: 'get',
                        value,
                    },
                    {
                        index,
                        append: `set ${value}`,
                        value,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm1012 gpio led blink timeon %p', ({ index, append, value }) => {
        const command = `npm1012 gpio led blink timeon ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}.`, command);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: {
                blinkTimeOn: value,
            },
            index,
        });
    });

    test.each(
        PMIC_1012_LEDS.map(index =>
            [1024]
                .map(value => [
                    {
                        index,
                        append: 'get',
                        value,
                    },
                    {
                        index,
                        append: `set ${value}`,
                        value,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm1012 gpio led blink timeoff %p', ({ index, append, value }) => {
        const command = `npm1012 gpio led blink timeoff ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}.`, command);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: {
                blinkTimeOff: value,
            },
            index,
        });
    });

    test.each(
        PMIC_1012_LEDS.map(index =>
            [488]
                .map(value => [
                    {
                        index,
                        append: 'get',
                        value,
                    },
                    {
                        index,
                        append: `set ${value}`,
                        value,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm1012 gpio led pwmfreq %p', ({ index, append, value }) => {
        const command = `npm1012 gpio led pwmfreq ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}.`, command);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: {
                pwmFrequency: value,
            },
            index,
        });
    });

    test.each(
        PMIC_1012_LEDS.map(index =>
            [true, false]
                .map(value => [
                    {
                        index,
                        append: 'get',
                        value,
                    },
                    {
                        index,
                        append: `set ${value ? 'on' : 'off'}`,
                        value,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm1012 gpio led phaseshift %p', ({ index, append, value }) => {
        const command = `npm1012 gpio led phaseshift ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value ? 'on' : 'off'}.`, command);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: { rgbPhaseShifting: value },
            index,
        });
    });
});
export {};
