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
    getFuelGaugeSettings,
    getNpmDevice,
} from '../../features/pmicControl/pmicControlSlice';
import useIsUIDisabled from '../../features/useIsUIDisabled';
import BatteryCard from '../Cards/Battery/BatteryCard';
import BatteryHealthCard from '../Cards/Battery/BatteryHealth';

export default ({ active }: PaneProps) => {
    const disabled = useIsUIDisabled();
    const npmDevice = useSelector(getNpmDevice);
    const fuelGaugeConfig = useSelector(getFuelGaugeSettings);

    return active ? (
        <MasonryLayout className="masonry-layout" minWidth={300}>
            <BatteryCard disabled={disabled} />
            {npmDevice?.fuelGaugeModule && fuelGaugeConfig && (
                <BatteryHealthCard
                    config={fuelGaugeConfig}
                    module={npmDevice.fuelGaugeModule}
                    disabled={disabled}
                />
            )}
        </MasonryLayout>
    ) : null;
};
