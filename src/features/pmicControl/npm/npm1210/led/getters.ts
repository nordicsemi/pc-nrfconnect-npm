/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams } from '../../types';
import { configCardIndex } from './types';

export class LedGet {
    constructor(
        private sendCommand: ModuleParams['sendCommand'],
        private index: number,
    ) {}

    all() {
        if (this.index === configCardIndex) {
            this.blinkContinuous();
            this.blinkDouble();
            this.blinkTimeOff();
            this.blinkTimeOn();
            this.pwmFrequency();
            this.rgbPhaseShifting();
        } else {
            this.drive();
            this.dutyCycle();
            this.mode();
        }
    }

    blinkContinuous() {
        this.sendCommand('npm12xx led blink continuous get');
    }

    blinkDouble() {
        this.sendCommand('npm12xx led blink double get');
    }

    blinkTimeOff() {
        this.sendCommand('npm12xx led blink timeoff get');
    }

    blinkTimeOn() {
        this.sendCommand('npm12xx led blink timeon get');
    }

    drive() {
        this.sendCommand(`npm12xx led drive get ${this.index}`);
    }

    dutyCycle() {
        this.sendCommand(`npm12xx led duty get ${this.index}`);
    }

    mode() {
        this.sendCommand(`npm12xx led mode get ${this.index}`);
    }

    pwmFrequency() {
        this.sendCommand('npm12xx led pwmfreq get');
    }

    rgbPhaseShifting() {
        this.sendCommand('npm12xx led phaseshift get');
    }
}
