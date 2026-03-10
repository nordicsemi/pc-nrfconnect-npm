/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ShellParser } from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    noop,
    type NpmEventEmitter,
    parseToNumber,
    toRegex,
} from '../../pmicHelpers';
import { type LED } from '../../types';
import { modeValues } from './types';

export default (
    shellParser: ShellParser | undefined,
    eventEmitter: NpmEventEmitter,
    index: number,
) => {
    if (shellParser === undefined) {
        return [];
    }

    const cleanupCallbacks = [];

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            toRegex('npmx led mode', true, index, '[0-3]'),
            res => {
                const mode = modeValues[parseToNumber(res)];
                if (mode === undefined) {
                    return;
                }

                eventEmitter.emitPartialEvent<LED>(
                    'onLEDUpdate',
                    {
                        mode,
                    },
                    index,
                );
            },
            noop,
        ),
    );

    return cleanupCallbacks;
};
