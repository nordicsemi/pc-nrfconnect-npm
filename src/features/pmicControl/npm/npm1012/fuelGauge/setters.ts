/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
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

    async all(fuelGauge: FuelGaugeExport) {
        await Promise.allSettled([this.enabled(fuelGauge.enabled)]);
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

    batteryStatusCheckEnabled(enabled: boolean) {
        return new Promise<void>((resolve, reject) => {
            this.sendCommand(
                `npm_chg_status_check set ${enabled ? '1' : '0'}`,
                () => resolve(),
                () => reject(),
            );
        });
    }
}
