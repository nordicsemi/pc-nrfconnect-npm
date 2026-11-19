/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { logger } from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    type ModuleParams,
    type UserOtp,
    type UserOtpConfigSettingUpdatePayload,
    type UserOtpGetConfigLockArgs,
    type UserOtpGetConfigValueArgs,
} from '../../types';
import {
    type Config,
    configCommand,
    type ConfigKey,
    configKeysWithFwSupport,
    defaultProperties,
    lockCommand,
    parseLockState,
} from './types';

export class UserOtpGet {
    constructor(
        private eventEmitter: ModuleParams['eventEmitter'],
        private offlineMode: ModuleParams['offlineMode'],
        private shellParser: ModuleParams['shellParser'],
    ) {}

    configValue(args: UserOtpGetConfigValueArgs, updateUI?: boolean) {
        return new Promise<Config[ConfigKey]>((resolve, reject) => {
            if (this.offlineMode || !this.shellParser) {
                reject();
                return;
            }
            const key = configKeysWithFwSupport.find(v => v === args.key);
            if (!key) {
                logger.error(args.key);
                reject();
                return;
            }
            this.shellParser.enqueueRequest(
                `${configCommand} get ${defaultProperties[key].fwKey}`,
                {
                    onSuccess: (msg, command) => {
                        const value = defaultProperties[key].parser(msg);
                        if (value === undefined) {
                            logger.error(command);
                            reject(key);
                            return;
                        }
                        if (updateUI === true) {
                            this.eventEmitter.emit(
                                'onUserOtpConfigSettingUpdate',
                                {
                                    key,
                                    update: { value },
                                } as UserOtpConfigSettingUpdatePayload,
                            );
                        }
                        return resolve(value);
                    },
                    onError: () => reject(),
                    onTimeout: error => {
                        reject(error);
                        console.warn(error);
                    },
                },
                5000,
                true,
            );
        });
    }

    configLock(args: UserOtpGetConfigLockArgs, updateUI?: boolean) {
        return new Promise<boolean>((resolve, reject) => {
            if (this.offlineMode || !this.shellParser) {
                reject();
                return;
            }
            const key = configKeysWithFwSupport.find(v => v === args.key);
            if (!key) {
                reject(args.key);
                return;
            }
            this.shellParser.enqueueRequest(
                `${lockCommand} get ${defaultProperties[key].fwKey}`,
                {
                    onSuccess: (msg, command) => {
                        const lock = parseLockState(msg);
                        if (lock === undefined) {
                            logger.error(command);
                            reject(key);
                            return;
                        }
                        if (updateUI === true) {
                            this.eventEmitter.emit(
                                'onUserOtpConfigSettingUpdate',
                                {
                                    key,
                                    update: { lock },
                                } as UserOtpConfigSettingUpdatePayload,
                            );
                        }
                        return resolve(lock);
                    },
                    onError: () => {
                        if (updateUI === true) {
                            this.eventEmitter.emit(
                                'onUserOtpConfigSettingUpdate',
                                {
                                    key,
                                    update: { lock: true },
                                } as UserOtpConfigSettingUpdatePayload,
                            );
                        }
                        reject(key);
                    },
                    onTimeout: error => {
                        reject(error);
                        console.warn(error);
                    },
                },
                5000,
                true,
            );
        });
    }

    configLockAll() {
        return new Promise<void>((resolve, reject) => {
            const promises = configKeysWithFwSupport.map(key =>
                this.configLock({ key }, true)
                    .then(v => ({
                        status: 'fulfilled' as const,
                        key,
                        value: v,
                    }))
                    .catch(e => ({
                        status: 'rejected' as const,
                        key,
                        error: e,
                    })),
            );
            Promise.all(promises)
                .then(res => {
                    const otpLocked = res.some(
                        r =>
                            r.key === 'mainOtpLockState' &&
                            (r.status === 'rejected' ||
                                (r.status === 'fulfilled' && r.value)),
                    );
                    if (otpLocked) {
                        this.eventEmitter.emit('onUserOtpUpdate', {
                            otpLocked: true,
                        } as UserOtp);
                    }

                    const lockCharger = res
                        .filter(r => r.key.startsWith('charger'))
                        .every(
                            r =>
                                r.status === 'rejected' ||
                                (r.status === 'fulfilled' && r.value),
                        );
                    const lockGpio = res
                        .filter(r => r.key.startsWith('gpio'))
                        .every(
                            r =>
                                r.status === 'rejected' ||
                                (r.status === 'fulfilled' && r.value),
                        );
                    const lockMainOtp = res
                        .filter(r => r.key.startsWith('mainOtp'))
                        .every(
                            r =>
                                r.status === 'rejected' ||
                                (r.status === 'fulfilled' && r.value),
                        );
                    const lockRegulators = res
                        .filter(r => r.key.startsWith('regulators'))
                        .every(
                            r =>
                                r.status === 'rejected' ||
                                (r.status === 'fulfilled' && r.value),
                        );
                    const lockSysFeat = res
                        .filter(r => r.key.startsWith('sysFeat'))
                        .every(
                            r =>
                                r.status === 'rejected' ||
                                (r.status === 'fulfilled' && r.value),
                        );
                    const configUpdates: UserOtpConfigSettingUpdatePayload[] = [
                        { key: 'charger', update: { lock: lockCharger } },
                        { key: 'gpio', update: { lock: lockGpio } },
                        { key: 'mainOtp', update: { lock: lockMainOtp } },
                        { key: 'regulators', update: { lock: lockRegulators } },
                        { key: 'sysFeat', update: { lock: lockSysFeat } },
                    ];
                    configUpdates.forEach(update =>
                        this.eventEmitter.emit(
                            'onUserOtpConfigSettingUpdate',
                            update,
                        ),
                    );
                    resolve();
                })
                .catch(reject); // should not happen as rejects are already handled above
        });
    }

    configValueAll() {
        return new Promise<void>((resolve, reject) => {
            const promises = configKeysWithFwSupport.map(key =>
                this.configValue({ key }, true),
            );
            Promise.allSettled(promises)
                .then(() => resolve())
                .catch(reject);
        });
    }
}
