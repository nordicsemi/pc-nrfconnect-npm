/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type LowPowerConfig, type ModuleParams } from '../../types';
import { LowPowerGet } from './getters';

export class LowPowerActions {
    private get: LowPowerGet;

    constructor(
        private eventEmitter: ModuleParams['eventEmitter'],
        private sendCommand: ModuleParams['sendCommand'],
        private offlineMode: ModuleParams['offlineMode'],
    ) {
        this.get = new LowPowerGet(sendCommand);
    }

    enterShipHibernateMode() {
        return new Promise<void>((resolve, reject) => {
            this.sendCommand(
                'npm12xx low_power_ctrl vbat state set hibernate',
                () => resolve(),
                () => reject(),
            );
        });
    }

    enterShipMode() {
        return new Promise<void>((resolve, reject) => {
            this.sendCommand(
                'npm12xx low_power_ctrl ship_mode set on',
                () => resolve(),
                () => reject(),
            );
        });
    }

    enterVbusHibernateMode(waitForChargeComplete?: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (waitForChargeComplete === undefined) {
                resolve();
                return;
            }

            const onSuccess = () => {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        vbusHibernateWaitingForChargeComplete:
                            waitForChargeComplete,
                    },
                );
                resolve();
            };

            if (this.offlineMode) {
                onSuccess();
            } else {
                this.sendCommand(
                    'npm12xx low_power_ctrl vbus state set hibernate',
                    onSuccess,
                    () => reject(),
                );
            }
        });
    }

    enterVbusStandby1Mode(waitForChargeComplete?: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (waitForChargeComplete === undefined) {
                resolve();
                return;
            }

            const onSuccess = () => {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        operatingMode: 'vbusStandby1',
                        vbusStandbyWaitingForChargeComplete:
                            waitForChargeComplete,
                    },
                );
                resolve();
            };

            if (this.offlineMode) {
                onSuccess();
            } else {
                this.sendCommand(
                    'npm12xx low_power_ctrl vbus state set standby1',
                    onSuccess,
                    () => reject(),
                );
            }
        });
    }

    enterVbusStandby2Mode(waitForChargeComplete?: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (waitForChargeComplete === undefined) {
                resolve();
                return;
            }

            const onSuccess = () => {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        operatingMode: 'vbusStandby2',
                        vbusStandbyWaitingForChargeComplete:
                            waitForChargeComplete,
                    },
                );
                resolve();
            };

            if (this.offlineMode) {
                onSuccess();
            } else {
                this.sendCommand(
                    'npm12xx low_power_ctrl vbus state set standby2',
                    onSuccess,
                    () => reject(),
                );
            }
        });
    }

    exitVbusStandby1Mode() {
        return new Promise<void>((resolve, reject) => {
            const onSuccess = () => {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        operatingMode: 'active',
                    },
                );
                resolve();
            };

            if (this.offlineMode) {
                onSuccess();
            } else {
                this.sendCommand(
                    'npm12xx low_power_ctrl vbus state set standbyexit',
                    onSuccess,
                    () => reject(),
                );
            }
        });
    }

    exitVbusStandby2Mode() {
        return new Promise<void>((resolve, reject) => {
            const onSuccess = () => {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        operatingMode: 'active',
                    },
                );
                resolve();
            };

            if (this.offlineMode) {
                onSuccess();
            } else {
                this.sendCommand(
                    'npm12xx low_power_ctrl vbus state set standbyexit',
                    onSuccess,
                    () => reject(),
                );
            }
        });
    }
}
