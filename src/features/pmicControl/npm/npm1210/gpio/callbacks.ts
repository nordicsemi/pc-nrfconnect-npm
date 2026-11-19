/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type GPIO, type ModuleParams } from '../../types';
import { parseOnOffFromCmdReply, parseValueFromCmdReply } from '../helpers';
import {
    driveKeys,
    isInputMode,
    modeKeysForIndex,
    polarityDisabled,
    polarityKeys,
    pullKeys,
} from './types';

export default (
    eventEmitter: ModuleParams['eventEmitter'],
    shellParser: ModuleParams['shellParser'],
    index: number,
) => {
    if (!shellParser) {
        return [];
    }

    const cleanupCallbacks = [];

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            `npm12xx gpio debounce (get|set) ${index}`,
            msg => {
                const debounce = parseOnOffFromCmdReply(msg);
                if (debounce === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<GPIO>(
                    'onGPIOUpdate',
                    {
                        debounce,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            `npm12xx gpio drive (get|set) ${index}`,
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const drive = driveKeys.find(v => v.toLowerCase() === res);
                if (drive === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<GPIO>(
                    'onGPIOUpdate',
                    {
                        drive,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            `npm12xx gpio function (get|set) ${index}`,
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const mode = modeKeysForIndex(index).find(
                    v => v.toLowerCase() === res,
                );
                if (mode === undefined) {
                    return;
                }
                const isInput = isInputMode(mode);
                eventEmitter.emitPartialEvent<GPIO>(
                    'onGPIOUpdate',
                    {
                        debounceEnabled: isInput,
                        driveEnabled: !isInput,
                        mode,
                        polarityEnabled: !polarityDisabled(mode),
                        pullEnabled: isInput,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            `npm12xx gpio opendrain (get|set) ${index}`,
            msg => {
                const openDrain = parseOnOffFromCmdReply(msg);
                if (openDrain === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<GPIO>(
                    'onGPIOUpdate',
                    {
                        openDrain,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            `npm12xx gpio polarity (get|set) ${index}`,
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const polarity = polarityKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (polarity === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<GPIO>(
                    'onGPIOUpdate',
                    {
                        polarity,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            `npm12xx gpio pull (get|set) ${index}`,
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const pull = pullKeys.find(v => v.toLowerCase() === res);
                if (pull === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<GPIO>(
                    'onGPIOUpdate',
                    {
                        pull,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    return cleanupCallbacks;
};
