/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    type Buck,
    type BuckActiveDischargeResistance,
    type BuckAlternateVOutControl,
    type BuckExport,
    type BuckMode,
    type BuckModeControl,
    type BuckOnOffControl,
    type BuckPeakCurrentLimit,
    type BuckSoftStartPeakCurrentLimit,
    type BuckVOutComparatorBiasLPCurrent,
    type BuckVOutComparatorBiasULPCurrent,
    type BuckVOutRippleControl,
    type ModuleParams,
    type PmicDialog,
} from '../../types';
import { BuckGet } from './getters';

export class BuckSet {
    private get: BuckGet;

    constructor(
        private dialogHandler: ModuleParams['dialogHandler'],
        private eventEmitter: ModuleParams['eventEmitter'],
        private offlineMode: ModuleParams['offlineMode'],
        private sendCommand: ModuleParams['sendCommand'],
        private index: number,
    ) {
        this.get = new BuckGet(sendCommand);
    }

    async all(config: BuckExport) {
        const promises = [
            this.vOutNormal(config.vOutNormal),
            this.enabled(config.enabled),
            this.modeControl(config.modeControl),
            this.onOffControl(config.onOffControl),
            this.mode(config.mode),
        ];
        if (config.activeDischargeResistance !== undefined) {
            promises.push(
                this.activeDischargeResistance(
                    config.activeDischargeResistance,
                ),
            );
        }
        if (config.alternateVOut !== undefined) {
            promises.push(this.alternateVOut(config.alternateVOut));
        }
        if (config.alternateVOutControl !== undefined) {
            promises.push(
                this.alternateVOutControl(config.alternateVOutControl),
            );
        }
        if (config.automaticPassthrough !== undefined) {
            promises.push(
                this.automaticPassthrough(config.automaticPassthrough),
            );
        }
        if (config.peakCurrentLimit !== undefined) {
            promises.push(this.peakCurrentLimit(config.peakCurrentLimit));
        }
        if (config.quickVOutDischarge !== undefined) {
            promises.push(this.quickVOutDischarge(config.quickVOutDischarge));
        }
        if (config.shortCircuitProtection !== undefined) {
            promises.push(
                this.shortCircuitProtection(config.shortCircuitProtection),
            );
        }
        if (config.softStartPeakCurrentLimit !== undefined) {
            promises.push(
                this.softStartPeakCurrentLimit(
                    config.softStartPeakCurrentLimit,
                ),
            );
        }
        if (config.vOutComparatorBiasCurrentLPMode !== undefined) {
            promises.push(
                this.vOutComparatorBiasCurrentLPMode(
                    config.vOutComparatorBiasCurrentLPMode,
                ),
            );
        }
        if (config.vOutComparatorBiasCurrentULPMode !== undefined) {
            promises.push(
                this.vOutComparatorBiasCurrentULPMode(
                    config.vOutComparatorBiasCurrentULPMode,
                ),
            );
        }
        if (config.vOutRippleControl !== undefined) {
            promises.push(this.vOutRippleControl(config.vOutRippleControl));
        }

        await Promise.allSettled(promises);
    }

