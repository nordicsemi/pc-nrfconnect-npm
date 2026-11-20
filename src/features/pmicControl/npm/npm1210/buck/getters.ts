/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams } from '../../types';

export class BuckGet {
    constructor(private sendCommand: ModuleParams['sendCommand']) {}

    all() {
        this.activeDischargeResistance();
        this.alternateVOut();
        this.alternateVOutControl();
        this.automaticPassthrough();
        this.enabled();
        this.mode();
        this.modeControl();
        this.onOffControl();
        this.peakCurrentLimit();
        this.quickVOutDischarge();
        this.shortCircuitProtection();
        this.softStartPeakCurrentLimit();
        this.vOutComparatorBiasCurrentLPMode();
        this.vOutComparatorBiasCurrentULPMode();
        this.vOutNormal();
        this.vOutRippleControl();
    }

    activeDischargeResistance() {
        this.sendCommand('npm12xx buck pulldown get');
    }

    alternateVOut() {
        this.sendCommand('npm12xx buck vout software get 1');
    }

    alternateVOutControl() {
        this.sendCommand('npm12xx buck voutselctrl get');
    }

    automaticPassthrough() {
        this.sendCommand('npm12xx buck passthrough get');
    }

    enabled() {
        this.sendCommand('npm12xx buck enable get');
    }

    mode() {
        this.sendCommand('npm12xx buck voutselctrl get');
    }

    modeControl() {
        this.sendCommand('npm12xx buck pwrmode get');
    }

    onOffControl() {
        this.sendCommand('npm12xx buck enablectrl get');
    }

    peakCurrentLimit() {
        this.sendCommand('npm12xx buck peakilim get');
    }

    quickVOutDischarge() {
        this.sendCommand('npm12xx buck autopull get');
    }

    shortCircuitProtection() {
        this.sendCommand('npm12xx buck scprotect get');
    }

    softStartPeakCurrentLimit() {
        this.sendCommand('npm12xx buck softstartilim get');
    }

    vOutComparatorBiasCurrentLPMode() {
        this.sendCommand('npm12xx buck bias lp get');
    }

    vOutComparatorBiasCurrentULPMode() {
        this.sendCommand('npm12xx buck bias ulp get');
    }

    vOutNormal() {
        this.sendCommand('npm12xx buck vout software get 0');
    }

    vOutRippleControl() {
        this.sendCommand('npm12xx buck ripple get');
    }
}
