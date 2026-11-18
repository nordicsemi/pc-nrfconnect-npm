/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { PMIC_1210_BUCKS, setupMocksWithShellParser } from '../tests/helpers';
import {
    modeControlKeys,
    pullDownResKeys,
    vOutCompBiasLPModeKeys,
    vOutCompBiasULPModeKeys,
    vOutRippleControlKeys,
} from './types';

describe('PMIC 1210 - Command callbacks', () => {
    const { eventHandlers, mockOnBuckUpdate } = setupMocksWithShellParser();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each(
        PMIC_1210_BUCKS.map(index => [
            {
                index,
                append: `get 0`,
            },
            {
                index,
                append: `set 0 2.35V`,
            },
        ]).flat(),
    )(`npm12xx buck software %p`, ({ index, append }) => {
        const command = `npm12xx buck vout software ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess('Value: 2.35V', command);

        expect(mockOnBuckUpdate).toBeCalledTimes(1);
        expect(mockOnBuckUpdate).toBeCalledWith({
            data: { vOutNormal: 2.35 },
            index,
        });
    });

    test.each(
        PMIC_1210_BUCKS.map(index => [
            {
                index,
                append: `get 1`,
            },
            {
                index,
                append: `set 1 2.35V`,
            },
        ]).flat(),
    )(`npm12xx buck software %p`, ({ index, append }) => {
        const command = `npm12xx buck vout software ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess('Value: 2.35V', command);

        expect(mockOnBuckUpdate).toBeCalledTimes(1);
        expect(mockOnBuckUpdate).toBeCalledWith({
            data: { alternateVOut: 2.35 },
            index,
        });
    });

    test.each(
        PMIC_1210_BUCKS.map(index => [
            {
                index,
                append: `get`,
            },
            {
                index,
                append: `set VOUT2`,
            },
        ]).flat(),
    )(`npm12xx buck voutsel %p`, ({ index, append }) => {
        const command = `npm12xx buck voutsel ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: VOUT2`, command);

        expect(mockOnBuckUpdate).toBeCalledTimes(1);
        expect(mockOnBuckUpdate).toBeCalledWith({
            data: { alternateVOutControl: 'SOFTWARE' },
            index,
        });
    });

    test.each(
        PMIC_1210_BUCKS.map(index => [
            {
                index,
                append: `get`,
            },
            {
                index,
                append: `set software`,
            },
        ]).flat(),
    )(`npm12xx buck voutselctrl %p`, ({ index, append }) => {
        const command = `npm12xx buck voutselctrl ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: SOFTWARE`, command);

        expect(mockOnBuckUpdate).toBeCalledTimes(1);
        expect(mockOnBuckUpdate).toBeCalledWith({
            data: { mode: 'software' },
            index,
        });
    });

    test.each(
        PMIC_1210_BUCKS.map(index => [
            {
                index,
                append: `get`,
            },
            {
                index,
                append: `set ON`,
            },
        ]).flat(),
    )(`npm12xx buck enable %p`, ({ index, append }) => {
        const command = `npm12xx buck enable ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ON`, command);

        expect(mockOnBuckUpdate).toBeCalledTimes(1);
        expect(mockOnBuckUpdate).toBeCalledWith({
            data: { enabled: true },
            index,
        });
    });

    test.each(
        PMIC_1210_BUCKS.map(index => [
            {
                index,
                append: `get`,
            },
            {
                index,
                append: `set SOFTWARE`,
            },
        ]).flat(),
    )(`npm12xx buck enablectrl %p`, ({ index, append }) => {
        const command = `npm12xx buck enablectrl ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: SOFTWARE`, command);

        expect(mockOnBuckUpdate).toBeCalledTimes(1);
        expect(mockOnBuckUpdate).toBeCalledWith({
            data: { onOffControl: 'SOFTWARE' },
            index,
        });
    });

    test.each(
        PMIC_1210_BUCKS.map(index =>
            modeControlKeys
                .map(value =>
                    [
                        {
                            index,
                            append: `get`,
                            value,
                        },
                        {
                            index,
                            append: `set ${value}`,
                            value,
                        },
                    ].flat(),
                )
                .flat(),
        ).flat(),
    )(`npm12xx buck pwrmode %p`, ({ index, append, value }) => {
        const command = `npm12xx buck pwrmode ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnBuckUpdate).toBeCalledTimes(1);
        expect(mockOnBuckUpdate).toBeCalledWith({
            data: {
                modeControl: value,
            },
            index,
        });
    });

    test.each(
        PMIC_1210_BUCKS.map(index =>
            pullDownResKeys.map(key =>
                [
                    {
                        index,
                        append: `get`,
                        value: key,
                    },
                    {
                        index,
                        append: `set ${key}`,
                        value: key,
                    },
                ].flat(),
            ),
        ).flat(),
    )(`npm12xx buck pulldown %p`, ({ index, append, value }) => {
        const command = `npm12xx buck pulldown ${append}`;

        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnBuckUpdate).toBeCalledTimes(1);
        expect(mockOnBuckUpdate).toBeCalledWith({
            data: {
                activeDischargeResistance: value,
            },
            index,
        });
    });

    test.each(
        PMIC_1210_BUCKS.map(index => [
            {
                index,
                append: `get`,
            },
            {
                index,
                append: `set ON`,
            },
        ]).flat(),
    )(`npm12xx buck passthrough %p`, ({ index, append }) => {
        const command = `npm12xx buck passthrough ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess('Value: ON', command);

        expect(mockOnBuckUpdate).toBeCalledTimes(1);
        expect(mockOnBuckUpdate).toBeCalledWith({
            data: { automaticPassthrough: true },
            index,
        });
    });

    test.each(
        PMIC_1210_BUCKS.map(index => [
            {
                index,
                append: `get`,
            },
            {
                index,
                append: `set 150mA`,
            },
        ]).flat(),
    )(`npm12xx buck peakilim %p`, ({ index, append }) => {
        const command = `npm12xx buck peakilim ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess('Value: 150mA', command);

        expect(mockOnBuckUpdate).toBeCalledTimes(1);
        expect(mockOnBuckUpdate).toBeCalledWith({
            data: { peakCurrentLimit: '150mA' },
            index,
        });
    });

    test.each(
        PMIC_1210_BUCKS.map(index => [
            {
                index,
                append: `get`,
            },
            {
                index,
                append: `set ON`,
            },
        ]).flat(),
    )(`npm12xx buck autopull %p`, ({ index, append }) => {
        const command = `npm12xx buck autopull ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess('Value: ON', command);

        expect(mockOnBuckUpdate).toBeCalledTimes(1);
        expect(mockOnBuckUpdate).toBeCalledWith({
            data: { quickVOutDischarge: true },
            index,
        });
    });

    test.each(
        PMIC_1210_BUCKS.map(index => [
            {
                index,
                append: `get`,
            },
            {
                index,
                append: `set ON`,
            },
        ]).flat(),
    )(`npm12xx buck scprotect %p`, ({ index, append }) => {
        const command = `npm12xx buck scprotect ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess('Value: ON', command);

        expect(mockOnBuckUpdate).toBeCalledTimes(1);
        expect(mockOnBuckUpdate).toBeCalledWith({
            data: { shortCircuitProtection: true },
            index,
        });
    });

    test.each(
        PMIC_1210_BUCKS.map(index => [
            {
                index,
                append: `get`,
            },
            {
                index,
                append: `set 150mA`,
            },
        ]).flat(),
    )(`npm12xx buck softstartilim %p`, ({ index, append }) => {
        const command = `npm12xx buck softstartilim ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess('Value: 150mA', command);

        expect(mockOnBuckUpdate).toBeCalledTimes(1);
        expect(mockOnBuckUpdate).toBeCalledWith({
            data: { softStartPeakCurrentLimit: '150mA' },
            index,
        });
    });

    test.each(
        PMIC_1210_BUCKS.map(index =>
            vOutCompBiasLPModeKeys.map(key =>
                [
                    {
                        index,
                        append: `get`,
                        value: key,
                    },
                    {
                        index,
                        append: `set ${key}`,
                        value: key,
                    },
                ].flat(),
            ),
        ).flat(),
    )(`npm12xx buck bias lp %p`, ({ index, append, value }) => {
        const command = `npm12xx buck bias lp ${append}`;

        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnBuckUpdate).toBeCalledTimes(1);
        expect(mockOnBuckUpdate).toBeCalledWith({
            data: {
                vOutComparatorBiasCurrentLPMode: value,
            },
            index,
        });
    });

    test.each(
        PMIC_1210_BUCKS.map(index =>
            vOutCompBiasULPModeKeys.map(key =>
                [
                    {
                        index,
                        append: `get`,
                        value: key,
                    },
                    {
                        index,
                        append: `set ${key}`,
                        value: key,
                    },
                ].flat(),
            ),
        ).flat(),
    )(`npm12xx buck bias ulp %p`, ({ index, append, value }) => {
        const command = `npm12xx buck bias ulp ${append}`;

        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnBuckUpdate).toBeCalledTimes(1);
        expect(mockOnBuckUpdate).toBeCalledWith({
            data: {
                vOutComparatorBiasCurrentULPMode: value,
            },
            index,
        });
    });

    test.each(
        PMIC_1210_BUCKS.map(index =>
            vOutRippleControlKeys
                .map(value =>
                    [
                        {
                            index,
                            append: `get`,
                            value,
                        },
                        {
                            index,
                            append: `set ${value}`,
                            value,
                        },
                    ].flat(),
                )
                .flat(),
        ).flat(),
    )(`npm12xx buck ripple %p`, ({ index, append, value }) => {
        const command = `npm12xx buck ripple ${append}`;
        const callback =
            eventHandlers.mockRegisterCommandCallbackHandler(command);

        callback?.onSuccess(`Value: ${value}`, command);

        expect(mockOnBuckUpdate).toBeCalledTimes(1);
        expect(mockOnBuckUpdate).toBeCalledWith({
            data: {
                vOutRippleControl: value,
            },
            index,
        });
    });
});

export {};