    vOutNormal(value: number) {
        const action = () =>
            new Promise<void>((resolve, reject) => {
                if (this.offlineMode) {
                    this.eventEmitter.emitPartialEvent<Buck>(
                        'onBuckUpdate',
                        {
                            mode: 'software',
                            vOutNormal: value,
                        },
                        this.index,
                    );

                    resolve();
                    return;
                }

                this.sendCommand(
                    `npm1012 buck vout software set 0 ${value}`,
                    () => this.mode('software').then(resolve).catch(reject),
                    () => {
                        this.get.vOutNormal();
                        reject();
                    },
                );
            });

        const dialogHandler = this.dialogHandler;
        if (dialogHandler && !this.offlineMode && value < 1.65) {
            return new Promise<void>((resolve, reject) => {
                const warningDialog: PmicDialog = {
                    type: 'alert',
                    doNotAskAgainStoreID: 'pmic1012-setBuckVOut-1',
                    message:
                        'Please note that BUCK VOUT is used as VDDIO by default. Always ensure that VDDIO is above 1.62V. If you want to use another VDDIO source, please power down the EK and change VDDIO by configuring the jumper P18 on the EK, before powering the EK again. Are you sure you want to continue?',
                    confirmLabel: 'Yes',
                    optionalLabel: "Yes, don't ask again",
                    cancelLabel: 'No',
                    title: 'Warning',
                    onConfirm: () => action().then(resolve).catch(reject),
                    onCancel: () => {
                        this.get.vOutNormal();
                        reject();
                    },
                    onOptional: () => action().then(resolve).catch(reject),
                };

                dialogHandler(warningDialog);
            });
        }

        return action();
    }

