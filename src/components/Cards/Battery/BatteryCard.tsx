/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Card,
    NumberInput,
    Toggle,
} from '@nordicsemiconductor/pc-nrfconnect-shared';

import { DocumentationTooltip } from '../../../features/pmicControl/npm/documentation/documentation';
import {
    getCharger,
    getFuelGaugeSettings,
    getNpmDevice,
} from '../../../features/pmicControl/pmicControlSlice';
import Battery, {
    type BatteryProperties as BatteryCardProperties,
} from '../../Battery/Battery';

export default ({ disabled }: BatteryCardProperties) => {
    const npmDevice = useSelector(getNpmDevice);
    const fuelGaugeSettings = useSelector(getFuelGaugeSettings);
    const charger = useSelector(getCharger);

    const [internalSamplingRate, setInternalSamplingRate] = useState(
        fuelGaugeSettings.notChargingSamplingRate,
    );

    // NumberInputSliderWithUnit do not use fuelGauge.<prop> as value as we send only at on change complete
    useEffect(() => {
        setInternalSamplingRate(
            charger?.enabled === true &&
                fuelGaugeSettings.chargingSamplingRate !== undefined
                ? fuelGaugeSettings.chargingSamplingRate / 1000
                : fuelGaugeSettings.notChargingSamplingRate / 1000,
        );
    }, [
        charger?.enabled,
        fuelGaugeSettings.chargingSamplingRate,
        fuelGaugeSettings.notChargingSamplingRate,
    ]);

    return (
        <Card
            title={
                <div className="tw-flex tw-justify-between">
                    <DocumentationTooltip card="battery" item="FuelGauge">
                        <span>Fuel Gauge</span>
                    </DocumentationTooltip>
                    <Toggle
                        label="Enable"
                        isToggled={fuelGaugeSettings.enabled}
                        onToggle={enabled =>
                            npmDevice?.fuelGaugeModule?.set.enabled(enabled)
                        }
                        disabled={disabled}
                    />
                </div>
            }
        >
            {npmDevice?.fuelGaugeModule?.set.discardPosiiveDeltaZ !==
                undefined && (
                <Toggle
                    label={
                        <DocumentationTooltip
                            card="battery"
                            item="DiscardPositiveDeltaZ"
                        >
                            <span>Allow State of Charge to increase</span>
                        </DocumentationTooltip>
                    }
                    isToggled={!fuelGaugeSettings.discardPosiiveDeltaZ}
                    disabled={disabled}
                    onToggle={enabled =>
                        npmDevice?.fuelGaugeModule?.set.discardPosiiveDeltaZ?.(
                            !enabled,
                        )
                    }
                />
            )}
            <Battery disabled={disabled} />
            {
                // battery icon size is 118 x 84 (width x height), so text should start at 118
                fuelGaugeSettings.actualCapacity !== undefined &&
                    fuelGaugeSettings.cycleCount !== undefined && (
                        <div className="tw-pl-[118px]">
                            <div className="tw-flex tw-w-36 tw-flex-col tw-pb-0.5 tw-text-xs">
                                <div className="tw-flex">
                                    <div>Actual Capacity:</div>
                                    <div className="tw-ml-auto">
                                        {fuelGaugeSettings.enabled &&
                                        !Number.isNaN(
                                            fuelGaugeSettings.actualCapacity,
                                        )
                                            ? `${fuelGaugeSettings.actualCapacity.toFixed(1)}%`
                                            : 'N/A'}
                                    </div>
                                </div>
                                <div className="tw-flex">
                                    <div>Cycle Count:</div>
                                    <div className="tw-ml-auto">
                                        {fuelGaugeSettings.enabled &&
                                        !Number.isNaN(
                                            fuelGaugeSettings.cycleCount,
                                        )
                                            ? `${fuelGaugeSettings.cycleCount.toFixed(0)}`
                                            : 'N/A'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
            {npmDevice?.fuelGaugeModule &&
                npmDevice.fuelGaugeModule.ranges.samplingInterval && (
                    <NumberInput
                        disabled={disabled}
                        label={<div>Fuel Gauge Sampling Interval</div>}
                        onChange={setInternalSamplingRate}
                        onChangeComplete={value => {
                            npmDevice.fuelGaugeModule?.set.adcSample?.(
                                fuelGaugeSettings.reportingRate,
                                value * 1000,
                            );
                        }}
                        range={
                            npmDevice.fuelGaugeModule.ranges.samplingInterval
                        }
                        showSlider
                        unit="s"
                        value={internalSamplingRate}
                    />
                )}
        </Card>
    );
};
