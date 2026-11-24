/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type LED, type ModuleParams } from '../../types';
import {
    parseIntFromCmdReply,
    parseOnOffFromCmdReply,
    parseValueFromCmdReply,
} from '../helpers';
import { configCardIndex, driveKeys, modeKeys, pwmFreqKeys } from './types';

export default (
    eventEmitter: ModuleParams['eventEmitter'],
    shellParser: ModuleParams['shellParser'],
    index: number,
) => {
    if (shellParser === undefined) {
        return [];
    }

    const cleanupCallbacks = [];

    if (index === configCardIndex) {
        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                'npm12xx led blink continuous (get|set)',
                msg => {
                    const blinkContinuous = parseOnOffFromCmdReply(msg);
                    if (blinkContinuous === undefined) {
                        return;
                    }
                    eventEmitter.emitPartialEvent<LED>(
                        'onLEDUpdate',
                        {
                            blinkContinuous,
                        },
                        index,
                    );
                },
                () => {},
            ),
        );

        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                'npm12xx led blink double (get|set)',
                msg => {
                    const blinkDouble = parseOnOffFromCmdReply(msg);
                    if (blinkDouble === undefined) {
                        return;
                    }
                    eventEmitter.emitPartialEvent<LED>(
                        'onLEDUpdate',
                        {
                            blinkDouble,
                        },
                        index,
                    );
                },
                () => {},
            ),
        );

        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                'npm12xx led blink timeoff (get|set)',
                msg => {
                    const blinkTimeOff = parseIntFromCmdReply(msg);
                    if (blinkTimeOff === undefined) {
                        return;
                    }
                    eventEmitter.emitPartialEvent<LED>(
                        'onLEDUpdate',
                        {
                            blinkTimeOff,
                        },
                        index,
                    );
                },
                () => {},
            ),
        );

        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                'npm12xx led blink timeon (get|set)',
                msg => {
                    const blinkTimeOn = parseIntFromCmdReply(msg);
                    if (blinkTimeOn === undefined) {
                        return;
                    }
                    eventEmitter.emitPartialEvent<LED>(
                        'onLEDUpdate',
                        {
                            blinkTimeOn,
                        },
                        index,
                    );
                },
                () => {},
            ),
        );

        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                'npm12xx led pwmfreq (get|set)',
                msg => {
                    const res = parseValueFromCmdReply(msg)?.toLowerCase();
                    const pwmFrequency = pwmFreqKeys.find(
                        v => v.toLowerCase() === res,
                    );
                    if (pwmFrequency === undefined) {
                        return;
                    }
                    eventEmitter.emitPartialEvent<LED>(
                        'onLEDUpdate',
                        {
                            pwmFrequency,
                        },
                        index,
                    );
                },
                () => {},
            ),
        );

        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                'npm12xx led phaseshift (get|set)',
                msg => {
                    const rgbPhaseShifting = parseOnOffFromCmdReply(msg);
                    if (rgbPhaseShifting === undefined) {
                        return;
                    }
                    eventEmitter.emitPartialEvent<LED>(
                        'onLEDUpdate',
                        {
                            rgbPhaseShifting,
                        },
                        index,
                    );
                },
                () => {},
            ),
        );
    } else {
        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                `npm12xx led drive (get|set) ${index}`,
                msg => {
                    const res = parseValueFromCmdReply(msg)?.toLowerCase();
                    const drive = driveKeys.find(v => v.toLowerCase() === res);
                    if (drive === undefined) {
                        return;
                    }
                    eventEmitter.emitPartialEvent<LED>(
                        'onLEDUpdate',
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
                `npm12xx led duty (get|set) ${index}`,
                msg => {
                    const dutyCycle = parseIntFromCmdReply(msg);
                    if (dutyCycle === undefined) {
                        return;
                    }
                    eventEmitter.emitPartialEvent<LED>(
                        'onLEDUpdate',
                        {
                            dutyCycle,
                        },
                        index,
                    );
                },
                () => {},
            ),
        );

        cleanupCallbacks.push(
            shellParser.registerCommandCallback(
                `npm12xx led mode (get|set) ${index}`,
                msg => {
                    const res = parseValueFromCmdReply(msg)?.toLowerCase();
                    const mode = modeKeys.find(v => v.toLowerCase() === res);
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
                () => {},
            ),
        );
    }

    return cleanupCallbacks;
};
