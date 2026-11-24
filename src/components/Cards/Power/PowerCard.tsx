/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React, { useEffect, useState } from 'react';
import {
    Card,
    classNames,
    Dropdown,
    NumberInput,
    Toggle,
} from '@nordicsemiconductor/pc-nrfconnect-shared';

import { DocumentationTooltip } from '../../../features/pmicControl/npm/documentation/documentation';
import {
    type Charger,
    type ChargerModule,
    isFixedListRangeWithLabel,
} from '../../../features/pmicControl/npm/types';

import '../../Charger/charger.scss';

interface PowerCardProperties {
    chargerModule: ChargerModule;
    charger: Charger;
    cardLabel?: string;
    disabled: boolean;
    defaultSummary?: boolean;
}

const card = 'charger';

const IBatLimUI = ({
    chargerModule,
    charger,
    disabled,
}: {
    chargerModule: ChargerModule;
    charger: Charger;
    disabled: boolean;
}) => {
    const [internalIBatLim, setInternalIBatLim] = useState(charger.iBatLim);

    useEffect(() => {
        setInternalIBatLim(charger.iBatLim);
    }, [charger.iBatLim]);

    const chargerIBatLimRange = chargerModule.ranges.iBatLim;

    if (
        !chargerIBatLimRange ||
        !chargerModule.set.iBatLim ||
        charger.iBatLim === undefined ||
        internalIBatLim === undefined ||
        typeof charger.iBatLim !== 'number' ||
        typeof internalIBatLim !== 'number'
    )
        return null;

    const setIBatLim = chargerModule.set.iBatLim.bind(chargerModule.set);

    if (
        isFixedListRangeWithLabel(chargerIBatLimRange) &&
        chargerIBatLimRange.toLabel
    ) {
        return (
            <Dropdown
                items={[
                    ...(!chargerIBatLimRange.find(v => v === charger.iBatLim)
                        ? [
                              {
                                  value: charger.iBatLim,
                                  label: chargerIBatLimRange.toLabel(
                                      charger.iBatLim,
                                  ),
                              },
                          ]
                        : []),
                    ...chargerIBatLimRange.map(v => ({
                        value: v.valueOf(),
                        label: chargerIBatLimRange.toLabel(v),
                    })),
                ]}
                label={
                    <DocumentationTooltip card={card} item="IBATLIM">
                        <div>
                            <span>IBAT</span>
                            <span className="subscript">LIM</span>
                        </div>
                    </DocumentationTooltip>
                }
                disabled={disabled}
                onSelect={v => setIBatLim(v.value)}
                selectedItem={{
                    value: charger.iBatLim,
                    label: chargerIBatLimRange.toLabel(charger.iBatLim),
                }}
            />
        );
    }

    return (
        <NumberInput
            label={
                <DocumentationTooltip card={card} item="IBATLIM">
                    <div>
                        <span>IBAT</span>
                        <span className="subscript">LIM</span>
                    </div>
                </DocumentationTooltip>
            }
            unit="mA"
            disabled={disabled}
            range={chargerIBatLimRange}
            value={internalIBatLim}
            onChange={setInternalIBatLim}
            onChangeComplete={v => setIBatLim(v)}
            showSlider
        />
    );
};

