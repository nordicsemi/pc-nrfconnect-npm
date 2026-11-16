/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import { Button, Card } from '@nordicsemiconductor/pc-nrfconnect-shared';

import { saveUserOtpConfiguration } from '../../../actions/fileActions';
import {
    type UserOtp,
    type UserOtpModule,
} from '../../../features/pmicControl/npm/types';

interface UserOtpControlCardProperties {
    userOtp: UserOtp;
    disabled: boolean;
    module: UserOtpModule;
}

export default ({
    userOtp,
    disabled,
    module,
}: UserOtpControlCardProperties) => (
    <Card
        title={
            <div className="tw-flex tw-justify-between">
                <span>User OTP Control</span>
            </div>
        }
    >
        <div className="tw-flex tw-flex-col tw-gap-2">
            <Button
                disabled={disabled || userOtp.updateInProgress}
                onClick={() => {
                    module.actions.read();
                }}
                variant="secondary"
            >
                Read User OTP
            </Button>
            <Button
                disabled={disabled || userOtp.updateInProgress}
                onClick={async () => {
                    const result = await module.actions.configureAndExport(
                        userOtp.settings,
                    );

                    if (result !== undefined) {
                        saveUserOtpConfiguration(result);
                    }
                }}
                variant="secondary"
            >
                Export User OTP
            </Button>
            <Button
                disabled={disabled || userOtp.updateInProgress}
                onClick={() => {
                    module.actions.write(userOtp.settings, true);
                }}
                variant="secondary"
            >
                Dry Run User OTP
            </Button>
        </div>

        <div className="tw-flex tw-flex-col tw-pt-4">
            <Button
                className="tw-text-red"
                disabled={disabled || userOtp.updateInProgress}
                onClick={() => {
                    module.actions.write(userOtp.settings, false);
                }}
                variant="secondary"
            >
                Program User OTP
            </Button>
        </div>
    </Card>
);
