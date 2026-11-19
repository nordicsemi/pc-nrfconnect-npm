/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type LowPowerConfig, type ModuleParams } from '../../types';
import { parseOnOffFromCmdReply, parseValueFromCmdReply } from '../helpers';
import {
    shipVBusFiltKeys,
    shipVBusFiltTimeKeys,
    shpHldSliderKeys,
    shpHldSlideSwitchDelayKeys,
    shpHldSlideSwitchPollTimeKeys,
    shpHldTypeKeys,
    timeToActiveKeys,
    vBusStandbyPinSelKeys,
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
            'npm12xx low_power_ctrl shphld delay (get|set)',
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
                const shpHldType = shpHldTypeKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (shpHldType === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        shpHldType,
                    },
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx low_power_ctrl suspend_pin pull_down (get|set)',
            msg => {
                const suspendPinPullDown = parseOnOffFromCmdReply(msg);
                if (suspendPinPullDown === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        suspendPinPullDown,
                    },
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
            'npm12xx low_power_ctrl vbus standby_pinsel (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const vbusStandbyPinSel = vBusStandbyPinSelKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (vbusStandbyPinSel === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<LowPowerConfig>(
                    'onLowPowerUpdate',
                    {
                        vbusStandbyPinSel,
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
