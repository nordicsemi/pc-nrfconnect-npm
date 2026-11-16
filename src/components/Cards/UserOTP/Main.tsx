/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React, { useEffect, useState } from 'react';
import {
    Card,
    NumberInput,
    Toggle,
} from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    type UserOtp,
    type UserOtpModule,
} from '../../../features/pmicControl/npm/types';

interface UserOtpMainCardProperties {
    userOtp: UserOtp;
    disabled: boolean;
    module: UserOtpModule;
}

export default ({ userOtp, disabled, module }: UserOtpMainCardProperties) => {
    const [internalOtpLockVersion, setInternalOtpLockVersion] = useState(
        userOtp.settings.mainOtpLockVersion.value,
    );
    const [internalOtpLockState, setInternalOtpLockState] = useState(
        userOtp.settings.mainOtpLockState.value,
    );

    // NumberInput do not use userOtp.<prop> as value as we send only at on change complete
    useEffect(() => {
        setInternalOtpLockVersion(userOtp.settings.mainOtpLockVersion.value);
    }, [userOtp.settings.mainOtpLockVersion.value]);

    const setConfigValueExtraArgs = {
        otpLocked: userOtp.otpLocked,
    };

    return (
        <Card
            title={
                <div className="tw-flex tw-justify-between">
                    <span>Main</span>

                    <div className="d-flex">
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.mainOtp.lock
                            }
                            isToggled={userOtp.settings.mainOtp.program}
                            label="Program"
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'mainOtp',
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
                    <NumberInput
                        disabled={disabled || userOtp.updateInProgress}
                        label="OTP Version"
                        onChange={setInternalOtpLockVersion}
                        onChangeComplete={value =>
                            module.set.configValue(
                                { key: 'mainOtpLockVersion', value },
                                {
                                    ...setConfigValueExtraArgs,
                                    ...{
                                        settingLocked:
                                            userOtp.settings.mainOtpLockVersion
                                                .lock,
                                    },
                                },
                            )
                        }
                        range={module.ranges.configOtpControlLockVersion}
                        value={internalOtpLockVersion}
                    />
                </div>
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.mainOtpLockVersion.lock
                    }
                    isToggled={userOtp.settings.mainOtpLockVersion.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'mainOtpLockVersion',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                <div className="tw-w-full">
                    <Toggle
                        disabled={disabled || userOtp.updateInProgress}
                        isToggled={internalOtpLockState}
                        label="Lock OTP"
                        onToggle={value => {
                            setInternalOtpLockState(value);
                            module.set.configValue(
                                { key: 'mainOtpLockState', value },
                                {
                                    ...setConfigValueExtraArgs,
                                    ...{
                                        settingLocked:
                                            userOtp.settings.mainOtpLockState
                                                .lock,
                                    },
                                },
                            );
                        }}
                    />
                </div>
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.mainOtpLockState.lock
                    }
                    isToggled={userOtp.settings.mainOtpLockState.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'mainOtpLockState',
                            value,
                        })
                    }
                />
            </div>
        </Card>
    );
};
