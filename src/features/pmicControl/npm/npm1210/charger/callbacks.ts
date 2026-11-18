/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
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
    dropoutRecoveryKeys,
    iBatLimLvlKeys,
    iTermLvlKeys,
    iTrickleLvlKeys,
    jeitaValues,
    softstartCurrentKeys,
    startupModeKeys,
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
            'npm12xx charger state get',
            res => {
                const messageParts = parseValueFromCmdReply(res)?.split(',');
                if (messageParts === undefined) return;

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
                messageParts.forEach(part => {
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
            'npm12xx charger dietemp status (get|set)',
            () => {}, // TODO: Update
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger jeita_charging (get|set)',
            res => {
                const enabled = parseOnOffFromCmdReply(res);
                if (enabled === undefined) return;
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
            'npm12xx charger dropout_recovery (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg);
                const dropoutRecovery = dropoutRecoveryKeys.find(
                    v => v === res,
                );
                if (dropoutRecovery === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    dropoutRecovery,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger enable (get|set)',
            res => {
                const enabled = parseOnOffFromCmdReply(res);
                if (enabled === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enabled,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger throttling (get|set)',
            res => {
                const enabled = parseOnOffFromCmdReply(res);
                if (enabled === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableChargeCurrentThrottling: enabled,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger enablectrl (get|set)',
            res => {
                const parseEnableChgEnPinControl = (msg: string) => {
                    switch (parseValueFromCmdReply(msg)?.toLowerCase()) {
                        case 'both':
                            return true;
                        case 'software':
                            return false;
                    }
                    return undefined;
                };
                const enabled = parseEnableChgEnPinControl(res);
                if (enabled === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableChgEnPinControl: enabled,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger chgenpin pulldown (get|set)',
            res => {
                const enabled = parseOnOffFromCmdReply(res);
                if (enabled === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableChgEnPinPullDown: enabled,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger ntc monitoring (get|set)',
            res => {
                const enabled = parseOnOffFromCmdReply(res);
                if (enabled === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableNtcMonitoring: enabled,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger recharge (get|set)',
            res => {
                const enabled = parseOnOffFromCmdReply(res);
                if (enabled === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableRecharging: enabled,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger pin_timer_reset (get|set)',
            res => {
                const enabled = parseOnOffFromCmdReply(res);
                if (enabled === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableSafetyTimersResetByChgEnPin: enabled,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger lowbat_charging (get|set)',
            res => {
                const enabled = parseOnOffFromCmdReply(res);
                if (enabled === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableVBatLow: enabled,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger weakbat_charging (get|set)',
            res => {
                const enabled = parseOnOffFromCmdReply(res);
                if (enabled === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    enableWeakBatteryCharging: enabled,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger discharge_limit (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg);
                const iBatLim = iBatLimLvlKeys.find(v => v === res);
                if (iBatLim === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iBatLim,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger current charge (get|set)',
            res => {
                const iChg = parseFloatFromCmdReply(res);
                if (iChg === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iChg,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger current charge_cool (get|set)',
            res => {
                const iChgCool = parseFloatFromCmdReply(res);
                if (iChgCool === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iChgCool,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger current isetdouble (get|set)',
            res => {
                const iChgDouble = parseOnOffFromCmdReply(res);
                if (iChgDouble === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iChgDouble,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger current charge_warm (get|set)',
            res => {
                const iChgWarm = parseFloatFromCmdReply(res);
                if (iChgWarm === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iChgWarm,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger current termination (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg);
                const iTerm = iTermLvlKeys.find(v => v === res);
                if (iTerm === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iTerm,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger current throttle (get|set)',
            res => {
                const iThrottle = parseFloatFromCmdReply(res);
                if (iThrottle === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iThrottle,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger current trickle (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg);
                const iTrickle = iTrickleLvlKeys.find(v => v === res);
                if (iTrickle === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    iTrickle,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger current softstart (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg);
                const softstartCurrent = softstartCurrentKeys.find(
                    v => v === res,
                );
                if (softstartCurrent === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    softstartCurrent,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger startup_mode (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg);
                const startupMode = startupModeKeys.find(v => v === res);
                if (startupMode === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    startupMode,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger dietemp reduce (get|set)',
            res => {
                const tChgReduce = parseIntFromCmdReply(res);
                if (tChgReduce === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tChgReduce,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger dietemp resume (get|set)',
            res => {
                const tChgResume = parseIntFromCmdReply(res);
                if (tChgResume === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tChgResume,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger ntc cold (get|set)',
            res => {
                const tCold = parseIntFromCmdReply(res);
                if (tCold === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tCold,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger ntc cool (get|set)',
            res => {
                const tCool = parseIntFromCmdReply(res);
                if (tCool === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tCool,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger ntc warm (get|set)',
            res => {
                const tWarm = parseIntFromCmdReply(res);
                if (tWarm === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tWarm,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger ntc hot (get|set)',
            res => {
                const tHot = parseIntFromCmdReply(res);
                if (tHot === undefined || !jeitaValues.includes(tHot)) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tHot,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger timeout charging (get|set)',
            res => {
                const tOutCharge = parseIntFromCmdReply(res);
                if (tOutCharge === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tOutCharge,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger timeout trickle (get|set)',
            res => {
                const tOutTrickle = parseIntFromCmdReply(res);
                if (tOutTrickle === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    tOutTrickle,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger voltage batlow (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg);
                const vBatLow = vBatLowLvlKeys.find(v => v === res);
                if (vBatLow === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vBatLow,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger voltage termination (get|set)',
            res => {
                const vTerm = parseFloatFromCmdReply(res);
                if (vTerm === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vTerm,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger voltage termination_cool (get|set)',
            res => {
                const vTermCool = parseFloatFromCmdReply(res);
                if (vTermCool === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vTermCool,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger voltage termination_warm (get|set)',
            res => {
                const vTermWarm = parseFloatFromCmdReply(res);
                if (vTermWarm === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vTermWarm,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger voltage throttle (get|set)',
            res => {
                const vThrottle = parseFloatFromCmdReply(res);
                if (vThrottle === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vThrottle,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger voltage trickle (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg);
                const vTrickleFast = vTrickleLvlKeys.find(v => v === res);
                if (vTrickleFast === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vTrickleFast,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx charger voltage weak (get|set)',
            res => {
                const vWeak = parseFloatFromCmdReply(res);
                if (vWeak === undefined) return;
                eventEmitter.emitPartialEvent<Charger>('onChargerUpdate', {
                    vWeak,
                });
            },
            () => {},
        ),
    );

    return cleanupCallbacks;
};
