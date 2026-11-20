/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    type LowPowerConfig,
    type LowPowerConfigShipVBusFilt,
    type LowPowerConfigShipVBusFiltTime,
    type LowPowerConfigShpHldSlider,
    type LowPowerConfigShpHldSlideSwitchDelay,
    type LowPowerConfigShpHldSlideSwitchPollTime,
    type LowPowerConfigShpHldType,
    type LowPowerConfigVBusStandbyCtrl,
    type LowPowerConfigVBusStandbySel,
    type ModuleParams,
    type TimeToActive,
} from '../../types';
import { LowPowerGet } from './getters';
import {
    shipVBusFiltDisable,
    shpHldSliderDisable,
    shpHldSlideSwitchDelayDisable,
    shpHldSlideSwitchPollTimeDisable,
} from './types';

export class LowPowerSet {
    private get: LowPowerGet;

    constructor(
        private eventEmitter: ModuleParams['eventEmitter'],
        private offlineMode: ModuleParams['offlineMode'],
        private sendCommand: ModuleParams['sendCommand'],
    ) {
        this.get = new LowPowerGet(sendCommand);
    }

    async all(config: LowPowerConfig) {
        const promises = [this.timeToActive(config.timeToActive)];

        if (config.hibernateWakeupByButton !== undefined) {
            promises.push(
                this.hibernateWakeupByButton(config.hibernateWakeupByButton),
            );
        }
        if (config.vbusHibernateWait !== undefined) {
            promises.push(this.vbusHibernateWait(config.vbusHibernateWait));
        }
        if (config.vbusStandbyWait !== undefined) {
            promises.push(this.vbusStandbyWait(config.vbusStandbyWait));
        }

        await Promise.allSettled(promises);
    }

    hibernateWakeupByButton(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        hibernateWakeupByButton: value,
                    },
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx low_power_ctrl shphld hibernate_wakeup set ${value ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.hibernateWakeupByButton();
                        reject();
                    },
                );
            }
        });
    }

    shipVBusFilt(value: LowPowerConfigShipVBusFilt) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        shipVBusFilt: value,
                    },
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx low_power_ctrl vbus shipfilt set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.shipVBusFilt();
                        reject();
                    },
                );
            }
        });
    }

    shipVBusFiltTime(value: LowPowerConfigShipVBusFiltTime) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        shipVBusFiltTime: value,
                    },
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx low_power_ctrl vbus shipfiltset set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.shipVBusFiltTime();
                        reject();
                    },
                );
            }
        });
    }

    shpHldSlideSwitchDelay(value: LowPowerConfigShpHldSlideSwitchDelay) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        shpHldSlideSwitchDelay: value,
                    },
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx low_power_ctrl shphld delaysel set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.shpHldSlideSwitchDelay();
                        reject();
                    },
                );
            }
        });
    }

    shpHldSlideSwitchPollTime(value: LowPowerConfigShpHldSlideSwitchPollTime) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        shpHldSlideSwitchPollTime: value,
                    },
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx low_power_ctrl shphld polltime set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.shpHldSlideSwitchPollTime();
                        reject();
                    },
                );
            }
        });
    }

    shpHldSlider(value: LowPowerConfigShpHldSlider) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        shpHldSlider: value,
                    },
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx low_power_ctrl shphld slider set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.shpHldSlider();
                        reject();
                    },
                );
            }
        });
    }

    shpHldType(value: LowPowerConfigShpHldType) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        shipVBusFiltDisabled: shipVBusFiltDisable(value),
                        shpHldSlideSwitchDelayDisabled:
                            shpHldSlideSwitchDelayDisable(value),
                        shpHldSlideSwitchPollTimeDisabled:
                            shpHldSlideSwitchPollTimeDisable(value),
                        shpHldSliderDisabled: shpHldSliderDisable(value),
                        shpHldType: value,
                    },
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx low_power_ctrl shphld type set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.shpHldType();
                        reject();
                    },
                );
            }
        });
    }

    suspendPinPullDown(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        suspendPinPullDown: value,
                    },
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx sysreg suspendpin pull set ${value ? 'pulldown' : 'nopull'}`,
                    () => resolve(),
                    () => {
                        this.get.suspendPinPullDown();
                        reject();
                    },
                );
            }
        });
    }

    timeToActive(value: TimeToActive) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        timeToActive: value,
                    },
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx low_power_ctrl shphld debounce set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.timeToActive();
                        reject();
                    },
                );
            }
        });
    }

    vbusHibernateWait(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            const onSuccess = () => {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        vbusHibernateWait: value,
                        vbusHibernateWaitingForChargeComplete: false,
                    },
                );
                resolve();
            };

            if (this.offlineMode) {
                onSuccess();
            } else {
                this.sendCommand(
                    `npm12xx low_power_ctrl vbus hibernate_wait set ${value ? 'on' : 'off'}`,
                    onSuccess,
                    () => {
                        this.get.vbusHibernateWait();
                        reject();
                    },
                );
            }
        });
    }

    vbusStandbyCtrl(value: LowPowerConfigVBusStandbyCtrl) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        vbusStandbyCtrl: value,
                    },
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx low_power_ctrl vbus standbyctrl set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.vbusStandbyCtrl();
                        reject();
                    },
                );
            }
        });
    }

    vbusStandbySel(value: LowPowerConfigVBusStandbySel) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        vbusStandbySel: value,
                    },
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx low_power_ctrl vbus standbysel set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.vbusStandbySel();
                        reject();
                    },
                );
            }
        });
    }

    vbusStandbyWait(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            const onSuccess = () => {
                this.eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        vbusStandbyWait: value,
                        vbusStandbyWaitingForChargeComplete: false,
                    },
                );
                resolve();
            };

            if (this.offlineMode) {
                onSuccess();
            } else {
                this.sendCommand(
                    `npm12xx low_power_ctrl vbus standby_wait set ${value ? 'on' : 'off'}`,
                    onSuccess,
                    () => {
                        this.get.vbusStandbyWait();
                        reject();
                    },
                );
            }
        });
    }
}
