/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React, { useEffect, useState } from 'react';
import {
    Card,
    Dropdown,
    NumberInput,
    Toggle,
} from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    type UserOtp,
    type UserOtpModule,
} from '../../../features/pmicControl/npm/types';

import '../../Charger/charger.scss';

interface UserOtpChargerCardProperties {
    userOtp: UserOtp;
    disabled: boolean;
    module: UserOtpModule;
}

export default ({
    userOtp,
    disabled,
    module,
}: UserOtpChargerCardProperties) => {
    const [internalIChgLvl, setInternalIChgLvl] = useState(
        userOtp.settings.chargerIChgLvl.value,
    );
    const [internalIChgCoolLvl, setInternalIChgCoolLvl] = useState(
        userOtp.settings.chargerIChgCoolLvl.value,
    );
    const [internalIChgWarmLvl, setInternalIChgWarmLvl] = useState(
        userOtp.settings.chargerIChgWarmLvl.value,
    );
    const [internalVTermLvl, setInternalVTermLvl] = useState(
        userOtp.settings.chargerVTermLvl.value,
    );
    const [internalVTermCoolLvl, setInternalVTermCoolLvl] = useState(
        userOtp.settings.chargerVTermCoolLvl.value,
    );
    const [internalVTermWarmLvl, setInternalVTermWarmLvl] = useState(
        userOtp.settings.chargerVTermWarmLvl.value,
    );
    const [internalVWeakLvl, setInternalVWeakLvl] = useState(
        userOtp.settings.chargerVWeakLvl.value,
    );

    useEffect(() => {
        setInternalIChgLvl(userOtp.settings.chargerIChgLvl.value);
        setInternalIChgCoolLvl(userOtp.settings.chargerIChgCoolLvl.value);
        setInternalIChgWarmLvl(userOtp.settings.chargerIChgWarmLvl.value);
        setInternalVTermLvl(userOtp.settings.chargerVTermLvl.value);
        setInternalVTermCoolLvl(userOtp.settings.chargerVTermCoolLvl.value);
        setInternalVTermWarmLvl(userOtp.settings.chargerVTermWarmLvl.value);
        setInternalVWeakLvl(userOtp.settings.chargerVWeakLvl.value);
    }, [
        userOtp.settings.chargerIChgLvl.value,
        userOtp.settings.chargerIChgCoolLvl.value,
        userOtp.settings.chargerIChgWarmLvl.value,
        userOtp.settings.chargerVTermLvl.value,
        userOtp.settings.chargerVTermCoolLvl.value,
        userOtp.settings.chargerVTermWarmLvl.value,
        userOtp.settings.chargerVWeakLvl.value,
    ]);

    const setConfigValueExtraArgs = {
        otpLocked: userOtp.otpLocked,
    };

    const chargerIChgState = {
        iChgCoolLvl: userOtp.settings.chargerIChgCoolLvl.value,
        iChgDouble: userOtp.settings.chargerIChgDouble.value,
        iChgDoubleLocked: userOtp.settings.chargerIChgDouble.lock,
        iChgLvl: userOtp.settings.chargerIChgLvl.value,
        iChgWarmLvl: userOtp.settings.chargerIChgWarmLvl.value,
    };

    return (
        <Card
            title={
                <div className="tw-flex tw-justify-between">
                    <span>Charger</span>

                    <div className="d-flex">
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.charger.lock
                            }
                            isToggled={userOtp.settings.charger.program}
                            label="Program"
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'charger',
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
                        isToggled={userOtp.settings.chargerEnable.value}
                        label="Enable Charger"
                        onToggle={value =>
                            module.set.configValue(
                                { key: 'chargerEnable', value },
                                {
                                    ...setConfigValueExtraArgs,
                                    ...{
                                        settingLocked:
                                            userOtp.settings.chargerEnable.lock,
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
                        userOtp.settings.chargerEnable.lock
                    }
                    isToggled={userOtp.settings.chargerEnable.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'chargerEnable',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                <div className="tw-w-full">
                    <Toggle
                        disabled={disabled || userOtp.updateInProgress}
                        isToggled={userOtp.settings.chargerIChgDouble.value}
                        label={
                            <div>
                                I<span className="subscript">CHG</span> Double
                            </div>
                        }
                        onToggle={value =>
                            module.set.configValue(
                                { key: 'chargerIChgDouble', value },
                                {
                                    ...setConfigValueExtraArgs,
                                    chargerIChgState,
                                    ...{
                                        settingLocked:
                                            userOtp.settings.chargerIChgDouble
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
                        userOtp.settings.chargerIChgDouble.lock
                    }
                    isToggled={userOtp.settings.chargerIChgDouble.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'chargerIChgDouble',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-flex-row tw-gap-4">
                <NumberInput
                    className="tw-w-full"
                    disabled={disabled || userOtp.updateInProgress}
                    label={
                        <div>
                            V<span className="subscript">TERM</span>
                        </div>
                    }
                    onChange={setInternalVTermLvl}
                    onChangeComplete={value =>
                        module.set.configValue(
                            { key: 'chargerVTermLvl', value },
                            {
                                ...setConfigValueExtraArgs,
                                ...{
                                    settingLocked:
                                        userOtp.settings.chargerVTermLvl.lock,
                                },
                            },
                        )
                    }
                    range={module.ranges.configChargerVTermLvl}
                    showSlider
                    unit="V"
                    value={internalVTermLvl}
                />

                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.chargerVTermLvl.lock
                    }
                    isToggled={userOtp.settings.chargerVTermLvl.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'chargerVTermLvl',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-flex-row tw-gap-4">
                <NumberInput
                    className="tw-w-full"
                    disabled={disabled || userOtp.updateInProgress}
                    label={
                        <div>
                            I<span className="subscript">CHG</span>
                        </div>
                    }
                    onChange={setInternalIChgLvl}
                    onChangeComplete={value =>
                        module.set.configValue(
                            { key: 'chargerIChgLvl', value },
                            {
                                ...setConfigValueExtraArgs,
                                chargerIChgState,
                                ...{
                                    settingLocked:
                                        userOtp.settings.chargerIChgLvl.lock,
                                },
                            },
                        )
                    }
                    range={module.ranges.configChargerIChgLvl}
                    showSlider
                    unit="mA"
                    value={internalIChgLvl}
                />

                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.chargerIChgLvl.lock
                    }
                    isToggled={userOtp.settings.chargerIChgLvl.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'chargerIChgLvl',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-flex-row tw-gap-4">
                <Dropdown
                    disabled={disabled || userOtp.updateInProgress}
                    items={module.values.configChargerITermLvl}
                    label={
                        <div>
                            I<span className="subscript">TERM</span>
                        </div>
                    }
                    onSelect={item =>
                        module.set.configValue(
                            { key: 'chargerITermLvl', value: item.value },
                            {
                                ...setConfigValueExtraArgs,
                                ...{
                                    settingLocked:
                                        userOtp.settings.chargerITermLvl.lock,
                                },
                            },
                        )
                    }
                    selectedItem={
                        module.values.configChargerITermLvl.find(
                            item =>
                                item.value ===
                                userOtp.settings.chargerITermLvl.value,
                        ) ?? module.values.configChargerITermLvl[0]
                    }
                />
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.chargerITermLvl.lock
                    }
                    isToggled={userOtp.settings.chargerITermLvl.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'chargerITermLvl',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                <div className="tw-w-full">
                    <Toggle
                        disabled={disabled || userOtp.updateInProgress}
                        isToggled={userOtp.settings.chargerWeakChgEnable.value}
                        label="Enable Weak Battery Charging"
                        onToggle={value => {
                            module.set.configValue(
                                { key: 'chargerWeakChgEnable', value },
                                {
                                    ...setConfigValueExtraArgs,
                                    ...{
                                        settingLocked:
                                            userOtp.settings
                                                .chargerWeakChgEnable.lock,
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
                        userOtp.settings.chargerWeakChgEnable.lock
                    }
                    isToggled={userOtp.settings.chargerWeakChgEnable.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'chargerWeakChgEnable',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-flex-row tw-gap-4">
                <NumberInput
                    className="tw-w-full"
                    disabled={disabled || userOtp.updateInProgress}
                    label={
                        <div>
                            V<span className="subscript">WEAK</span>
                        </div>
                    }
                    onChange={setInternalVWeakLvl}
                    onChangeComplete={value =>
                        module.set.configValue(
                            { key: 'chargerVWeakLvl', value },
                            {
                                ...setConfigValueExtraArgs,
                                ...{
                                    settingLocked:
                                        userOtp.settings.chargerVWeakLvl.lock,
                                },
                            },
                        )
                    }
                    range={module.ranges.configChargerVWeakLvl}
                    showSlider
                    unit="V"
                    value={internalVWeakLvl}
                />

                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.chargerVWeakLvl.lock
                    }
                    isToggled={userOtp.settings.chargerVWeakLvl.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'chargerVWeakLvl',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-flex-row tw-gap-4">
                <Dropdown
                    disabled={disabled || userOtp.updateInProgress}
                    items={module.values.configChargerVTrickleLvl}
                    label={
                        <div>
                            V<span className="subscript">TRICKLE</span>
                        </div>
                    }
                    onSelect={item =>
                        module.set.configValue(
                            { key: 'chargerVTrickleLvl', value: item.value },
                            {
                                ...setConfigValueExtraArgs,
                                ...{
                                    settingLocked:
                                        userOtp.settings.chargerVTrickleLvl
                                            .lock,
                                },
                            },
                        )
                    }
                    selectedItem={
                        module.values.configChargerVTrickleLvl.find(
                            item =>
                                item.value ===
                                userOtp.settings.chargerVTrickleLvl.value,
                        ) ?? module.values.configChargerVTrickleLvl[0]
                    }
                />
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.chargerVTrickleLvl.lock
                    }
                    isToggled={userOtp.settings.chargerVTrickleLvl.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'chargerVTrickleLvl',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-flex-row tw-gap-4">
                <Dropdown
                    disabled={disabled || userOtp.updateInProgress}
                    items={module.values.configChargerITrickleLvl}
                    label={
                        <div>
                            I<span className="subscript">TRICKLE</span>
                        </div>
                    }
                    onSelect={item =>
                        module.set.configValue(
                            { key: 'chargerITrickleLvl', value: item.value },
                            {
                                ...setConfigValueExtraArgs,
                                ...{
                                    settingLocked:
                                        userOtp.settings.chargerITrickleLvl
                                            .lock,
                                },
                            },
                        )
                    }
                    selectedItem={
                        module.values.configChargerITrickleLvl.find(
                            item =>
                                item.value ===
                                userOtp.settings.chargerITrickleLvl.value,
                        ) ?? module.values.configChargerITrickleLvl[0]
                    }
                />
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.chargerITrickleLvl.lock
                    }
                    isToggled={userOtp.settings.chargerITrickleLvl.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'chargerITrickleLvl',
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
                            userOtp.settings.chargerVBatLowChgEnable.value
                        }
                        label={
                            <div>
                                Enable Charging Below V
                                <span className="subscript">BATLOW</span>
                            </div>
                        }
                        onToggle={value => {
                            module.set.configValue(
                                { key: 'chargerVBatLowChgEnable', value },
                                {
                                    ...setConfigValueExtraArgs,
                                    ...{
                                        settingLocked:
                                            userOtp.settings
                                                .chargerVBatLowChgEnable.lock,
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
                        userOtp.settings.chargerVBatLowChgEnable.lock
                    }
                    isToggled={userOtp.settings.chargerVBatLowChgEnable.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'chargerVBatLowChgEnable',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-flex-row tw-gap-4">
                <Dropdown
                    disabled={disabled || userOtp.updateInProgress}
                    items={module.values.configChargerVBatLowLvl}
                    label={
                        <div>
                            V<span className="subscript">BATLOW</span>
                        </div>
                    }
                    onSelect={item =>
                        module.set.configValue(
                            { key: 'chargerVBatLowLvl', value: item.value },
                            {
                                ...setConfigValueExtraArgs,
                                ...{
                                    settingLocked:
                                        userOtp.settings.chargerVBatLowLvl.lock,
                                },
                            },
                        )
                    }
                    selectedItem={
                        module.values.configChargerVBatLowLvl.find(
                            item =>
                                item.value ===
                                userOtp.settings.chargerVBatLowLvl.value,
                        ) ?? module.values.configChargerVBatLowLvl[0]
                    }
                />
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.chargerVBatLowLvl.lock
                    }
                    isToggled={userOtp.settings.chargerVBatLowLvl.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'chargerVBatLowLvl',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                <div className="tw-w-full">
                    <Toggle
                        disabled={disabled || userOtp.updateInProgress}
                        isToggled={userOtp.settings.chargerJeitaEnable.value}
                        label="Enable Advanced Charging Profile"
                        onToggle={value => {
                            module.set.configValue(
                                { key: 'chargerJeitaEnable', value },
                                {
                                    ...setConfigValueExtraArgs,
                                    ...{
                                        settingLocked:
                                            userOtp.settings.chargerJeitaEnable
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
                        userOtp.settings.chargerJeitaEnable.lock
                    }
                    isToggled={userOtp.settings.chargerJeitaEnable.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'chargerJeitaEnable',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-flex-row tw-gap-4">
                <NumberInput
                    className="tw-w-full"
                    disabled={disabled || userOtp.updateInProgress}
                    label={
                        <div>
                            I<span className="subscript">CHG_COOL</span>
                        </div>
                    }
                    onChange={setInternalIChgCoolLvl}
                    onChangeComplete={value =>
                        module.set.configValue(
                            { key: 'chargerIChgCoolLvl', value },
                            {
                                ...setConfigValueExtraArgs,
                                chargerIChgState,
                                ...{
                                    settingLocked:
                                        userOtp.settings.chargerIChgCoolLvl
                                            .lock,
                                },
                            },
                        )
                    }
                    range={module.ranges.configChargerIChgLvl}
                    showSlider
                    unit="mA"
                    value={internalIChgCoolLvl}
                />
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.chargerIChgCoolLvl.lock
                    }
                    isToggled={userOtp.settings.chargerIChgCoolLvl.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'chargerIChgCoolLvl',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-flex-row tw-gap-4">
                <NumberInput
                    className="tw-w-full"
                    disabled={disabled || userOtp.updateInProgress}
                    label={
                        <div>
                            V<span className="subscript">TERM_COOL</span>
                        </div>
                    }
                    onChange={setInternalVTermCoolLvl}
                    onChangeComplete={value =>
                        module.set.configValue(
                            { key: 'chargerVTermCoolLvl', value },
                            {
                                ...setConfigValueExtraArgs,
                                ...{
                                    settingLocked:
                                        userOtp.settings.chargerVTermCoolLvl
                                            .lock,
                                },
                            },
                        )
                    }
                    range={module.ranges.configChargerVTermCoolLvl}
                    showSlider
                    unit="V"
                    value={internalVTermCoolLvl}
                />
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.chargerVTermCoolLvl.lock
                    }
                    isToggled={userOtp.settings.chargerVTermCoolLvl.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'chargerVTermCoolLvl',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-flex-row tw-gap-4">
                <NumberInput
                    className="tw-w-full"
                    disabled={disabled || userOtp.updateInProgress}
                    label={
                        <div>
                            I<span className="subscript">CHG_WARM</span>
                        </div>
                    }
                    onChange={setInternalIChgWarmLvl}
                    onChangeComplete={value =>
                        module.set.configValue(
                            { key: 'chargerIChgWarmLvl', value },
                            {
                                ...setConfigValueExtraArgs,
                                chargerIChgState,
                                ...{
                                    settingLocked:
                                        userOtp.settings.chargerIChgWarmLvl
                                            .lock,
                                },
                            },
                        )
                    }
                    range={module.ranges.configChargerIChgLvl}
                    showSlider
                    unit="mA"
                    value={internalIChgWarmLvl}
                />
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.chargerIChgWarmLvl.lock
                    }
                    isToggled={userOtp.settings.chargerIChgWarmLvl.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'chargerIChgWarmLvl',
                            value,
                        })
                    }
                />
            </div>

            <div className="tw-flex tw-flex-row tw-gap-4">
                <NumberInput
                    className="tw-w-full"
                    disabled={disabled || userOtp.updateInProgress}
                    label={
                        <div>
                            V<span className="subscript">TERM_WARM</span>
                        </div>
                    }
                    onChange={setInternalVTermWarmLvl}
                    onChangeComplete={value =>
                        module.set.configValue(
                            { key: 'chargerVTermWarmLvl', value },
                            {
                                ...setConfigValueExtraArgs,
                                ...{
                                    settingLocked:
                                        userOtp.settings.chargerVTermWarmLvl
                                            .lock,
                                },
                            },
                        )
                    }
                    range={module.ranges.configChargerVTermWarmLvl}
                    showSlider
                    unit="V"
                    value={internalVTermWarmLvl}
                />
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.chargerVTermWarmLvl.lock
                    }
                    isToggled={userOtp.settings.chargerVTermWarmLvl.program}
                    onToggle={value =>
                        module.set.configProgram({
                            key: 'chargerVTermWarmLvl',
                            value,
                        })
                    }
                />
            </div>

            {userOtp.settings.chargerChgEnPinSafetyTimersResetEnable?.value !==
                undefined && (
                <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                    <div className="tw-w-full">
                        <Toggle
                            disabled={disabled || userOtp.updateInProgress}
                            isToggled={
                                userOtp.settings
                                    .chargerChgEnPinSafetyTimersResetEnable
                                    .value
                            }
                            label={
                                <div>
                                    Enable Safety Timers Reset by{' '}
                                    <span className="overline-text">CHGEN</span>{' '}
                                    pin
                                </div>
                            }
                            onToggle={value => {
                                const settingLocked =
                                    userOtp.settings
                                        .chargerChgEnPinSafetyTimersResetEnable
                                        ?.lock;
                                if (settingLocked !== undefined) {
                                    module.set.configValue(
                                        {
                                            key: 'chargerChgEnPinSafetyTimersResetEnable',
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
                            userOtp.settings
                                .chargerChgEnPinSafetyTimersResetEnable.lock
                        }
                        isToggled={
                            userOtp.settings
                                .chargerChgEnPinSafetyTimersResetEnable.program
                        }
                        onToggle={value =>
                            module.set.configProgram({
                                key: 'chargerChgEnPinSafetyTimersResetEnable',
                                value,
                            })
                        }
                    />
                </div>
            )}

            {module.values.configChargerIBatLimLvl !== undefined &&
                userOtp.settings.chargerIBatLimLvl?.value !== undefined && (
                    <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                        <div className="tw-w-full">
                            <Dropdown
                                disabled={disabled || userOtp.updateInProgress}
                                items={module.values.configChargerIBatLimLvl}
                                label={
                                    <div>
                                        IBAT{' '}
                                        <span className="subscript">LIM</span>
                                    </div>
                                }
                                onSelect={item => {
                                    const settingLocked =
                                        userOtp.settings.chargerIBatLimLvl
                                            ?.lock;
                                    if (settingLocked !== undefined) {
                                        module.set.configValue(
                                            {
                                                key: 'chargerIBatLimLvl',
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
                                    module.values.configChargerIBatLimLvl.find(
                                        item =>
                                            item.value ===
                                            userOtp.settings.chargerIBatLimLvl
                                                ?.value,
                                    ) ??
                                    module.values.configChargerIBatLimLvl[0]
                                }
                            />
                        </div>
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.chargerIBatLimLvl.lock
                            }
                            isToggled={
                                userOtp.settings.chargerIBatLimLvl.program
                            }
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'chargerIBatLimLvl',
                                    value,
                                })
                            }
                        />
                    </div>
                )}

            {module.values.configChargerStartupMode !== undefined &&
                userOtp.settings.chargerStartupMode?.value !== undefined && (
                    <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                        <div className="tw-w-full">
                            <Dropdown
                                disabled={disabled || userOtp.updateInProgress}
                                items={module.values.configChargerStartupMode}
                                label="Startup Mode"
                                onSelect={item => {
                                    const settingLocked =
                                        userOtp.settings.chargerStartupMode
                                            ?.lock;
                                    if (settingLocked !== undefined) {
                                        module.set.configValue(
                                            {
                                                key: 'chargerStartupMode',
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
                                    module.values.configChargerStartupMode.find(
                                        item =>
                                            item.value ===
                                            userOtp.settings.chargerStartupMode
                                                ?.value,
                                    ) ??
                                    module.values.configChargerStartupMode[0]
                                }
                            />
                        </div>
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.chargerStartupMode.lock
                            }
                            isToggled={
                                userOtp.settings.chargerStartupMode.program
                            }
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'chargerStartupMode',
                                    value,
                                })
                            }
                        />
                    </div>
                )}

            {module.values.configChargerDropoutRecovery !== undefined &&
                userOtp.settings.chargerDropoutRecovery?.value !==
                    undefined && (
                    <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                        <div className="tw-w-full">
                            <Dropdown
                                disabled={disabled || userOtp.updateInProgress}
                                items={
                                    module.values.configChargerDropoutRecovery
                                }
                                label="Dropout Recovery"
                                onSelect={item => {
                                    const settingLocked =
                                        userOtp.settings.chargerDropoutRecovery
                                            ?.lock;
                                    if (settingLocked !== undefined) {
                                        module.set.configValue(
                                            {
                                                key: 'chargerDropoutRecovery',
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
                                    module.values.configChargerDropoutRecovery.find(
                                        item =>
                                            item.value ===
                                            userOtp.settings
                                                .chargerDropoutRecovery?.value,
                                    ) ??
                                    module.values
                                        .configChargerDropoutRecovery[0]
                                }
                            />
                        </div>
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.chargerDropoutRecovery.lock
                            }
                            isToggled={
                                userOtp.settings.chargerDropoutRecovery.program
                            }
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'chargerDropoutRecovery',
                                    value,
                                })
                            }
                        />
                    </div>
                )}

            {module.values.configChargerSoftstartCurrent !== undefined &&
                userOtp.settings.chargerSoftstartCurrent?.value !==
                    undefined && (
                    <div className="tw-flex tw-w-full tw-flex-row tw-gap-4">
                        <div className="tw-w-full">
                            <Dropdown
                                disabled={disabled || userOtp.updateInProgress}
                                items={
                                    module.values.configChargerSoftstartCurrent
                                }
                                label="Softstart Current"
                                onSelect={item => {
                                    const settingLocked =
                                        userOtp.settings.chargerSoftstartCurrent
                                            ?.lock;
                                    if (settingLocked !== undefined) {
                                        module.set.configValue(
                                            {
                                                key: 'chargerSoftstartCurrent',
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
                                    module.values.configChargerSoftstartCurrent.find(
                                        item =>
                                            item.value ===
                                            userOtp.settings
                                                .chargerSoftstartCurrent?.value,
                                    ) ??
                                    module.values
                                        .configChargerSoftstartCurrent[0]
                                }
                            />
                        </div>
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.chargerSoftstartCurrent.lock
                            }
                            isToggled={
                                userOtp.settings.chargerSoftstartCurrent.program
                            }
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'chargerSoftstartCurrent',
                                    value,
                                })
                            }
                        />
                    </div>
                )}
        </Card>
    );
};
