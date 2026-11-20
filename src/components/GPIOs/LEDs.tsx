/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import { useSelector } from 'react-redux';
import {
    MasonryLayout,
    type PaneProps,
} from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    getLEDs,
    getNpmDevice,
} from '../../features/pmicControl/pmicControlSlice';
import useIsUIDisabled from '../../features/useIsUIDisabled';
import LED from './LED';

export default ({ active }: PaneProps) => {
    const disabled = useIsUIDisabled();
    const npmDevice = useSelector(getNpmDevice);
    const leds = useSelector(getLEDs);

    return active ? (
        <MasonryLayout className="masonry-layout" minWidth={300}>
            {npmDevice &&
                leds.map((led, index) => (
                    <LED
                        led={led}
                        ledModule={npmDevice.ledModule[index]}
                        key={`LED${1 + index}`}
                        disabled={disabled}
                    />
                ))}
        </MasonryLayout>
    ) : null;
};
