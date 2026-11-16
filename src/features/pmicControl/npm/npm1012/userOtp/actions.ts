/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */
import { logger } from '@nordicsemiconductor/pc-nrfconnect-shared';

import { parseLogData } from '../../pmicHelpers';
import {
    type ModuleParams,
    type PmicDialog,
    type UserOtp,
    type UserOtpConfig,
    type UserOtpConfigKey,
    type UserOtpConfigSettings,
    type UserOtpConfigSettingUpdatePayload,
    type UserOtpSetConfigValueKVArgs,
} from '../../types';
import { UserOtpGet } from './getters';
import {
    type Config,
    configCommand,
    type ConfigKey,
    configKeys,
    configRegulatorsBuckVOutLvlValues,
    configValueIsDefault,
    defaultProperties,
    iChgLvlCurrentToInteger,
    isIChgLvlKey,
    programCommand,
    uicrBits,
} from './types';

/* eslint-disable class-methods-use-this */

export class UserOtpActions {
    private get: UserOtpGet;
    private updateInProgress: false | 'read' | 'write';

    constructor(
        private dialogHandler: ModuleParams['dialogHandler'],
        private eventEmitter: ModuleParams['eventEmitter'],
        private offlineMode: ModuleParams['offlineMode'],
        private sendCommand: ModuleParams['sendCommand'],
        private shellParser: ModuleParams['shellParser'],
    ) {
        this.get = new UserOtpGet(eventEmitter, offlineMode, shellParser);
        this.updateInProgress = false;
    }

    cacheRefresh() {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode || !this.shellParser) {
                reject();
                return;
            }

            const cleanupCallback = this.shellParser.onShellLoggingEvent(
                logEvent => {
                    parseLogData(logEvent, loggingEvent => {
                        if (loggingEvent.module !== 'uicr') {
                            return;
                        }
                        cleanupCallback();
                        if (
                            loggingEvent.message !==
                            'UICR cache refresh succeeded'
                        ) {
                            reject();
                            logger.error(`User OTP: ${loggingEvent.message}`);
                            return;
                        }
                        resolve();
                    });
                },
            );

            const onError = (error: string) => {
                cleanupCallback();
                reject(error);
                console.warn(error);
            };

