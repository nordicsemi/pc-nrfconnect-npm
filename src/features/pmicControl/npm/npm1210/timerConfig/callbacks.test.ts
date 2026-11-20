/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { setupMocksWithShellParser } from '../tests/helpers';
import { modeKeys } from './types';

describe('PMIC 1210 - Command callbacks', () => {
    const { eventHandlers, mockOnTimerConfigUpdate } =
        setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(
        modeKeys
            .map((mode, modeIndex) => [
                {
                    append: `get`,
                    mode,
                    modeIndex,
                },
                {
                    append: `set ${mode}`,
                    mode,
                    modeIndex,
                },
            ])
            .flat(),
    )('npm12xx timer mode %p', ({ append, mode }) => {
        const command = `npm12xx timer mode ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${mode}`, command);

        expect(mockOnTimerConfigUpdate).toBeCalledTimes(1);
        expect(mockOnTimerConfigUpdate).toBeCalledWith({
            mode,
        });
    });

    test.each([`get`, `set 2.8`])('npm12xx timer period %p', append => {
        const command = `npm12xx timer period ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: 2.8`, command);

        expect(mockOnTimerConfigUpdate).toBeCalledTimes(1);
        expect(mockOnTimerConfigUpdate).toBeCalledWith({
            period: 2800,
        });
    });
});
export {};
