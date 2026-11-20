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
    getGPIOLEDDrvs,
    getNpmDevice,
} from '../../features/pmicControl/pmicControlSlice';
import useIsUIDisabled from '../../features/useIsUIDisabled';
import GPIOLEDDrv from './GPIOLEDDrv';

export default ({ active }: PaneProps) => {
    const disabled = useIsUIDisabled();
    const npmDevice = useSelector(getNpmDevice);
    const gpioleddrvs = useSelector(getGPIOLEDDrvs);

    return active ? (
        <MasonryLayout className="masonry-layout" minWidth={300}>
            {npmDevice &&
                gpioleddrvs.map((gpioleddrv, index) => (
                    <GPIOLEDDrv
                        config={gpioleddrv}
                        module={npmDevice.gpioLedDrvModule[index]}
                        key={`GPIOLEDDRV${1 + index}`}
                        disabled={disabled}
                    />
                ))}
        </MasonryLayout>
    ) : null;
};
