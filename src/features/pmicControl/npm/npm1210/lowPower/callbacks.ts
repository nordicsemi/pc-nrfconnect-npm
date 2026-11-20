/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type LowPowerConfig, type ModuleParams } from '../../types';
import { parseOnOffFromCmdReply, parseValueFromCmdReply } from '../helpers';
import {
    shipVBusFiltDisable,
    shipVBusFiltKeys,
    shipVBusFiltTimeKeys,
    shpHldSliderDisable,
    shpHldSliderKeys,
    shpHldSlideSwitchDelayDisable,
    shpHldSlideSwitchDelayKeys,
    shpHldSlideSwitchPollTimeDisable,
    shpHldSlideSwitchPollTimeKeys,
    shpHldTypeKeys,
    timeToActiveKeys,
    vBusStandbyCtrlKeys,
    vBusStandbySelKeys,
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
        shellParser.registerCommandCallback(
            'npm12xx low_power_ctrl (ship_mode set on|vbat state set hibernate)',
            () => {
                eventEmitter.emit('onReboot', true);
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx low_power_ctrl vbus status get',
            res => {
                const update: Partial<LowPowerConfig> = {};

                const commaSeparated = parseValueFromCmdReply(res)
                    ?.toLowerCase()
                    .split(',');
                commaSeparated?.forEach(value => {
                    switch (value) {
                        case 'hibernate_waiting':
                            update.vbusHibernateWaitingForChargeComplete = true;
                            break;
                        case 'no_request':
                            update.vbusHibernateWaitingForChargeComplete = false;
                            update.vbusStandbyWaitingForChargeComplete = false;
                            break;
                        case 'standby_waiting':
                            update.vbusStandbyWaitingForChargeComplete = true;
                            break;
                    }
                });

                eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    update,
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx low_power_ctrl shphld hibernate_wakeup (get|set)',
            msg => {
                const hibernateWakeupByButton = parseOnOffFromCmdReply(msg);
                if (hibernateWakeupByButton === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        hibernateWakeupByButton,
                    },
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx low_power_ctrl vbus shipfilt (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const shipVBusFilt = shipVBusFiltKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (shipVBusFilt === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        shipVBusFilt,
                    },
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx low_power_ctrl vbus shipfiltset (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const shipVBusFiltTime = shipVBusFiltTimeKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (shipVBusFiltTime === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        shipVBusFiltTime,
                    },
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx low_power_ctrl shphld delaysel (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const shpHldSlideSwitchDelay = shpHldSlideSwitchDelayKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (shpHldSlideSwitchDelay === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        shpHldSlideSwitchDelay,
                    },
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx low_power_ctrl shphld polltime (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const shpHldSlideSwitchPollTime =
                    shpHldSlideSwitchPollTimeKeys.find(
                        v => v.toLowerCase() === res,
                    );
                if (shpHldSlideSwitchPollTime === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        shpHldSlideSwitchPollTime,
                    },
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx low_power_ctrl shphld slider (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const shpHldSlider = shpHldSliderKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (shpHldSlider === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        shpHldSlider,
                    },
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx low_power_ctrl shphld type (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const value = shpHldTypeKeys.find(v => v.toLowerCase() === res);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<LowPowerConfig>(
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
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx sysreg suspendpin pull (get|set)',
            msg => {
                const value = parseValueFromCmdReply(msg)?.toLowerCase();
                const update: Partial<LowPowerConfig> = {};
                switch (value) {
                    case 'nopull':
                        update.suspendPinPullDown = false;
                        break;
                    case 'pulldown':
                        update.suspendPinPullDown = true;
                        break;
                    default:
                        return;
                }
                eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    update,
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx low_power_ctrl shphld debounce (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const timeToActive = timeToActiveKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (timeToActive === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        timeToActive,
                    },
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx low_power_ctrl vbus hibernate_wait (get|set)',
            msg => {
                const vbusHibernateWait = parseOnOffFromCmdReply(msg);
                if (vbusHibernateWait === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        vbusHibernateWait,
                    },
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx low_power_ctrl vbus standbyctrl (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const vbusStandbyCtrl = vBusStandbyCtrlKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (vbusStandbyCtrl === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        vbusStandbyCtrl,
                    },
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx low_power_ctrl vbus standbysel (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const vbusStandbySel = vBusStandbySelKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (vbusStandbySel === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        vbusStandbySel,
                    },
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx low_power_ctrl vbus standby_wait (get|set)',
            msg => {
                const vbusStandbyWait = parseOnOffFromCmdReply(msg);
                if (vbusStandbyWait === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        vbusStandbyWait,
                    },
                );
            },
            () => {},
        ),
    );

    return cleanupCallbacks;
};
