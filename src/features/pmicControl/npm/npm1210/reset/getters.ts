/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams } from '../../types';

export class ResetGet {
    constructor(private sendCommand: ModuleParams['sendCommand']) {}

    all() {
        this.longPressResetEnable();
        this.longPressResetDebounce();
        this.longPressResetPinSel();
        this.powerDownWait();
    }

    longPressResetDebounce() {
        this.sendCommand(`npm12xx reset_ctrl long_press_reset debounce get`);
    }
    longPressResetEnable() {
        this.sendCommand(`npm12xx reset_ctrl long_press_reset enable get`);
    }
    longPressResetPinSel() {
        this.sendCommand(`npm12xx reset_ctrl long_press_reset pinsel get`);
    }
    powerDownWait() {
        this.sendCommand(`npm12xx reset_ctrl powerdown_wait get`);
    }
}
