/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { setupMocksWithShellParser } from '../tests/helpers';

describe('PMIC 1012 - Command callbacks', () => {
    const { eventHandlers, mockOnUsbPower } = setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const detectStatusTestValues = [
        {
            response: 'Present',
            state: 'USB 100/500 mA',
        },
        {
            response: 'Undervoltage',
            state: 'No USB connection',
        },
    ];

    test.each(detectStatusTestValues)(
        'npm1012 sysreg vbus_status get %p',
        value => {
            const command = `npm1012 sysreg vbus_status get`;
            const callback =
                eventHandlers.mockRegisterCommandCallbackHandler(command);

            callback?.onSuccess(`Value: ${value.response}`, command);

            expect(mockOnUsbPower).toBeCalledTimes(1);
            expect(mockOnUsbPower).toBeCalledWith({
                detectStatus: value.state,
            });
        },
    );

    test.each(['get', 'set 500'])('npm1012 sysreg vbusilim %p', append => {
        const command = `npm1012 sysreg vbusilim ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: 500 mA.`, command);

        expect(mockOnUsbPower).toBeCalledTimes(1);
        expect(mockOnUsbPower).toBeCalledWith({
            currentLimiter: 0.5,
        });
    });
});
export {};
