/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import { useSelector } from 'react-redux';
import {
    Button,
    Card,
    classNames,
    Dropdown,
    Toggle,
} from '@nordicsemiconductor/pc-nrfconnect-shared';

import { DocumentationTooltip } from '../../features/pmicControl/npm/documentation/documentation';
import {
    type LowPowerConfig,
    type LowPowerModule,
} from '../../features/pmicControl/npm/types';
import {
    getPmicChargingState,
    isReceivingBatteryVoltageAboveThreshold,
} from '../../features/pmicControl/pmicControlSlice';

const card = 'lowPowerControl';

export default ({
    lowPowerModule,
    lowPower,
    disabled,
}: {
    lowPowerModule: LowPowerModule;
    lowPower: LowPowerConfig;
    disabled: boolean;
}) => {
    const pmicChargingState = useSelector(getPmicChargingState);
    const batteryConnected = useSelector(
        isReceivingBatteryVoltageAboveThreshold,
    );
    const chargingComplete = batteryConnected && pmicChargingState.batteryFull;

    return (
        <Card
            title={
                <div className="tw-flex tw-justify-between tw-gap-1">
                    Low Power Control
                </div>
            }
        >
            {lowPower.powerButtonEnable !== undefined &&
                lowPowerModule.set.powerButtonEnable && (
                    <Toggle
                        label={
                            <DocumentationTooltip
                                card={card}
                                item="PowerButtonEnable"
                            >
                                Power Off Button
                            </DocumentationTooltip>
                        }
                        isToggled={lowPower.powerButtonEnable === true}
                        onToggle={value =>
                            lowPowerModule.set.powerButtonEnable?.(value)
                        }
                        disabled={disabled}
                    />
                )}

            {lowPowerModule.values.shpHldType !== undefined && (
                <Dropdown
                    disabled={disabled}
                    items={lowPowerModule.values.shpHldType}
                    label={
                        <DocumentationTooltip card={card} item="ShpHldType">
                            <div>
                                <span className="overline-text">EN</span>
                                /SHPHLD Pin Configuration
                            </div>
                        </DocumentationTooltip>
                    }
                    onSelect={item =>
                        lowPowerModule.set.shpHldType?.(item.value)
                    }
                    selectedItem={
                        lowPowerModule.values.shpHldType.find(
                            item => item.value === lowPower.shpHldType,
                        ) ?? lowPowerModule.values.shpHldType[0]
                    }
                />
            )}
            {lowPowerModule.values.shipVBusFilt !== undefined && (
                <Dropdown
                    disabled={disabled}
                    items={lowPowerModule.values.shipVBusFilt}
                    label={
                        <DocumentationTooltip card={card} item="ShipVBusFilt">
                            Push Button VBUS Filtering
                        </DocumentationTooltip>
                    }
                    onSelect={item =>
                        lowPowerModule.set.shipVBusFilt?.(item.value)
                    }
                    selectedItem={
                        lowPowerModule.values.shipVBusFilt.find(
                            item => item.value === lowPower.shipVBusFilt,
                        ) ?? lowPowerModule.values.shipVBusFilt[0]
                    }
                />
            )}
            {lowPowerModule.values.shipVBusFiltTime !== undefined && (
                <Dropdown
                    disabled={disabled}
                    items={lowPowerModule.values.shipVBusFiltTime}
                    label={
                        <DocumentationTooltip
                            card={card}
                            item="ShipVBusFiltTime"
                        >
                            Push Button and Slide Switch VBUS Filtering Time
                        </DocumentationTooltip>
                    }
                    onSelect={item =>
                        lowPowerModule.set.shipVBusFiltTime?.(item.value)
                    }
                    selectedItem={
                        lowPowerModule.values.shipVBusFiltTime.find(
                            item => item.value === lowPower.shipVBusFiltTime,
                        ) ?? lowPowerModule.values.shipVBusFiltTime[0]
                    }
                />
            )}
            {lowPowerModule.values.shpHldSlider !== undefined && (
                <Dropdown
                    disabled={disabled}
                    items={lowPowerModule.values.shpHldSlider}
                    label={
                        <DocumentationTooltip card={card} item="ShpHldSlider">
                            Slide Switch Pull-Up Behavior
                        </DocumentationTooltip>
                    }
                    onSelect={item =>
                        lowPowerModule.set.shpHldSlider?.(item.value)
                    }
                    selectedItem={
                        lowPowerModule.values.shpHldSlider.find(
                            item => item.value === lowPower.shpHldSlider,
                        ) ?? lowPowerModule.values.shpHldSlider[0]
                    }
                />
            )}
            {lowPowerModule.values.shpHldSlideSwitchPollTime !== undefined && (
                <Dropdown
                    disabled={disabled}
                    items={lowPowerModule.values.shpHldSlideSwitchPollTime}
                    label={
                        <DocumentationTooltip
                            card={card}
                            item="ShpHldSlideSwitchPollTime"
                        >
                            Slide Switch Polling Interval
                        </DocumentationTooltip>
                    }
                    onSelect={item =>
                        lowPowerModule.set.shpHldSlideSwitchPollTime?.(
                            item.value,
                        )
                    }
                    selectedItem={
                        lowPowerModule.values.shpHldSlideSwitchPollTime.find(
                            item =>
                                item.value ===
                                lowPower.shpHldSlideSwitchPollTime,
                        ) ?? lowPowerModule.values.shpHldSlideSwitchPollTime[0]
                    }
                />
            )}
            {lowPowerModule.values.shpHldSlideSwitchDelay !== undefined && (
                <Dropdown
                    disabled={disabled}
                    items={lowPowerModule.values.shpHldSlideSwitchDelay}
                    label={
                        <DocumentationTooltip
                            card={card}
                            item="ShpHldSlideSwitchDelay"
                        >
                            Slide Switch Ship Mode Entry Delay
                        </DocumentationTooltip>
                    }
                    onSelect={item =>
                        lowPowerModule.set.shpHldSlideSwitchDelay?.(item.value)
                    }
                    selectedItem={
                        lowPowerModule.values.shpHldSlideSwitchDelay.find(
                            item =>
                                item.value === lowPower.shpHldSlideSwitchDelay,
                        ) ?? lowPowerModule.values.shpHldSlideSwitchDelay[0]
                    }
                />
            )}

            <Dropdown
                label={
                    <DocumentationTooltip card={card} item="TimeToActive">
                        <>
                            t<span className="subscript">SHPHLD_DEB_HIB</span>
                        </>
                    </DocumentationTooltip>
                }
                items={lowPowerModule.values.timeToActive}
                onSelect={item => lowPowerModule.set.timeToActive(item.value)}
                selectedItem={
                    lowPowerModule.values.timeToActive[
                        Math.max(
                            0,
                            lowPowerModule.values.timeToActive.findIndex(
                                item => item.value === lowPower.timeToActive,
                            ),
                        ) ?? 0
                    ]
                }
                disabled={disabled}
            />
            {lowPower.hibernateWakeupByButton !== undefined && (
                <Toggle
                    label={
                        <DocumentationTooltip
                            card={card}
                            item="HibernateWakeupByButton"
                        >
                            Enable Hibernate Wakeup By Button
                        </DocumentationTooltip>
                    }
                    isToggled={lowPower.hibernateWakeupByButton}
                    onToggle={value =>
                        lowPowerModule.set.hibernateWakeupByButton?.(value)
                    }
                    disabled={disabled}
                />
            )}
            {lowPower.vbusStandbyWait !== undefined && (
                <Toggle
                    label={
                        <DocumentationTooltip
                            card={card}
                            item="VbusStandbyWait"
                        >
                            Enable VBUS Standby Wait
                        </DocumentationTooltip>
                    }
                    isToggled={lowPower.vbusStandbyWait}
                    onToggle={value =>
                        lowPowerModule.set.vbusStandbyWait?.(value)
                    }
                    disabled={disabled}
                />
            )}
            {lowPower.vbusHibernateWait !== undefined && (
                <Toggle
                    label={
                        <DocumentationTooltip
                            card={card}
                            item="VbusHibernateWait"
                        >
                            Enable VBUS Hibernate Wait
                        </DocumentationTooltip>
                    }
                    isToggled={lowPower.vbusHibernateWait}
                    onToggle={value =>
                        lowPowerModule.set.vbusHibernateWait?.(value)
                    }
                    disabled={disabled}
                />
            )}
            {lowPower.suspendPinPullDown !== undefined && (
                <Toggle
                    disabled={disabled}
                    isToggled={lowPower.suspendPinPullDown}
                    label={
                        <DocumentationTooltip
                            card={card}
                            item="SuspendPinPullDown"
                        >
                            Enable SUSPEND Pin Pull-Down
                        </DocumentationTooltip>
                    }
                    onToggle={value =>
                        lowPowerModule.set.suspendPinPullDown?.(value)
                    }
                />
            )}
            {lowPowerModule.values.vbusStandbyCtrl !== undefined && (
                <Dropdown
                    disabled={disabled}
                    items={lowPowerModule.values.vbusStandbyCtrl}
                    label={
                        <DocumentationTooltip
                            card={card}
                            item="VbusStandbyCtrl"
                        >
                            Enter Standby Control
                        </DocumentationTooltip>
                    }
                    onSelect={item =>
                        lowPowerModule.set.vbusStandbyCtrl?.(item.value)
                    }
                    selectedItem={
                        lowPowerModule.values.vbusStandbyCtrl.find(
                            item => item.value === lowPower.vbusStandbyCtrl,
                        ) ?? lowPowerModule.values.vbusStandbyCtrl[0]
                    }
                />
            )}
            {lowPowerModule.values.vbusStandbySel !== undefined && (
                <Dropdown
                    disabled={disabled}
                    items={lowPowerModule.values.vbusStandbySel}
                    label={
                        <DocumentationTooltip card={card} item="VbusStandbySel">
                            Enter Standby Selection
                        </DocumentationTooltip>
                    }
                    onSelect={item =>
                        lowPowerModule.set.vbusStandbySel?.(item.value)
                    }
                    selectedItem={
                        lowPowerModule.values.vbusStandbySel.find(
                            item => item.value === lowPower.vbusStandbySel,
                        ) ?? lowPowerModule.values.vbusStandbySel[0]
                    }
                />
            )}
            <div className="tw-flex tw-flex-col tw-gap-1">
                {lowPowerModule.actions.enterShipMode && (
                    <DocumentationTooltip card={card} item="EnterShipMode">
                        <Button
                            variant="secondary"
                            className="tw-w-full"
                            onClick={() => {
                                lowPowerModule.actions.enterShipMode?.();
                            }}
                            disabled={disabled}
                        >
                            Enter Ship Mode
                        </Button>
                    </DocumentationTooltip>
                )}
                {lowPowerModule.actions.enterShipHibernateMode && (
                    <DocumentationTooltip card={card} item="EnterHibernateMode">
                        <Button
                            variant="secondary"
                            className="tw-w-full"
                            onClick={() => {
                                lowPowerModule.actions.enterShipHibernateMode?.();
                            }}
                            disabled={disabled}
                        >
                            Enter Hibernate Mode
                        </Button>
                    </DocumentationTooltip>
                )}
                {lowPowerModule.actions.enterVbusStandby1Mode &&
                    lowPowerModule.actions.exitVbusStandby1Mode &&
                    lowPower.operatingMode !== undefined && (
                        <DocumentationTooltip
                            card={card}
                            item="EnterVbusStandby1Mode"
                        >
                            <Button
                                variant="secondary"
                                className="tw-w-full"
                                onClick={() => {
                                    if (
                                        lowPower.operatingMode ===
                                        'vbusStandby1'
                                    ) {
                                        lowPowerModule.actions.exitVbusStandby1Mode?.();
                                    } else {
                                        lowPowerModule.actions.enterVbusStandby1Mode?.(
                                            lowPower.vbusStandbyWait,
                                        );
                                    }
                                }}
                                disabled={disabled}
                            >
                                {lowPower.operatingMode === 'vbusStandby1'
                                    ? 'Exit'
                                    : 'Enter'}{' '}
                                VBUS Standby 1 Mode
                            </Button>
                        </DocumentationTooltip>
                    )}
                {lowPowerModule.actions.enterVbusStandby2Mode &&
                    lowPowerModule.actions.exitVbusStandby2Mode &&
                    lowPower.operatingMode !== undefined && (
                        <DocumentationTooltip
                            card={card}
                            item="EnterVbusStandby2Mode"
                        >
                            <Button
                                variant="secondary"
                                className="tw-w-full"
                                onClick={() => {
                                    if (
                                        lowPower.operatingMode ===
                                        'vbusStandby2'
                                    ) {
                                        lowPowerModule.actions.exitVbusStandby2Mode?.();
                                    } else {
                                        lowPowerModule.actions.enterVbusStandby2Mode?.(
                                            lowPower.vbusStandbyWait,
                                        );
                                    }
                                }}
                                disabled={disabled}
                            >
                                {lowPower.operatingMode === 'vbusStandby2'
                                    ? 'Exit'
                                    : 'Enter'}{' '}
                                VBUS Standby 2 Mode
                            </Button>
                        </DocumentationTooltip>
                    )}
                {lowPowerModule.actions.enterVbusHibernateMode &&
                    lowPower.operatingMode !== undefined && (
                        <DocumentationTooltip
                            card={card}
                            item="EnterVbusHibernateMode"
                        >
                            <Button
                                variant="secondary"
                                className="tw-w-full"
                                onClick={() => {
                                    lowPowerModule.actions.enterVbusHibernateMode?.(
                                        lowPower.vbusHibernateWait,
                                    );
                                }}
                                disabled={disabled}
                            >
                                Enter VBUS Hibernate Mode
                            </Button>
                        </DocumentationTooltip>
                    )}
                {lowPowerModule.actions.enterHibernatePtMode && (
                    <DocumentationTooltip
                        card={card}
                        item="EnterHibernatePTMode"
                    >
                        <Button
                            variant="secondary"
                            className="tw-w-full"
                            onClick={() => {
                                lowPowerModule.actions.enterHibernatePtMode?.();
                            }}
                            disabled={disabled}
                        >
                            Enter Hibernate Pass-Through Mode
                        </Button>
                    </DocumentationTooltip>
                )}
                {lowPowerModule.actions.enterBreakToWake && (
                    <DocumentationTooltip
                        card={card}
                        item="EnterBreakToWakeMode"
                    >
                        <Button
                            variant="secondary"
                            className="tw-w-full"
                            onClick={() => {
                                lowPowerModule.actions.enterBreakToWake?.();
                            }}
                            disabled={disabled}
                        >
                            Enter Break-to-wake Mode
                        </Button>
                    </DocumentationTooltip>
                )}
                {lowPower.operatingMode !== undefined &&
                    lowPower.vbusHibernateWaitingForChargeComplete !==
                        undefined &&
                    lowPower.vbusStandbyWaitingForChargeComplete !==
                        undefined && (
                        <div className="tw-flex tw-flex-row tw-gap-4">
                            <DocumentationTooltip
                                card={card}
                                item="WaitingForChargerComplete"
                            >
                                <div className="tw-text-xs">
                                    Waiting for Charger Complete
                                </div>
                            </DocumentationTooltip>
                            <div
                                className={`tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-solid tw-border-gray-200 ${classNames(
                                    !chargingComplete &&
                                        (lowPower.vbusHibernateWaitingForChargeComplete ||
                                            lowPower.vbusStandbyWaitingForChargeComplete)
                                        ? 'tw-bg-red'
                                        : 'tw-bg-green',
                                )}`}
                            />
                        </div>
                    )}
            </div>
        </Card>
    );
};
