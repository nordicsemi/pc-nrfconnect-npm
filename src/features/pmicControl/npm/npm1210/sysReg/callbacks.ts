/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { logger } from '@nordicsemiconductor/pc-nrfconnect-shared';

import { parseLogData } from '../../pmicHelpers';
import { type ModuleParams, type SysReg } from '../../types';
import { parseValueFromCmdReply } from '../helpers';
import { type SysRegGet } from './getters';
import {
    vBusDpmKeys,
    vBusILim0And1PinGndSelKeys,
    vBusILim0And1PinMapKeys,
    vBusILimControlKeys,
    vBusILimKeys,
    vBusILimSourceKeys,
    vBusPGPinSelKeys,
} from './types';

export default (
    eventEmitter: ModuleParams['eventEmitter'],
    shellParser: ModuleParams['shellParser'],
    get: SysRegGet,
) => {
    if (shellParser === undefined) {
        return [];
    }

    const callbacks = [];

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx sysreg vbusdpm (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const vBusDpm = vBusDpmKeys.find(v => v.toLowerCase() === res);
                if (vBusDpm === undefined) return;
                eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', {
                    vBusDpm,
                });
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx sysreg vbusilim software (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const vBusILim = vBusILimKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (vBusILim === undefined) return;
                eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', {
                    vBusILim,
                });
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx sysreg vbusilim pingnd (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const vBusILim0And1PinGndSel = vBusILim0And1PinGndSelKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (vBusILim0And1PinGndSel === undefined) return;
                eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', {
                    vBusILim0And1PinGndSel,
                });
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx sysreg vbusilim pinmap (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const vBusILim0And1PinMap = vBusILim0And1PinMapKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (vBusILim0And1PinMap === undefined) return;
                eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', {
                    vBusILim0And1PinMap,
                });
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx sysreg vbusilim pull (get|set) 0',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const sysReg: Partial<SysReg> = {};
                switch (res) {
                    case 'nopull':
                        sysReg.vBusILim0PinPullDownEnable = false;
                        break;
                    case 'pulldown':
                        sysReg.vBusILim0PinPullDownEnable = true;
                        break;
                    default:
                        return;
                }
                eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', sysReg);
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx sysreg vbusilim pull (get|set) 1',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const sysReg: Partial<SysReg> = {};
                switch (res) {
                    case 'nopull':
                        sysReg.vBusILim1PinPullDownEnable = false;
                        break;
                    case 'pulldown':
                        sysReg.vBusILim1PinPullDownEnable = true;
                        break;
                    default:
                        return;
                }
                eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', sysReg);
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx sysreg vbusilim enablectrl (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const vBusILimControl = vBusILimControlKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (vBusILimControl === undefined) return;
                eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', {
                    vBusILimControl,
                });
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx sysreg pgpin (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const vBusPGPinSel = vBusPGPinSelKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (vBusPGPinSel === undefined) return;
                eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', {
                    vBusPGPinSel,
                });
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx sysreg vbusilim status get',
            msg => {
                const sysReg: Partial<SysReg> = {
                    vBusILimControl: 'software',
                    vBusILimSoftwareControlDisabled: false,
                };
                const res = parseValueFromCmdReply(msg)?.split('|');
                const vBusILimSource = vBusILimSourceKeys.find(
                    v => v.toLowerCase() === res?.[0]?.toLowerCase(),
                );
                sysReg.vBusILim = vBusILimKeys.find(
                    v => v.toLowerCase() === res?.[1]?.toLowerCase(),
                );
                if (
                    vBusILimSource === undefined ||
                    sysReg.vBusILim === undefined
                ) {
                    return;
                }
                if (vBusILimSource === 'notvalid') {
                    logger.warn('VBUS ILIM selection not valid');
                    return;
                }
                sysReg.vBusILimControl =
                    vBusILimSource === 'pins' ? 'pin' : 'software';
                sysReg.vBusILimSoftwareControlDisabled =
                    vBusILimSource === 'pins';
                eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', sysReg);
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx sysreg vbus_status get',
            msg => {
                const sysReg: Partial<SysReg> = {
                    vBusGood: false,
                    vBusPresent: false,
                };

                const messageParts = parseValueFromCmdReply(msg)
                    ?.toLowerCase()
                    .split(',');
                messageParts?.forEach(part => {
                    switch (part) {
                        case 'good':
                            sysReg.vBusGood = true;
                            break;
                        case 'overvoltage':
                            break;
                        case 'present':
                            sysReg.vBusPresent = true;
                            break;
                        case 'undervoltage':
                            break;
                    }
                });

                eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', sysReg);
            },
            () => {},
        ),
    );

    callbacks.push(
        shellParser.onShellLoggingEvent(logEvent => {
            parseLogData(logEvent, loggingEvent => {
                if (loggingEvent.module !== 'module_pmic_irq') {
                    return;
                }

                const sysReg: Partial<SysReg> = {};

                switch (loggingEvent.message.toLowerCase()) {
                    case 'event_vbusokne':
                        sysReg.vBusGood = false;
                        break;
                    case 'event_vbusokpe':
                        sysReg.vBusGood = true;
                        break;
                    case 'event_vbusovne':
                        break;
                    case 'event_vbusovpe':
                        break;
                    case 'event_vbuspresentne':
                        sysReg.vBusPresent = false;
                        break;
                    case 'event_vbuspresentpe':
                        sysReg.vBusPresent = true;
                        break;
                    case 'event_vbusunderne':
                        break;
                    case 'event_vbusunderpe':
                        break;
                }

                if (sysReg.vBusPresent !== undefined) {
                    get.vBusILimStatus(); // request update on change
                }

                eventEmitter.emitPartialEvent<SysReg>('onSysRegUpdate', sysReg);
            });
        }),
    );

    return callbacks;
};
