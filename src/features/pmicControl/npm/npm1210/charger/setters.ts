/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import {
    type Charger,
    type ChargerDropoutRecovery,
    type ChargerIBatLim,
    type ChargerITerm,
    type ChargerITrickle,
    ChargerModuleSetBase,
    type ChargerSoftstartCurrent,
    type ChargerStartupMode,
    type ChargerVBatLow,
    type ChargerVTrickleFast,
} from '../../types';
import { advancedChargingProfileOnUpdate } from './helpers';
import { iChgLvlCurrentToInteger } from './types';

/* eslint-disable class-methods-use-this */

export class ChargerSet extends ChargerModuleSetBase {
    async all(charger: Charger) {
        const promises = [
            this.enabled(charger.enabled),
            this.enabledRecharging(charger.enableRecharging),
            this.enabledVBatLow(charger.enableVBatLow),
            this.iChg(charger.iChg),
            this.iTerm(charger.iTerm),
            this.tChgResume(charger.tChgResume),
            this.tCold(charger.tCold),
            this.tCool(charger.tCool),
            this.tHot(charger.tHot),
            this.tWarm(charger.tWarm),
            this.vTerm(charger.vTerm),
            this.vTrickleFast(charger.vTrickleFast),
        ];

        if (charger.dropoutRecovery !== undefined) {
            promises.push(this.dropoutRecovery(charger.dropoutRecovery));
        }
        if (charger.enableAdvancedChargingProfile !== undefined) {
            promises.push(
                this.enableAdvancedChargingProfile(
                    charger.enableAdvancedChargingProfile,
                ),
            );
        }
        if (charger.enableBatteryDischargeCurrentLimit !== undefined) {
            promises.push(
                this.enableBatteryDischargeCurrentLimit(
                    charger.enableBatteryDischargeCurrentLimit,
                ),
            );
        }
        if (charger.enableChargeCurrentThrottling !== undefined) {
            promises.push(
                this.enableChargeCurrentThrottling(
                    charger.enableChargeCurrentThrottling,
                ),
            );
        }
        if (charger.enableNtcMonitoring !== undefined) {
            promises.push(
                this.enableNtcMonitoring(charger.enableNtcMonitoring),
            );
        }
        if (charger.enableSafetyTimersResetByChgEnPin !== undefined) {
            promises.push(
                this.enableSafetyTimersResetByChgEnPin(
                    charger.enableSafetyTimersResetByChgEnPin,
                ),
            );
        }
        if (charger.enableWeakBatteryCharging !== undefined) {
            promises.push(
                this.enabledWeakBatteryCharging(
                    charger.enableWeakBatteryCharging,
                ),
            );
        }
        if (charger.iBatLim !== undefined) {
            promises.push(this.iBatLim(charger.iBatLim));
        }
        if (charger.iChgCool !== undefined) {
            promises.push(this.iChgCool(charger.iChgCool));
        }
        if (charger.iChgWarm !== undefined) {
            promises.push(this.iChgWarm(charger.iChgWarm));
        }
        if (charger.iThrottle !== undefined) {
            promises.push(this.iThrottle(charger.iThrottle));
        }
        if (charger.iTrickle !== undefined) {
            promises.push(this.iTrickle(charger.iTrickle));
        }
        if (charger.softstartCurrent !== undefined) {
            promises.push(this.softstartCurrent(charger.softstartCurrent));
        }
        if (charger.startupMode !== undefined) {
            promises.push(this.startupMode(charger.startupMode));
        }
        if (charger.tOutCharge !== undefined) {
            promises.push(this.tOutCharge(charger.tOutCharge));
        }
        if (charger.tOutTrickle !== undefined) {
            promises.push(this.tOutTrickle(charger.tOutTrickle));
        }
        if (charger.vBatLow !== undefined) {
            promises.push(this.vBatLow(charger.vBatLow));
        }
        if (charger.vTermCool !== undefined) {
            promises.push(this.vTermCool(charger.vTermCool));
        }
        if (charger.vTermWarm !== undefined) {
            promises.push(this.vTermWarm(charger.vTermWarm));
        }
        if (charger.vThrottle !== undefined) {
            promises.push(this.vThrottle(charger.vThrottle));
        }
        if (charger.vWeak !== undefined) {
            promises.push(this.vWeak(charger.vWeak));
        }

        await Promise.allSettled(promises);
    }

