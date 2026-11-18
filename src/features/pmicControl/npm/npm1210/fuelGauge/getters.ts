/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams } from '../../types';

export class FuelGaugeGet {
    constructor(private sendCommand: ModuleParams['sendCommand']) {}

    all() {
        this.activeBatteryModel();
        this.enabled();
        this.storedBatteryModel();
    }

    batteryHealthAll() {
        this.batteryHealthEnabled();
        this.batteryReplacementDetection();
        this.quickConvergenceMode();
        this.ratedMinBatteryCapacity();
    }

    activeBatteryModel() {
        this.sendCommand('fuel_gauge model get');
    }

    batteryHealthEnabled() {
        this.sendCommand('fuel_gauge health enable get');
    }

    batteryReplacementDetection() {
        this.sendCommand('fuel_gauge health replacement_detection get');
    }

    enabled() {
        this.sendCommand('fuel_gauge get');
    }

    quickConvergenceMode() {
        this.sendCommand('fuel_gauge health quick_convergence get');
    }

    ratedMinBatteryCapacity() {
        this.sendCommand('fuel_gauge health rated_min_capacity get');
    }

    storedBatteryModel() {
        this.sendCommand('fuel_gauge model list');
    }
}
