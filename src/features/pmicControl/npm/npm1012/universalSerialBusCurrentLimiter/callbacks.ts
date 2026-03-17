/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { ShellParser } from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    noop,
    NpmEventEmitter,
    parseColonBasedAnswer,
    parseToNumber,
    toRegex,
} from '../../pmicHelpers';
import { USBPower } from '../../types';

export default (
    shellParser: ShellParser | undefined,
    eventEmitter: NpmEventEmitter,
) => {
    if (shellParser === undefined) {
        return [];
    }

    const callbacks = [];

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
                        case 'Present':
                            usbPower.detectStatus = 'USB 100/500 mA';
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