    disableChargerIfEnabled = (chargerEnabled?: boolean) =>
        chargerEnabled === undefined || chargerEnabled === true
            ? this.enabled(false)
            : Promise.resolve();

    iChgDoubleNext = (iChgDouble: boolean, iChg: number) => {
        if (iChgLvlCurrentToInteger(iChg, iChgDouble) !== undefined)
            return iChgDouble;
        if (iChgLvlCurrentToInteger(iChg, !iChgDouble) !== undefined)
            return !iChgDouble;
        return undefined;
    };

    iChgRequestUpdateAll = () => {
        this.get.iChgDouble?.();
        this.get.iChg?.();
        this.get.iChgCool?.();
        this.get.iChgWarm?.();
    };

    iChgLvlRequestUpdateOnChange = (
        prevIChgDouble: boolean,
        nextIChgDouble: boolean | undefined,
        key: 'iChg' | 'iChgCool' | 'iChgWarm',
    ) => {
        if (prevIChgDouble !== nextIChgDouble) {
            if (key !== 'iChg') this.get.iChg?.();
            if (key !== 'iChgCool') this.get.iChgCool?.();
            if (key !== 'iChgWarm') this.get.iChgWarm?.();
        }
    };

    setIChgDoubleOnChange = (
        prevIChgDouble: boolean,
        nextIChgDouble: boolean | undefined,
        iChg: number,
    ) =>
        prevIChgDouble !== nextIChgDouble
            ? this.iChgDouble(iChg > 256)
            : Promise.resolve();

