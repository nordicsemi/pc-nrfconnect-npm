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
    parseColonBasedAnswer,
    parseOnOff,
    parseToNumber,
    toRegex,
} from '../../pmicHelpers';
import { GPIOLEDDrv } from '../../types';
import {
    GPIODrive,
    gpioModeInputKeys,
    gpioModeOutputKeys,
    GPIOPolarity,
    GPIOPull,
    LEDDrive,
    LEDMode,
} from './types';

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
            toRegex('npm1012 gpio led duty', true, index),
            res => {
                const value = parseToNumber(res);
                eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioDutyCycle: value,
                        ledDutyCycle: value,
                    },
                    index,
                );
            },
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('npm1012 gpio debounce', true, index, onOffRegex),
            res => {
                eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioDebounce: parseOnOff(res),
                    },
                    index,
                );
            },
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('npm1012 gpio drive', true, index, '(\\w+)'),
            res => {
                eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioDrive: parseColonBasedAnswer(res) as GPIODrive,
                    },
                    index,
                );
            },
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('npm1012 gpio function', true, index, '(\\w+)'),
            res => {
                const mode = parseColonBasedAnswer(res);

                const gpioModeInput = gpioModeInputKeys.find(
                    item => item === mode,
                );
                const gpioModeOutput = gpioModeOutputKeys.find(
                    item => item === mode,
                );

                let update: Partial<GPIOLEDDrv> = {};
                if (gpioModeInput !== undefined) {
                    update = {
                        gpioMode: gpioModeInput,
                        gpioState: 'Input',
                        state: 'GPIO',
                    };
                } else if (gpioModeOutput !== undefined) {
                    update = {
                        gpioMode: gpioModeOutput,
                        gpioState: 'Output',
                        state: 'GPIO',
                    };
                } else if (mode === 'LED') {
                    update = {
                        state: 'LED',
                    };
                }

                eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    update,
                    index,
                );
            },
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('npm1012 gpio opendrain', true, index, onOffRegex),
            res => {
                eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioOpenDrain: parseOnOff(res),
                    },
                    index,
                );
            },
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('npm1012 gpio polarity', true, index, '(\\w+)'),
            res => {
                eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioPolarity: parseColonBasedAnswer(
                            res,
                        ) as GPIOPolarity,
                    },
                    index,
                );
            },
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('npm1012 gpio pull', true, index, '(\\w+)'),
            res => {
                eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioPull: parseColonBasedAnswer(res) as GPIOPull,
                    },
                    index,
                );
            },
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('npm1012 gpio led drive', true, index, '(\\w+)'),
            res => {
                eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        ledDrive: parseColonBasedAnswer(res) as LEDDrive,
                    },
                    index,
                );
            },
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('npm1012 gpio led mode', true, index, '(\\w+)'),
            res => {
                eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        ledMode: parseColonBasedAnswer(res) as LEDMode,
                    },
                    index,
                );
            },
            noop,
        ),
    );

    return callbacks;
};
