/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams } from '../../types';

export class LedActions {
    constructor(private sendCommand: ModuleParams['sendCommand']) {}

    blink() {
        this.sendCommand('npm12xx led blink trigger set on');
    }
}
