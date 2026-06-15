/*
 * Copyright (c) 2024 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

export class FuelGaugeGet {
    constructor(
        private sendCommand: (
            command: string,
            onSuccess?: (response: string, command: string) => void,
            onError?: (response: string, command: string) => void,
        ) => void,
    ) {}

    all() {
        this.enabled();
        this.activeBatteryModel();
        this.storedBatteryModel();
        this.batteryHealthEnabled();
        this.batteryReplacementDetection();
        this.quickConvergenceMode();
        this.ratedMinBatteryCapacity();
    }

    enabled() {
        this.sendCommand('fuel_gauge get');
    }

    activeBatteryModel() {
        this.sendCommand(`fuel_gauge model get`);
    }

    storedBatteryModel() {
        this.sendCommand(`fuel_gauge model list`);
    }

    batteryHealthEnabled() {
        this.sendCommand('fuel_gauge health enable get');
    }

    batteryReplacementDetection() {
        this.sendCommand('fuel_gauge health replacement_detection get');
    }

    quickConvergenceMode() {
        this.sendCommand('fuel_gauge health quick_convergence get');
    }

    ratedMinBatteryCapacity() {
        this.sendCommand('fuel_gauge health rated_min_capacity get');
    }
}
