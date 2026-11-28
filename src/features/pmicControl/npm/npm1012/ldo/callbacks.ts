/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ShellParser } from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    noop,
    type NpmEventEmitter,
    onOffRegex,
    parseColonBasedAnswer,
    parseOnOff,
    parseToFloat,
    toRegex,
} from '../../pmicHelpers';
import { type Ldo, LdoModeValues, LdoVOutSelValues } from '../../types';
import { parseValueFromCmdReply } from '../helpers';
import {
    onOffControlValues,
    softStartILimKeysForIndex,
    softStartTimeKeysForIndex,
} from './types';

export default (
    shellParser: ShellParser | undefined,
    eventEmitter: NpmEventEmitter,
    index: number,
) => {
    const cleanupCallbacks = [];

    if (shellParser) {
        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                toRegex(
                    'npm1012 ldosw activedischarge',
                    true,
                    index,
                    onOffRegex,
                ),
                res => {
                    eventEmitter.emitPartialEvent<Ldo>(
                        'onLdoUpdate',
                        {
                            activeDischarge: parseOnOff(res),
                        },
                        index,
                    );
                },
                noop,
            ),
        );

        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                toRegex('npm1012 ldosw enable', true, index, onOffRegex),
                res => {
                    eventEmitter.emitPartialEvent<Ldo>(
                        'onLdoUpdate',
                        {
                            enabled: parseOnOff(res),
                        },
                        index,
                    );
                },
                noop,
            ),
        );

        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                toRegex('npm1012 ldosw ocp', true, index, onOffRegex),
                res => {
                    eventEmitter.emitPartialEvent<Ldo>(
                        'onLdoUpdate',
                        {
                            overcurrentProtection: parseOnOff(res),
                        },
                        index,
                    );
                },
                noop,
            ),
        );

        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                toRegex('npm1012 ldosw enablectrl', true, index, '(\\w+)'),
                res => {
                    const result = parseColonBasedAnswer(res).toLowerCase();

                    const onOffControl = onOffControlValues.find(
                        elem => elem.toLowerCase() === result,
                    );

                    if (onOffControl === undefined) {
                        return;
                    }

                    eventEmitter.emitPartialEvent<Ldo>(
                        'onLdoUpdate',
                        {
                            onOffControl,
                        },
                        index,
                    );
                },
                noop,
            ),
        );

        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                toRegex('npm1012 ldosw mode', true, index, '(\\w+)'),
                res => {
                    if (index === 1) {
                        return; // Disabled for Load Switch 2
                    }

                    const result = parseColonBasedAnswer(res).toLowerCase();

                    const mode = LdoModeValues.find(
                        elem => elem.toLowerCase() === result,
                    );
                    if (mode === undefined) {
                        return;
                    }

                    eventEmitter.emitPartialEvent<Ldo>(
                        'onLdoUpdate',
                        {
                            mode,
                        },
                        index,
                    );
                },
                noop,
            ),
        );

        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                toRegex('npm1012 ldosw softstart', true, index, onOffRegex),
                res => {
                    eventEmitter.emitPartialEvent<Ldo>(
                        'onLdoUpdate',
                        {
                            softStart: parseOnOff(res),
                        },
                        index,
                    );
                },
                noop,
            ),
        );

        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                `npm1012 ldosw softstartilim (get|set) ${index}`,
                msg => {
                    const res = parseValueFromCmdReply(msg)?.toLowerCase();
                    const softStartCurrent = softStartILimKeysForIndex(
                        index,
                    ).find(v => v.toLowerCase() === res);
                    if (softStartCurrent === undefined) {
                        return;
                    }
                    eventEmitter.emitPartialEvent<Ldo>(
                        'onLdoUpdate',
                        {
                            softStartCurrent,
                        },
                        index,
                    );
                },
                () => {},
            ),
        );

        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                `npm1012 ldosw softstarttime (get|set) ${index}`,
                msg => {
                    const res = parseValueFromCmdReply(msg)?.toLowerCase();
                    const softStartTime = softStartTimeKeysForIndex(index).find(
                        v => v.toLowerCase() === res,
                    );
                    if (softStartTime === undefined) {
                        return;
                    }
                    eventEmitter.emitPartialEvent<Ldo>(
                        'onLdoUpdate',
                        {
                            softStartTime,
                        },
                        index,
                    );
                },
                noop,
            ),
        );

        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                toRegex('npm1012 ldosw voutselctrl', true, index, '(\\w+)'),
                res => {
                    if (index === 1) {
                        return; // Disabled for Load Switch 2
                    }

                    const result = parseColonBasedAnswer(res).toLowerCase();

                    const vOutSel = LdoVOutSelValues.find(
                        elem => elem.toLowerCase() === result,
                    );

                    if (vOutSel === undefined) {
                        return;
                    }

                    eventEmitter.emitPartialEvent<Ldo>(
                        'onLdoUpdate',
                        {
                            vOutSel,
                        },
                        index,
                    );
                },
                noop,
            ),
        );

        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                toRegex('npm1012 ldosw vout software', true, index),
                res => {
                    if (index === 1) {
                        return; // Disabled for Load Switch 2
                    }

                    eventEmitter.emitPartialEvent<Ldo>(
                        'onLdoUpdate',
                        {
                            voltage: parseToFloat(res),
                        },
                        index,
                    );
                },
                noop,
            ),
        );

        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                toRegex('npm1012 ldosw weakpull', true, index, onOffRegex),
                res => {
                    if (index === 1) {
                        return; // Disabled for Load Switch 2
                    }

                    eventEmitter.emitPartialEvent<Ldo>(
                        'onLdoUpdate',
                        {
                            weakPullDown: parseOnOff(res),
                        },
                        index,
                    );
                },
                noop,
            ),
        );
    }

    return cleanupCallbacks;
};