    dropoutRecovery(dropoutRecovery: ChargerDropoutRecovery) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    dropoutRecovery,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger dropout_recovery set ${dropoutRecovery}`,
                    () => resolve(),
                    () => {
                        this.get.dropoutRecovery?.();
                        reject();
                    },
                );
            }
        });
    }

    enabled(enabled: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enabled,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger enable set ${enabled ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.enabled();
                        reject();
                    },
                );
            }
        });
    }

    enableAdvancedChargingProfile(enabled: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>(
                    'onChargerUpdate',
                    advancedChargingProfileOnUpdate(enabled),
                );
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger jeita_charging set ${enabled ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.enabledAdvancedChargingProfile?.();
                        reject();
                    },
                );
            }
        });
    }

    enableBatteryDischargeCurrentLimit(enabled: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableBatteryDischargeCurrentLimit: enabled,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger discharge_limit set ${enabled ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.enabledBatteryDischargeCurrentLimit?.();
                        reject();
                    },
                );
            }
        });
    }

    enableChargeCurrentThrottling(enabled: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableChargeCurrentThrottling: enabled,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger throttling set ${enabled ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.enabledChargeCurrentThrottling?.();
                        reject();
                    },
                );
            }
        });
    }

    enableChgEnPinControl(enabled: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableChgEnPinControl: enabled,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger enablectrl set ${enabled ? 'both' : 'software'}`,
                    () => resolve(),
                    () => {
                        this.get.enableChgEnPinControl?.();
                        reject();
                    },
                );
            }
        });
    }

    enableChgEnPinPullDown(enabled: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableChgEnPinPullDown: enabled,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger chgenpin pulldown set ${enabled ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.enableChgEnPinPullDown?.();
                        reject();
                    },
                );
            }
        });
    }

    enableNtcMonitoring(enabled: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableNtcMonitoring: enabled,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger ntc monitoring set ${enabled ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.enabledNtcMonitoring?.();
                        reject();
                    },
                );
            }
        });
    }

    enableSafetyTimersResetByChgEnPin(enabled: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableSafetyTimersResetByChgEnPin: enabled,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger pin_timer_reset set ${enabled ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.enableSafetyTimersResetByChgEnPin?.();
                        reject();
                    },
                );
            }
        });
    }

    enabledRecharging(enabled: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableRecharging: enabled,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger recharge set ${enabled ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.enabledRecharging();
                        reject();
                    },
                );
            }
        });
    }

    enabledVBatLow(enabled: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableVBatLow: enabled,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger lowbat_charging set ${enabled ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.enabledVBatLow();
                        reject();
                    },
                );
            }
        });
    }

    enabledWeakBatteryCharging(enabled: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableWeakBatteryCharging: enabled,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger weakbat_charging set ${enabled ? 'on' : 'off'}`,
                    () => resolve(),
                    () => {
                        this.get.enabledWeakBatteryCharging?.();
                        reject();
                    },
                );
            }
        });
    }

    iBatLim(value: ChargerIBatLim) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iBatLim: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger discharge_limit set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.iBatLim?.();
                        reject();
                    },
                );
            }
        });
    }

    iChg(value: number, iChgDouble?: boolean, chargerEnabled?: boolean) {
        const sendCmd = (iChg: number) =>
            new Promise<void>((resolve, reject) => {
                this.sendCommand(
                    `npm12xx charger current charge set ${iChg}`,
                    () => resolve(),
                    () => reject(),
                );
            });

        return new Promise<void>((resolve, reject) => {
            if (iChgDouble === undefined) {
                reject();
                return;
            }

            this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                iChg: value,
            });

            if (this.offlineMode) {
                resolve();
                return;
            }

            const newIChgDouble = this.iChgDoubleNext(iChgDouble, value);

            this.disableChargerIfEnabled(chargerEnabled)
                .then(() =>
                    this.setIChgDoubleOnChange(
                        iChgDouble,
                        newIChgDouble,
                        value,
                    ),
                )
                .then(() => sendCmd(value))
                .then(() => {
                    resolve();
                    this.iChgLvlRequestUpdateOnChange(
                        iChgDouble,
                        newIChgDouble,
                        'iChg',
                    );
                })
                .catch(() => {
                    reject();
                    this.iChgRequestUpdateAll();
                });
        });
    }

    iChgCool(value: number, iChgDouble?: boolean, chargerEnabled?: boolean) {
        const sendCmd = (iChg: number) =>
            new Promise<void>((resolve, reject) => {
                this.sendCommand(
                    `npm12xx charger current charge_cool set ${iChg}`,
                    () => resolve(),
                    () => reject(),
                );
            });

        return new Promise<void>((resolve, reject) => {
            if (iChgDouble === undefined) {
                reject();
                return;
            }

            this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                iChgCool: value,
            });

            if (this.offlineMode) {
                resolve();
                return;
            }

            const newIChgDouble = this.iChgDoubleNext(iChgDouble, value);

            this.disableChargerIfEnabled(chargerEnabled)
                .then(() =>
                    this.setIChgDoubleOnChange(
                        iChgDouble,
                        newIChgDouble,
                        value,
                    ),
                )
                .then(() => sendCmd(value))
                .then(() => {
                    resolve();
                    this.iChgLvlRequestUpdateOnChange(
                        iChgDouble,
                        newIChgDouble,
                        'iChgCool',
                    );
                })
                .catch(() => {
                    reject();
                    this.iChgRequestUpdateAll();
                });
        });
    }

    iChgDouble(value: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iChgDouble: value,
                });
                resolve();
                return;
            }

            this.sendCommand(
                `npm12xx charger current isetdouble set ${value ? 'on' : 'off'}`,
                () => resolve(),
                () => reject(),
            );
        });
    }

    iChgWarm(value: number, iChgDouble?: boolean, chargerEnabled?: boolean) {
        const sendCmd = (iChg: number) =>
            new Promise<void>((resolve, reject) => {
                this.sendCommand(
                    `npm12xx charger current charge_warm set ${iChg}`,
                    () => resolve(),
                    () => reject(),
                );
            });

        return new Promise<void>((resolve, reject) => {
            if (iChgDouble === undefined) {
                reject();
                return;
            }

            this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                iChgWarm: value,
            });

            if (this.offlineMode) {
                resolve();
                return;
            }

            const newIChgDouble = this.iChgDoubleNext(iChgDouble, value);

            this.disableChargerIfEnabled(chargerEnabled)
                .then(() =>
                    this.setIChgDoubleOnChange(
                        iChgDouble,
                        newIChgDouble,
                        value,
                    ),
                )
                .then(() => sendCmd(value))
                .then(() => {
                    resolve();
                    this.iChgLvlRequestUpdateOnChange(
                        iChgDouble,
                        newIChgDouble,
                        'iChgWarm',
                    );
                })
                .catch(() => {
                    reject();
                    this.iChgRequestUpdateAll();
                });
        });
    }

    iTerm(iTerm: ChargerITerm, chargerEnabled?: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iTerm,
                });
                resolve();
                return;
            }

            const onError = () => {
                this.get.iTerm();
                reject();
            };

            this.disableChargerIfEnabled(chargerEnabled)
                .then(() => {
                    this.sendCommand(
                        `npm12xx charger current termination set ${iTerm}`,
                        () => resolve(),
                        onError,
                    );
                })
                .catch(onError);
        });
    }

    iThrottle(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iThrottle: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger current throttle set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.iThrottle?.();
                        reject();
                    },
                );
            }
        });
    }

    iTrickle(iTrickle: ChargerITrickle) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iTrickle,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger current trickle set ${iTrickle}`,
                    () => resolve(),
                    () => {
                        this.get.iTrickle?.();
                        reject();
                    },
                );
            }
        });
    }

    softstartCurrent(softstartCurrent: ChargerSoftstartCurrent) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    softstartCurrent,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger current softstart set ${softstartCurrent}`,
                    () => resolve(),
                    () => {
                        this.get.softstartCurrent?.();
                        reject();
                    },
                );
            }
        });
    }

    startupMode(startupMode: ChargerStartupMode) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    startupMode,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger startup_mode set ${startupMode}`,
                    () => resolve(),
                    () => {
                        this.get.startupMode?.();
                        reject();
                    },
                );
            }
        });
    }

    tChgReduce(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tChgReduce: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger dietemp reduce set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.tChgReduce?.();
                        reject();
                    },
                );
            }
        });
    }

    tChgResume(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tChgResume: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger dietemp resume set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.tChgResume();
                        reject();
                    },
                );
            }
        });
    }

    tCold(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tCold: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger ntc cold set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.tCold();
                        reject();
                    },
                );
            }
        });
    }

    tCool(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tCool: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger ntc cool set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.tCool();
                        reject();
                    },
                );
            }
        });
    }

    tWarm(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tWarm: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger ntc warm set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.tWarm();
                        reject();
                    },
                );
            }
        });
    }

    tHot(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tHot: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger ntc hot set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.tHot();
                        reject();
                    },
                );
            }
        });
    }

    vTermCool(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vTermCool: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger voltage termination_cool set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.vTermCool?.();
                        reject();
                    },
                );
            }
        });
    }

    vTermWarm(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vTermWarm: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger voltage termination_warm set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.vTermWarm?.();
                        reject();
                    },
                );
            }
        });
    }

    tOutCharge(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tOutCharge: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger timeout charging set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.tOutCharge?.();
                        reject();
                    },
                );
            }
        });
    }

    tOutTrickle(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tOutTrickle: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger timeout trickle set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.tOutTrickle?.();
                        reject();
                    },
                );
            }
        });
    }

    vBatLow(value: ChargerVBatLow) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vBatLow: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger voltage batlow set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.vBatLow?.();
                        reject();
                    },
                );
            }
        });
    }

    vTerm(value: number, chargerEnabled?: boolean) {
        return new Promise<void>((resolve, reject) => {
            this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                vTerm: value,
            });

            if (this.offlineMode) {
                resolve();
                return;
            }

            const onError = () => {
                this.get.vTerm();
                reject();
            };

            this.disableChargerIfEnabled(chargerEnabled)
                .then(() => {
                    this.sendCommand(
                        `npm12xx charger voltage termination set ${value}`,
                        () => resolve(),
                        onError,
                    );
                })
                .catch(onError);
        });
    }

    vThrottle(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vThrottle: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger voltage throttle set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.vThrottle?.();
                        reject();
                    },
                );
            }
        });
    }

    vTrickleFast(value: ChargerVTrickleFast, chargerEnabled?: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vTrickleFast: value,
                });
                resolve();
                return;
            }

            const onError = () => {
                this.get.vTrickleFast();
                reject();
            };

            this.disableChargerIfEnabled(chargerEnabled)
                .then(() => {
                    this.sendCommand(
                        `npm12xx charger voltage trickle set ${value}`,
                        () => resolve(),
                        onError,
                    );
                })
                .catch(onError);
        });
    }

    vWeak(value: number) {
        return new Promise<void>((resolve, reject) => {
            if (this.offlineMode) {
                this.eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vWeak: value,
                });
                resolve();
            } else {
                this.sendCommand(
                    `npm12xx charger voltage weak set ${value}`,
                    () => resolve(),
                    () => {
                        this.get.vWeak?.();
                        reject();
                    },
                );
            }
        });
    }
}