            this.shellParser.enqueueRequest(
                `${configCommand} cache set BACKGROUND_REFRESH`,
                {
                    onSuccess: () => {},
                    onError,
                    onTimeout: onError,
                },
                5000,
                true,
            );
        });
    }

    clearWriteSelection() {
        return new Promise<void>(resolve => {
            // Clear program option toggles
            const configUpdates: UserOtpConfigSettingUpdatePayload[] = [
                { key: 'charger', update: { program: false } },
                { key: 'gpio', update: { program: false } },
                { key: 'mainOtp', update: { program: false } },
                { key: 'regulators', update: { program: false } },
                { key: 'sysFeat', update: { program: false } },
            ];
            configKeys.forEach(key =>
                configUpdates.push({ key, update: { program: false } }),
            );
            configUpdates.forEach(update =>
                this.eventEmitter.emit('onUserOtpConfigSettingUpdate', update),
            );
            resolve();
        });
    }

    configureAndExport(settings: UserOtpConfigSettings) {
        return new Promise<string>((resolve, reject) => {
            const numUicrBits = 104;
            const numUicrBytes = Math.ceil(numUicrBits / 8);

            const uicrBytes = new Uint8Array(numUicrBytes).fill(0);

            /* eslint-disable no-bitwise */
            Object.entries(settings).forEach(([settingKey, settingVal]) => {
                const key = configKeys.find(v => v === settingKey);
                if (key === undefined) {
                    return;
                }
                const regVal = this.findRegisterValue(
                    settings,
                    key,
                    settingVal.value,
                );
                if (regVal === undefined || !Number.isInteger(regVal)) {
                    reject(key);
                    return;
                }

                const bitOffset = uicrBits[key].bitOffset;
                const numBits = uicrBits[key].numBits;
                if (numBits > 8) {
                    reject(key);
                    return;
                }

                const byteIndex = Math.floor(bitOffset / 8);
                if (byteIndex >= numUicrBytes) {
                    reject(key);
                    return;
                }
                const bitIndex = bitOffset % 8;

                const numBitsFirstByte = Math.min(8 - bitIndex, numBits);
                {
                    const usedBitsMsk =
                        ((1 << numBitsFirstByte) - 1) << bitIndex;
                    uicrBytes[byteIndex] =
                        ((regVal << bitIndex) & usedBitsMsk) |
                        (uicrBytes[byteIndex] & ~usedBitsMsk);
                }

                const numBitsSecondByte = numBits - numBitsFirstByte;
                if (numBitsSecondByte > 0) {
                    if (byteIndex + 1 >= numUicrBytes) {
                        reject(key);
                        return;
                    }

                    const usedBitsMsk = (1 << numBitsSecondByte) - 1;
                    uicrBytes[byteIndex + 1] =
                        ((regVal >> numBitsFirstByte) & usedBitsMsk) |
                        (uicrBytes[byteIndex + 1] & ~usedBitsMsk);
                }
            });
            /* eslint-enable no-bitwise */

            const newByteArrayHex: string[] = Array.from(uicrBytes).map(
                v => `0x${v.toString(16).padStart(2, '0')}`,
            );
            const byteArrayStr = `static const uint8_t uicr_bytes[] = {${newByteArrayHex.join(',')}};`;
            resolve(byteArrayStr);
        });
    }

    confirmWrite() {
        return new Promise<'cancel' | 'confirm'>((resolve, reject) => {
            if (!this.dialogHandler) {
                logger.error('User OTP: Dialog handler not available');
                reject();
                return;
            }
            const warningDialog: PmicDialog = {
                cancelLabel: 'No',
                confirmLabel: 'Yes',
                message:
                    'Programming User OTP will permanently change the behavior of the PMIC. ' +
                    'All configurations that have been changed and have the "Program" toggle enabled will be programmed. ' +
                    'Are you sure you want to proceed?',
                onCancel: () => resolve('cancel'),
                onConfirm: () => resolve('confirm'),
                title: 'Warning',
                type: 'alert',
            };
            this.dialogHandler(warningDialog);
        });
    }

    findRegisterValue(
        settings: UserOtpConfigSettings,
        key: ConfigKey,
        val: UserOtpConfig[UserOtpConfigKey],
    ): number | undefined {
        if (isIChgLvlKey(key)) {
            const iChgDouble = settings.chargerIChgDouble.value;
            const iChgLvlInt = iChgLvlCurrentToInteger(Number(val), iChgDouble);
            return iChgLvlInt;
        }
        if (key === 'regulatorsBuckVOutLvl') {
            const index = configRegulatorsBuckVOutLvlValues.findIndex(
                v => v === val,
            );
            return index >= 0 && index <= 46 ? index + 9 : undefined; // valid value range is 9-55
        }

        const index = uicrBits[key].values?.findIndex(v => v === val);
        return index !== undefined && index >= 0 ? index : undefined;
    }

    enableProgramming(dryRun: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode || !this.shellParser) {
                reject();
                return;
            }

            this.shellParser.enqueueRequest(
                `${programCommand} set ${dryRun ? 'DRY_RUN' : 'ON'}`,
                {
                    onSuccess: () => resolve(),
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

    programConfigValue(kvArgs: UserOtpSetConfigValueKVArgs) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode || !this.shellParser) {
                reject();
                return;
            }

            if (!kvArgs) {
                reject();
                return;
            }
            const key = configKeys.find(v => v === kvArgs.key);
            if (!key) {
                reject();
                return;
            }
            const value = defaultProperties[key].values.find(
                v => v === kvArgs.value,
            );
            if (value === undefined) {
                reject();
                return;
            }

            const valueStr = defaultProperties[key].convertToString(value);
            if (valueStr === undefined) {
                reject();
                return;
            }
            this.shellParser.enqueueRequest(
                `${configCommand} set ${defaultProperties[key].fwKey} ${valueStr}`,
                {
                    onSuccess: () => resolve(),
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

    read() {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode || !this.shellParser) {
                reject();
                return;
            }
            if (this.updateInProgress !== false) {
                logger.warn(
                    `User OTP: Configuration ${this.updateInProgress} in progress`,
                );
                reject();
                return;
            }
            this.eventEmitter.emit('onUserOtpUpdate', {
                updateInProgress: true,
            } as UserOtp);
            this.updateInProgress = 'read';

            const onReturn = () => {
                this.eventEmitter.emit('onUserOtpUpdate', {
                    updateInProgress: false,
                } as UserOtp);
                this.updateInProgress = false;
            };

            const read = this.cacheRefresh()
                .then(() => this.get.configLockAll())
                .then(() => this.get.configValueAll())
                .then(() => this.clearWriteSelection())
                .catch(() => this.clearWriteSelection());

            read.then(() => {
                resolve();
                onReturn();
            }).catch(() => {
                reject();
                onReturn();
            });
        });
    }

    async write(settings: UserOtpConfigSettings, dryRun: boolean) {
        if (this.offlineMode || !this.shellParser) {
            return;
        }

        const otpLockKey: ConfigKey = 'mainOtpLockState';
        const chargerIChgDoubleKey: ConfigKey = 'chargerIChgDouble';

        if (settings[otpLockKey].lock) {
            logger.error('User OTP: Configuration locked');
            return;
        }

        const configState: {
            key: ConfigKey;
            locked: boolean;
            program: boolean;
        }[] = [];
        const configUpdates: UserOtpConfigSettingUpdatePayload[] = [];
        const writeSet: { key: ConfigKey; value: Config[ConfigKey] }[] = [];

        {
            const programCharger =
                !settings.charger.lock && settings.charger.program;
            const programGpio = !settings.gpio.lock && settings.gpio.program;
            const programMainOtp =
                !settings.mainOtp.lock && settings.mainOtp.program;
            const programRegulators =
                !settings.regulators.lock && settings.regulators.program;
            const programSysFeat =
                !settings.sysFeat.lock && settings.sysFeat.program;

            let error = false;
            Object.entries(settings).forEach(([settingKey, settingVal]) => {
                const key = configKeys.find(v => v === settingKey);
                if (key === undefined) {
                    return;
                }

                const value = defaultProperties[key].values.find(
                    v => v === settingVal.value,
                );
                if (value === undefined) {
                    logger.error(
                        `User OTP: Unknown option: key=${key}, value=${settingVal.value}`,
                    );
                    error = true;
                    return;
                }

                const isDefault = configValueIsDefault(
                    key,
                    value,
                    settings.chargerIChgDouble.value,
                );
                if (isDefault === undefined) {
                    logger.error(
                        `User OTP: Failed to determine default value: key=${key}, value=${settingVal.value}`,
                    );
                    error = true;
                    return;
                }
                const programKey =
                    !isDefault && !settingVal.lock && settingVal.program;
                const programKeyGroup =
                    (key.startsWith('charger') && programCharger) ||
                    (key.startsWith('gpio') && programGpio) ||
                    (key.startsWith('mainOtp') && programMainOtp) ||
                    (key.startsWith('regulators') && programRegulators) ||
                    (key.startsWith('sysFeat') && programSysFeat);
                if (programKey && programKeyGroup) {
                    writeSet.push({ key, value });
                } else {
                    configState.push({
                        key,
                        locked: settingVal.lock,
                        program: false,
                    });
                    if (settingVal.program) {
                        configUpdates.push({
                            key,
                            update: { program: false },
                        });
                    }
                }
            });
            if (error) {
                logger.error('User OTP: Error validating options to program');
                return;
            }
        }

        if (writeSet.length === 0) {
            logger.warn('User OTP: No programmable options selected');
            return;
        }

        if (this.updateInProgress !== false) {
            logger.warn(
                `User OTP: Configuration ${this.updateInProgress} in progress`,
            );
            return;
        }
        this.updateInProgress = 'write';
        this.eventEmitter.emit('onUserOtpUpdate', {
            updateInProgress: true,
        } as UserOtp);
        const onReturn = () => {
            this.eventEmitter.emit('onUserOtpUpdate', {
                updateInProgress: false,
            } as UserOtp);
            this.updateInProgress = false;
        };

        if (!dryRun) {
            let error = false;
            const res = await this.confirmWrite().catch(() => {
                error = true;
            });
            if (error || res !== 'confirm') {
                onReturn();
                return;
            }
        }

        {
            let error = false;
            await this.cacheRefresh().catch(() => {
                error = true;
            });
            if (error) {
                logger.error('User OTP: Failed to refresh cache');
                onReturn();
                return;
            }
        }

        // Check iChg values against (to be) programmed iChgDouble value
        if (writeSet.some(v => isIChgLvlKey(v.key))) {
            const iChgDouble: boolean | undefined = await (async () => {
                const findRes = writeSet.find(
                    v => v.key === chargerIChgDoubleKey,
                )?.value;
                if (findRes !== undefined) {
                    return findRes as boolean;
                }
                const res = await this.get
                    .configValue({ key: chargerIChgDoubleKey }, false)
                    .catch(() => undefined);
                return typeof res === 'boolean' ? res : undefined;
            })();
            if (iChgDouble === undefined) {
                logger.error(
                    `User OTP: Failed to get state of ${defaultProperties[chargerIChgDoubleKey].fwKey}`,
                );
                onReturn();
                return;
            }

            let error = false;
            writeSet.forEach(v => {
                if (!isIChgLvlKey(v.key)) {
                    return;
                }
                const iChgLvl = Number(v.value);
                const iChgLvlInt = iChgLvlCurrentToInteger(iChgLvl, iChgDouble);
                if (iChgLvlInt === undefined) {
                    logger.warn(
                        `User OTP: Incompatible ${defaultProperties[v.key].fwKey} and ${defaultProperties[chargerIChgDoubleKey].fwKey} values`,
                    );
                    if (iChgLvl > 128 && !iChgDouble) {
                        logger.warn(
                            `User OTP: For charging currents over 128 mA, the "Ichg double" option must be programmed as enabled`,
                        );
                    }
                    error = true;
                }
            });
            if (error) {
                logger.error('User OTP: Error validating options to program');
                onReturn();
                return;
            }
        }

        {
            let error = false;
            await this.enableProgramming(dryRun).catch(() => {
                error = true;
            });
            if (error) {
                logger.error('User OTP: Failed to enable programming');
                onReturn();
                return;
            }
        }

        {
            let writeCount = 0;
            let error = false;
            if (writeSet.some(v => v.key === chargerIChgDoubleKey)) {
                await this.programConfigValue({
                    key: chargerIChgDoubleKey,
                    value: true,
                })
                    .then(() => {
                        configState.push({
                            key: chargerIChgDoubleKey,
                            locked: true,
                            program: false,
                        });
                        configUpdates.push({
                            key: chargerIChgDoubleKey,
                            update: { lock: true, program: false },
                        });
                        writeCount += 1;
                        logger.info(
                            `User OTP: Successfully programmed ${defaultProperties[chargerIChgDoubleKey].fwKey}`,
                        );
                    })
                    .catch(() => {
                        logger.error(
                            `User OTP: Error programming ${defaultProperties[chargerIChgDoubleKey].fwKey}`,
                        );
                        configState.push({
                            key: chargerIChgDoubleKey,
                            locked: false,
                            program: true,
                        });
                        error = true;
                    });
            }
            const filteredWriteSet = writeSet.filter(
                v => v.key !== otpLockKey && v.key !== chargerIChgDoubleKey,
            );
            if (error) {
                filteredWriteSet.forEach(v =>
                    configState.push({
                        key: v.key,
                        locked: false,
                        program: true,
                    }),
                );
            } else {
                await Promise.allSettled(
                    filteredWriteSet.map(v =>
                        this.programConfigValue(v)
                            .then(() => {
                                configState.push({
                                    key: v.key,
                                    locked: true,
                                    program: false,
                                });
                                configUpdates.push({
                                    key: v.key,
                                    update: { lock: true, program: false },
                                });
                                writeCount += 1;
                                logger.info(
                                    `User OTP: Successfully programmed ${defaultProperties[v.key].fwKey}`,
                                );
                            })
                            .catch(() => {
                                logger.error(
                                    `User OTP: Error programming ${defaultProperties[v.key].fwKey}`,
                                );
                                configState.push({
                                    key: v.key,
                                    locked: false,
                                    program: true,
                                });
                                error = true;
                            }),
                    ),
                );
            }
            if (writeSet.some(v => v.key === otpLockKey && v.value === true)) {
                if (error) {
                    configState.push({
                        key: otpLockKey,
                        locked: false,
                        program: true,
                    });
                } else {
                    await this.programConfigValue({
                        key: otpLockKey,
                        value: true,
                    })
                        .then(() => {
                            configState.push({
                                key: otpLockKey,
                                locked: true,
                                program: false,
                            });
                            configUpdates.push({
                                key: otpLockKey,
                                update: { lock: true, program: false },
                            });
                            writeCount += 1;
                            logger.info(
                                `User OTP: Successfully programmed ${defaultProperties[otpLockKey].fwKey}`,
                            );
                        })
                        .catch(() => {
                            logger.error(
                                `User OTP: Error programming ${defaultProperties[otpLockKey].fwKey}`,
                            );
                            configState.push({
                                key: otpLockKey,
                                locked: false,
                                program: true,
                            });
                            error = true;
                        });
                }
            }

            logger.info(
                `User OTP: Successfully programmed ${writeCount}/${writeSet.length} of the selected options${dryRun ? ' (dry run)' : ''}`,
            );
        }

        const otpLocked =
            configState.find(v => v.key === otpLockKey)?.locked === true;

        if (!dryRun) {
            if (otpLocked) {
                this.eventEmitter.emit('onUserOtpUpdate', {
                    otpLocked: true,
                } as UserOtp);
            }

            const chargerState = configState.filter(v =>
                v.key.startsWith('charger'),
            );
            const gpioState = configState.filter(v => v.key.startsWith('gpio'));
            const mainOtpState = configState.filter(v =>
                v.key.startsWith('mainOtp'),
            );
            const regulatorsState = configState.filter(v =>
                v.key.startsWith('regulators'),
            );
            const sysFeatState = configState.filter(v =>
                v.key.startsWith('sysFeat'),
            );

            const lockCharger = chargerState.every(v => v.locked === true);
            const lockGpio = gpioState.every(v => v.locked === true);
            const lockMainOtp = mainOtpState.every(v => v.locked === true);
            const lockRegulators = regulatorsState.every(
                v => v.locked === true,
            );
            const lockSysFeat = sysFeatState.every(v => v.locked === true);

            const programCharger = chargerState.some(v => v.program === true);
            const programGpio = gpioState.some(v => v.program === true);
            const programMainOtp = mainOtpState.some(v => v.program === true);
            const programRegulators = regulatorsState.some(
                v => v.program === true,
            );
            const programSysFeat = sysFeatState.some(v => v.program === true);

            configUpdates.push(
                {
                    key: 'charger',
                    update: {
                        lock: lockCharger,
                        program: !otpLocked && !lockCharger && programCharger,
                    },
                },
                {
                    key: 'gpio',
                    update: {
                        lock: lockGpio,
                        program: !otpLocked && !lockGpio && programGpio,
                    },
                },
                {
                    key: 'mainOtp',
                    update: {
                        lock: lockMainOtp,
                        program: !otpLocked && !lockMainOtp && programMainOtp,
                    },
                },
                {
                    key: 'regulators',
                    update: {
                        lock: lockRegulators,
                        program:
                            !otpLocked && !lockRegulators && programRegulators,
                    },
                },
                {
                    key: 'sysFeat',
                    update: {
                        lock: lockSysFeat,
                        program: !otpLocked && !lockSysFeat && programSysFeat,
                    },
                },
            );
            configUpdates.forEach(update =>
                this.eventEmitter.emit('onUserOtpConfigSettingUpdate', update),
            );
        }

        this.sendCommand(`${programCommand} set OFF`);
        onReturn();
    }
}
