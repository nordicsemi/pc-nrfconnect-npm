/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import {
    Card,
    Dropdown,
    Toggle,
} from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    type UserOtp,
    type UserOtpModule,
} from '../../../features/pmicControl/npm/types';

interface UserOtpSysFeatCardProperties {
    userOtp: UserOtp;
    disabled: boolean;
    module: UserOtpModule;
}

export default ({
    userOtp,
    disabled,
    module,
}: UserOtpSysFeatCardProperties) => {
    const setConfigValueExtraArgs = {
        otpLocked: userOtp.otpLocked,
    };

    return (
        <Card
            title={
                <div className="tw-flex tw-justify-between">
                    <span>System Features</span>

                    <div className="d-flex">
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.sysFeat.lock
                            }
                            isToggled={userOtp.settings.sysFeat.program}
                            label="Program"
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'sysFeat',
                                    value,
                                })
                            }
                        />
                    </div>
                </div>
            }
        >
            <div className="tw-flex tw-flex-row tw-gap-4">
                <Dropdown
                    disabled={disabled || userOtp.updateInProgress}
                    items={module.values.configSysFeatVBusILimLvl}
                    label="VBUS Input Current Limit"
                    onSelect={item =>
                        module.set.configValue(
                            { key: 'sysFeatVBusILimLvl', value: item.value },
                            {
                                ...setConfigValueExtraArgs,
                                ...{
                                    settingLocked:
                                        userOtp.settings.sysFeatVBusILimLvl
                                            .lock,
                                },
                            },
                        )
                    }
                    selectedItem={
                        module.values.configSysFeatVBusILimLvl.find(
                            item =>
                                item.value ===
                                userOtp.settings.sysFeatVBusILimLvl.value,
                        ) ?? module.values.configSysFeatVBusILimLvl[0]
                    }
                />
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.sysFeatVBusILimLvl.lock
                    }
                    isToggled={userOtp.settings.sysFeatVBusILimLvl.program}
                    onToggle={value => {
                        module.set.configProgram({
                            key: 'sysFeatVBusILimLvl',
                            value,
                        });
                    }}
                />
            </div>

            <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                <div className="tw-w-full">
                    <Toggle
                        disabled={disabled || userOtp.updateInProgress}
                        isToggled={
                            userOtp.settings.sysFeatShpHldDebounceEnable.value
                        }
                        label="Enable SHPHLD Pin Debounce"
                        onToggle={value =>
                            module.set.configValue(
                                {
                                    key: 'sysFeatShpHldDebounceEnable',
                                    value,
                                },
                                {
                                    ...setConfigValueExtraArgs,
                                    ...{
                                        settingLocked:
                                            userOtp.settings
                                                .sysFeatShpHldDebounceEnable
                                                .lock,
                                    },
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
                        userOtp.settings.sysFeatShpHldDebounceEnable.lock
                    }
                    isToggled={
                        userOtp.settings.sysFeatShpHldDebounceEnable.program
                    }
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'sysFeatShpHldDebounceEnable',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-flex-row tw-gap-4">
                <Dropdown
                    disabled={disabled || userOtp.updateInProgress}
                    items={module.values.configSysFeatShpHldDebounce}
                    label={
                        <>
                            SHPHLD Pin Debounce Time (t
                            <span className="subscript">SHIPTOACT</span>)
                        </>
                    }
                    onSelect={item =>
                        module.set.configValue(
                            { key: 'sysFeatShpHldDebounce', value: item.value },
                            {
                                ...setConfigValueExtraArgs,
                                ...{
                                    settingLocked:
                                        userOtp.settings.sysFeatShpHldDebounce
                                            .lock,
                                },
                            },
                        )
                    }
                    selectedItem={
                        module.values.configSysFeatShpHldDebounce.find(
                            item =>
                                item.value ===
                                userOtp.settings.sysFeatShpHldDebounce.value,
                        ) ?? module.values.configSysFeatShpHldDebounce[0]
                    }
                />
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.sysFeatShpHldDebounce.lock
                    }
                    isToggled={userOtp.settings.sysFeatShpHldDebounce.program}
                    onToggle={value => {
                        module.set.configProgram({
                            key: 'sysFeatShpHldDebounce',
                            value,
                        });
                    }}
                />
            </div>

            <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                <div className="tw-w-full">
                    <Toggle
                        disabled={disabled || userOtp.updateInProgress}
                        isToggled={
                            userOtp.settings
                                .sysFeatHibernateWakeupByButtonEnable.value
                        }
                        label="Enable Hibernate wakeup by button"
                        onToggle={value =>
                            module.set.configValue(
                                {
                                    key: 'sysFeatHibernateWakeupByButtonEnable',
                                    value,
                                },
                                {
                                    ...setConfigValueExtraArgs,
                                    ...{
                                        settingLocked:
                                            userOtp.settings
                                                .sysFeatHibernateWakeupByButtonEnable
                                                .lock,
                                    },
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
                        userOtp.settings.sysFeatHibernateWakeupByButtonEnable
                            .lock
                    }
                    isToggled={
                        userOtp.settings.sysFeatHibernateWakeupByButtonEnable
                            .program
                    }
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'sysFeatHibernateWakeupByButtonEnable',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-flex-row tw-gap-4">
                <Dropdown
                    disabled={disabled || userOtp.updateInProgress}
                    items={module.values.configSysFeatPwrWait}
                    label={
                        <>
                            t<span className="subscript">PWRDN</span>
                        </>
                    }
                    onSelect={item =>
                        module.set.configValue(
                            { key: 'sysFeatPwrWait', value: item.value },
                            {
                                ...setConfigValueExtraArgs,
                                ...{
                                    settingLocked:
                                        userOtp.settings.sysFeatPwrWait.lock,
                                },
                            },
                        )
                    }
                    selectedItem={
                        module.values.configSysFeatPwrWait.find(
                            item =>
                                item.value ===
                                userOtp.settings.sysFeatPwrWait.value,
                        ) ?? module.values.configSysFeatPwrWait[0]
                    }
                />
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.sysFeatPwrWait.lock
                    }
                    isToggled={userOtp.settings.sysFeatPwrWait.program}
                    onToggle={value => {
                        module.set.configProgram({
                            key: 'sysFeatPwrWait',
                            value,
                        });
                    }}
                />
            </div>

            <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                <div className="tw-w-full">
                    <Toggle
                        disabled={disabled || userOtp.updateInProgress}
                        isToggled={userOtp.settings.sysFeatBootMonEnable.value}
                        label="Enable Boot Monitor"
                        onToggle={value =>
                            module.set.configValue(
                                { key: 'sysFeatBootMonEnable', value },
                                {
                                    ...setConfigValueExtraArgs,
                                    ...{
                                        settingLocked:
                                            userOtp.settings
                                                .sysFeatBootMonEnable.lock,
                                    },
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
                        userOtp.settings.sysFeatBootMonEnable.lock
                    }
                    isToggled={userOtp.settings.sysFeatBootMonEnable.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'sysFeatBootMonEnable',
                            value,
                        })
                    }
                />
            </div>

            {module.values.configSysFeatTwiSlaveAddress !== undefined &&
                userOtp.settings.sysFeatTwiSlaveAddress?.value !==
                    undefined && (
                    <div className="tw-flex tw-flex-row tw-gap-4">
                        <Dropdown
                            disabled={disabled || userOtp.updateInProgress}
                            items={module.values.configSysFeatTwiSlaveAddress}
                            label="TWI Slave Address"
                            onSelect={item => {
                                const settingLocked =
                                    userOtp.settings.sysFeatTwiSlaveAddress
                                        ?.lock;
                                if (settingLocked !== undefined) {
                                    module.set.configValue(
                                        {
                                            key: 'sysFeatTwiSlaveAddress',
                                            value: item.value,
                                        },
                                        {
                                            ...setConfigValueExtraArgs,
                                            ...{ settingLocked },
                                        },
                                    );
                                }
                            }}
                            selectedItem={
                                module.values.configSysFeatTwiSlaveAddress.find(
                                    item =>
                                        item.value ===
                                        userOtp.settings.sysFeatTwiSlaveAddress
                                            ?.value,
                                ) ??
                                module.values.configSysFeatTwiSlaveAddress[0]
                            }
                        />
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.sysFeatTwiSlaveAddress.lock
                            }
                            isToggled={
                                userOtp.settings.sysFeatTwiSlaveAddress.program
                            }
                            onToggle={value => {
                                module.set.configProgram({
                                    key: 'sysFeatTwiSlaveAddress',
                                    value,
                                });
                            }}
                        />
                    </div>
                )}
        </Card>
    );
};
