/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams } from '../../types';

export class GpioGet {
    constructor(
        private sendCommand: ModuleParams['sendCommand'],
        private index: number,
    ) {}

    all() {
        this.debounce();
        this.drive();
        this.mode();
        this.openDrain();
        this.polarity();
        this.pull();
    }

    debounce() {
        this.sendCommand(`npm12xx gpio debounce get ${this.index}`);
    }

    drive() {
        this.sendCommand(`npm12xx gpio drive get ${this.index}`);
    }

    mode() {
        this.sendCommand(`npm12xx gpio function get ${this.index}`);
    }

    openDrain() {
        this.sendCommand(`npm12xx gpio opendrain get ${this.index}`);
    }

    polarity() {
        this.sendCommand(`npm12xx gpio polarity get ${this.index}`);
    }

    pull() {
        this.sendCommand(`npm12xx gpio pull get ${this.index}`);
    }
}
