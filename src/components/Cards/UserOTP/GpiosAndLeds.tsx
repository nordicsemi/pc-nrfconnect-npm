/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import { Card, Toggle } from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    type UserOtp,
    type UserOtpModule,
} from '../../../features/pmicControl/npm/types';

interface UserOtpGpioLedCardProperties {
    userOtp: UserOtp;
    disabled: boolean;
    module: UserOtpModule;
}

export default ({
    userOtp,
    disabled,
    module,
}: UserOtpGpioLedCardProperties) => {
    const setConfigValueExtraArgs = {
        otpLocked: userOtp.otpLocked,
    };

    return (
        <Card
            title={
                <div className="tw-flex tw-justify-between">
                    <span>GPIOs</span>

                    <div className="d-flex">
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.gpio.lock
                            }
                            isToggled={userOtp.settings.gpio.program}
                            label="Program"
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'gpio',
                                    value,
                                })
                            }
                        />
                    </div>
                </div>
            }
        >
            <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                <div className="tw-w-full">
                    <Toggle
                        disabled={disabled || userOtp.updateInProgress}
                        isToggled={
                            userOtp.settings.gpio0InputBufferAndPullDownEnable
                                .value
                        }
                        label="GPIO0 Enable Input Buffer & Pull-Down"
                        onToggle={value =>
                            module.set.configValue(
                                {
                                    key: 'gpio0InputBufferAndPullDownEnable',
                                    value,
                                },
                                {
                                    ...setConfigValueExtraArgs,
                                    settingLocked:
                                        userOtp.settings
                                            .gpio0InputBufferAndPullDownEnable
                                            .lock,
                                },
                            )
                        }
                    />
                </div>
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.gpio0InputBufferAndPullDownEnable.lock
                    }
                    isToggled={
                        userOtp.settings.gpio0InputBufferAndPullDownEnable
                            .program
                    }
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'gpio0InputBufferAndPullDownEnable',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                <div className="tw-w-full">
                    <Toggle
                        disabled={disabled || userOtp.updateInProgress}
                        isToggled={
                            userOtp.settings.gpio1InputBufferAndPullDownEnable
                                .value
                        }
                        label="GPIO1 Enable Input Buffer & Pull-Down"
                        onToggle={value =>
                            module.set.configValue(
                                {
                                    key: 'gpio1InputBufferAndPullDownEnable',
                                    value,
                                },
                                {
                                    ...setConfigValueExtraArgs,
                                    settingLocked:
                                        userOtp.settings
                                            .gpio1InputBufferAndPullDownEnable
                                            .lock,
                                },
                            )
                        }
                    />
                </div>
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.gpio1InputBufferAndPullDownEnable.lock
                    }
                    isToggled={
                        userOtp.settings.gpio1InputBufferAndPullDownEnable
                            .program
                    }
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'gpio1InputBufferAndPullDownEnable',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                <div className="tw-w-full">
                    <Toggle
                        disabled={disabled || userOtp.updateInProgress}
                        isToggled={
                            userOtp.settings.gpio2InputBufferAndPullDownEnable
                                .value
                        }
                        label="GPIO2 Enable Input Buffer & Pull-Down"
                        onToggle={value =>
                            module.set.configValue(
                                {
                                    key: 'gpio2InputBufferAndPullDownEnable',
                                    value,
                                },
                                {
                                    ...setConfigValueExtraArgs,
                                    settingLocked:
                                        userOtp.settings
                                            .gpio2InputBufferAndPullDownEnable
                                            .lock,
                                },
                            )
                        }
                    />
                </div>
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.gpio2InputBufferAndPullDownEnable.lock
                    }
                    isToggled={
                        userOtp.settings.gpio2InputBufferAndPullDownEnable
                            .program
                    }
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'gpio2InputBufferAndPullDownEnable',
                            value,
                        })
                    }
                />
            </div>
        </Card>
    );
};
