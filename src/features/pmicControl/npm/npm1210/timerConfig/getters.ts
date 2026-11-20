/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams } from '../../types';

export class TimerConfigGet {
    constructor(private sendCommand: ModuleParams['sendCommand']) {}

    all() {
        this.enabled();
        this.mode();
        this.period();
    }

    enabled() {
        this.sendCommand(`npm12xx timer state get`);
    }

    mode() {
        this.sendCommand(`npm12xx timer mode get`);
    }

    period() {
        this.sendCommand(`npm12xx timer period get`);
    }
}
