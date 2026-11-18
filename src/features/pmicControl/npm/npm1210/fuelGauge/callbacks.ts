/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { parseBatteryModel, parseLogData, toRegex } from '../../pmicHelpers';
import {
    type BatteryHealthProfileLoadUpdate,
    type FuelGauge,
    type ModuleParams,
    type ProfileDownload,
} from '../../types';
import {
    parseFloatFromCmdReply,
    parseIntFromCmdReply,
    parseOnOffFromCmdReply,
    parseValueFromCmdReply,
} from '../helpers';
import type FuelGaugeModule from '.';
import { type FuelGaugeGet } from './getters';

export default (
    eventEmitter: ModuleParams['eventEmitter'],
    shellParser: ModuleParams['shellParser'],
    get: FuelGaugeGet,
    fuelGaugeModule: FuelGaugeModule,
) => {
    if (!shellParser) {
        return [];
    }

    const cleanupCallbacks = [];

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'fuel_gauge (get|set)',
            msg => {
                const value = parseIntFromCmdReply(msg);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<FuelGauge>('onFuelGauge', {
                    enabled: value > 0,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'fuel_gauge model download begin',
            () => shellParser?.setShellEchos(false),
            () => shellParser?.setShellEchos(true),
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'fuel_gauge model (get|set "[^"]*")',
            msg => {
                const res = parseValueFromCmdReply(msg);
                if (res === undefined) {
                    return;
                }
                eventEmitter.emit(
                    'onActiveBatteryModelUpdate',
                    parseBatteryModel(res),
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'fuel_gauge model store',
            () => {
                get.storedBatteryModel();
                get.activeBatteryModel();
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'fuel_gauge model list',
            res => {
                const models = res.split('Battery models stored in database:');
                if (models.length < 2) {
                    eventEmitter.emit('onStoredBatteryModelUpdate', []);
                    return;
                }
                const stringModels = models[1].trim().split('\n');
                const list = stringModels.map(parseBatteryModel);
                eventEmitter.emit(
                    'onStoredBatteryModelUpdate',
                    list.filter(item => item != null),
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.onShellLoggingEvent(logEvent => {
            parseLogData(logEvent, loggingEvent => {
                if (loggingEvent.module !== 'module_fg') {
                    return;
                }

                switch (loggingEvent.message) {
                    case 'Battery model timeout':
                        shellParser?.setShellEchos(true);

                        fuelGaugeModule.profileDownloadAborting = true;
                        if (fuelGaugeModule.profileDownloadInProgress) {
                            fuelGaugeModule.profileDownloadInProgress = false;
                            const payload: ProfileDownload = {
                                state: 'aborted',
                                alertMessage: loggingEvent.message,
                            };

                            eventEmitter.emit(
                                'onProfileDownloadUpdate',
                                payload,
                            );
                        }
                        break;

                    case 'Fuel gauge state loaded from NVM':
                        get.batteryHealthAll();
                        break;

                    case 'JSON data download timeout':
                        shellParser?.setShellEchos(true);

                        fuelGaugeModule.batteryHealthProfileLoadAborting = true;
                        if (
                            fuelGaugeModule.batteryHealthProfileLoadInProgress
                        ) {
                            fuelGaugeModule.batteryHealthProfileLoadInProgress = false;
                            const payload: BatteryHealthProfileLoadUpdate = {
                                state: 'aborted',
                                alertMessage: loggingEvent.message,
                            };

                            eventEmitter.emit(
                                'onLoadBatteryHealthProfileUpdate',
                                payload,
                            );
                        }
                        break;

                    case 'No stored fuel gauge state found':
                        get.batteryHealthAll();
                        break;
                }
            });
        }),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            toRegex('fuel_gauge model download apply'),
            msg => {
                if (fuelGaugeModule.profileDownloadInProgress) {
                    fuelGaugeModule.profileDownloadInProgress = false;
                    const res = parseValueFromCmdReply(msg) ?? '';
                    const profileDownload: ProfileDownload = {
                        state: 'applied',
                        alertMessage: res,
                    };
                    eventEmitter.emit(
                        'onProfileDownloadUpdate',
                        profileDownload,
                    );
                }
                shellParser?.setShellEchos(true);
            },
            msg => {
                if (fuelGaugeModule.profileDownloadInProgress) {
                    fuelGaugeModule.profileDownloadInProgress = false;
                    const res = parseValueFromCmdReply(msg) ?? '';
                    const profileDownload: ProfileDownload = {
                        state: 'failed',
                        alertMessage: res,
                    };
                    eventEmitter.emit(
                        'onProfileDownloadUpdate',
                        profileDownload,
                    );
                }
                shellParser?.setShellEchos(true);
            },
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            toRegex('fuel_gauge model download abort'),
            msg => {
                if (fuelGaugeModule.profileDownloadInProgress) {
                    fuelGaugeModule.profileDownloadInProgress = false;
                    const res = parseValueFromCmdReply(msg) ?? '';
                    const profileDownload: ProfileDownload = {
                        state: 'aborted',
                        alertMessage: res,
                    };
                    eventEmitter.emit(
                        'onProfileDownloadUpdate',
                        profileDownload,
                    );
                }

                shellParser?.setShellEchos(true);
            },
            msg => {
                if (fuelGaugeModule.profileDownloadInProgress) {
                    fuelGaugeModule.profileDownloadInProgress = false;
                    const res = parseValueFromCmdReply(msg) ?? '';
                    const profileDownload: ProfileDownload = {
                        state: 'failed',
                        alertMessage: res,
                    };
                    eventEmitter.emit(
                        'onProfileDownloadUpdate',
                        profileDownload,
                    );
                }

                shellParser?.setShellEchos(true);
            },
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            toRegex('fuel_gauge state download abort'),
            msg => {
                if (fuelGaugeModule.batteryHealthProfileLoadInProgress) {
                    fuelGaugeModule.batteryHealthProfileLoadInProgress = false;
                    const res = parseValueFromCmdReply(msg) ?? '';
                    const profileDownload: BatteryHealthProfileLoadUpdate = {
                        state: 'aborted',
                        alertMessage: res,
                    };
                    eventEmitter.emit(
                        'onLoadBatteryHealthProfileUpdate',
                        profileDownload,
                    );
                }

                shellParser?.setShellEchos(true);
            },
            msg => {
                if (fuelGaugeModule.batteryHealthProfileLoadInProgress) {
                    fuelGaugeModule.batteryHealthProfileLoadInProgress = false;
                    const res = parseValueFromCmdReply(msg) ?? '';
                    const profileDownload: BatteryHealthProfileLoadUpdate = {
                        state: 'failed',
                        alertMessage: res,
                    };
                    eventEmitter.emit(
                        'onLoadBatteryHealthProfileUpdate',
                        profileDownload,
                    );
                }

                shellParser?.setShellEchos(true);
            },
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            toRegex('fuel_gauge state download apply'),
            msg => {
                if (fuelGaugeModule.batteryHealthProfileLoadInProgress) {
                    fuelGaugeModule.batteryHealthProfileLoadInProgress = false;
                    const latestResult =
                        parseValueFromCmdReply(msg.split('\n').at(-1) ?? msg) ??
                        '';
                    const profileDownload: BatteryHealthProfileLoadUpdate = {
                        state: 'applied',
                        alertMessage: latestResult,
                    };
                    eventEmitter.emit(
                        'onLoadBatteryHealthProfileUpdate',
                        profileDownload,
                    );
                }
                shellParser?.setShellEchos(true);
            },
            msg => {
                if (fuelGaugeModule.batteryHealthProfileLoadInProgress) {
                    fuelGaugeModule.batteryHealthProfileLoadInProgress = false;
                    const latestResult =
                        parseValueFromCmdReply(msg.split('\n').at(-1) ?? msg) ??
                        '';
                    const profileDownload: BatteryHealthProfileLoadUpdate = {
                        state: 'failed',
                        alertMessage: latestResult,
                    };
                    eventEmitter.emit(
                        'onLoadBatteryHealthProfileUpdate',
                        profileDownload,
                    );
                }
                shellParser?.setShellEchos(true);
            },
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'fuel_gauge state download begin',
            () => shellParser?.setShellEchos(false),
            () => shellParser?.setShellEchos(true),
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'fuel_gauge health enable (get|set)',
            msg => {
                const value = parseOnOffFromCmdReply(msg);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<FuelGauge>('onFuelGauge', {
                    batteryHealthEnabled: value,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'fuel_gauge health replacement_detection (get|set)',
            msg => {
                const value = parseOnOffFromCmdReply(msg);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<FuelGauge>('onFuelGauge', {
                    batteryReplacementDetection: value,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'fuel_gauge health quick_convergence (get|set)',
            msg => {
                const value = parseOnOffFromCmdReply(msg);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<FuelGauge>('onFuelGauge', {
                    quickConvergenceMode: value,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'fuel_gauge health rated_min_capacity (get|set)',
            msg => {
                const value = parseFloatFromCmdReply(msg);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<FuelGauge>('onFuelGauge', {
                    ratedMinBatteryCapacity: Number.parseFloat(
                        value.toFixed(1),
                    ),
                });
            },
            () => {},
        ),
    );

    return cleanupCallbacks;
};
