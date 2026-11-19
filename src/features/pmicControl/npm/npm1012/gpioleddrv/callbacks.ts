/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type GPIOLEDDrv, type ModuleParams } from '../../types';
import {
    parseIntFromCmdReply,
    parseOnOffFromCmdReply,
    parseValueFromCmdReply,
} from '../helpers';
import {
    gpioDriveKeys,
    gpioModeInputKeys,
    gpioModeOutputKeys,
    gpioPolarityKeys,
    gpioPullKeys,
    ledDriveKeys,
    ledModeKeys,
} from './types';

export default (
    eventEmitter: ModuleParams['eventEmitter'],
    shellParser: ModuleParams['shellParser'],
    index: number,
) => {
    if (shellParser === undefined) {
        return [];
    }

    const cleanupCallbacks = [];

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            `npm1012 gpio led duty (get|set) ${index}`,
            msg => {
                const value = parseIntFromCmdReply(msg);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioDutyCycle: value,
                        ledDutyCycle: value,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            `npm1012 gpio debounce (get|set) ${index}`,
            msg => {
                const value = parseOnOffFromCmdReply(msg);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioDebounce: value,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            `npm1012 gpio drive (get|set) ${index}`,
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const value = gpioDriveKeys.find(v => v.toLowerCase() === res);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioDrive: value,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            `npm1012 gpio function (get|set) ${index}`,
            res => {
                const mode = parseValueFromCmdReply(res);
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
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            `npm1012 gpio opendrain (get|set) ${index}`,
            msg => {
                const value = parseOnOffFromCmdReply(msg);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioOpenDrain: value,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            `npm1012 gpio polarity (get|set) ${index}`,
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const value = gpioPolarityKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioPolarity: value,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            `npm1012 gpio pull (get|set) ${index}`,
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const value = gpioPullKeys.find(v => v.toLowerCase() === res);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        gpioPull: value,
                    },
                    index,
                );
            },

            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            `npm1012 gpio led drive (get|set) ${index}`,
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const value = ledDriveKeys.find(v => v.toLowerCase() === res);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        ledDrive: value,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            `npm1012 gpio led mode (get|set) ${index}`,
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const value = ledModeKeys.find(v => v.toLowerCase() === res);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<GPIOLEDDrv>(
                    'onGpioLedDrvUpdate',
                    {
                        ledMode: value,
                    },
                    index,
                );
            },
            () => {},
        ),
    );

    return cleanupCallbacks;
};
