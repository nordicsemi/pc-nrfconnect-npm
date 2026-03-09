/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { ShellParser } from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    noop,
    NpmEventEmitter,
    onOffRegex,
    parseOnOff,
    parseToNumber,
    toRegex,
} from '../../pmicHelpers';
import { LED } from '../../types';

export default (
    shellParser: ShellParser | undefined,
    eventEmitter: NpmEventEmitter,
    index: number,
) => {
    if (shellParser === undefined) {
        return [];
    }

    const callbacks = [];

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex(
                'npm1012 gpio led blink continuous',
                true,
                undefined,
                onOffRegex,
            ),
            res => {
                eventEmitter.emitPartialEvent<LED>(
                    'onLEDUpdate',
                    {
                        blinkContinuous: parseOnOff(res),
                    },
                    index,
                );
            },
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex(
                'npm1012 gpio led blink double',
                true,
                undefined,
                onOffRegex,
            ),
            res => {
                eventEmitter.emitPartialEvent<LED>(
                    'onLEDUpdate',
                    {
                        blinkDouble: parseOnOff(res),
                    },
                    index,
                );
            },
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('npm1012 gpio led blink timeoff', true),
            res => {
                eventEmitter.emitPartialEvent<LED>(
                    'onLEDUpdate',
                    {
                        blinkTimeOff: parseToNumber(res),
                    },
                    index,
                );
            },
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('npm1012 gpio led blink timeon', true),
            res => {
                eventEmitter.emitPartialEvent<LED>(
                    'onLEDUpdate',
                    {
                        blinkTimeOn: parseToNumber(res),
                    },
                    index,
                );
            },
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('npm1012 gpio led pwmfreq', true),
            res => {
                eventEmitter.emitPartialEvent<LED>(
                    'onLEDUpdate',
                    {
                        pwmFrequency: parseToNumber(res),
                    },
                    index,
                );
            },
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('npm1012 gpio led phaseshift', true, undefined, onOffRegex),
            res => {
                eventEmitter.emitPartialEvent<LED>(
                    'onLEDUpdate',
                    {
                        rgbPhaseShifting: parseOnOff(res),
                    },
                    index,
                );
            },
            noop,
        ),
    );

    return callbacks;
};
