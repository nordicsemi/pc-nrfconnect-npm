/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { parseLogData } from '../../pmicHelpers';
import {
    type Charger,
    type LowPowerConfig,
    type ModuleParams,
    type PmicChargingState,
} from '../../types';
import {
    parseFloatFromCmdReply,
    parseIntFromCmdReply,
    parseOnOffFromCmdReply,
    parseValueFromCmdReply,
} from '../helpers';
import { advancedChargingProfileOnUpdate } from './helpers';
import {
    iTermLvlKeys,
    iTrickleLvlKeys,
    vBatLowLvlKeys,
    vTrickleLvlKeys,
} from './types';

export default (
    eventEmitter: ModuleParams['eventEmitter'],
    shellParser: ModuleParams['shellParser'],
) => {
    if (shellParser === undefined) {
        return [];
    }

    const cleanupCallbacks = [];

    cleanupCallbacks.push(
        shellParser.onShellLoggingEvent(logEvent => {
            parseLogData(logEvent, loggingEvent => {
                if (loggingEvent.module !== 'module_pmic_charger') {
                    return;
                }

                const messageParts = loggingEvent.message.split('=');
                const value = Number.parseInt(messageParts[1], 10);

                const chargingState: Partial<PmicChargingState> = {
                    // // eslint-disable-next-line no-bitwise
                    // batteryDetected: (value & 0x01) > 0,
                    // eslint-disable-next-line no-bitwise
                    batteryFull: (value & 0x02) > 0,
                    // eslint-disable-next-line no-bitwise
                    trickleCharge: (value & 0x04) > 0,
                    // eslint-disable-next-line no-bitwise
                    constantCurrentCharging: (value & 0x08) > 0,
                    // eslint-disable-next-line no-bitwise
                    constantVoltageCharging: (value & 0x10) > 0,
                    // eslint-disable-next-line no-bitwise
                    batteryRechargeNeeded: (value & 0x20) > 0,
                    // eslint-disable-next-line no-bitwise
                    dieTempHigh: (value & 0x40) > 0,
                    // eslint-disable-next-line no-bitwise
                    supplementModeActive: (value & 0x80) > 0,
                };

                eventEmitter.emitPartialEvent<PmicChargingState>(
                    'onChargingStatusUpdate',
                    chargingState,
                );

                if (chargingState.batteryFull) {
                    eventEmitter.emitPartialEvent<LowPowerConfig>(
                        'onLowPowerUpdate',
                        {
                            vbusHibernateWaitingForChargeComplete: false,
                            vbusStandbyWaitingForChargeComplete: false,
                        },
                    );
                }
            });
        }),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger state get',
            res => {
                const messageParts = parseValueFromCmdReply(res)?.split(',');

                const chargingState: PmicChargingState = {
                    batteryFull: false,
                    trickleCharge: false,
                    constantCurrentCharging: false,
                    constantVoltageCharging: false,
                    batteryRechargeNeeded: false,
                    dieTempHigh: false,
                    supplementModeActive: false,
                };

                // TODO: Incomplete: add parsing for all possible values
                messageParts?.forEach(part => {
                    switch (part) {
                        case 'Completed':
                            chargingState.batteryFull = true;
                            break;
                        case 'ConstantCurrent':
                            chargingState.constantCurrentCharging = true;
                            break;
                        case 'ConstantVoltage':
                            chargingState.constantVoltageCharging = true;
                            break;
                        case 'Trickle':
                            chargingState.trickleCharge = true;
                            break;
                    }
                });

                eventEmitter.emit('onChargingStatusUpdate', chargingState);
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger jeita_charging (get|set)',
            msg => {
                const enabled = parseOnOffFromCmdReply(msg);
                if (enabled === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>(
                    'onChargerUpdate',
                    advancedChargingProfileOnUpdate(enabled),
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger dietemp status (get|set)',
            () => {}, // TODO: Update
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger enable (get|set)',
            msg => {
                const enabled = parseOnOffFromCmdReply(msg);
                if (enabled === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enabled,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger discharge_limit (get|set)',
            msg => {
                const value = parseOnOffFromCmdReply(msg);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableBatteryDischargeCurrentLimit: value,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger throttling (get|set)',
            msg => {
                const value = parseOnOffFromCmdReply(msg);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableChargeCurrentThrottling: value,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger ntc monitoring (get|set)',
            msg => {
                const enableNtcMonitoring = parseOnOffFromCmdReply(msg);
                if (enableNtcMonitoring === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableNtcMonitoring,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger recharge (get|set)',
            msg => {
                const enableRecharging = parseOnOffFromCmdReply(msg);
                if (enableRecharging === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableRecharging,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger weakbat_charging (get|set)',
            msg => {
                const enableWeakBatteryCharging = parseOnOffFromCmdReply(msg);
                if (enableWeakBatteryCharging === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableWeakBatteryCharging,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger lowbat_charging (get|set)',
            msg => {
                const enableVBatLow = parseOnOffFromCmdReply(msg);
                if (enableVBatLow === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableVBatLow,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger current charge (get|set)',
            msg => {
                const iChg = parseFloatFromCmdReply(msg);
                if (iChg === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iChg,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger current charge_cool (get|set)',
            msg => {
                const iChgCool = parseFloatFromCmdReply(msg);
                if (iChgCool === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iChgCool,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger current charge_warm (get|set)',
            msg => {
                const iChgWarm = parseFloatFromCmdReply(msg);
                if (iChgWarm === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iChgWarm,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger current termination (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const iTerm = iTermLvlKeys.find(v => v.toLowerCase() === res);
                if (iTerm === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iTerm,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger current throttle (get|set)',
            msg => {
                const iThrottle = parseFloatFromCmdReply(msg);
                if (iThrottle === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iThrottle,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger current trickle (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const iTrickle = iTrickleLvlKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (iTrickle === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iTrickle,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger dietemp reduce (get|set)',
            msg => {
                const tChgReduce = parseIntFromCmdReply(msg);
                if (tChgReduce === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tChgReduce,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger dietemp resume (get|set)',
            msg => {
                const tChgResume = parseIntFromCmdReply(msg);
                if (tChgResume === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tChgResume,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger ntc cold (get|set)',
            msg => {
                const tCold = parseIntFromCmdReply(msg);
                if (tCold === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tCold,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger ntc cool (get|set)',
            msg => {
                const tCool = parseIntFromCmdReply(msg);
                if (tCool === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tCool,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger ntc hot (get|set)',
            msg => {
                const tHot = parseIntFromCmdReply(msg);
                if (tHot === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tHot,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger ntc warm (get|set)',
            msg => {
                const tWarm = parseIntFromCmdReply(msg);
                if (tWarm === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tWarm,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger timeout charging (get|set)',
            msg => {
                const tOutCharge = parseIntFromCmdReply(msg);
                if (tOutCharge === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tOutCharge,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger timeout trickle (get|set)',
            msg => {
                const tOutTrickle = parseIntFromCmdReply(msg);
                if (tOutTrickle === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tOutTrickle,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger voltage batlow (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const vBatLow = vBatLowLvlKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (vBatLow === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vBatLow,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger voltage termination (get|set)',
            msg => {
                const vTerm = parseFloatFromCmdReply(msg);
                if (vTerm === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vTerm,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger voltage termination_cool (get|set)',
            msg => {
                const vTermCool = parseFloatFromCmdReply(msg);
                if (vTermCool === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vTermCool,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger voltage termination_warm (get|set)',
            msg => {
                const vTermWarm = parseFloatFromCmdReply(msg);
                if (vTermWarm === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vTermWarm,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger voltage throttle (get|set)',
            msg => {
                const vThrottle = parseIntFromCmdReply(msg);
                if (vThrottle === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vThrottle,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger voltage trickle (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg);
                const vTrickleFast = vTrickleLvlKeys.find(v => v === res);
                if (vTrickleFast === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vTrickleFast,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm1012 charger voltage weak (get|set)',
            msg => {
                const vWeak = parseFloatFromCmdReply(msg);
                if (vWeak === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vWeak,
                });
            },
            () => {},
        ),
    );

    return cleanupCallbacks;
};
