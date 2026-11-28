/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { setupMocksBase } from '../tests/helpers';
import { configKeysWithFwSupport, defaultProperties } from './types';

// UI should get update events immediately and not wait for feedback from shell responses when offline as there is no shell
describe('PMIC 1012 - Setters offline tests', () => {
    const { mockOnUserOtpConfigSettingUpdate, pmic } = setupMocksBase();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(configKeysWithFwSupport.map(key => ({ key })))(
        'Set configProgram %p',
        async ({ key }) => {
            await pmic.userOtpModule?.set.configProgram({
                key,
                value: true,
            });

            expect(mockOnUserOtpConfigSettingUpdate).toBeCalledTimes(1);
        },
    );

    const setConfigValueExtraArgs = {
        otpLocked: false,
        settingLocked: false,
        chargerIChgState: {
            iChgCoolLvl: defaultProperties.chargerIChgCoolLvl.default,
            iChgDouble: false,
            iChgDoubleLocked: false,
            iChgLvl: defaultProperties.chargerIChgLvl.default,
            iChgWarmLvl: defaultProperties.chargerIChgWarmLvl.default,
        },
    };

    test.each(configKeysWithFwSupport.map(key => ({ key })))(
        'Set configValue %p',
        async ({ key }) => {
            await pmic.userOtpModule?.set.configValue(
                {
                    key,
                    value: defaultProperties[key].default,
                },
                setConfigValueExtraArgs,
            );

            expect(mockOnUserOtpConfigSettingUpdate).toBeCalled();
        },
    );
});

export {};
