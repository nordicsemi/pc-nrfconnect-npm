/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

export class UsbCurrentLimiterGet {
    constructor(
        private sendCommand: (
            command: string,
            onSuccess?: (response: string, command: string) => void,
            onError?: (response: string, command: string) => void,
        ) => void,
    ) {}

    all() {
        this.vBusInCurrentLimiter();
        this.usbPowered();
    }

    vBusInCurrentLimiter() {
        this.sendCommand('npm1012 sysreg vbusilim get');
    }

    usbPowered() {
        this.sendCommand('npm1012 sysreg vbus_status get');
    }
}
