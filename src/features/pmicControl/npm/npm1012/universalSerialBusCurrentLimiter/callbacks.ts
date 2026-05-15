/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ShellParser } from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    noop,
    type NpmEventEmitter,
    parseColonBasedAnswer,
    parseLogData,
    parseToNumber,
    toRegex,
} from '../../pmicHelpers';
import { type USBPower } from '../../types';

export default (
    shellParser: ShellParser | undefined,
    eventEmitter: NpmEventEmitter,
) => {
    if (shellParser === undefined) {
        return [];
    }

    const callbacks = [];

    callbacks.push(
        shellParser.onShellLoggingEvent(logEvent => {
            parseLogData(logEvent, loggingEvent => {
                if (loggingEvent.module !== 'module_pmic_irq') {
                    return;
                }

                const usbPower: Partial<USBPower> = {};

                switch (loggingEvent.message) {
                    case 'EVENT_VBUSOKNE':
                        break;
                    case 'EVENT_VBUSOKPE':
                        break;
                    case 'EVENT_VBUSOVNE':
                        break;
                    case 'EVENT_VBUSOVPE':
                        break;
                    case 'EVENT_VBUSPRESENTNE':
                        usbPower.detectStatus = 'No USB connection';
                        break;
                    case 'EVENT_VBUSPRESENTPE':
                        usbPower.detectStatus = 'USB 100/500 mA';
                        break;
                    case 'EVENT_VBUSUNDERNE':
                        break;
                    case 'EVENT_VBUSUNDERPE':
                        break;
                }

                eventEmitter.emitPartialEvent<USBPower>('onUsbPower', usbPower);
            });
        }),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex('npm1012 sysreg vbusilim', true),
            res => {
                eventEmitter.emit('onUsbPower', {
                    currentLimiter: parseToNumber(res) / 1000,
                });
            },
            noop,
        ),
    );

    callbacks.push(
        shellParser.registerCommandCallback(
            toRegex(
                'npm1012 sysreg vbus_status get',
                false,
                undefined,
                '(\\w+)',
            ),
            res => {
                const messageParts = parseColonBasedAnswer(res).split(',');
                const usbPower: Partial<USBPower> = {
                    detectStatus: 'No USB connection',
                };

                messageParts.forEach(part => {
                    switch (part) {
                        case 'Good':
                            break;
                        case 'Overvoltage':
                            break;
                        case 'Present':
                            usbPower.detectStatus = 'USB 100/500 mA';
                            break;
                        case 'Undervoltage':
                            break;
                    }
                });

                eventEmitter.emitPartialEvent<USBPower>('onUsbPower', usbPower);
            },
            noop,
        ),
    );

    return callbacks;
};
