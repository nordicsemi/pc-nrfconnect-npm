/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React from 'react';
import {
    Card,
    classNames,
    Dropdown,
    Toggle,
} from '@nordicsemiconductor/pc-nrfconnect-shared';

import { DocumentationTooltip } from '../../features/pmicControl/npm/documentation/documentation';
import {
    type SysReg,
    type SysRegModule,
} from '../../features/pmicControl/npm/types';

interface SysRegProperties {
    config: SysReg;
    disabled: boolean;
    module: SysRegModule;
}

export default ({ config, disabled, module }: SysRegProperties) => {
    const card = 'SysReg';

    return (
        <Card
            title={
                <div className="tw-flex tw-justify-between tw-gap-1">
                    System Regulator
                </div>
            }
        >
            <Dropdown
                disabled={
                    disabled || config.vBusILimSoftwareControlDisabled === true
                }
                items={module.values.vBusILim}
                label={
                    <DocumentationTooltip
                        card={card}
                        item="VBusInputCurrentLimit"
                    >
                        VBUS Input Current Limit
                    </DocumentationTooltip>
                }
                onSelect={item => module.set.vBusILim(item.value)}
                selectedItem={
                    module.values.vBusILim.find(
                        item => item.value === config.vBusILim,
                    ) ?? module.values.vBusILim[0]
                }
            />

            {module.values.vBusILimControl && (
                <Dropdown
                    disabled={disabled}
                    items={module.values.vBusILimControl}
                    label={
                        <DocumentationTooltip
                            card={card}
                            item="VBusInputCurrentLimitControl"
                        >
                            VBUS Input Current Limit Control
                        </DocumentationTooltip>
                    }
                    onSelect={item => module.set.vBusILimControl?.(item.value)}
                    selectedItem={
                        module.values.vBusILimControl.find(
                            item => item.value === config.vBusILimControl,
                        ) ?? module.values.vBusILimControl[0]
                    }
                />
            )}

            {module.values.vBusILim0And1PinMap && (
                <Dropdown
                    disabled={disabled}
                    items={module.values.vBusILim0And1PinMap}
                    label={
                        <DocumentationTooltip
                            card={card}
                            item="VBusInputCurrentLimit0And1PinMap"
                        >
                            ILIM0/1 Pin Map
                        </DocumentationTooltip>
                    }
                    onSelect={item =>
                        module.set.vBusILim0And1PinMap?.(item.value)
                    }
                    selectedItem={
                        module.values.vBusILim0And1PinMap.find(
                            item => item.value === config.vBusILim0And1PinMap,
                        ) ?? module.values.vBusILim0And1PinMap[0]
                    }
                />
            )}

            {module.values.vBusILim0And1PinGndSel && (
                <Dropdown
                    disabled={disabled}
                    items={module.values.vBusILim0And1PinGndSel}
                    label={
                        <DocumentationTooltip
                            card={card}
                            item="VBusInputCurrentLimit0And1PinGndSel"
                        >
                            ILIM0/1 Grounded Selection
                        </DocumentationTooltip>
                    }
                    onSelect={item =>
                        module.set.vBusILim0And1PinGndSel?.(item.value)
                    }
                    selectedItem={
                        module.values.vBusILim0And1PinGndSel.find(
                            item =>
                                item.value === config.vBusILim0And1PinGndSel,
                        ) ?? module.values.vBusILim0And1PinGndSel[0]
                    }
                />
            )}

            {config.vBusILim0PinPullDownEnable !== undefined && (
                <Toggle
                    disabled={disabled}
                    isToggled={config.vBusILim0PinPullDownEnable}
                    label={
                        <DocumentationTooltip
                            card={card}
                            item="VBusInputCurrentLimit0PinPullDown"
                        >
                            Enable ILIM0 Pull-Down
                        </DocumentationTooltip>
                    }
                    onToggle={value =>
                        module.set.vBusILim0PinPullDownEnable?.(value)
                    }
                />
            )}

            {config.vBusILim1PinPullDownEnable !== undefined && (
                <Toggle
                    disabled={disabled}
                    isToggled={config.vBusILim1PinPullDownEnable}
                    label={
                        <DocumentationTooltip
                            card={card}
                            item="VBusInputCurrentLimit1PinPullDown"
                        >
                            Enable ILIM1 Pull-Down
                        </DocumentationTooltip>
                    }
                    onToggle={value =>
                        module.set.vBusILim1PinPullDownEnable?.(value)
                    }
                />
            )}

            {module.values.vBusPGPinSel !== undefined && (
                <Dropdown
                    disabled={disabled}
                    items={module.values.vBusPGPinSel}
                    label={
                        <DocumentationTooltip
                            card={card}
                            item="VBusPGPinSelection"
                        >
                            PG Pin Selection
                        </DocumentationTooltip>
                    }
                    onSelect={item => module.set.vBusPGPinSel?.(item.value)}
                    selectedItem={
                        module.values.vBusPGPinSel.find(
                            item => item.value === config.vBusPGPinSel,
                        ) ?? module.values.vBusPGPinSel[0]
                    }
                />
            )}

            <Dropdown
                label={
                    <DocumentationTooltip card={card} item="VBusDpm">
                        <>
                            VBUS
                            <span className="subscript">DPM</span>
                        </>
                    </DocumentationTooltip>
                }
                items={module.values.vBusDpm}
                onSelect={item => module.set.vBusDpm(item.value)}
                selectedItem={
                    module.values.vBusDpm.find(
                        item => item.value === config.vBusDpm,
                    ) ?? module.values.vBusDpm[0]
                }
                disabled={disabled}
            />

            <div className="tw-grid tw-grid-cols-[max-content_auto] tw-items-center tw-gap-x-4 tw-gap-y-2">
                <div className="tw-text-xs">VBUS Present</div>
                <div
                    className={`tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-solid tw-border-gray-200 ${classNames(
                        config.vBusPresent ? 'tw-bg-green' : 'tw-bg-red',
                    )}`}
                />

                <div className="tw-text-xs">VBUS Good</div>
                <div
                    className={`tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-solid tw-border-gray-200 ${classNames(
                        config.vBusGood ? 'tw-bg-green' : 'tw-bg-red',
                    )}`}
                />
            </div>
        </Card>
    );
};
