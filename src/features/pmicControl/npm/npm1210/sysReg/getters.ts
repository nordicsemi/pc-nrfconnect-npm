/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams } from '../../types';

export class SysRegGet {
    constructor(private sendCommand: ModuleParams['sendCommand']) {}

    all() {
        this.vBusDpm();
        this.vBusILim();
        this.vBusILim0And1PinGndSel();
        this.vBusILim0And1PinMap();
        this.vBusILim0PinPullDown();
        this.vBusILim1PinPullDown();
        this.vBusILimControl();
        this.vBusILimStatus();
        this.vBusPGPinSel();
        this.vBusStatus();
    }

    vBusDpm() {
        this.sendCommand('npm12xx sysreg vbusdpm get');
    }

    vBusILim() {
        this.sendCommand('npm12xx sysreg vbusilim software get');
    }

    vBusILim0And1PinMap() {
        this.sendCommand('npm12xx sysreg vbusilim pinmap get');
    }

    vBusILim0And1PinGndSel() {
        this.sendCommand('npm12xx sysreg vbusilim pingnd get');
    }

    vBusILim0PinPullDown() {
        this.sendCommand('npm12xx sysreg vbusilim pull get 0');
    }

    vBusILim1PinPullDown() {
        this.sendCommand('npm12xx sysreg vbusilim pull get 1');
    }

    vBusILimControl() {
        this.sendCommand('npm12xx sysreg vbusilim enablectrl get');
    }

    vBusILimStatus() {
        this.sendCommand('npm12xx sysreg vbusilim status get');
    }

    vBusPGPinSel() {
        this.sendCommand('npm12xx sysreg pgpin get');
    }

    vBusStatus() {
        this.sendCommand('npm12xx sysreg vbus_status get');
    }
}
