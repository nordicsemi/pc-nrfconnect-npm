/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    type ModuleParams,
    type SysReg,
    type SysRegVBusDpm,
    type SysRegVBusILim,
    type SysRegVBusILim0And1PinGndSel,
    type SysRegVBusILim0And1PinMap,
    type SysRegVBusILimControl,
    type SysRegVBusPGPinSel,
} from '../../types';
import { SysRegGet } from './getters';

export class SysRegSet {
    private get: SysRegGet;

    constructor(
        private eventEmitter: ModuleParams['eventEmitter'],
        private offlineMode: ModuleParams['offlineMode'],
        private sendCommand: ModuleParams['sendCommand'],
    ) {
        this.get = new SysRegGet(sendCommand);
    }

    async all(config: SysReg) {
        const promises = [
            this.vBusDpm(config.vBusDpm),
            this.vBusILim(config.vBusILim),
        ];

        await Promise.allSettled(promises);
    }

    vBusDpm(value: SysRegVBusDpm) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', {
                    vBusDpm: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx sysreg vbusdpm set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.vBusDpm();
                        reject();
                    },
                );
            }
        });
    }

    vBusILim(value: SysRegVBusILim) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', {
                    vBusILim: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx sysreg vbusilim software set ${value}`,
                    () => {
                        this.get.vBusILimStatus();
                        resolve();
                    },
                    () => {
                        this.get.vBusILim();
                        reject();
                    },
                );
            }
        });
    }

    vBusILim0And1PinGndSel(value: SysRegVBusILim0And1PinGndSel) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', {
                    vBusILim0And1PinGndSel: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx sysreg vbusilim pingnd set ${value}`,
                    () => {
                        this.get.vBusILimStatus();
                        resolve();
                    },
                    () => {
                        this.get.vBusILim0And1PinGndSel();
                        reject();
                    },
                );
            }
        });
    }

    vBusILim0And1PinMap(value: SysRegVBusILim0And1PinMap) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', {
                    vBusILim0And1PinMap: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx sysreg vbusilim pinmap set ${value}`,
                    () => {
                        this.get.vBusILimStatus();
                        resolve();
                    },
                    () => {
                        this.get.vBusILim0And1PinMap();
                        reject();
                    },
                );
            }
        });
    }

    vBusILim0PinPullDownEnable(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', {
                    vBusILim0PinPullDownEnable: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx sysreg vbusilim pull set 0 ${value ? 'pulldown' : 'nopull'}`,
                    () => {
                        this.get.vBusILimStatus();
                        resolve();
                    },
                    () => {
                        this.get.vBusILim0PinPullDown();
                        reject();
                    },
                );
            }
        });
    }

    vBusILim1PinPullDownEnable(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', {
                    vBusILim1PinPullDownEnable: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx sysreg vbusilim pull set 1 ${value ? 'pulldown' : 'nopull'}`,
                    () => {
                        this.get.vBusILimStatus();
                        resolve();
                    },
                    () => {
                        this.get.vBusILim1PinPullDown();
                        reject();
                    },
                );
            }
        });
    }

    vBusILimControl(value: SysRegVBusILimControl) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', {
                    vBusILimControl: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx sysreg vbusilim enablectrl set ${value}`,
                    () => {
                        this.get.vBusILimStatus();
                        resolve();
                    },
                    () => {
                        this.get.vBusILimControl();
                        reject();
                    },
                );
            }
        });
    }

    vBusPGPinSel(value: SysRegVBusPGPinSel) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', {
                    vBusPGPinSel: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx sysreg pgpin set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.vBusPGPinSel();
                        reject();
                    },
                );
            }
        });
    }
}
