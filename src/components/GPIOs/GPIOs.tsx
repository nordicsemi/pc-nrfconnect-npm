/*
 * Copyright (c) 2022 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import { useSelector } from 'react-redux';
import {
    MasonryLayout,
    PaneProps,
} from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    getGPIOLEDDrvs,
    getGPIOs,
    getLEDs,
    getNpmDevice,
} from '../../features/pmicControl/pmicControlSlice';
import useIsUIDisabled from '../../features/useIsUIDisabled';
import GPIO from './GPIO';
import GPIOLEDDrv from './GPIOLEDDrv';
import LED from './LED';

export default ({ active }: PaneProps) => {
    const disabled = useIsUIDisabled();
    const npmDevice = useSelector(getNpmDevice);
    const gpios = useSelector(getGPIOs);
    const gpioleddrvs = useSelector(getGPIOLEDDrvs);
    const leds = useSelector(getLEDs);

    return active ? (
        <MasonryLayout className="masonry-layout" minWidth={300}>
            {npmDevice &&
                gpios.map((gpio, index) => (
                    <GPIO
                        gpio={gpio}
                        gpioModule={npmDevice.gpioModule[index]}
                        key={`GPIO${1 + index}`}
                        disabled={disabled}
                    />
                ))}
            {npmDevice &&
                gpioleddrvs.map((gpioleddrv, index) => (
                    <GPIOLEDDrv
                        config={gpioleddrv}
                        module={npmDevice.gpioLedDrvModule[index]}
                        key={`GPIOLEDDRV${1 + index}`}
                        disabled={disabled}
                    />
                ))}
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
