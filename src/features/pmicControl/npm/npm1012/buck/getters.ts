/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams } from '../../types';

export class BuckGet {
    constructor(private sendCommand: ModuleParams['sendCommand']) {}

    all() {
        this.vOutNormal();
        this.mode();
        this.enabled();
        this.modeControl();
        this.onOffControl();
        this.activeDischargeResistance();
        this.alternateVOut();
        this.alternateVOutControl();
        this.automaticPassthrough();
        this.peakCurrentLimit();
        this.quickVOutDischarge();
        this.shortCircuitProtection();
        this.softStartPeakCurrentLimit();
        this.vOutComparatorBiasCurrentLPMode();
        this.vOutComparatorBiasCurrentULPMode();
        this.vOutRippleControl();
    }

    vOutNormal() {
        this.sendCommand(`npm1012 buck vout software get 0`);
    }

    mode() {
        this.sendCommand(`npm1012 buck voutselctrl get`);
    }

    modeControl() {
        this.sendCommand(`npm1012 buck pwrmode get`);
    }

    onOffControl() {
        this.sendCommand(`npm1012 buck enablectrl get`);
    }

    enabled() {
        this.sendCommand(`npm1012 buck enable get`);
    }

    activeDischargeResistance() {
        this.sendCommand(`npm1012 buck pulldown get`);
    }

    alternateVOut() {
        this.sendCommand(`npm1012 buck vout software get 1`);
    }

    alternateVOutControl() {
        this.sendCommand(`npm1012 buck voutselctrl get`);
    }

    automaticPassthrough() {
        this.sendCommand(`npm1012 buck passthrough get`);
    }

    peakCurrentLimit() {
        this.sendCommand(`npm1012 buck peakilim get`);
    }

    quickVOutDischarge() {
        this.sendCommand(`npm1012 buck autopull get`);
    }

    shortCircuitProtection() {
        this.sendCommand(`npm1012 buck scprotect get`);
    }

    softStartPeakCurrentLimit() {
        this.sendCommand(`npm1012 buck softstartilim get`);
    }

    vOutComparatorBiasCurrentLPMode() {
        this.sendCommand(`npm1012 buck bias lp get`);
    }

    vOutComparatorBiasCurrentULPMode() {
        this.sendCommand(`npm1012 buck bias ulp get`);
    }

    vOutRippleControl() {
        this.sendCommand(`npm1012 buck ripple get`);
    }
}
