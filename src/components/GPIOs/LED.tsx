/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Dropdown,
    NumberInput,
    Toggle,
} from '@nordicsemiconductor/pc-nrfconnect-shared';

import { DocumentationTooltip } from '../../features/pmicControl/npm/documentation/documentation';
import { type LED, type LedModule } from '../../features/pmicControl/npm/types';

interface LEDProperties {
    ledModule: LedModule;
    led: LED;
    disabled: boolean;
}

export default ({ ledModule, led, disabled }: LEDProperties) => {
    const card = `led${ledModule.index}`;

    const [internalBlinkTimeOff, setInternalBlinkTimeOff] = useState(
        led.blinkTimeOff,
    );
    const [internalBlinkTimeOn, setInternalBlinkTimeOn] = useState(
        led.blinkTimeOn,
    );
    const [internalDutyCycle, setInternalDutyCycle] = useState(led.dutyCycle);

    // NumberInputSliderWithUnit do not use led.<prop> as value as we send only at on change complete
    useEffect(() => {
        setInternalBlinkTimeOff(led.blinkTimeOff);
        setInternalBlinkTimeOn(led.blinkTimeOn);
        setInternalDutyCycle(led.dutyCycle);
    }, [led.blinkTimeOff, led.blinkTimeOn, led.dutyCycle]);

    return (
        <Card
            title={
                <div className="tw-flex tw-justify-between">
                    <span>{led.cardLabel}</span>
                </div>
            }
        >
            {ledModule.values.mode && (
                <Dropdown
                    label={
                        <DocumentationTooltip card={card} item="LEDMode">
                            <span>Mode</span>
                        </DocumentationTooltip>
                    }
                    items={ledModule.values.mode}
                    onSelect={item => ledModule.set.mode?.(item.value)}
                    selectedItem={
                        ledModule.values.mode.find(
                            item => item.value === led.mode,
                        ) ?? ledModule.values.mode[0]
                    }
                    disabled={disabled}
                />
            )}
            {ledModule.values.drive && (
                <Dropdown
                    disabled={disabled}
                    items={ledModule.values.drive}
                    label={
                        <DocumentationTooltip card={card} item="LEDDrive">
                            <span>Drive</span>
                        </DocumentationTooltip>
                    }
                    onSelect={item => ledModule.set.drive?.(item.value)}
                    selectedItem={
                        ledModule.values.drive.find(
                            item => item.value === led.drive,
                        ) ?? ledModule.values.drive[0]
                    }
                />
            )}
            {internalDutyCycle !== undefined && ledModule.ranges.dutyCycle && (
                <NumberInput
                    disabled={disabled}
                    label={
                        <DocumentationTooltip card={card} item="LEDDutyCycle">
                            <span>Duty Cycle</span>
                        </DocumentationTooltip>
                    }
                    onChange={setInternalDutyCycle}
                    onChangeComplete={v => ledModule.set.dutyCycle?.(v)}
                    range={ledModule.ranges.dutyCycle}
                    showSlider
                    unit="ms"
                    value={internalDutyCycle}
                />
            )}
            {ledModule.values.pwmFrequency && (
                <Dropdown
                    label={
                        <DocumentationTooltip
                            card={card}
                            item="LEDPWMFrequency"
                        >
                            <span>PWM Frequency</span>
                        </DocumentationTooltip>
                    }
                    items={ledModule.values.pwmFrequency}
                    onSelect={item => ledModule.set.pwmFrequency?.(item.value)}
                    selectedItem={
                        ledModule.values.pwmFrequency.find(
                            item => item.value === led.pwmFrequency,
                        ) ?? ledModule.values.pwmFrequency[0]
                    }
                    disabled={disabled}
                />
            )}
            {led.rgbPhaseShifting !== undefined && (
                <Toggle
                    label={
                        <DocumentationTooltip
                            card={card}
                            item="LEDRGBPhaseShifting"
                        >
                            <span>Enable RGB Phase Shifting</span>
                        </DocumentationTooltip>
                    }
                    isToggled={led.rgbPhaseShifting === true}
                    onToggle={value => ledModule.set.rgbPhaseShifting?.(value)}
                    disabled={disabled}
                />
            )}
            {led.blinkContinuous !== undefined && (
                <Toggle
                    label={
                        <DocumentationTooltip
                            card={card}
                            item="LEDBlinkContinuous"
                        >
                            <span>Enable Continuous LED Blinking Loop</span>
                        </DocumentationTooltip>
                    }
                    isToggled={led.blinkContinuous === true}
                    onToggle={value => ledModule.set.blinkContinuous?.(value)}
                    disabled={disabled}
                />
            )}
            {led.blinkDouble !== undefined && (
                <Toggle
                    label={
                        <DocumentationTooltip card={card} item="LEDBlinkDouble">
                            <span>Enable Double Blink</span>
                        </DocumentationTooltip>
                    }
                    isToggled={led.blinkDouble === true}
                    onToggle={value => ledModule.set.blinkDouble?.(value)}
                    disabled={disabled}
                />
            )}
            {internalBlinkTimeOn !== undefined &&
                ledModule.ranges.blinkTime && (
                    <NumberInput
                        label={
                            <DocumentationTooltip
                                card={card}
                                item="LEDBlinkTimeOn"
                            >
                                <span>LED On Time</span>
                            </DocumentationTooltip>
                        }
                        unit="ms"
                        disabled={disabled}
                        range={ledModule.ranges.blinkTime}
                        value={internalBlinkTimeOn}
                        onChange={setInternalBlinkTimeOn}
                        onChangeComplete={v => ledModule.set.blinkTimeOn?.(v)}
                        showSlider
                    />
                )}
            {internalBlinkTimeOff !== undefined &&
                ledModule.ranges.blinkTime && (
                    <NumberInput
                        label={
                            <DocumentationTooltip
                                card={card}
                                item="LEDBlinkTimeOff"
                            >
                                <span>LED Off Time</span>
                            </DocumentationTooltip>
                        }
                        unit="ms"
                        disabled={disabled}
                        range={ledModule.ranges.blinkTime}
                        value={internalBlinkTimeOff}
                        onChange={setInternalBlinkTimeOff}
                        onChangeComplete={v => ledModule.set.blinkTimeOff?.(v)}
                        showSlider
                    />
                )}
            {led.blinkActionEnabled && (
                <Button
                    variant="secondary"
                    className="tw-w-full"
                    onClick={() => {
                        ledModule.actions.blink?.();
                    }}
                    disabled={disabled}
                >
                    Blink LED(s)
                </Button>
            )}
        </Card>
    );
};
