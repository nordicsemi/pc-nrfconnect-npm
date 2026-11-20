/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams, type ResetConfig } from '../../types';
import { parseOnOffFromCmdReply, parseValueFromCmdReply } from '../helpers';
import {
    longPressResetDebounceKeys,
    longPressResetDebounceSelDisabled,
    longPressResetPinSelKeys,
    powerDownWaitKeys,
} from './types';

export default (
    eventEmitter: ModuleParams['eventEmitter'],
    shellParser: ModuleParams['shellParser'],
) => {
    if (shellParser === undefined) {
        return [];
    }

    const cleanupCallbacks = [];

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx reset_ctrl long_press_reset debounce (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const value = longPressResetDebounceKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<ResetConfig>('onResetUpdate', {
                    longPressResetDebounce: value,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx reset_ctrl long_press_reset enable (get|set)',
            msg => {
                const value = parseOnOffFromCmdReply(msg);
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<ResetConfig>('onResetUpdate', {
                    longPressResetEnable: value,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx reset_ctrl long_press_reset pinsel (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const value = longPressResetPinSelKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<ResetConfig>('onResetUpdate', {
                    longPressResetDebounceSelDisabled:
                        longPressResetDebounceSelDisabled(value),
                    longPressResetPinSel: value,
                });
            },
            () => {},
        ),
    );

    cleanupCallbacks.push(
        shellParser.registerCommandCallback(
            'npm12xx reset_ctrl powerdown_wait (get|set)',
            msg => {
                const res = parseValueFromCmdReply(msg)?.toLowerCase();
                const value = powerDownWaitKeys.find(
                    v => v.toLowerCase() === res,
                );
                if (value === undefined) {
                    return;
                }
                eventEmitter.emitPartialEvent<ResetConfig>('onResetUpdate', {
                    powerDownWait: value,
                });
            },
            () => {},
        ),
    );

    return cleanupCallbacks;
};
