/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

export class LedGet {
    constructor(
        private sendCommand: (
            command: string,
            onSuccess?: (response: string, command: string) => void,
            onError?: (response: string, command: string) => void,
        ) => void,
    ) {}

    all() {
        this.blinkContinuous();
        this.blinkDouble();
        this.blinkTimeOff();
        this.blinkTimeOn();
        this.pwmFrequency();
        this.rgbPhaseShifting();
    }

    blinkContinuous() {
        this.sendCommand('npm1012 gpio led blink continuous get');
    }

    blinkDouble() {
        this.sendCommand('npm1012 gpio led blink double get');
    }

    blinkTimeOff() {
        this.sendCommand('npm1012 gpio led blink timeoff get');
    }

    blinkTimeOn() {
        this.sendCommand('npm1012 gpio led blink timeon get');
    }

    pwmFrequency() {
        this.sendCommand('npm1012 gpio led pwmfreq get');
    }

    rgbPhaseShifting() {
        this.sendCommand('npm1012 gpio led phaseshift get');
    }
}
