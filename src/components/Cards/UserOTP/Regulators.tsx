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

interface UserOtpRegulatorCardProperties {
    userOtp: UserOtp;
    disabled: boolean;
    module: UserOtpModule;
}

export default ({
    userOtp,
    disabled,
    module,
}: UserOtpRegulatorCardProperties) => {
    const [internalBuckVOutLvl, setInternalBuckVOutLvl] = useState(
        userOtp.settings.regulatorsBuckVOutLvl.value,
    );
    useEffect(() => {
        setInternalBuckVOutLvl(userOtp.settings.regulatorsBuckVOutLvl.value);
    }, [userOtp.settings.regulatorsBuckVOutLvl.value]);

    const setConfigValueExtraArgs = {
        otpLocked: userOtp.otpLocked,
    };

    return (
        <Card
            title={
                <div className="tw-flex tw-justify-between">
                    <span>Regulators</span>

                    <div className="d-flex">
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.regulators.lock
                            }
                            isToggled={userOtp.settings.regulators.program}
                            label="Program"
                            onToggle={value =>
                                module.set.configProgram({
                                    key: 'regulators',
                                    value,
                                })
                            }
                        />
                    </div>
                </div>
            }
        >
            {module.values.configRegulatorsColdStartSel !== undefined &&
                userOtp.settings.regulatorsColdStartSel?.value !==
                    undefined && (
                    <div className="tw-flex tw-flex-row tw-gap-4">
                        <Dropdown
                            disabled={disabled || userOtp.updateInProgress}
                            items={module.values.configRegulatorsColdStartSel}
                            label="Cold Start Configuration"
                            onSelect={item => {
                                const settingLocked =
                                    userOtp.settings.regulatorsColdStartSel
                                        ?.lock;
                                if (settingLocked !== undefined) {
                                    module.set.configValue(
                                        {
                                            key: 'regulatorsColdStartSel',
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
                                module.values.configRegulatorsColdStartSel.find(
                                    item =>
                                        item.value ===
                                        userOtp.settings.regulatorsColdStartSel
                                            ?.value,
                                ) ??
                                module.values.configRegulatorsColdStartSel[0]
                            }
                        />
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.regulatorsColdStartSel.lock
                            }
                            isToggled={
                                userOtp.settings.regulatorsColdStartSel.program
                            }
                            onToggle={value => {
                                module.set.configProgram({
                                    key: 'regulatorsColdStartSel',
                                    value,
                                });
                            }}
                        />
                    </div>
                )}

            <div className="tw-flex tw-flex-row tw-gap-4">
                <Dropdown
                    disabled={disabled || userOtp.updateInProgress}
                    items={module.values.configRegulatorsBuckVOutSel}
                    label="BUCK Output Voltage Selection"
                    onSelect={item =>
                        module.set.configValue(
                            { key: 'regulatorsBuckVOutSel', value: item.value },
                            {
                                ...setConfigValueExtraArgs,
                                ...{
                                    settingLocked:
                                        userOtp.settings.regulatorsBuckVOutSel
                                            .lock,
                                },
                            },
                        )
                    }
                    selectedItem={
                        module.values.configRegulatorsBuckVOutSel.find(
                            item =>
                                item.value ===
                                userOtp.settings.regulatorsBuckVOutSel.value,
                        ) ?? module.values.configRegulatorsBuckVOutSel[0]
                    }
                />
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.regulatorsBuckVOutSel.lock
                    }
                    isToggled={userOtp.settings.regulatorsBuckVOutSel.program}
                    onToggle={value => {
                        module.set.configProgram({
                            key: 'regulatorsBuckVOutSel',
                            value,
                        });
                    }}
                />
            </div>

            <div className="tw-flex tw-flex-row tw-gap-4">
                <NumberInput
                    className="tw-w-full"
                    disabled={disabled || userOtp.updateInProgress}
                    label={
                        <div>
                            BUCK V<span className="subscript">OUT</span>
                        </div>
                    }
                    onChange={setInternalBuckVOutLvl}
                    onChangeComplete={value =>
                        module.set.configValue(
                            { key: 'regulatorsBuckVOutLvl', value },
                            {
                                ...setConfigValueExtraArgs,
                                ...{
                                    settingLocked:
                                        userOtp.settings.regulatorsBuckVOutLvl
                                            .lock,
                                },
                            },
                        )
                    }
                    range={module.ranges.configRegulatorsBuckVOutLvl}
                    showSlider
                    unit="V"
                    value={internalBuckVOutLvl}
                />
                <Toggle
                    disabled={
                        disabled ||
                        userOtp.updateInProgress ||
                        userOtp.otpLocked ||
                        userOtp.settings.regulatorsBuckVOutLvl.lock
                    }
                    isToggled={userOtp.settings.regulatorsBuckVOutLvl.program}
                    onToggle={value => {
                        module.set.configProgram({
                            key: 'regulatorsBuckVOutLvl',
                            value,
                        });
                    }}
                />
            </div>

            {module.values.configRegulatorsLdoVOutSel !== undefined &&
                userOtp.settings.regulatorsLdoVOutSel?.value !== undefined && (
                    <div className="tw-flex tw-flex-row tw-gap-4">
                        <Dropdown
                            disabled={disabled || userOtp.updateInProgress}
                            items={module.values.configRegulatorsLdoVOutSel}
                            label="LOADSW1/LDO1 Output Voltage Selection"
                            onSelect={item => {
                                const settingLocked =
                                    userOtp.settings.regulatorsLdoVOutSel?.lock;
                                if (settingLocked !== undefined) {
                                    module.set.configValue(
                                        {
                                            key: 'regulatorsLdoVOutSel',
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
                                module.values.configRegulatorsLdoVOutSel.find(
                                    item =>
                                        item.value ===
                                        userOtp.settings.regulatorsLdoVOutSel
                                            ?.value,
                                ) ?? module.values.configRegulatorsLdoVOutSel[0]
                            }
                        />
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.regulatorsLdoVOutSel.lock
                            }
                            isToggled={
                                userOtp.settings.regulatorsLdoVOutSel.program
                            }
                            onToggle={value => {
                                module.set.configProgram({
                                    key: 'regulatorsLdoVOutSel',
                                    value,
                                });
                            }}
                        />
                    </div>
                )}

            {module.values.configRegulatorsLdoSoftStartILimLvl !== undefined &&
                userOtp.settings.regulatorsLdoSoftStartILimLvl?.value !==
                    undefined && (
                    <div className="tw-flex tw-flex-row tw-gap-4">
                        <Dropdown
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.regulatorsLdoSoftStartILimLvl
                                    .lock
                            }
                            items={
                                module.values
                                    .configRegulatorsLdoSoftStartILimLvl
                            }
                            label={
                                userOtp.regulatorsLdoSoftStartILimLvlLabel !==
                                undefined
                                    ? userOtp.regulatorsLdoSoftStartILimLvlLabel
                                    : 'LOADSW1/LDO1 Soft Start Current Limit'
                            }
                            onSelect={item => {
                                const settingLocked =
                                    userOtp.settings
                                        .regulatorsLdoSoftStartILimLvl?.lock;
                                if (settingLocked !== undefined) {
                                    module.set.configValue(
                                        {
                                            key: 'regulatorsLdoSoftStartILimLvl',
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
                                module.values.configRegulatorsLdoSoftStartILimLvl.find(
                                    item =>
                                        item.value ===
                                        userOtp.settings
                                            .regulatorsLdoSoftStartILimLvl
                                            ?.value,
                                ) ??
                                module.values
                                    .configRegulatorsLdoSoftStartILimLvl[0]
                            }
                        />
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.regulatorsLdoSoftStartILimLvl
                                    .lock
                            }
                            isToggled={
                                userOtp.settings.regulatorsLdoSoftStartILimLvl
                                    .program
                            }
                            onToggle={value => {
                                module.set.configProgram({
                                    key: 'regulatorsLdoSoftStartILimLvl',
                                    value,
                                });
                            }}
                        />
                    </div>
                )}

            {module.values.configRegulatorsLdoSoftStartTime !== undefined &&
                userOtp.settings.regulatorsLdoSoftStartTime?.value !==
                    undefined && (
                    <div className="tw-flex tw-flex-row tw-gap-4">
                        <Dropdown
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.regulatorsLdoSoftStartTime.lock
                            }
                            items={
                                module.values.configRegulatorsLdoSoftStartTime
                            }
                            label="LOADSW1/LDO1 Soft Start Current Time"
                            onSelect={item => {
                                const settingLocked =
                                    userOtp.settings.regulatorsLdoSoftStartTime
                                        ?.lock;
                                if (settingLocked !== undefined) {
                                    module.set.configValue(
                                        {
                                            key: 'regulatorsLdoSoftStartTime',
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
                                module.values.configRegulatorsLdoSoftStartTime.find(
                                    item =>
                                        item.value ===
                                        userOtp.settings
                                            .regulatorsLdoSoftStartTime?.value,
                                ) ??
                                module.values
                                    .configRegulatorsLdoSoftStartTime[0]
                            }
                        />
                        <Toggle
                            disabled={
                                disabled ||
                                userOtp.updateInProgress ||
                                userOtp.otpLocked ||
                                userOtp.settings.regulatorsLdoSoftStartTime.lock
                            }
                            isToggled={
                                userOtp.settings.regulatorsLdoSoftStartTime
                                    .program
                            }
                            onToggle={value => {
                                module.set.configProgram({
                                    key: 'regulatorsLdoSoftStartTime',
                                    value,
                                });
                            }}
                        />
                    </div>
                )}
        </Card>
    );
};
