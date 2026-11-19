/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { PMIC_1210_GPIOS, setupMocksWithShellParser } from '../tests/helpers';
import {
    driveKeys,
    isInputMode,
    modeKeysForIndex,
    polarityDisabled,
    polarityKeys,
    pullKeys,
} from './types';

describe('PMIC 1210 - Command callbacks', () => {
    const { eventHandlers, mockOnGpioUpdate } = setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(
        PMIC_1210_GPIOS.map(index =>
            [true, false]
                .map(debounce => [
                    {
                        index,
                        append: `get ${index}`,
                        debounce,
                    },
                    {
                        index,
                        append: `set ${index} ${debounce ? 'on' : 'off'}`,
                        debounce,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm12xx gpio debounce %p', ({ index, append, debounce }) => {
        const command = `npm12xx gpio debounce ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${debounce ? 'on' : 'off'}`, command);

        expect(mockOnGpioUpdate).toBeCalledTimes(1);
        expect(mockOnGpioUpdate).toBeCalledWith({
            data: { debounce },
            index,
        });
    });

    test.each(
        PMIC_1210_GPIOS.map(index =>
            driveKeys
                .map(drive => [
                    {
                        index,
                        append: `get ${index}`,
                        drive,
                    },
                    {
                        index,
                        append: `set ${index} ${drive}`,
                        drive,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm12xx gpio drive %p', ({ index, append, drive }) => {
        const command = `npm12xx gpio drive ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${drive}`, command);

        expect(mockOnGpioUpdate).toBeCalledTimes(1);
        expect(mockOnGpioUpdate).toBeCalledWith({
            data: { drive },
            index,
        });
    });

    test.each(
        PMIC_1210_GPIOS.map(index =>
            modeKeysForIndex(index)
                .map(mode => [
                    {
                        index,
                        append: `get ${index}`,
                        mode,
                    },
                    {
                        index,
                        append: `set ${index} ${mode}`,
                        mode,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm12xx gpio function %p', ({ index, append, mode }) => {
        const command = `npm12xx gpio function ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);
        const isInput = isInputMode(mode);

        callback?.onSuccess(`Value: ${mode}`, command);

        expect(mockOnGpioUpdate).toBeCalledTimes(1);
        expect(mockOnGpioUpdate).toBeCalledWith({
            data: {
                debounceEnabled: isInput,
                driveEnabled: !isInput,
                mode,
                polarityEnabled: !polarityDisabled(mode),
                pullEnabled: isInput,
            },
            index,
        });
    });

    test.each(
        PMIC_1210_GPIOS.map(index =>
            [true, false]
                .map(openDrain => [
                    {
                        index,
                        append: `get ${index}`,
                        openDrain,
                    },
                    {
                        index,
                        append: `set ${index} ${openDrain ? 'on' : 'off'}`,
                        openDrain,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm12xx gpio opendrain %p', ({ index, append, openDrain }) => {
        const command = `npm12xx gpio opendrain ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${openDrain ? 'on' : 'off'}`, command);

        expect(mockOnGpioUpdate).toBeCalledTimes(1);
        expect(mockOnGpioUpdate).toBeCalledWith({
            data: { openDrain },
            index,
        });
    });

    test.each(
        PMIC_1210_GPIOS.map(index =>
            polarityKeys
                .map(polarity => [
                    {
                        index,
                        append: `get ${index}`,
                        polarity,
                    },
                    {
                        index,
                        append: `set ${index} ${polarity}`,
                        polarity,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm12xx gpio polarity %p', ({ index, append, polarity }) => {
        const command = `npm12xx gpio polarity ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${polarity}`, command);

        expect(mockOnGpioUpdate).toBeCalledTimes(1);
        expect(mockOnGpioUpdate).toBeCalledWith({
            data: { polarity },
            index,
        });
    });

    test.each(
        PMIC_1210_GPIOS.map(index =>
            pullKeys
                .map(pull => [
                    {
                        index,
                        append: `get ${index}`,
                        pull,
                    },
                    {
                        index,
                        append: `set ${index} ${pull}`,
                        pull,
                    },
                ])
                .flat(),
        ).flat(),
    )('npm12xx gpio pull %p', ({ index, append, pull }) => {
        const command = `npm12xx gpio pull ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${pull}`, command);

        expect(mockOnGpioUpdate).toBeCalledTimes(1);
        expect(mockOnGpioUpdate).toBeCalledWith({
            data: { pull },
            index,
        });
    });
});
export {};
