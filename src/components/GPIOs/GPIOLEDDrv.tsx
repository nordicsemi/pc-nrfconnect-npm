/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React, { useEffect, useState } from 'react';
import {
    Card,
    Dropdown,
    NumberInput,
    StateSelector,
    Toggle,
} from '@nordicsemiconductor/pc-nrfconnect-shared';

import { DocumentationTooltip } from '../../features/pmicControl/npm/documentation/documentation';
import {
    GPIOLEDDrv,
    GPIOLEDDrvGPIOStateValues,
    GpioLedDrvModule,
    GPIOLEDDrvStateValues,
} from '../../features/pmicControl/npm/types';

interface GPIOLEDDrvProperties {
    module: GpioLedDrvModule;
    config: GPIOLEDDrv;
    disabled: boolean;
}

export default ({ module, config, disabled }: GPIOLEDDrvProperties) => {
    const card = `gpioleddrv${module.index}`;

    const [internalGpioDutyCycle, setInternalGpioDutyCycle] = useState(
        config.gpioDutyCycle,
    );
    const [internalLedDutyCycle, setInternalLedDutyCycle] = useState(
        config.ledDutyCycle,
    );

    // NumberInputSliderWithUnit do not use led.<prop> as value as we send only at on change complete
    useEffect(() => {
        setInternalGpioDutyCycle(config.gpioDutyCycle);
        setInternalLedDutyCycle(config.ledDutyCycle);
    }, [config]);

    return (
        <Card
            title={
                <div className="tw-flex tw-justify-between">
                    <span>{`GPIO/LED ${module.index}`}</span>
                    {config.state === 'GPIO' && (
                        <div className="d-flex">{config.gpioState}</div>
                    )}
                </div>
            }
        >
            <StateSelector
                disabled={disabled}
                items={GPIOLEDDrvStateValues.map(item => item)}
                onSelect={i => {
                    const state = GPIOLEDDrvStateValues[i];
                    module.set.state(state);
                    if (state === 'GPIO') {
                        module.set.gpioState(config.gpioState);
                        module.set.gpioMode(config.gpioMode, config.gpioState);
                    }
                }}
                selectedItem={
                    GPIOLEDDrvStateValues.find(item => item === config.state) ??
                    GPIOLEDDrvStateValues[0]
                }
            />
            {config.state === 'GPIO' && (
                <>
                    <StateSelector
                        disabled={disabled}
                        items={GPIOLEDDrvGPIOStateValues.map(item => item)}
                        onSelect={i => {
                            const gpioState = GPIOLEDDrvGPIOStateValues[i];
                            module.set.gpioState(gpioState);
                            module.set.gpioMode(config.gpioMode, gpioState);
                        }}
                        selectedItem={
                            GPIOLEDDrvGPIOStateValues.find(
                                item => item === config.gpioState,
                            ) ?? GPIOLEDDrvGPIOStateValues[0]
                        }
                    />
                    <Dropdown
                        disabled={disabled}
                        items={module.values.gpioMode(config.gpioState)}
                        label={
                            <DocumentationTooltip
                                card={card}
                                item="GPIOLEDDrvGPIOMode"
                            >
                                <span>Mode</span>
                            </DocumentationTooltip>
                        }
                        onSelect={item =>
                            module.set.gpioMode(item.value, config.gpioState)
                        }
                        selectedItem={
                            module.values
                                .gpioMode(config.gpioState)
                                .find(item => item.value === config.gpioMode) ??
                            module.values.gpioMode(config.gpioState)[0]
                        }
                    />
                    <Dropdown
                        disabled={
                            (config.gpioState === 'Input' &&
                                config.gpioMode === 'GPIO_IN') ||
                            (config.gpioState === 'Output' &&
                                (config.gpioMode === 'GPIO_OUT_LOW' ||
                                    config.gpioMode === 'GPIO_OUT_HIGH')) ||
                            disabled
                        }
                        items={module.values.gpioPolarity}
                        label={
                            <DocumentationTooltip
                                card={card}
                                item="GPIOLEDDrvGPIOPolarity"
                            >
                                <span>Polarity</span>
                            </DocumentationTooltip>
                        }
                        onSelect={item => module.set.gpioPolarity(item.value)}
                        selectedItem={
                            module.values.gpioPolarity.find(
                                item => item.value === config.gpioPolarity,
                            ) ?? module.values.gpioPolarity[0]
                        }
                    />
                    <Dropdown
                        disabled={config.gpioState === 'Output' || disabled}
                        items={module.values.gpioPull}
                        label={
                            <DocumentationTooltip
                                card={card}
                                item="GPIOLEDDrvGPIOPull"
                            >
                                <span>Pull</span>
                            </DocumentationTooltip>
                        }
                        onSelect={item => module.set.gpioPull(item.value)}
                        selectedItem={
                            module.values.gpioPull.find(
                                item => item.value === config.gpioPull,
                            ) ?? module.values.gpioPull[0]
                        }
                    />
                    <Dropdown
                        disabled={config.gpioState === 'Input' || disabled}
                        label={
                            <DocumentationTooltip
                                card={card}
                                item="GPIOLEDDrvGPIODrive"
                            >
                                <span>Drive</span>
                            </DocumentationTooltip>
                        }
                        items={module.values.gpioDrive}
                        onSelect={item => module.set.gpioDrive(item.value)}
                        selectedItem={
                            module.values.gpioDrive.find(
                                item => item.value === config.gpioDrive,
                            ) ?? module.values.gpioDrive[0]
                        }
                    />
                    <Toggle
                        disabled={config.gpioState === 'Input' || disabled}
                        isToggled={config.gpioOpenDrain === true}
                        label={
                            <DocumentationTooltip
                                card={card}
                                item="GPIOLEDDrvGPIOOpenDrain"
                            >
                                <span>Enable Open Drain</span>
                            </DocumentationTooltip>
                        }
                        onToggle={value => module.set.gpioOpenDrain(value)}
                    />
                    <Toggle
                        disabled={config.gpioState === 'Output' || disabled}
                        isToggled={config.gpioDebounce === true}
                        label={
                            <DocumentationTooltip
                                card={card}
                                item="GPIOLEDDrvGPIODebounce"
                            >
                                <span>Enable Debounce</span>
                            </DocumentationTooltip>
                        }
                        onToggle={value => module.set.gpioDebounce(value)}
                    />
                    <NumberInput
                        disabled={
                            config.gpioState === 'Input' ||
                            config.gpioMode !== 'PWM' ||
                            disabled
                        }
                        label={
                            <DocumentationTooltip
                                card={card}
                                item="GPIOLEDDrvGPIODutyCycle"
                            >
                                <span>PWM Duty Cycle</span>
                            </DocumentationTooltip>
                        }
                        onChange={setInternalGpioDutyCycle}
                        onChangeComplete={v => module.set.gpioDutyCycle(v)}
                        range={module.ranges.gpioDutyCycle}
                        showSlider
                        value={internalGpioDutyCycle}
                    />
                </>
            )}
            {config.state === 'LED' && (
                <>
                    <Dropdown
                        disabled={disabled}
                        items={module.values.ledMode}
                        label={
                            <DocumentationTooltip
                                card={card}
                                item="GPIOLEDDrvLEDMode"
                            >
                                <span>Mode</span>
                            </DocumentationTooltip>
                        }
                        onSelect={item => module.set.ledMode(item.value)}
                        selectedItem={
                            module.values.ledMode.find(
                                item => item.value === config.ledMode,
                            ) ?? module.values.ledMode[0]
                        }
                    />
                    <Dropdown
                        disabled={disabled}
                        items={module.values.ledDrive}
                        label={
                            <DocumentationTooltip
                                card={card}
                                item="GPIOLEDDrvLEDDrive"
                            >
                                <span>Drive</span>
                            </DocumentationTooltip>
                        }
                        onSelect={item => module.set.ledDrive(item.value)}
                        selectedItem={
                            module.values.ledDrive.find(
                                item => item.value === config.ledDrive,
                            ) ?? module.values.ledDrive[0]
                        }
                    />
                    <NumberInput
                        disabled={config.ledMode !== 'PWM' || disabled}
                        label={
                            <DocumentationTooltip
                                card={card}
                                item="GPIOLEDDrvLEDDutyCycle"
                            >
                                <span>PWM Duty Cycle</span>
                            </DocumentationTooltip>
                        }
                        onChange={setInternalLedDutyCycle}
                        onChangeComplete={v => module.set.ledDutyCycle(v)}
                        range={module.ranges.ledDutyCycle}
                        showSlider
                        value={internalLedDutyCycle}
                    />
                </>
            )}
        </Card>
    );
};
