/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams, type POF } from '../../types';
import { parseFloatFromCmdReply, parseValueFromCmdReply } from '../helpers';

export default (
    eventEmitter: ModuleParams['eventEmitter'],
    shellParser: ModuleParams['shellParser'],
) => {
    if (!shellParser) {
        return [];
    }

    const cleanupCallbacks = [];

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx reset_ctrl pof status get',
            msg => {
                const pofUpdate: Partial<POF> = {};
                switch (parseValueFromCmdReply(msg)?.toLowerCase()) {
                    case 'no_warning':
                        pofUpdate.warnActive = false;
                        break;
                    case 'warning':
                        pofUpdate.warnActive = true;
                        break;
                    default:
                        return;
                }
                eventEmitter.emitPartialEvent<POF>('onPOFUpdate', pofUpdate);
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx reset_ctrl pof reset_threshold (get|set)',
            msg => {
                const resetThreshold = parseFloatFromCmdReply(msg);
                if (resetThreshold === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<POF>('onPOFUpdate', {
                    resetThreshold,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx reset_ctrl pof warn_threshold (get|set)',
            msg => {
                const warnThreshold = parseFloatFromCmdReply(msg);
                if (warnThreshold === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<POF>('onPOFUpdate', {
                    warnThreshold,
                });
            },
            () => {},
        ),
    );

    return cleanupCallbacks;
};
