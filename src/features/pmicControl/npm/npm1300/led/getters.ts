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
        private index: number,
    ) {}

    all() {
        this.mode();
    }

    mode() {
        this.sendCommand(`npmx led mode get ${this.index}`);
    }
}
