/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { PMIC_1210_GPIOS, setupMocksBase } from '../tests/helpers';
import { isInputMode, type Mode, polarityDisabled } from './types';

// UI should get update events immediately and not wait for feedback from shell responses when offline as there is no shell
describe('PMIC 1210 - Setters Offline tests', () => {
    const { mockOnGpioUpdate, pmic } = setupMocksBase();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(PMIC_1210_GPIOS)('Set setGpioDebounce index: %p', async index => {
        await pmic.gpioModule[index].set.debounce(true);

        expect(mockOnGpioUpdate).toBeCalledTimes(1);
        expect(mockOnGpioUpdate).toBeCalledWith({
            data: { debounce: true },
            index,
        });
    });

    test.each(PMIC_1210_GPIOS)('Set setGpioDrive index: %p', async index => {
        await pmic.gpioModule[index].set.drive('high');

        expect(mockOnGpioUpdate).toBeCalledTimes(1);
        expect(mockOnGpioUpdate).toBeCalledWith({
            data: { drive: 'high' },
            index,
        });
    });

    test.each(PMIC_1210_GPIOS)('Set setGpioMode index: %p', async index => {
        const mode: Mode = 'gpio_in';
        await pmic.gpioModule[index].set.mode(mode);

        const isInput = isInputMode(mode);

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

    test.each(PMIC_1210_GPIOS)(
        'Set setGpioOpenDrain index: %p',
        async index => {
            await pmic.gpioModule[index].set.openDrain(true);

            expect(mockOnGpioUpdate).toBeCalledTimes(1);
            expect(mockOnGpioUpdate).toBeCalledWith({
                data: { openDrain: true },
                index,
            });
        },
    );

    test.each(PMIC_1210_GPIOS)('Set setGpioPolarity index: %p', async index => {
        await pmic.gpioModule[index].set.polarity?.('activehigh');

        expect(mockOnGpioUpdate).toBeCalledTimes(1);
        expect(mockOnGpioUpdate).toBeCalledWith({
            data: { polarity: 'activehigh' },
            index,
        });
    });

    test.each(PMIC_1210_GPIOS)('Set setGpioPull index: %p', async index => {
        await pmic.gpioModule[index].set.pull('pulldown');

        expect(mockOnGpioUpdate).toBeCalledTimes(1);
        expect(mockOnGpioUpdate).toBeCalledWith({
            data: { pull: 'pulldown' },
            index,
        });
    });
});

export {};