export default ({
    chargerModule,
    charger,
    cardLabel = `Charger`,
    disabled,
    defaultSummary = false,
}: PowerCardProperties) => {
    const [summary, setSummary] = useState(defaultSummary);

    const [internalVTerm, setInternalVTerm] = useState(charger.vTerm);
    const [internalIChg, setInternalIChg] = useState(charger.iChg);
    const [internalVWeak, setInternalVWeak] = useState(charger.vWeak);

    // NumberInputSliderWithUnit do not use charger.<prop> as value as we send only at on change complete
    useEffect(() => {
        setInternalVTerm(charger.vTerm);
        setInternalIChg(charger.iChg);
        setInternalVWeak(charger.vWeak);
    }, [charger.vTerm, charger.iChg, charger.vWeak]);

    return (
        <Card
            title={
                <div className="tw-flex tw-justify-between">
                    <DocumentationTooltip card={card} item="Charger">
                        <span>{cardLabel}</span>
                    </DocumentationTooltip>

                    <div className="d-flex">
                        <Toggle
                            label="Enable"
                            isToggled={charger.enabled}
                            onToggle={v => chargerModule.set.enabled(v)}
                            disabled={disabled}
                        />
                        <span
                            className={classNames(
                                'show-more-toggle mdi',
                                summary && 'mdi-chevron-down',
                                !summary && 'mdi-chevron-up',
                            )}
                            role="button"
                            tabIndex={0}
                            onKeyUp={() => {}}
                            onClick={() => {
                                setSummary(!summary);
                            }}
                        />
                    </div>
                </div>
            }
        >
            <NumberInput
                label={
                    <DocumentationTooltip card={card} item="VTERM">
                        <div>
                            <span>V</span>
                            <span className="subscript">TERM</span>
                        </div>
                    </DocumentationTooltip>
                }
                unit="V"
                disabled={disabled}
                range={chargerModule.ranges.voltage}
                value={internalVTerm}
                onChange={setInternalVTerm}
                onChangeComplete={v =>
                    chargerModule.set.vTerm(v, charger.enabled)
                }
                showSlider
            />
            <NumberInput
                label={
                    <DocumentationTooltip card={card} item="ICHG">
                        <div>
                            <span>I</span>
                            <span className="subscript">CHG</span>
                        </div>
                    </DocumentationTooltip>
                }
                unit="mA"
                disabled={disabled}
                range={chargerModule.ranges.current}
                value={internalIChg}
                onChange={setInternalIChg}
                onChangeComplete={v =>
                    chargerModule.set.iChg(
                        v,
                        charger.iChgDouble,
                        charger.enabled,
                    )
                }
                showSlider
            />
            <Dropdown
                label={
                    <DocumentationTooltip card="charger" item="ITERM">
                        <>
                            <span>I</span>
                            <span className="subscript">TERM</span>
                        </>
                    </DocumentationTooltip>
                }
                items={chargerModule.values.iTerm}
                onSelect={item =>
                    chargerModule.set.iTerm(item.value, charger.enabled)
                }
                selectedItem={
                    chargerModule.values.iTerm.find(
                        item => item.value === charger.iTerm,
                    ) ?? chargerModule.values.iTerm[0]
                }
                disabled={disabled}
            />

            {!summary && (
                <>
                    <IBatLimUI
                        charger={charger}
                        chargerModule={chargerModule}
                        disabled={disabled}
                    />
                    <Toggle
                        label={
                            <DocumentationTooltip
                                card={card}
                                item="EnableRecharging"
                            >
                                Enable Recharging
                            </DocumentationTooltip>
                        }
                        isToggled={charger.enableRecharging}
                        onToggle={value =>
                            chargerModule.set.enabledRecharging(value)
                        }
                        disabled={disabled}
                    />
                    <Dropdown
                        label={
                            <DocumentationTooltip
                                card={card}
                                item="VTrickleFast"
                            >
                                <>
                                    <span>V</span>
                                    <span className="subscript">
                                        TRICKLE_FAST
                                    </span>
                                </>
                            </DocumentationTooltip>
                        }
                        items={chargerModule.values.vTrickleFast}
                        onSelect={item =>
                            chargerModule.set.vTrickleFast(
                                item.value,
                                charger.enabled,
                            )
                        }
                        selectedItem={
                            chargerModule.values.vTrickleFast.find(
                                item => item.value === charger.vTrickleFast,
                            ) ?? chargerModule.values.vTrickleFast[0]
                        }
                        disabled={disabled}
                    />
                    {chargerModule.values.iTrickle && (
                        <Dropdown
                            label={
                                <DocumentationTooltip
                                    card={card}
                                    item="ITrickle"
                                >
                                    <>
                                        <span>I</span>
                                        <span className="subscript">
                                            TRICKLE
                                        </span>
                                    </>
                                </DocumentationTooltip>
                            }
                            items={chargerModule.values.iTrickle}
                            onSelect={item =>
                                chargerModule.set.iTrickle?.(item.value)
                            }
                            selectedItem={
                                chargerModule.values.iTrickle.find(
                                    item => item.value === charger.iTrickle,
                                ) ?? chargerModule.values.iTrickle[0]
                            }
                            disabled={disabled}
                        />
                    )}
                    {internalVWeak !== undefined &&
                        chargerModule.ranges.vWeak && (
                            <NumberInput
                                label={
                                    <DocumentationTooltip
                                        card={card}
                                        item="VWEAK"
                                    >
                                        <div>
                                            <span>V</span>
                                            <span className="subscript">
                                                WEAK
                                            </span>
                                        </div>
                                    </DocumentationTooltip>
                                }
                                unit="V"
                                disabled={disabled}
                                range={chargerModule.ranges.vWeak}
                                value={internalVWeak}
                                onChange={setInternalVWeak}
                                onChangeComplete={v =>
                                    chargerModule.set.vWeak?.(v)
                                }
                                showSlider
                            />
                        )}
                    {chargerModule.values.startupMode && (
                        <Dropdown
                            disabled={disabled}
                            items={chargerModule.values.startupMode}
                            label={
                                <DocumentationTooltip
                                    card={card}
                                    item="StartupMode"
                                >
                                    Startup Mode
                                </DocumentationTooltip>
                            }
                            onSelect={item =>
                                chargerModule.set.startupMode?.(item.value)
                            }
                            selectedItem={
                                chargerModule.values.startupMode.find(
                                    item => item.value === charger.startupMode,
                                ) ?? chargerModule.values.startupMode[0]
                            }
                        />
                    )}
                    {chargerModule.values.dropoutRecovery && (
                        <Dropdown
                            disabled={disabled}
                            items={chargerModule.values.dropoutRecovery}
                            label={
                                <DocumentationTooltip
                                    card={card}
                                    item="DropdownRecovery"
                                >
                                    Dropdown Recovery
                                </DocumentationTooltip>
                            }
                            onSelect={item =>
                                chargerModule.set.dropoutRecovery?.(item.value)
                            }
                            selectedItem={
                                chargerModule.values.dropoutRecovery.find(
                                    item =>
                                        item.value === charger.dropoutRecovery,
                                ) ?? chargerModule.values.dropoutRecovery[0]
                            }
                        />
                    )}
                    {chargerModule.values.softstartCurrent && (
                        <Dropdown
                            disabled={disabled}
                            items={chargerModule.values.softstartCurrent}
                            label={
                                <DocumentationTooltip
                                    card={card}
                                    item="SoftstartCurrent"
                                >
                                    Softstart Current
                                </DocumentationTooltip>
                            }
                            onSelect={item =>
                                chargerModule.set.softstartCurrent?.(item.value)
                            }
                            selectedItem={
                                chargerModule.values.softstartCurrent.find(
                                    item =>
                                        item.value === charger.softstartCurrent,
                                ) ?? chargerModule.values.softstartCurrent[0]
                            }
                        />
                    )}
                    {charger.enableWeakBatteryCharging !== undefined && (
                        <Toggle
                            label={
                                <DocumentationTooltip
                                    card={card}
                                    item="EnableWeakBatteryCharging"
                                >
                                    Enable Weak Battery Charging
                                </DocumentationTooltip>
                            }
                            isToggled={charger.enableWeakBatteryCharging}
                            onToggle={value => {
                                chargerModule.set.enabledWeakBatteryCharging?.(
                                    value,
                                );
                            }}
                            disabled={disabled}
                        />
                    )}
                    {charger.enableChgEnPinControl !== undefined && (
                        <Toggle
                            disabled={disabled}
                            isToggled={charger.enableChgEnPinControl}
                            label={
                                <DocumentationTooltip
                                    card={card}
                                    item="EnableChgEnPinControl"
                                >
                                    <>
                                        Enable{' '}
                                        <span className="overline-text">
                                            CHGEN
                                        </span>{' '}
                                        pin control
                                    </>
                                </DocumentationTooltip>
                            }
                            onToggle={value => {
                                chargerModule.set.enableChgEnPinControl?.(
                                    value,
                                );
                            }}
                        />
                    )}
                    {charger.enableChgEnPinPullDown !== undefined && (
                        <Toggle
                            disabled={disabled}
                            isToggled={charger.enableChgEnPinPullDown}
                            label={
                                <DocumentationTooltip
                                    card={card}
                                    item="EnableChgEnPinPullDown"
                                >
                                    <>
                                        Enable{' '}
                                        <span className="overline-text">
                                            CHGEN
                                        </span>{' '}
                                        pin Pull-down
                                    </>
                                </DocumentationTooltip>
                            }
                            onToggle={value => {
                                chargerModule.set.enableChgEnPinPullDown?.(
                                    value,
                                );
                            }}
                        />
                    )}
                </>
            )}
        </Card>
    );
};
