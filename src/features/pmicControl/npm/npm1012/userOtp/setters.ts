/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { logger } from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    type ModuleParams,
    type UserOtpConfigSettingUpdatePayload,
    type UserOtpSetConfigProgramArgs,
    type UserOtpSetConfigValueExtraArgs,
    type UserOtpSetConfigValueKVArgs,
} from '../../types';
import {
    configKeys,
    defaultProperties,
    iChgLvlCurrentIsDefault,
    iChgLvlCurrentToInteger,
    iChgLvlIntegerToCurrent,
} from './types';

export class UserOtpSet {
    constructor(private eventEmitter: ModuleParams['eventEmitter']) {}

    configProgram(args: UserOtpSetConfigProgramArgs) {
        return new Promise<void>(resolve => {
            const { key, value } = args;
            const update: UserOtpConfigSettingUpdatePayload = {
                key,
                update: { program: value },
            };
            this.eventEmitter.emit('onUserOtpConfigSettingUpdate', update);
            resolve();
        });
    }

    configValue(
        kvArgs: UserOtpSetConfigValueKVArgs,
        extraArgs: UserOtpSetConfigValueExtraArgs,
    ) {
        return new Promise<void>((resolve, reject) => {
            if (!kvArgs) {
                reject();
                return;
            }

            const key = configKeys.find(v => v === kvArgs.key);
            if (!key) {
                reject();
                return;
            }

            const { chargerIChgState, otpLocked, settingLocked } = extraArgs;

            const value = defaultProperties[key].values.find(
                v => v === kvArgs.value,
            );
            if (value === undefined) {
                reject();
                return;
            }

            const locked = otpLocked || settingLocked;

            const configUpdates: UserOtpConfigSettingUpdatePayload[] = [];

            if (key.startsWith('chargerIChg')) {
                if (!chargerIChgState) {
                    reject();
                    return;
                }

                const {
                    iChgDouble,
                    iChgDoubleLocked,
                    iChgLvl,
                    iChgCoolLvl,
                    iChgWarmLvl,
                } = chargerIChgState;
                const iChgLvlInt = iChgLvlCurrentToInteger(iChgLvl, iChgDouble);
                const iChgCoolLvlInt = iChgLvlCurrentToInteger(
                    iChgCoolLvl,
                    iChgDouble,
                );
                const iChgWarmLvlInt = iChgLvlCurrentToInteger(
                    iChgWarmLvl,
                    iChgDouble,
                );

                if (
                    iChgLvlInt === undefined ||
                    iChgCoolLvlInt === undefined ||
                    iChgWarmLvlInt === undefined
                ) {
                    logger.error(
                        'User OTP: Charging current values out of sync. Resetting to defaults',
                    );
                    configUpdates.push(
                        {
                            key: 'chargerIChgDouble',
                            update: {
                                program: false,
                                value: defaultProperties.chargerIChgDouble
                                    .default,
                            },
                        },
                        {
                            key: 'chargerIChgLvl',
                            update: {
                                program: false,
                                value: defaultProperties.chargerIChgLvl.default,
                            },
                        },
                        {
                            key: 'chargerIChgCoolLvl',
                            update: {
                                program: false,
                                value: defaultProperties.chargerIChgCoolLvl
                                    .default,
                            },
                        },
                        {
                            key: 'chargerIChgWarmLvl',
                            update: {
                                program: false,
                                value: defaultProperties.chargerIChgWarmLvl
                                    .default,
                            },
                        },
                    );
                    configUpdates.forEach(update =>
                        this.eventEmitter.emit(
                            'onUserOtpConfigSettingUpdate',
                            update,
                        ),
                    );
                    reject();
                    return;
                }

                // Determine new iChgDouble, change it (invert) only if necessary
                const newIChgDouble: boolean | undefined = (() => {
                    if (key === 'chargerIChgDouble') {
                        if (typeof value !== 'boolean') return undefined;
                        return value === true;
                    }
                    const iChg: number = Number(value);
                    if (
                        iChgLvlCurrentToInteger(iChg, iChgDouble) !== undefined
                    ) {
                        return iChgDouble;
                    }
                    if (
                        iChgLvlCurrentToInteger(iChg, !iChgDouble) !== undefined
                    ) {
                        return !iChgDouble;
                    }
                    return undefined;
                })();
                if (newIChgDouble === undefined) {
                    reject();
                    return;
                }

                const newIChgLvl =
                    key === 'chargerIChgLvl'
                        ? Number(value)
                        : iChgLvlIntegerToCurrent(iChgLvlInt, newIChgDouble);
                const newIChgCoolLvl =
                    key === 'chargerIChgCoolLvl'
                        ? Number(value)
                        : iChgLvlIntegerToCurrent(
                              iChgCoolLvlInt,
                              newIChgDouble,
                          );
                const newIChgWarmLvl =
                    key === 'chargerIChgWarmLvl'
                        ? Number(value)
                        : iChgLvlIntegerToCurrent(
                              iChgWarmLvlInt,
                              newIChgDouble,
                          );

                if (
                    newIChgLvl === undefined ||
                    newIChgCoolLvl === undefined ||
                    newIChgWarmLvl === undefined
                ) {
                    reject();
                    return;
                }

                const newProgramIChgDouble =
                    !locked &&
                    !iChgDoubleLocked &&
                    newIChgDouble !==
                        defaultProperties.chargerIChgDouble.default;
                const newProgramIChgLvl =
                    !locked &&
                    key === 'chargerIChgLvl' &&
                    iChgLvlCurrentIsDefault(newIChgLvl, newIChgDouble) ===
                        false;
                const newProgramIChgCoolLvl =
                    !locked &&
                    key === 'chargerIChgCoolLvl' &&
                    iChgLvlCurrentIsDefault(newIChgCoolLvl, newIChgDouble) ===
                        false;
                const newProgramIChgWarmLvl =
                    !locked &&
                    key === 'chargerIChgWarmLvl' &&
                    iChgLvlCurrentIsDefault(newIChgWarmLvl, newIChgDouble) ===
                        false;
                if (
                    newProgramIChgDouble ||
                    newProgramIChgLvl ||
                    newProgramIChgCoolLvl ||
                    newProgramIChgWarmLvl
                ) {
                    configUpdates.push({
                        key: 'charger',
                        update: { program: true },
                    });
                }

                configUpdates.push(
                    {
                        key: 'chargerIChgDouble',
                        update: {
                            program: newProgramIChgDouble,
                            value: newIChgDouble,
                        },
                    },
                    {
                        key: 'chargerIChgLvl',
                        update: {
                            value: newIChgLvl,
                            ...(key === 'chargerIChgLvl'
                                ? { program: newProgramIChgLvl }
                                : {}),
                        },
                    },
                    {
                        key: 'chargerIChgCoolLvl',
                        update: {
                            value: newIChgCoolLvl,
                            ...(key === 'chargerIChgCoolLvl'
                                ? { program: newProgramIChgCoolLvl }
                                : {}),
                        },
                    },
                    {
                        key: 'chargerIChgWarmLvl',
                        update: {
                            value: newIChgWarmLvl,
                            ...(key === 'chargerIChgWarmLvl'
                                ? { program: newProgramIChgWarmLvl }
                                : {}),
                        },
                    },
                );

                if (iChgDouble !== newIChgDouble) {
                    configUpdates.push(
                        {
                            key: 'chargerIChgLvl',
                            update:
                                key !== 'chargerIChgLvl'
                                    ? { program: false }
                                    : {},
                        },
                        {
                            key: 'chargerIChgCoolLvl',
                            update:
                                key !== 'chargerIChgCoolLvl'
                                    ? { program: false }
                                    : {},
                        },
                        {
                            key: 'chargerIChgWarmLvl',
                            update:
                                key !== 'chargerIChgWarmLvl'
                                    ? { program: false }
                                    : {},
                        },
                    );
                }
            } else {
                const program =
                    value !== defaultProperties[key].default && !locked;
                configUpdates.push({ key, update: { value, program } });

                if (program) {
                    if (key.startsWith('charger')) {
                        configUpdates.push({
                            key: 'charger',
                            update: { program },
                        });
                    } else if (key.startsWith('gpio')) {
                        configUpdates.push({
                            key: 'gpio',
                            update: { program },
                        });
                    } else if (key.startsWith('mainOtp')) {
                        configUpdates.push({
                            key: 'mainOtp',
                            update: { program },
                        });
                    } else if (key.startsWith('regulators')) {
                        configUpdates.push({
                            key: 'regulators',
                            update: { program },
                        });
                    } else if (key.startsWith('sysFeat')) {
                        configUpdates.push({
                            key: 'sysFeat',
                            update: { program },
                        });
                    }
                }
            }

            configUpdates.forEach(update =>
                this.eventEmitter.emit('onUserOtpConfigSettingUpdate', update),
            );
            resolve();
        });
    }
}
