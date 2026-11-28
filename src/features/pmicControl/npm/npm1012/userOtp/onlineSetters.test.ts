/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { helpers } from '../../tests/helpers';
import { setupMocksWithShellParser } from '../tests/helpers';
import { configKeysWithFwSupport, defaultProperties } from './types';

describe('PMIC 1012 - Setters online tests', () => {
    const { mockEnqueueRequest, pmic } = setupMocksWithShellParser();

    describe('Setters and effects state - success', () => {
        beforeEach(() => {
            jest.clearAllMocks();
            mockEnqueueRequest.mockImplementation(
                helpers.registerCommandCallbackSuccess,
            );
        });

        test.each(configKeysWithFwSupport.map(key => ({ key })))(
            'Set programConfigValue - %p',
            async ({ key }) => {
                const value = defaultProperties[key].default;
                await pmic.userOtpModule?.actions.programConfigValue?.({
                    key,
                    value,
                });

                const valueStr = defaultProperties[key].convertToString(value);

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 uicr configuration set ${defaultProperties[key].fwKey} ${valueStr}`,
                    expect.anything(),
                    5000,
                    true,
                );
            },
        );
    });

    describe('Setters and effects state - error', () => {
        beforeEach(() => {
            jest.clearAllMocks();
            mockEnqueueRequest.mockImplementation(
                helpers.registerCommandCallbackError,
            );
        });

        test.each(configKeysWithFwSupport.map(key => ({ key })))(
            'Set programConfigValue - fail - %p',
            async ({ key }) => {
                const value = defaultProperties[key].default;
                await expect(
                    pmic.userOtpModule?.actions.programConfigValue?.({
                        key,
                        value,
                    }),
                ).rejects.toBeUndefined();

                const valueStr = defaultProperties[key].convertToString(value);

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 uicr configuration set ${defaultProperties[key].fwKey} ${valueStr}`,
                    expect.anything(),
                    5000,
                    true,
                );
            },
        );
    });
});

export {};
