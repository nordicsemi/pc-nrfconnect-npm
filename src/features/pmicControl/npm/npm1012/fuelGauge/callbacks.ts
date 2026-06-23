/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ShellParser } from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    noop,
    type NpmEventEmitter,
    onOffRegex,
    parseBatteryModel,
    parseColonBasedAnswer,
    parseLogData,
    parseOnOff,
    parseToBoolean,
    parseToNumber,
    toRegex,
} from '../../pmicHelpers';
import {
    type BatteryHealthProfileLoadUpdate,
    type FuelGauge,
    type ProfileDownload,
} from '../../types';
import type FuelGaugeModule from '.';
import { type FuelGaugeGet } from './getters';

export default (
    shellParser: ShellParser | undefined,
    eventEmitter: NpmEventEmitter,
    get: FuelGaugeGet,
    fuelGaugeModule: FuelGaugeModule,
) => {
    if (!shellParser) {
        return [];
    }

    const callbacks = [];

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('fuel_gauge', true, undefined, '(1|0)'),

            res => {
                eventEmitter.emit('onFuelGauge', {
                    enabled: parseToBoolean(res),
                } satisfies Partial<FuelGauge>);
            },
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('fuel_gauge model download begin'),
            () => shellParser?.setShellEchos(false),
            () => shellParser?.setShellEchos(true),
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('fuel_gauge model', true, undefined, '"[^"]*"'),
            res => {
                eventEmitter.emit(
                    'onActiveBatteryModelUpdate',
                    parseBatteryModel(parseColonBasedAnswer(res)),
                );
            },
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('fuel_gauge model store'),
            () => {
                get.storedBatteryModel();
                get.activeBatteryModel();
            },
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('fuel_gauge model list'),
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
            noop,
        ),
    );

    callbacks.push(
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

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('fuel_gauge model download apply'),
            res => {
                if (fuelGaugeModule.profileDownloadInProgress) {
                    fuelGaugeModule.profileDownloadInProgress = false;
                    const profileDownload: ProfileDownload = {
                        state: 'applied',
                        alertMessage: parseColonBasedAnswer(res),
                    };
                    eventEmitter.emit(
                        'onProfileDownloadUpdate',
                        profileDownload,
                    );
                }
                shellParser?.setShellEchos(true);
            },
            res => {
                if (fuelGaugeModule.profileDownloadInProgress) {
                    fuelGaugeModule.profileDownloadInProgress = false;
                    const profileDownload: ProfileDownload = {
                        state: 'failed',
                        alertMessage: parseColonBasedAnswer(res),
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

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('fuel_gauge model download abort'),
            res => {
                if (fuelGaugeModule.profileDownloadInProgress) {
                    fuelGaugeModule.profileDownloadInProgress = false;
                    const profileDownload: ProfileDownload = {
                        state: 'aborted',
                        alertMessage: parseColonBasedAnswer(res),
                    };
                    eventEmitter.emit(
                        'onProfileDownloadUpdate',
                        profileDownload,
                    );
                }

                shellParser?.setShellEchos(true);
            },
            res => {
                if (fuelGaugeModule.profileDownloadInProgress) {
                    fuelGaugeModule.profileDownloadInProgress = false;
                    const profileDownload: ProfileDownload = {
                        state: 'failed',
                        alertMessage: parseColonBasedAnswer(res),
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

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('fuel_gauge state download abort'),
            res => {
                if (fuelGaugeModule.batteryHealthProfileLoadInProgress) {
                    fuelGaugeModule.batteryHealthProfileLoadInProgress = false;
                    const profileDownload: BatteryHealthProfileLoadUpdate = {
                        state: 'aborted',
                        alertMessage: parseColonBasedAnswer(res),
                    };
                    eventEmitter.emit(
                        'onLoadBatteryHealthProfileUpdate',
                        profileDownload,
                    );
                }

                shellParser?.setShellEchos(true);
            },
            res => {
                if (fuelGaugeModule.batteryHealthProfileLoadInProgress) {
                    fuelGaugeModule.batteryHealthProfileLoadInProgress = false;
                    const profileDownload: BatteryHealthProfileLoadUpdate = {
                        state: 'failed',
                        alertMessage: parseColonBasedAnswer(res),
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

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('fuel_gauge state download apply'),
            res => {
                if (fuelGaugeModule.batteryHealthProfileLoadInProgress) {
                    fuelGaugeModule.batteryHealthProfileLoadInProgress = false;
                    const latestResult = res.split('\n').at(-1) ?? res;
                    const profileDownload: BatteryHealthProfileLoadUpdate = {
                        state: 'applied',
                        alertMessage: parseColonBasedAnswer(latestResult),
                    };
                    eventEmitter.emit(
                        'onLoadBatteryHealthProfileUpdate',
                        profileDownload,
                    );
                }
                shellParser?.setShellEchos(true);
            },
            res => {
                if (fuelGaugeModule.batteryHealthProfileLoadInProgress) {
                    fuelGaugeModule.batteryHealthProfileLoadInProgress = false;
                    const latestResult = res.split('\n').at(-1) ?? res;
                    const profileDownload: BatteryHealthProfileLoadUpdate = {
                        state: 'failed',
                        alertMessage: parseColonBasedAnswer(latestResult),
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

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('fuel_gauge state download begin'),
            () => shellParser?.setShellEchos(false),
            () => shellParser?.setShellEchos(true),
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('fuel_gauge health enable', true, undefined, onOffRegex),
            res =>
                eventEmitter.emitPartialEvent<FuelGauge>('onFuelGauge', {
                    batteryHealthEnabled: parseOnOff(res),
                }),
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex(
                'fuel_gauge health replacement_detection',
                true,
                undefined,
                onOffRegex,
            ),
            res =>
                eventEmitter.emitPartialEvent<FuelGauge>('onFuelGauge', {
                    batteryReplacementDetection: parseOnOff(res),
                }),
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex(
                'fuel_gauge health quick_convergence',
                true,
                undefined,
                onOffRegex,
            ),
            res =>
                eventEmitter.emitPartialEvent<FuelGauge>('onFuelGauge', {
                    quickConvergenceMode: parseOnOff(res),
                }),
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('fuel_gauge health rated_min_capacity', true),
            res =>
                eventEmitter.emitPartialEvent<FuelGauge>('onFuelGauge', {
                    ratedMinBatteryCapacity: parseToNumber(res),
                }),
            noop,
        ),
    );

    return callbacks;
};
