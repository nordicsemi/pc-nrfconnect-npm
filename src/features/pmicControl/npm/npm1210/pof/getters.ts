/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams } from '../../types';

export class PofGet {
    constructor(private sendCommand: ModuleParams['sendCommand']) {}

    all() {
        this.resetThreshold();
        this.status();
        this.warnThreshold();
    }

    resetThreshold() {
        this.sendCommand('npm12xx reset_ctrl pof reset_threshold get');
    }

    status() {
        this.sendCommand('npm12xx reset_ctrl pof status get');
    }

    warnThreshold() {
        this.sendCommand('npm12xx reset_ctrl pof warn_threshold get');
    }
}
