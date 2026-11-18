/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams } from '../../types';

export class OnBoardLoadGet {
    constructor(private sendCommand: ModuleParams['sendCommand']) {}

    all() {
        this.iLoad();
    }

    iLoad() {
        this.sendCommand('cc_sink level get');
    }
}