    mode(mode: BuckMode) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        mode,
                    },
                    this.index,
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm1012 buck voutselctrl set ${mode.toUpperCase()}`,
                    () =>
                        this.onOffControl(
                            mode === 'software' ? 'SOFTWARE' : 'VSET',
                        )
                            .then(resolve)
                            .catch(reject),
                    () => {
                        this.get.mode();
                        reject();
                    },
                );
            }
        });
    }

    modeControl(modeControl: BuckModeControl) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        modeControl,
                    },
                    this.index,
                );

                resolve();
            } else {
                this.sendCommand(
                    `npm1012 buck pwrmode set ${modeControl}`,
                    () => resolve(),
                    () => {
                        this.get.modeControl();
                        reject();
                    },
                );
            }
        });
    }

    onOffControl(onOffControl: BuckOnOffControl) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        onOffControl,
                    },
                    this.index,
                );

                resolve();
            } else {
                this.sendCommand(
                    `npm1012 buck enablectrl set ${onOffControl.toUpperCase()}`,
                    () => resolve(),
                    () => {
                        this.get.onOffControl();
                        reject();
                    },
                );
            }
        });
    }

    enabled(enabled: boolean) {
        const action = () =>
            new Promise<void>((resolve, reject) => {
                if (this.offlineMode) {
                    this.eventEmitter.emitPartialEvent<Buck>(
                        'onBuckUpdate',
                        {
                            enabled,
                        },
                        this.index,
                    );
                    resolve();
                    return;
                }

                const onError = () => {
                    this.get.enabled();
                    reject();
                };

                this.mode('software')
                    .then(() =>
                        this.sendCommand(
                            `npm1012 buck enable set ${enabled ? 'on' : 'off'}`,
                            () => resolve(),
                            onError,
                        ),
                    )
                    .catch(onError);
            });

        const dialogHandler = this.dialogHandler;
        if (dialogHandler && !this.offlineMode && !enabled) {
            return new Promise<void>((resolve, reject) => {
                const warningDialog: PmicDialog = {
                    type: 'alert',
                    doNotAskAgainStoreID: 'pmic1012-setBuckEnabled-1',
                    message:
                        'Please note that BUCK VOUT is used as VDDIO by default. Always ensure that VDDIO is above 1.62V. If you want to use another VDDIO source, please power down the EK and change VDDIO by configuring the jumper P18 on the EK, before powering the EK again. Are you sure you want to continue?',
                    confirmLabel: 'Yes',
                    optionalLabel: "Yes, don't ask again",
                    cancelLabel: 'No',
                    title: 'Warning',
                    onConfirm: () => action().then(resolve).catch(reject),
                    onCancel: reject,
                    onOptional: () => action().then(resolve).catch(reject),
                };

                dialogHandler(warningDialog);
            });
        }

        return action();
    }

    activeDischargeResistance(value: BuckActiveDischargeResistance) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        activeDischargeResistance: value,
                    },
                    this.index,
                );

                resolve();
            } else {
                this.sendCommand(
                    `npm1012 buck pulldown set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.activeDischargeResistance();
                        reject();
                    },
                );
            }
        });
    }

    alternateVOut(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        alternateVOut: value,
                    },
                    this.index,
                );

                resolve();
            } else {
                this.sendCommand(
                    `npm1012 buck vout software set 1 ${value}`,
                    () => resolve(),
                    () => {
                        this.get.alternateVOut();
                        reject();
                    },
                );
            }
        });
    }

    alternateVOutControl(modeControl: BuckAlternateVOutControl) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        alternateVOutControl: modeControl,
                    },
                    this.index,
                );

                resolve();
            } else {
                let cmd = '';
                switch (modeControl) {
                    case 'GPIO': {
                        cmd = 'voutselctrl set GPIO';
                        break;
                    }
                    case 'OFF': {
                        cmd = 'voutsel set VOUT1';
                        break;
                    }
                    case 'SOFTWARE': {
                        cmd = 'voutsel set VOUT2';
                        break;
                    }
                }

                this.sendCommand(
                    `npm1012 buck ${cmd}`,
                    () => resolve(),
                    () => {
                        this.get.alternateVOutControl();
                        reject();
                    },
                );
            }
        });
    }

    automaticPassthrough(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        automaticPassthrough: value,
                    },
                    this.index,
                );

                resolve();
            } else {
                this.sendCommand(
                    `npm1012 buck passthrough set ${value ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.automaticPassthrough();
                        reject();
                    },
                );
            }
        });
    }

    quickVOutDischarge(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        quickVOutDischarge: value,
                    },
                    this.index,
                );

                resolve();
            } else {
                this.sendCommand(
                    `npm1012 buck autopull set ${value ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.quickVOutDischarge();
                        reject();
                    },
                );
            }
        });
    }

    peakCurrentLimit(value: BuckPeakCurrentLimit) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        peakCurrentLimit: value,
                    },
                    this.index,
                );

                resolve();
            } else {
                this.sendCommand(
                    `npm1012 buck peakilim set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.peakCurrentLimit();
                        reject();
                    },
                );
            }
        });
    }

    shortCircuitProtection(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        shortCircuitProtection: value,
                    },
                    this.index,
                );

                resolve();
            } else {
                this.sendCommand(
                    `npm1012 buck scprotect set ${value ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.shortCircuitProtection();
                        reject();
                    },
                );
            }
        });
    }

    softStartPeakCurrentLimit(value: BuckSoftStartPeakCurrentLimit) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        softStartPeakCurrentLimit: value,
                    },
                    this.index,
                );

                resolve();
            } else {
                this.sendCommand(
                    `npm1012 buck softstartilim set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.softStartPeakCurrentLimit();
                        reject();
                    },
                );
            }
        });
    }

    vOutComparatorBiasCurrentLPMode(value: BuckVOutComparatorBiasLPCurrent) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    { vOutComparatorBiasCurrentLPMode: value },
                    this.index,
                );

                resolve();
            } else {
                this.sendCommand(
                    `npm1012 buck bias lp set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.vOutComparatorBiasCurrentLPMode();
                        reject();
                    },
                );
            }
        });
    }

    vOutComparatorBiasCurrentULPMode(value: BuckVOutComparatorBiasULPCurrent) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    { vOutComparatorBiasCurrentULPMode: value },
                    this.index,
                );

                resolve();
            } else {
                this.sendCommand(
                    `npm1012 buck bias ulp set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.vOutComparatorBiasCurrentULPMode();
                        reject();
                    },
                );
            }
        });
    }

    vOutRippleControl(value: BuckVOutRippleControl) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        vOutRippleControl: value,
                    },
                    this.index,
                );

                resolve();
            } else {
                this.sendCommand(
                    `npm1012 buck ripple set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.vOutRippleControl();
                        reject();
                    },
                );
            }
        });
    }
}
