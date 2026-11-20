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
    getNpmDevice,
    getUserOtp,
} from '../../features/pmicControl/pmicControlSlice';
import useIsUIDisabled from '../../features/useIsUIDisabled';
import Charger from '../Cards/UserOTP/Charger';
import Control from '../Cards/UserOTP/Control';
import GpiosAndLeds from '../Cards/UserOTP/GpiosAndLeds';
import Main from '../Cards/UserOTP/Main';
import Regulators from '../Cards/UserOTP/Regulators';
import SystemFeatures from '../Cards/UserOTP/SystemFeatures';

export default ({ active }: PaneProps) => {
    const disabled = useIsUIDisabled();
    const npmDevice = useSelector(getNpmDevice);
    const userOtp = useSelector(getUserOtp);

    return active && npmDevice?.userOtpModule && userOtp ? (
        <MasonryLayout className="masonry-layout" minWidth={412}>
            <Control
                userOtp={userOtp}
                module={npmDevice.userOtpModule}
                disabled={disabled}
            />
            <Main
                userOtp={userOtp}
                module={npmDevice.userOtpModule}
                disabled={disabled}
            />
            <Charger
                userOtp={userOtp}
                module={npmDevice.userOtpModule}
                disabled={disabled}
            />
            <GpiosAndLeds
                userOtp={userOtp}
                module={npmDevice.userOtpModule}
                disabled={disabled}
            />
            <Regulators
                userOtp={userOtp}
                module={npmDevice.userOtpModule}
                disabled={disabled}
            />
            <SystemFeatures
                userOtp={userOtp}
                module={npmDevice.userOtpModule}
                disabled={disabled}
            />
        </MasonryLayout>
    ) : null;
};
