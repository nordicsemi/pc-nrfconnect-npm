/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type NpmExportLatest } from '../../types';
import { npm1210FWVersion } from '../pmic1210Device';
import { setupMocksBase } from './helpers';

describe('PMIC 1210 - Apply Config ', () => {
    const { pmic } = setupMocksBase();

    const sampleConfig: NpmExportLatest = {
        leds: [],
        gpios: [],
        ldos: [],
        boosts: [],
        fuelGaugeSettings: {
            enabled: false,
            chargingSamplingRate: 1000,
        },
        firmwareVersion: npm1210FWVersion,
        deviceType: 'npm1210',
        fileFormatVersion: 2,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const verifyApplyConfig = () => {
        // TODO: add checks when modules are added
    };

    test('Apply Correct config', async () => {
        await pmic.applyConfig(sampleConfig);
        verifyApplyConfig();
    });
});
export {};
