/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { GPIOLEDDrv, GpioLedDrvModule, ModuleParams } from '../../types';
import gpioCallbacks from './callbacks';
import { GpioLedDrvGet } from './getters';
import { GpioLedDrvSet } from './setters';
import {
    gpioDriveKeys,
    gpioDriveValues,
    gpioModeInputKeys,
    gpioModeInputValues,
    gpioModeOutputKeys,
    gpioModeOutputValues,
    gpioPolarityKeys,
    gpioPolarityValues,
    gpioPullKeys,
    gpioPullValues,
    ledDriveKeys,
    ledDriveValues,
    ledModeKeys,
    ledModeValues,
} from './types';

const dutyCycleRange = {
    decimals: 0,
    max: 255,
    min: 0,
    step: 1,
};

/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

export default class Module implements GpioLedDrvModule {
    readonly index: number;
    private _get: GpioLedDrvGet;
    private _set: GpioLedDrvSet;
    private _callbacks: (() => void)[];

    constructor({
        index,
        sendCommand,
        eventEmitter,
        offlineMode,
        shellParser,
    }: ModuleParams) {
        this.index = index;
        this._get = new GpioLedDrvGet(sendCommand, index);
        this._set = new GpioLedDrvSet(
            eventEmitter,
            sendCommand,
            offlineMode,
            index,
        );
        this._callbacks = gpioCallbacks(shellParser, eventEmitter, index);
    }

    get callbacks() {
        return this._callbacks;
    }

    get defaults(): GPIOLEDDrv {
        return {
            state: 'GPIO',

            gpioDebounce: false,
            gpioDrive: 'NORMAL',
            gpioDutyCycle: 1,
            gpioMode: 'GPIO_IN',
            gpioOpenDrain: false,
            gpioPolarity: 'ACTIVELOW',
            gpioPull: 'PULLDOWN',
            gpioState: 'Input',

            ledDrive: '5mA',
            ledDutyCycle: 1,
            ledMode: 'OFF',
        };
    }

    get get() {
        return this._get;
    }

    get ranges() {
        return {
            gpioDutyCycle: dutyCycleRange,
            ledDutyCycle: dutyCycleRange,
        };
    }

    get set() {
        return this._set;
    }

    get values(): GpioLedDrvModule['values'] {
        const inputModeValues = gpioModeInputKeys.map((item, i) => ({
            label: gpioModeInputValues[i],
            value: item,
        }));
        const outputModeValues = gpioModeOutputKeys.map((item, i) => ({
            label: gpioModeOutputValues[i],
            value: item,
        }));

        return {
            gpioMode: state =>
                state === 'Input' ? inputModeValues : outputModeValues,
            gpioDrive: gpioDriveKeys.map((item, i) => ({
                label: gpioDriveValues[i],
                value: item,
            })),
            gpioPolarity: gpioPolarityKeys.map((item, i) => ({
                label: gpioPolarityValues[i],
                value: item,
            })),
            gpioPull: gpioPullKeys.map((item, i) => ({
                label: gpioPullValues[i],
                value: item,
            })),

            ledDrive: ledDriveKeys.map((item, i) => ({
                label: ledDriveValues[i],
                value: item,
            })),
            ledMode: ledModeKeys.map((item, i) => ({
                label: ledModeValues[i],
                value: item,
            })),
        };
    }
}
