/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type Range } from '@nordicsemiconductor/pc-nrfconnect-shared';

import nPM1300LdoModule from '../../npm1300/ldo';
import { type Ldo } from '../../types';

const getLdoVoltageRange = () =>
    ({
        min: 1,
        max: 3.3,
        decimals: 1,
        step: 0.1,
    }) as Range;

export default class Module extends nPM1300LdoModule {
    get defaults(): Ldo {
        return ((index: number) => ({
            activeDischarge: false,
            cardLabel: `Load Switch/LDO ${index + 1}`,
            enabled: false,
            mode: 'Load_switch',
            onOffControl: 'SW',
            onOffSoftwareControlEnabled: true,
            softStart:
                this.pmicRevision !== undefined && this.pmicRevision >= 1.1,
            softStartCurrentLoadSwitchMode: 25,
            voltage: getLdoVoltageRange().min,
        }))(this.index);
    }
}
