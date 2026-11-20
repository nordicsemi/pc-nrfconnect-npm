/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams, type TimerConfig } from '../../types';
import {
    parseFloatFromCmdReply,
    parseOnOffFromCmdReply,
    parseValueFromCmdReply,
} from '../helpers';
import { modeKeys } from './types';

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
            'npm12xx timer state',
            msg => {
                const value = parseOnOffFromCmdReply(msg);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<TimerConfig>(
                    'onTimerConfigUpdate',
                    {
                        enabled: value,
                    },
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx timer mode',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const value = modeKeys.find(v => v.toLowerCase() === res);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<TimerConfig>(
                    'onTimerConfigUpdate',
                    {
                        mode: value,
                    },
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx timer period',
            msg => {
                const value = parseFloatFromCmdReply(msg);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<TimerConfig>(
                    'onTimerConfigUpdate',
                    {
                        period: value * 1000,
                    },
                );
            },
            () => {},
        ),
    );

    return cleanupCallbacks;
};
