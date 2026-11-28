/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type NpmEventEmitter } from '../../pmicHelpers';
import {
    type Ldo,
    type LdoExport,
    type LdoMode,
    type LdoOnOffControl,
    type LdoSetExtraArgs,
    type LdoSoftStartCurrent,
    type LdoSoftStartTime,
    type LdoVOutSel,
} from '../../types';
import { LdoGet } from './getters';
import { onOffControlValuesForModeAndVOutSel } from './types';

/* eslint-disable class-methods-use-this */

export class LdoSet {
    private get: LdoGet;

    constructor(
        private eventEmitter: NpmEventEmitter,
        private sendCommand: (
            command: string,
            onSuccess?: (response: string, command: string) => void,
            onError?: (response: string, command: string) => void,
        ) => void,
        private offlineMode: boolean,
        private index: number,
    ) {
        this.get = new LdoGet(sendCommand, index);
    }

    async all(ldo: LdoExport) {
        const extraArgs = {
            currState: {
                mode: ldo.mode,
                onOffControl: ldo.onOffControl,
                vOutSel: ldo.vOutSel,
            },
        };

        const promises = [
            this.activeDischarge(ldo.activeDischarge),
            this.enabled(ldo.enabled),
            this.onOffControl(ldo.onOffControl),
        ];

        if (ldo.mode !== undefined) {
            promises.push(this.mode(ldo.mode, extraArgs));
        }
        if (ldo.overcurrentProtection !== undefined) {
            promises.push(
                this.overcurrentProtection(ldo.overcurrentProtection),
            );
        }
        if (ldo.softStart !== undefined) {
            promises.push(this.softStart(ldo.softStart));
        }
        if (ldo.softStartTime !== undefined) {
            promises.push(this.softStartTime(ldo.softStartTime));
        }
        if (ldo.softStartCurrent !== undefined) {
            promises.push(this.softStartCurrent(ldo.softStartCurrent));
        }
        if (ldo.vOutSel !== undefined) {
            promises.push(this.vOutSel(ldo.vOutSel, extraArgs));
        }
        if (ldo.voltage !== undefined) {
            promises.push(this.voltage(ldo.voltage, extraArgs));
        }
        if (ldo.weakPullDown !== undefined) {
            promises.push(this.weakPullDown(ldo.weakPullDown));
        }

        await Promise.allSettled(promises);
    }

    onOffControlNext = (
        index: number,
        mode: LdoMode,
        onOffControl: LdoOnOffControl,
        vOutSel: LdoVOutSel,
    ) => {
        const onOffControlValues = onOffControlValuesForModeAndVOutSel(
            index,
            mode,
            vOutSel,
        );
        return (
            onOffControlValues.find(v => v === onOffControl) ??
            onOffControlValues[0]
        );
    };

    sendModeCommand = (index: number, mode: LdoMode) =>
        new Promise<void>((resolve, reject) => {
            if (index === 1) {
                // Not available for Load Switch 2
                resolve();
                return;
            }
            this.sendCommand(
                `npm1012 ldosw mode set ${index} ${mode}`,
                () => resolve(),
                () => reject(),
            );
        });
    sendModeCommandOnChange = (
        index: number,
        currMode: LdoMode,
        nextMode: LdoMode,
    ) =>
        new Promise<void>((resolve, reject) => {
            if (nextMode === currMode) {
                resolve();
                return;
            }
            this.sendModeCommand(index, nextMode).then(resolve).catch(reject);
        });

    sendOnOffControlCommand = (index: number, onOffControl: LdoOnOffControl) =>
        new Promise<void>((resolve, reject) => {
            this.sendCommand(
                `npm1012 ldosw enablectrl set ${index} ${onOffControl}`,
                () => resolve(),
                () => reject(),
            );
        });
    sendOnOffControlCommandOnChange = (
        index: number,
        currOnOffControl: LdoOnOffControl,
        nextOnOffControl: LdoOnOffControl,
    ) =>
        new Promise<void>((resolve, reject) => {
            if (nextOnOffControl === currOnOffControl) {
                resolve();
                return;
            }
            this.sendOnOffControlCommand(index, nextOnOffControl)
                .then(resolve)
                .catch(reject);
        });

