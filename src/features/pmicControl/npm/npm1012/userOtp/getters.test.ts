/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { setupMocksWithShellParser } from '../tests/helpers';
import {
    configCommand,
    configKeysWithFwSupport,
    defaultProperties,
} from './types';

describe('PMIC 1012 - Request update commands', () => {
    const { mockEnqueueRequest, pmic } = setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(configKeysWithFwSupport.map(key => ({ key })))(
        'Request update %p',
        ({ key }) => {
            pmic.userOtpModule?.get.configValue({ key });

            expect(mockEnqueueRequest).toBeCalledTimes(1);
            expect(mockEnqueueRequest).toBeCalledWith(
                `${configCommand} get ${defaultProperties[key].fwKey}`,
                expect.anything(),
                5000,
                true,
            );
        },
    );
});

export {};
