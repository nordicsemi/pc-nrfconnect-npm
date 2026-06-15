/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type NpmEventEmitter } from '../../pmicHelpers';
import {
    type AdcSampleSettings,
    type FuelGauge,
    type FuelGaugeExport,
} from '../../types';
import { FuelGaugeGet } from './getters';

export class FuelGaugeSet {
    private get: FuelGaugeGet;

    constructor(
        private eventEmitter: NpmEventEmitter,
        private sendCommand: (
            command: string,
            onSuccess?: (response: string, command: string) => void,
            onError?: (response: string, command: string) => void,
        ) => void,
        private offlineMode: boolean,
    ) {
        this.get = new FuelGaugeGet(sendCommand);
    }

    async all(config: FuelGaugeExport) {
        const promises = [this.enabled(config.enabled)];

        if (config.batteryHealthEnabled !== undefined) {
            promises.push(
                this.batteryHealthEnabled(config.batteryHealthEnabled),
            );
        }
        if (config.batteryReplacementDetection !== undefined) {
            promises.push(
                this.batteryReplacementDetection(
                    config.batteryReplacementDetection,
                ),
            );
        }
        if (config.quickConvergenceMode !== undefined) {
            promises.push(
                this.quickConvergenceMode(config.quickConvergenceMode),
            );
        }
        if (config.ratedMinBatteryCapacity !== undefined) {
            promises.push(
                this.ratedMinBatteryCapacity(config.ratedMinBatteryCapacity),
            );
        }

        await Promise.allSettled(promises);
    }

    enabled(enabled: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emit('onFuelGauge', {
                    enabled,
                } satisfies Partial<FuelGauge>);
                resolve();
            } else {
                this.sendCommand(
                    `fuel_gauge set ${enabled ? '1' : '0'}`,
                    () => resolve(),
                    () => {
                        this.get.enabled();
                        reject();
                    },
                );
            }
        });
    }

    activeBatteryModel(name: string) {
        return new Promise<void>((resolve, reject) => {
            this.sendCommand(
                `fuel_gauge model set "${name}"`,
                () => resolve(),
                () => {
                    this.get.activeBatteryModel();
                    reject();
                },
            );
        });
    }

    adcSample(reportRate: number, samplingRate: number) {
        return new Promise<void>((resolve, reject) => {
            const onSuccess = () => {
                const settings: AdcSampleSettings = {
                    reportRate,
                    samplingRate,
                };
                this.eventEmitter.emit('onAdcSettingsChange', settings);
                resolve();
            };

            if (this.offlineMode) {
                onSuccess();
            } else {
                this.sendCommand(
                    `npm_adc sample ${samplingRate} ${reportRate}`,
                    () => onSuccess(),
                    () => reject(),
                );
            }
        });
    }

    batteryStatusCheckEnabled(enabled: boolean) {
        return new Promise<void>((resolve, reject) => {
            this.sendCommand(
                `npm_chg_status_check set ${enabled ? '1' : '0'}`,
                () => resolve(),
                () => reject(),
            );
        });
    }

    batteryHealthEnabled(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<FuelGauge>('onFuelGauge', {
                    batteryHealthEnabled: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `fuel_gauge health enable set ${value ? 'ON' : 'OFF'}`,
                    () => resolve(),
                    () => {
                        this.get.batteryHealthEnabled();
                        reject();
                    },
                );
            }
        });
    }

    batteryReplacementDetection(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<FuelGauge>('onFuelGauge', {
                    batteryReplacementDetection: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `fuel_gauge health replacement_detection set ${value ? 'ON' : 'OFF'}`,
                    () => resolve(),
                    () => {
                        this.get.batteryReplacementDetection();
                        reject();
                    },
                );
            }
        });
    }

    quickConvergenceMode(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<FuelGauge>('onFuelGauge', {
                    quickConvergenceMode: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `fuel_gauge health quick_convergence set ${value ? 'ON' : 'OFF'}`,
                    () => resolve(),
                    () => {
                        this.get.quickConvergenceMode();
                        reject();
                    },
                );
            }
        });
    }

    ratedMinBatteryCapacity(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<FuelGauge>('onFuelGauge', {
                    ratedMinBatteryCapacity: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `fuel_gauge health rated_min_capacity set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.ratedMinBatteryCapacity();
                        reject();
                    },
                );
            }
        });
    }
}