    sendVOutSelCommand = (index: number, vOutSel: LdoVOutSel) =>
        new Promise<void>((resolve, reject) => {
            if (index === 1) {
                // Not available for Load Switch 2
                resolve();
                return;
            }
            this.sendCommand(
                `npm1012 ldosw voutselctrl set ${index} ${vOutSel.toUpperCase()}`,
                () => resolve(),
                () => reject(),
            );
        });
    sendVOutSelCommandOnChange = (
        index: number,
        currVOutSel: LdoVOutSel | undefined,
        nextVOutSel: LdoVOutSel,
    ) =>
        new Promise<void>((resolve, reject) => {
            if (nextVOutSel === currVOutSel) {
                resolve();
                return;
            }
            this.sendVOutSelCommand(index, nextVOutSel)
                .then(resolve)
                .catch(reject);
        });

    mode(mode: LdoMode, extraArgs?: LdoSetExtraArgs) {
        return new Promise<void>((resolve, reject) => {
            if (this.index === 1) {
                reject();
                return; // Disabled for Load Switch 2
            }

            const currOnOffControl = extraArgs?.currState.onOffControl;
            const currVOutSel = extraArgs?.currState.vOutSel;
            if (currOnOffControl === undefined || currVOutSel === undefined) {
                reject();
                return;
            }

            const nextOnOffControl = this.onOffControlNext(
                this.index,
                mode,
                currOnOffControl,
                currVOutSel,
            );

            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Ldo>(
                    'onLdoUpdate',
                    {
                        mode,
                        onOffControl: nextOnOffControl,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendOnOffControlCommandOnChange(
                this.index,
                currOnOffControl,
                nextOnOffControl,
            )
                .then(() => this.sendModeCommand(this.index, mode))
                .then(resolve)
                .catch(() => {
                    this.get.mode();
                    reject();
                });
        });
    }

    voltage(voltage: number, extraArgs?: LdoSetExtraArgs) {
        const sendVoltageCommand = (index: number, value: number) =>
            new Promise<void>((resolve, reject) => {
                this.sendCommand(
                    `npm1012 ldosw vout software set ${index} ${value}`,
                    () => resolve(),
                    () => reject(),
                );
            });

        return new Promise<void>((resolve, reject) => {
            if (this.index === 1) {
                reject();
                return; // Disabled for Load Switch 2
            }

            const currMode = extraArgs?.currState.mode;
            const currOnOffControl = extraArgs?.currState.onOffControl;
            const currVOutSel = extraArgs?.currState.vOutSel;
            if (
                currMode === undefined ||
                currOnOffControl === undefined ||
                currVOutSel === undefined
            ) {
                reject();
                return;
            }

            const nextMode: LdoMode = 'LDO';
            const nextVOutSel: LdoVOutSel = 'Software';
            const nextOnOffControl = this.onOffControlNext(
                this.index,
                nextMode,
                currOnOffControl,
                nextVOutSel,
            );

            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Ldo>(
                    'onLdoUpdate',
                    {
                        mode: nextMode,
                        onOffControl: nextOnOffControl,
                        vOutSel: nextVOutSel,
                        voltage,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendOnOffControlCommandOnChange(
                this.index,
                currOnOffControl,
                nextOnOffControl,
            )
                .then(() =>
                    this.sendModeCommandOnChange(
                        this.index,
                        currMode,
                        nextMode,
                    ),
                )
                .then(() =>
                    this.sendVOutSelCommandOnChange(
                        this.index,
                        currVOutSel,
                        nextVOutSel,
                    ),
                )
                .then(() => sendVoltageCommand(this.index, voltage))
                .then(resolve)
                .catch(() => {
                    this.get.voltage();
                    reject();
                });
        });
    }

    enabled(enabled: boolean, extraArgs?: LdoSetExtraArgs) {
        const sendCommand = (index: number, value: boolean) =>
            new Promise<void>((resolve, reject) => {
                this.sendCommand(
                    `npm1012 ldosw enable set ${index} ${value ? 'on' : 'off'}`,
                    () => resolve(),
                    () => reject(),
                );
            });

        return new Promise<void>((resolve, reject) => {
            const currOnOffControl = extraArgs?.currState.onOffControl;
            const currVOutSel = extraArgs?.currState.vOutSel;
            if (currOnOffControl === undefined) {
                reject();
                return;
            }

            const nextOnOffControl: LdoOnOffControl = 'Software';
            const nextVOutSel: LdoVOutSel = 'Software';

            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Ldo>(
                    'onLdoUpdate',
                    {
                        enabled,
                        onOffControl: nextOnOffControl,
                        vOutSel: nextVOutSel,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendOnOffControlCommandOnChange(
                this.index,
                currOnOffControl,
                nextOnOffControl,
            )
                .then(() =>
                    this.sendVOutSelCommandOnChange(
                        this.index,
                        currVOutSel,
                        nextVOutSel,
                    ),
                )
                .then(() => sendCommand(this.index, enabled))
                .then(resolve)
                .catch(() => {
                    this.get.enabled();
                    reject();
                });
        });
    }

    activeDischarge(activeDischarge: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Ldo>(
                    'onLdoUpdate',
                    {
                        activeDischarge,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm1012 ldosw activedischarge set ${this.index} ${activeDischarge ? 'on' : 'off'}`,
                () => resolve(),
                () => {
                    this.get.activeDischarge();
                    reject();
                },
            );
        });
    }

    overcurrentProtection(ocp: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Ldo>(
                    'onLdoUpdate',
                    {
                        overcurrentProtection: ocp,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm1012 ldosw ocp set ${this.index} ${ocp ? 'on' : 'off'}`,
                () => resolve(),
                () => {
                    this.get.overcurrentProtection();
                    reject();
                },
            );
        });
    }

    onOffControl(onOffControl: LdoOnOffControl) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Ldo>(
                    'onLdoUpdate',
                    {
                        onOffControl,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendOnOffControlCommand(this.index, onOffControl)
                .then(resolve)
                .catch(() => {
                    this.get.onOffControl();
                    reject();
                });
        });
    }

    softStart(enable: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Ldo>(
                    'onLdoUpdate',
                    {
                        softStart: enable,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm1012 ldosw softstart set ${this.index} ${
                    enable ? 'on' : 'off'
                }`,
                () => resolve(),
                () => {
                    this.get.softStart();
                    reject();
                },
            );
        });
    }

    softStartCurrent(value: LdoSoftStartCurrent) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Ldo>(
                    'onLdoUpdate',
                    {
                        softStartCurrent: value,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm1012 ldosw softstartilim set ${this.index} ${value}`,
                () => resolve(),
                () => {
                    this.get.softStartCurrent();
                    reject();
                },
            );
        });
    }

    softStartTime(value: LdoSoftStartTime) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Ldo>(
                    'onLdoUpdate',
                    {
                        softStartTime: value,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm1012 ldosw softstarttime set ${this.index} ${value}`,
                () => resolve(),
                () => {
                    this.get.softStartTime();
                    reject();
                },
            );
        });
    }

    vOutSel(vOutSel: LdoVOutSel, extraArgs?: LdoSetExtraArgs) {
        return new Promise<void>((resolve, reject) => {
            if (this.index === 1) {
                reject();
                return; // Disabled for Load Switch 2
            }

            const currMode = extraArgs?.currState.mode;
            const currOnOffControl = extraArgs?.currState.onOffControl;
            if (currMode === undefined || currOnOffControl === undefined) {
                reject();
                return;
            }

            const nextOnOffControl = this.onOffControlNext(
                this.index,
                currMode,
                currOnOffControl,
                vOutSel,
            );

            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Ldo>(
                    'onLdoUpdate',
                    {
                        onOffControl: nextOnOffControl,
                        vOutSel,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendOnOffControlCommandOnChange(
                this.index,
                currOnOffControl,
                nextOnOffControl,
            )
                .then(() => this.sendVOutSelCommand(this.index, vOutSel))
                .then(resolve)
                .catch(() => {
                    this.get.vOutSel();
                    reject();
                });
        });
    }

    weakPullDown(enable: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.index === 1) {
                resolve();
                return; // Disabled for Load Switch 2
            }

            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Ldo>(
                    'onLdoUpdate',
                    {
                        weakPullDown: enable,
                    },
                    this.index,
                );
                resolve();
                return;
            }

            this.sendCommand(
                `npm1012 ldosw weakpull set ${this.index} ${enable ? 'on' : 'off'}`,
                () => resolve(),
                () => {
                    this.get.weakPullDown();
                    reject();
                },
            );
        });
    }
}
