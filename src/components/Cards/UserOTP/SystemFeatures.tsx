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

            {module.values.configSysFeatVBusILimControl !== undefined &&
                userOtp.settings.sysFeatVBusILimControl?.value !==
                    undefined && (
                    <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                        <div className="tw-w-full">
                            <Dropdown
                                disabled={disabled || userOtp.updateInProgress}
                                items={
                                    module.values.configSysFeatVBusILimControl
                                }
                                label="VBUS Input Current Limit Control"
                                onSelect={item => {
                                    const settingLocked =
                                        userOtp.settings.sysFeatVBusILimControl
                                            ?.lock;
                                    if (settingLocked !== undefined) {
                                        module.set.configValue(
                                            {
                                                key: 'sysFeatVBusILimControl',
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
                                    module.values.configSysFeatVBusILimControl.find(
                                        item =>
                                            item.value ===
                                            userOtp.settings
                                                .sysFeatVBusILimControl?.value,
                                    ) ??
                                    module.values
                                        .configSysFeatVBusILimControl[0]
                                }
                            />
                        </div>
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.sysFeatVBusILimControl.lock
                            }
                            isToggled={
                                userOtp.settings.sysFeatVBusILimControl.program
                            }
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'sysFeatVBusILimControl',
                                    value,
                                })
                            }
                        />
                    </div>
                )}

            {module.values.configSysFeatVBusILim0And1PinMap !== undefined &&
                userOtp.settings.sysFeatVBusILim0And1PinMap?.value !==
                    undefined && (
                    <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                        <div className="tw-w-full">
                            <Dropdown
                                disabled={disabled || userOtp.updateInProgress}
                                items={
                                    module.values
                                        .configSysFeatVBusILim0And1PinMap
                                }
                                label="ILIM0/1 Pin Map"
                                onSelect={item => {
                                    const settingLocked =
                                        userOtp.settings
                                            .sysFeatVBusILim0And1PinMap?.lock;
                                    if (settingLocked !== undefined) {
                                        module.set.configValue(
                                            {
                                                key: 'sysFeatVBusILim0And1PinMap',
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
                                    module.values.configSysFeatVBusILim0And1PinMap.find(
                                        item =>
                                            item.value ===
                                            userOtp.settings
                                                .sysFeatVBusILim0And1PinMap
                                                ?.value,
                                    ) ??
                                    module.values
                                        .configSysFeatVBusILim0And1PinMap[0]
                                }
                            />
                        </div>
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.sysFeatVBusILim0And1PinMap.lock
                            }
                            isToggled={
                                userOtp.settings.sysFeatVBusILim0And1PinMap
                                    .program
                            }
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'sysFeatVBusILim0And1PinMap',
                                    value,
                                })
                            }
                        />
                    </div>
                )}

            {module.values.configSysFeatVBusILim0And1GndSel !== undefined &&
                userOtp.settings.sysFeatVBusILim0And1GndSel?.value !==
                    undefined && (
                    <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                        <div className="tw-w-full">
                            <Dropdown
                                disabled={disabled || userOtp.updateInProgress}
                                items={
                                    module.values
                                        .configSysFeatVBusILim0And1GndSel
                                }
                                label="ILIM0/1 Grounded Selection"
                                onSelect={item => {
                                    const settingLocked =
                                        userOtp.settings
                                            .sysFeatVBusILim0And1GndSel?.lock;
                                    if (settingLocked !== undefined) {
                                        module.set.configValue(
                                            {
                                                key: 'sysFeatVBusILim0And1GndSel',
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
                                    module.values.configSysFeatVBusILim0And1GndSel.find(
                                        item =>
                                            item.value ===
                                            userOtp.settings
                                                .sysFeatVBusILim0And1GndSel
                                                ?.value,
                                    ) ??
                                    module.values
                                        .configSysFeatVBusILim0And1GndSel[0]
                                }
                            />
                        </div>
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.sysFeatVBusILim0And1GndSel.lock
                            }
                            isToggled={
                                userOtp.settings.sysFeatVBusILim0And1GndSel
                                    .program
                            }
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'sysFeatVBusILim0And1GndSel',
                                    value,
                                })
                            }
                        />
                    </div>
                )}

            {module.values.configSysFeatPGPinSel !== undefined &&
                userOtp.settings.sysFeatPGPinSel?.value !== undefined && (
                    <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                        <div className="tw-w-full">
                            <Dropdown
                                disabled={disabled || userOtp.updateInProgress}
                                items={module.values.configSysFeatPGPinSel}
                                label={
                                    <div>
                                        <span className="overline-text">
                                            PG
                                        </span>{' '}
                                        Pin Selection
                                    </div>
                                }
                                onSelect={item => {
                                    const settingLocked =
                                        userOtp.settings.sysFeatPGPinSel?.lock;
                                    if (settingLocked !== undefined) {
                                        module.set.configValue(
                                            {
                                                key: 'sysFeatPGPinSel',
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
                                    module.values.configSysFeatPGPinSel.find(
                                        item =>
                                            item.value ===
                                            userOtp.settings.sysFeatPGPinSel
                                                ?.value,
                                    ) ?? module.values.configSysFeatPGPinSel[0]
                                }
                            />
                        </div>
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.sysFeatPGPinSel.lock
                            }
                            isToggled={userOtp.settings.sysFeatPGPinSel.program}
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'sysFeatPGPinSel',
                                    value,
                                })
                            }
                        />
                    </div>
                )}

            {userOtp.settings.sysFeatVBusDpmEnable?.value !== undefined && (
                <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                    <div className="tw-w-full">
                        <Toggle
                            disabled={disabled || userOtp.updateInProgress}
                            isToggled={
                                userOtp.settings.sysFeatVBusDpmEnable.value
                            }
                            label={
                                <div>
                                    Enable VBUS{' '}
                                    <span className="subscript">DPM</span>
                                </div>
                            }
                            onToggle={value => {
                                const settingLocked =
                                    userOtp.settings.sysFeatVBusDpmEnable?.lock;
                                if (settingLocked !== undefined) {
                                    module.set.configValue(
                                        {
                                            key: 'sysFeatVBusDpmEnable',
                                            value,
                                        },
                                        {
                                            ...setConfigValueExtraArgs,
                                            ...{ settingLocked },
                                        },
                                    );
                                }
                            }}
                        />
                    </div>
                    <Toggle
                        disabled={
                            disabled ||
                            userOtp.updateInProgress ||
                            userOtp.otpLocked ||
                            userOtp.settings.sysFeatVBusDpmEnable.lock
                        }
                        isToggled={
                            userOtp.settings.sysFeatVBusDpmEnable.program
                        }
                        onToggle={value =>
                            module.set.configProgram({
                                key: 'sysFeatVBusDpmEnable',
                                value,
                            })
                        }
                    />
                </div>
            )}

            {module.values.configSysFeatVBusDpmLvl !== undefined &&
                userOtp.settings.sysFeatVBusDpmLvl?.value !== undefined && (
                    <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                        <div className="tw-w-full">
                            <Dropdown
                                disabled={disabled || userOtp.updateInProgress}
                                items={module.values.configSysFeatVBusDpmLvl}
                                label={
                                    <div>
                                        VBUS{' '}
                                        <span className="subscript">DPM</span>
                                    </div>
                                }
                                onSelect={item => {
                                    const settingLocked =
                                        userOtp.settings.sysFeatVBusDpmLvl
                                            ?.lock;
                                    if (settingLocked !== undefined) {
                                        module.set.configValue(
                                            {
                                                key: 'sysFeatVBusDpmLvl',
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
                                    module.values.configSysFeatVBusDpmLvl.find(
                                        item =>
                                            item.value ===
                                            userOtp.settings.sysFeatVBusDpmLvl
                                                ?.value,
                                    ) ??
                                    module.values.configSysFeatVBusDpmLvl[0]
                                }
                            />
                        </div>
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.sysFeatVBusDpmLvl.lock
                            }
                            isToggled={
                                userOtp.settings.sysFeatVBusDpmLvl.program
                            }
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'sysFeatVBusDpmLvl',
                                    value,
                                })
                            }
                        />
                    </div>
                )}

            {module.values.configSysFeatLongPressResetDebounce !== undefined &&
                userOtp.settings.sysFeatLongPressResetDebounce?.value !==
                    undefined && (
                    <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                        <div className="tw-w-full">
                            <Dropdown
                                disabled={disabled || userOtp.updateInProgress}
                                items={
                                    module.values
                                        .configSysFeatLongPressResetDebounce
                                }
                                label={
                                    <div>
                                        t
                                        <span className="subscript">
                                            RESETBUT
                                        </span>
                                    </div>
                                }
                                onSelect={item => {
                                    const settingLocked =
                                        userOtp.settings
                                            .sysFeatLongPressResetDebounce
                                            ?.lock;
                                    if (settingLocked !== undefined) {
                                        module.set.configValue(
                                            {
                                                key: 'sysFeatLongPressResetDebounce',
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
                                    module.values.configSysFeatLongPressResetDebounce.find(
                                        item =>
                                            item.value ===
                                            userOtp.settings
                                                .sysFeatLongPressResetDebounce
                                                ?.value,
                                    ) ??
                                    module.values
                                        .configSysFeatLongPressResetDebounce[0]
                                }
                            />
                        </div>
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.sysFeatLongPressResetDebounce
                                    .lock
                            }
                            isToggled={
                                userOtp.settings.sysFeatLongPressResetDebounce
                                    .program
                            }
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'sysFeatLongPressResetDebounce',
                                    value,
                                })
                            }
                        />
                    </div>
                )}

            {module.values.configSysFeatLongPressResetPinSel !== undefined &&
                userOtp.settings.sysFeatLongPressResetPinSel?.value !==
                    undefined && (
                    <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                        <div className="tw-w-full">
                            <Dropdown
                                disabled={disabled || userOtp.updateInProgress}
                                items={
                                    module.values
                                        .configSysFeatLongPressResetPinSel
                                }
                                label="Long Press Reset"
                                onSelect={item => {
                                    const settingLocked =
                                        userOtp.settings
                                            .sysFeatLongPressResetPinSel?.lock;
                                    if (settingLocked !== undefined) {
                                        module.set.configValue(
                                            {
                                                key: 'sysFeatLongPressResetPinSel',
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
                                    module.values.configSysFeatLongPressResetPinSel.find(
                                        item =>
                                            item.value ===
                                            userOtp.settings
                                                .sysFeatLongPressResetPinSel
                                                ?.value,
                                    ) ??
                                    module.values
                                        .configSysFeatLongPressResetPinSel[0]
                                }
                            />
                        </div>
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.sysFeatLongPressResetPinSel
                                    .lock
                            }
                            isToggled={
                                userOtp.settings.sysFeatLongPressResetPinSel
                                    .program
                            }
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'sysFeatLongPressResetPinSel',
                                    value,
                                })
                            }
                        />
                    </div>
                )}

            {module.values.configSysFeatShpHldType !== undefined &&
                userOtp.settings.sysFeatShpHldType?.value !== undefined && (
                    <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                        <div className="tw-w-full">
                            <Dropdown
                                disabled={disabled || userOtp.updateInProgress}
                                items={module.values.configSysFeatShpHldType}
                                label={
                                    <div>
                                        <span className="overline-text">
                                            EN
                                        </span>
                                        /SHPHLD Pin Configuration
                                    </div>
                                }
                                onSelect={item => {
                                    const settingLocked =
                                        userOtp.settings.sysFeatShpHldType
                                            ?.lock;
                                    if (settingLocked !== undefined) {
                                        module.set.configValue(
                                            {
                                                key: 'sysFeatShpHldType',
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
                                    module.values.configSysFeatShpHldType.find(
                                        item =>
                                            item.value ===
                                            userOtp.settings.sysFeatShpHldType
                                                ?.value,
                                    ) ??
                                    module.values.configSysFeatShpHldType[0]
                                }
                            />
                        </div>
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.sysFeatShpHldType.lock
                            }
                            isToggled={
                                userOtp.settings.sysFeatShpHldType.program
                            }
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'sysFeatShpHldType',
                                    value,
                                })
                            }
                        />
                    </div>
                )}

            {module.values.configSysFeatShpHldSlider !== undefined &&
                userOtp.settings.sysFeatShpHldSlider?.value !== undefined && (
                    <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                        <div className="tw-w-full">
                            <Dropdown
                                disabled={disabled || userOtp.updateInProgress}
                                items={module.values.configSysFeatShpHldSlider}
                                label="Slide Switch Pull-Up Behavior"
                                onSelect={item => {
                                    const settingLocked =
                                        userOtp.settings.sysFeatShpHldSlider
                                            ?.lock;
                                    if (settingLocked !== undefined) {
                                        module.set.configValue(
                                            {
                                                key: 'sysFeatShpHldSlider',
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
                                    module.values.configSysFeatShpHldSlider.find(
                                        item =>
                                            item.value ===
                                            userOtp.settings.sysFeatShpHldSlider
                                                ?.value,
                                    ) ??
                                    module.values.configSysFeatShpHldSlider[0]
                                }
                            />
                        </div>
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.sysFeatShpHldSlider.lock
                            }
                            isToggled={
                                userOtp.settings.sysFeatShpHldSlider.program
                            }
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'sysFeatShpHldSlider',
                                    value,
                                })
                            }
                        />
                    </div>
                )}

            {module.values.configSysFeatShpHldSlideSwitchPollTime !==
                undefined &&
                userOtp.settings.sysFeatShpHldSlideSwitchPollTime?.value !==
                    undefined && (
                    <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                        <div className="tw-w-full">
                            <Dropdown
                                disabled={disabled || userOtp.updateInProgress}
                                items={
                                    module.values
                                        .configSysFeatShpHldSlideSwitchPollTime
                                }
                                label="Slide Switch Polling Interval"
                                onSelect={item => {
                                    const settingLocked =
                                        userOtp.settings
                                            .sysFeatShpHldSlideSwitchPollTime
                                            ?.lock;
                                    if (settingLocked !== undefined) {
                                        module.set.configValue(
                                            {
                                                key: 'sysFeatShpHldSlideSwitchPollTime',
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
                                    module.values.configSysFeatShpHldSlideSwitchPollTime.find(
                                        item =>
                                            item.value ===
                                            userOtp.settings
                                                .sysFeatShpHldSlideSwitchPollTime
                                                ?.value,
                                    ) ??
                                    module.values
                                        .configSysFeatShpHldSlideSwitchPollTime[0]
                                }
                            />
                        </div>
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings
                                    .sysFeatShpHldSlideSwitchPollTime.lock
                            }
                            isToggled={
                                userOtp.settings
                                    .sysFeatShpHldSlideSwitchPollTime.program
                            }
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'sysFeatShpHldSlideSwitchPollTime',
                                    value,
                                })
                            }
                        />
                    </div>
                )}

            {module.values.configSysFeatShipVBusFilt !== undefined &&
                userOtp.settings.sysFeatShipVBusFilt?.value !== undefined && (
                    <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                        <div className="tw-w-full">
                            <Dropdown
                                disabled={disabled || userOtp.updateInProgress}
                                items={module.values.configSysFeatShipVBusFilt}
                                label="Push Button VBUS Filtering"
                                onSelect={item => {
                                    const settingLocked =
                                        userOtp.settings.sysFeatShipVBusFilt
                                            ?.lock;
                                    if (settingLocked !== undefined) {
                                        module.set.configValue(
                                            {
                                                key: 'sysFeatShipVBusFilt',
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
                                    module.values.configSysFeatShipVBusFilt.find(
                                        item =>
                                            item.value ===
                                            userOtp.settings.sysFeatShipVBusFilt
                                                ?.value,
                                    ) ??
                                    module.values.configSysFeatShipVBusFilt[0]
                                }
                            />
                        </div>
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.sysFeatShipVBusFilt.lock
                            }
                            isToggled={
                                userOtp.settings.sysFeatShipVBusFilt.program
                            }
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'sysFeatShipVBusFilt',
                                    value,
                                })
                            }
                        />
                    </div>
                )}

            {module.values.configSysFeatShipVBusFiltTime !== undefined &&
                userOtp.settings.sysFeatShipVBusFiltTime?.value !==
                    undefined && (
                    <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                        <div className="tw-w-full">
                            <Dropdown
                                disabled={disabled || userOtp.updateInProgress}
                                items={
                                    module.values.configSysFeatShipVBusFiltTime
                                }
                                label="Push Button/Slide Switch VBUS Filtering Time"
                                onSelect={item => {
                                    const settingLocked =
                                        userOtp.settings.sysFeatShipVBusFiltTime
                                            ?.lock;
                                    if (settingLocked !== undefined) {
                                        module.set.configValue(
                                            {
                                                key: 'sysFeatShipVBusFiltTime',
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
                                    module.values.configSysFeatShipVBusFiltTime.find(
                                        item =>
                                            item.value ===
                                            userOtp.settings
                                                .sysFeatShipVBusFiltTime?.value,
                                    ) ??
                                    module.values
                                        .configSysFeatShipVBusFiltTime[0]
                                }
                            />
                        </div>
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.sysFeatShipVBusFiltTime.lock
                            }
                            isToggled={
                                userOtp.settings.sysFeatShipVBusFiltTime.program
                            }
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'sysFeatShipVBusFiltTime',
                                    value,
                                })
                            }
                        />
                    </div>
                )}

            {module.values.configSysFeatVBusStandbyMode !== undefined &&
                userOtp.settings.sysFeatVBusStandbyMode?.value !==
                    undefined && (
                    <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                        <div className="tw-w-full">
                            <Dropdown
                                disabled={disabled || userOtp.updateInProgress}
                                items={
                                    module.values.configSysFeatVBusStandbyMode
                                }
                                label="VBUS Standby Mode"
                                onSelect={item => {
                                    const settingLocked =
                                        userOtp.settings.sysFeatVBusStandbyMode
                                            ?.lock;
                                    if (settingLocked !== undefined) {
                                        module.set.configValue(
                                            {
                                                key: 'sysFeatVBusStandbyMode',
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
                                    module.values.configSysFeatVBusStandbyMode.find(
                                        item =>
                                            item.value ===
                                            userOtp.settings
                                                .sysFeatVBusStandbyMode?.value,
                                    ) ??
                                    module.values
                                        .configSysFeatVBusStandbyMode[0]
                                }
                            />
                        </div>
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.sysFeatVBusStandbyMode.lock
                            }
                            isToggled={
                                userOtp.settings.sysFeatVBusStandbyMode.program
                            }
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'sysFeatVBusStandbyMode',
                                    value,
                                })
                            }
                        />
                    </div>
                )}

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

            {module.values.configSysFeatTwiTargetId0Addr !== undefined &&
                userOtp.settings.sysFeatTwiTargetId0Addr?.value !==
                    undefined && (
                    <div className="tw-flex tw-flex-row tw-gap-4">
                        <Dropdown
                            disabled={disabled || userOtp.updateInProgress}
                            items={module.values.configSysFeatTwiTargetId0Addr}
                            label="TWI Target ID0 Address"
                            onSelect={item => {
                                const settingLocked =
                                    userOtp.settings.sysFeatTwiTargetId0Addr
                                        ?.lock;
                                if (settingLocked !== undefined) {
                                    module.set.configValue(
                                        {
                                            key: 'sysFeatTwiTargetId0Addr',
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
                                module.values.configSysFeatTwiTargetId0Addr.find(
                                    item =>
                                        item.value ===
                                        userOtp.settings.sysFeatTwiTargetId0Addr
                                            ?.value,
                                ) ??
                                module.values.configSysFeatTwiTargetId0Addr[0]
                            }
                        />
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.sysFeatTwiTargetId0Addr.lock
                            }
                            isToggled={
                                userOtp.settings.sysFeatTwiTargetId0Addr.program
                            }
                            onToggle={value => {
                                module.set.configProgram({
                                    key: 'sysFeatTwiTargetId0Addr',
                                    value,
                                });
                            }}
                        />
                    </div>
                )}

            {module.values.configSysFeatTwiTargetId1Addr !== undefined &&
                userOtp.settings.sysFeatTwiTargetId1Addr?.value !==
                    undefined && (
                    <div className="tw-flex tw-flex-row tw-gap-4">
                        <Dropdown
                            disabled={disabled || userOtp.updateInProgress}
                            items={module.values.configSysFeatTwiTargetId1Addr}
                            label="TWI Target ID1 Address"
                            onSelect={item => {
                                const settingLocked =
                                    userOtp.settings.sysFeatTwiTargetId1Addr
                                        ?.lock;
                                if (settingLocked !== undefined) {
                                    module.set.configValue(
                                        {
                                            key: 'sysFeatTwiTargetId1Addr',
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
                                module.values.configSysFeatTwiTargetId1Addr.find(
                                    item =>
                                        item.value ===
                                        userOtp.settings.sysFeatTwiTargetId1Addr
                                            ?.value,
                                ) ??
                                module.values.configSysFeatTwiTargetId1Addr[0]
                            }
                        />
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.sysFeatTwiTargetId1Addr.lock
                            }
                            isToggled={
                                userOtp.settings.sysFeatTwiTargetId1Addr.program
                            }
                            onToggle={value => {
                                module.set.configProgram({
                                    key: 'sysFeatTwiTargetId1Addr',
                                    value,
                                });
                            }}
                        />
                    </div>
                )}
        </Card>
    );
};
