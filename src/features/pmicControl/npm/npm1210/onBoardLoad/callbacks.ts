/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams, type OnBoardLoad } from '../../types';
import { parseFloatFromCmdReply } from '../helpers';

export default (
    eventEmitter: ModuleParams['eventEmitter'],
    shellParser: ModuleParams['shellParser'],
) => {
    if (!shellParser) return [];

    const cleanupCallbacks = [];

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'cc_sink level (get|set)',
            msg => {
                const value = parseFloatFromCmdReply(msg);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<OnBoardLoad>(
                    'onOnBoardLoadUpdate',
                    {
                        iLoad: value,
                    },
                );
            },
            () => {},
        ),
    );

    return cleanupCallbacks;
};
