/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { setupMocksWithShellParser } from '../tests/helpers';

describe('PMIC 1210 - Command callbacks', () => {
    const { eventHandlers, mockOnPOFUpdate } = setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(
        [true, false].flatMap(warnActive => [
            {
                append: `get`,
                warnActive,
            },
        ]),
    )('npm12xx reset_ctrl pof status %p', ({ append, warnActive }) => {
        const command = `npm12xx reset_ctrl pof status ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(
            `Value: ${warnActive ? 'WARNING' : 'NO_WARNING'}`,
            command,
        );

        expect(mockOnPOFUpdate).toBeCalledTimes(1);
        expect(mockOnPOFUpdate).toBeCalledWith({
            warnActive,
        });
    });

    test.each([`get`, `set 2.75V`])(
        'npm12xx reset_ctrl pof reset_threshold %p',
        append => {
            const command = `npm12xx reset_ctrl pof reset_threshold ${append}`;
            const callback =
                eventHandlers.mockRegisterCommandCallbackHandler(command);

            callback?.onSuccess(`Value: 2.75V`, command);

            expect(mockOnPOFUpdate).toBeCalledTimes(1);
            expect(mockOnPOFUpdate).toBeCalledWith({
                resetThreshold: 2.75,
            });
        },
    );

    test.each([`get`, `set 2.75V`])(
        'npm12xx reset_ctrl pof warn_threshold %p',
        append => {
            const command = `npm12xx reset_ctrl pof warn_threshold ${append}`;
            const callback =
                eventHandlers.mockRegisterCommandCallbackHandler(command);

            callback?.onSuccess(`Value: 2.75V`, command);

            expect(mockOnPOFUpdate).toBeCalledTimes(1);
            expect(mockOnPOFUpdate).toBeCalledWith({
                warnThreshold: 2.75,
            });
        },
    );
});

export {};
