/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { ModuleParams } from '../../types';

export class GpioLedDrvGet {
    constructor(
        private sendCommand: ModuleParams['sendCommand'],
        private index: number,
    ) {}

    all() {
        this.gpioDebounce();
        this.gpioDrive();
        this.gpioDutyCycle();
        this.gpioMode();
        this.gpioOpenDrain();
        this.gpioPolarity();
        this.gpioPull();
        this.gpioState();

        this.ledDrive();
        this.ledDutyCycle();
        this.ledMode();

        this.state();
    }

    dutyCycle() {
        this.sendCommand(`npm1012 gpio led duty get ${this.index}`);
    }

    gpioDebounce() {
        this.sendCommand(`npm1012 gpio debounce get ${this.index}`);
    }
    gpioDrive() {
        this.sendCommand(`npm1012 gpio drive get ${this.index}`);
    }
    gpioDutyCycle() {
        this.dutyCycle();
    }
    gpioMode() {
        this.sendCommand(`npm1012 gpio function get ${this.index}`);
    }
    gpioOpenDrain() {
        this.sendCommand(`npm1012 gpio opendrain get ${this.index}`);
    }
    gpioPolarity() {
        this.sendCommand(`npm1012 gpio polarity get ${this.index}`);
    }
    gpioPull() {
        this.sendCommand(`npm1012 gpio pull get ${this.index}`);
    }
    gpioState() {
        this.gpioMode();
    }

    ledDrive() {
        this.sendCommand(`npm1012 gpio led drive get ${this.index}`);
    }
    ledDutyCycle() {
        this.dutyCycle();
    }
    ledMode() {
        this.sendCommand(`npm1012 gpio led mode get ${this.index}`);
    }

    state() {
        this.gpioMode();
    }
}
