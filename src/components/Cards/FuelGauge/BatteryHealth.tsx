/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    classNames,
    NumberInput,
    Toggle,
} from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    type FuelGauge,
    type FuelGaugeModule,
} from '../../../features/pmicControl/npm/types';

interface BatteryHealthCardProperties {
    config: FuelGauge;
    module: FuelGaugeModule;
    defaultSummary?: boolean;
    disabled: boolean;
}

export default ({
    config,
    module,
    disabled,
    defaultSummary = false,
}: BatteryHealthCardProperties) => {
    const [summary, setSummary] = useState(defaultSummary);

    const [
        internalRatedMinBatteryCapacity,
        setInternalRatedMinBatteryCapacity,
    ] = useState(config.ratedMinBatteryCapacity);

    // NumberInputSliderWithUnit do not use config.<prop> as value as we send only at on change complete
    useEffect(() => {
        setInternalRatedMinBatteryCapacity(config.ratedMinBatteryCapacity);
    }, [config]);

    return (
        <Card
            title={
                <div className="tw-flex tw-justify-between">
                    <span>Battery Health</span>

                    {config.batteryHealthEnabled !== undefined && (
                        <div className="d-flex">
                            <Toggle
                                disabled={disabled}
                                isToggled={config.batteryHealthEnabled}
                                label="Enable"
                                onToggle={value =>
                                    module.set.batteryHealthEnabled?.(value)
                                }
                            />
                            <span
                                className={classNames(
                                    'show-more-toggle mdi',
                                    summary && 'mdi-chevron-down',
                                    !summary && 'mdi-chevron-up',
                                )}
                                onClick={() => {
                                    setSummary(!summary);
                                }}
                                onKeyUp={() => {}}
                                role="button"
                                tabIndex={0}
                            />
                        </div>
                    )}
                </div>
            }
        >
            {internalRatedMinBatteryCapacity !== undefined &&
                module.ranges.ratedMinBatteryCapacity && (
                    <NumberInput
                        disabled={disabled}
                        label={<div>Rated Minimum Battery Capacity</div>}
                        onChange={setInternalRatedMinBatteryCapacity}
                        onChangeComplete={value =>
                            module.set.ratedMinBatteryCapacity?.(value)
                        }
                        range={module.ranges.ratedMinBatteryCapacity}
                        showSlider
                        unit="mAh"
                        value={internalRatedMinBatteryCapacity}
                    />
                )}

            {!summary && (
                <>
                    {config.quickConvergenceMode !== undefined && (
                        <Toggle
                            disabled={disabled}
                            isToggled={config.quickConvergenceMode}
                            label={<div>Enable Quick Convergence Mode</div>}
                            onToggle={value =>
                                module.set.quickConvergenceMode?.(value)
                            }
                        />
                    )}
                    {config.batteryReplacementDetection !== undefined && (
                        <Toggle
                            disabled={disabled}
                            isToggled={config.batteryReplacementDetection}
                            label={
                                <div>Enable Battery Replacement Detection</div>
                            }
                            onToggle={value =>
                                module.set.batteryReplacementDetection?.(value)
                            }
                        />
                    )}
                    {module.actions.resetBatteryHealthData && (
                        <Button
                            className="tw-w-full"
                            disabled={disabled}
                            onClick={() => {
                                module.actions.resetBatteryHealthData?.();
                            }}
                            variant="secondary"
                        >
                            Reset Battery Health Data
                        </Button>
                    )}
                </>
            )}
        </Card>
    );
};
