/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { modeValues } from '../../npm1300/led/types';
import { PMIC_1304_LEDS, setupMocksWithShellParser } from '../tests/helpers';

describe('PMIC 1304 - Command callbacks', () => {
    const { eventHandlers, mockOnLEDUpdate } = setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(
        PMIC_1304_LEDS.map(index =>
            modeValues.map((mode, modeIndex) => [
                {
                    index,
                    append: `get ${index}`,
                    mode,
                    modeIndex,
                },
                {
                    index,
                    append: `set ${index} ${modeIndex}`,
                    mode,
                    modeIndex,
                },
            ]),
        ).flat(),
    )('Get/Set ledMode index: %p', ({ index, append, mode, modeIndex }) => {
        const command = `npmx led mode ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${modeIndex}`, command);

        expect(mockOnLEDUpdate).toBeCalledTimes(1);
        expect(mockOnLEDUpdate).toBeCalledWith({
            data: { mode },
            index,
        });
    });
});
export {};
