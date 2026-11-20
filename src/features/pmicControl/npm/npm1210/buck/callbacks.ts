/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { parseLogData } from '../../pmicHelpers';
import { type Buck, type ModuleParams } from '../../types';
import {
    parseFloatFromCmdReply,
    parseOnOffFromCmdReply,
    parseValueFromCmdReply,
} from '../helpers';
import {
    type AlternateVOutControl,
    iLimFicrLvlKeys,
    iLimLvlKeys,
    iLimStartFicrLvlKeys,
    iLimStartLvlKeys,
    modeControlKeys,
    onOffControlKeys,
    pullDownResKeys,
    vOutCompBiasLPModeFicrKeys,
    vOutCompBiasLPModeKeys,
    vOutCompBiasULPModeFicrKeys,
    vOutCompBiasULPModeKeys,
    vOutRippleControlKeys,
} from './types';

export default (
    eventEmitter: ModuleParams['eventEmitter'],
    shellParser: ModuleParams['shellParser'],
    index: number,
) => {
    if (!shellParser) {
        return [];
    }

    const callbacks = [];

    callbacks.push(
        shellParser.onShellLoggingEvent(logEvent => {
            parseLogData(logEvent, loggingEvent => {
                if (loggingEvent.module !== 'module_pmic') {
                    return;
                }

                const buckUpdate: Partial<Buck> = {};

                switch (loggingEvent.message) {
                    case 'Buck disabled':
                        buckUpdate.enabled = false;
                        break;
                    case 'Buck enabled':
                        buckUpdate.enabled = true;
                        break;
                }

                eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    buckUpdate,
                    index,
                );
            });
        }),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx buck voutselctrl (get|set)',
            res => {
                let update: Partial<Buck> = {};
                switch (parseValueFromCmdReply(res)?.toLowerCase()) {
                    case 'gpio':
                        update = { alternateVOutControl: 'GPIO' };
                        break;
                    case 'software':
                        update = { mode: 'software' };
                        break;
                    case 'vset':
                        update = { mode: 'vSet' };
                        break;
                    default:
                        return;
                }

                eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    update,
                    index,
                );
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx buck pulldown (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg);
                const activeDischargeResistance = pullDownResKeys.find(
                    v => v === res,
                );
                if (activeDischargeResistance === undefined) return;
                eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        activeDischargeResistance,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx buck vout software (get|set) 1',
            res => {
                const alternateVOut = parseFloatFromCmdReply(res);
                if (alternateVOut === undefined) return;
                eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        alternateVOut,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx buck voutsel (get|set)',
            res => {
                let alternateVOutControl: AlternateVOutControl = 'OFF';

                switch (parseValueFromCmdReply(res)?.toLowerCase()) {
                    case 'vout1':
                        alternateVOutControl = 'OFF';
                        break;
                    case 'vout2':
                        alternateVOutControl = 'SOFTWARE';
                        break;
                    default:
                        return;
                }

                eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        alternateVOutControl,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx buck passthrough (get|set)',
            res => {
                const enabled = parseOnOffFromCmdReply(res);
                if (enabled === undefined) return;
                eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        automaticPassthrough: enabled,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx buck enable (get|set)',
            res => {
                const enabled = parseOnOffFromCmdReply(res);
                if (enabled === undefined) return;
                eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        enabled,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx buck pwrmode (get|set)',
            msg => {
                const result = parseValueFromCmdReply(msg)?.toLowerCase();
                const modeControl = modeControlKeys.find(
                    v => v.toLowerCase() === result,
                );
                if (modeControl === undefined) return;
                eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        modeControl,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx buck enablectrl (get|set)',
            msg => {
                const result = parseValueFromCmdReply(msg)?.toLowerCase();
                const onOffControl = onOffControlKeys.find(
                    v => v.toLowerCase() === result,
                );
                if (onOffControl === undefined) return;
                eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        onOffControl,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx buck peakilim (get|set)',
            msg => {
                const iLimRes = parseValueFromCmdReply(msg)
                    ?.split(',')[0]
                    ?.toLowerCase();
                const iLimFicrRes = parseValueFromCmdReply(msg)
                    ?.split(',')[1]
                    ?.toLowerCase();
                const peakCurrentLimit = iLimLvlKeys.find(
                    v => v.toLowerCase() === iLimRes,
                );
                const peakCurrentLimitFicr = iLimFicrLvlKeys.find(
                    v => v.toLowerCase() === iLimFicrRes,
                );
                if (peakCurrentLimit === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        peakCurrentLimit,
                        ...(peakCurrentLimitFicr !== undefined
                            ? { peakCurrentLimitFicr }
                            : {}),
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx buck autopull (get|set)',
            res => {
                const enabled = parseOnOffFromCmdReply(res);
                if (enabled === undefined) return;
                eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        quickVOutDischarge: enabled,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx buck scprotect (get|set)',
            res => {
                const enabled = parseOnOffFromCmdReply(res);
                if (enabled === undefined) return;
                eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        shortCircuitProtection: enabled,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx buck softstartilim (get|set)',
            msg => {
                const iLimRes = parseValueFromCmdReply(msg)
                    ?.split(',')[0]
                    ?.toLowerCase();
                const iLimFicrRes = parseValueFromCmdReply(msg)
                    ?.split(',')[1]
                    ?.toLowerCase();
                const softStartPeakCurrentLimit = iLimStartLvlKeys.find(
                    v => v.toLowerCase() === iLimRes,
                );
                const softStartPeakCurrentLimitFicr = iLimStartFicrLvlKeys.find(
                    v => v.toLowerCase() === iLimFicrRes,
                );
                if (softStartPeakCurrentLimit === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        softStartPeakCurrentLimit,
                        ...(softStartPeakCurrentLimitFicr !== undefined
                            ? { softStartPeakCurrentLimitFicr }
                            : {}),
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx buck bias lp (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)
                    ?.split(',')[0]
                    ?.toLowerCase();
                const ficrRes = parseValueFromCmdReply(msg)
                    ?.split(',')[1]
                    ?.toLowerCase();
                const vOutComparatorBiasCurrentLPMode =
                    vOutCompBiasLPModeKeys.find(v => v.toLowerCase() === res);
                const vOutComparatorBiasCurrentLPModeFicr =
                    vOutCompBiasLPModeFicrKeys.find(
                        v => v.toLowerCase() === ficrRes,
                    );
                if (vOutComparatorBiasCurrentLPMode === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        vOutComparatorBiasCurrentLPMode,
                        ...(vOutComparatorBiasCurrentLPModeFicr !== undefined
                            ? { vOutComparatorBiasCurrentLPModeFicr }
                            : {}),
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx buck bias ulp (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)
                    ?.split(',')[0]
                    ?.toLowerCase();
                const ficrRes = parseValueFromCmdReply(msg)
                    ?.split(',')[1]
                    ?.toLowerCase();
                const vOutComparatorBiasCurrentULPMode =
                    vOutCompBiasULPModeKeys.find(v => v.toLowerCase() === res);
                const vOutComparatorBiasCurrentULPModeFicr =
                    vOutCompBiasULPModeFicrKeys.find(
                        v => v.toLowerCase() === ficrRes,
                    );
                if (vOutComparatorBiasCurrentULPMode === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        vOutComparatorBiasCurrentULPMode,
                        ...(vOutComparatorBiasCurrentULPModeFicr !== undefined
                            ? { vOutComparatorBiasCurrentULPModeFicr }
                            : {}),
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx buck vout software (get|set) 0',
            res => {
                const vOutNormal = parseFloatFromCmdReply(res);
                if (vOutNormal === undefined) return;
                eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        vOutNormal,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx buck ripple (get|set)',
            msg => {
                const result = parseValueFromCmdReply(msg)?.toLowerCase();
                const vOutRippleControl = vOutRippleControlKeys.find(
                    v => v.toLowerCase() === result,
                );
                if (vOutRippleControl === undefined) return;

                eventEmitter.emitPartialEvent<Buck>(
                    'onBuckUpdate',
                    {
                        vOutRippleControl,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    return callbacks;
};
