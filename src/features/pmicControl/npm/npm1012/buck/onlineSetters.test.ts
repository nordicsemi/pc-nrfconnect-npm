/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { helpers } from '../../tests/helpers';
import { BuckModeControl, PmicDialog } from '../../types';
import { PMIC_1012_BUCKS, setupMocksWithShellParser } from '../tests/helpers';

describe('PMIC 1012 - Setters Online tests', () => {
    const { mockDialogHandler, mockOnBuckUpdate, mockEnqueueRequest, pmic } =
        setupMocksWithShellParser();
    describe('Setters and effects state - success', () => {
        beforeEach(() => {
            jest.clearAllMocks();

            mockEnqueueRequest.mockImplementation(
                helpers.registerCommandCallbackSuccess,
            );
        });

        test.each(PMIC_1012_BUCKS)('Set buckVOut index: %p', async index => {
            await pmic.buckModule[index].set.vOutNormal(1.85);

            expect(mockEnqueueRequest).toBeCalledTimes(3);
            expect(mockEnqueueRequest).nthCalledWith(
                1,
                `npm1012 buck vout software set 0 1.85`,
                expect.anything(),
                undefined,
                true,
            );
            expect(mockEnqueueRequest).nthCalledWith(
                2,
                `npm1012 buck voutselctrl set SOFTWARE`,
                expect.anything(),
                undefined,
                true,
            );
            expect(mockEnqueueRequest).nthCalledWith(
                3,
                `npm1012 buck enablectrl set SOFTWARE`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnBuckUpdate).toBeCalledTimes(0); // Updates should only be emitted when we get response
        });

        test.each(PMIC_1012_BUCKS)(
            'Set buckVOut index with warning dialog - cancel: %p',
            async index => {
                mockDialogHandler.mockImplementationOnce(
                    (dialog: PmicDialog) => {
                        dialog.onCancel?.();
                    },
                );

                await expect(
                    pmic.buckModule[index].set.vOutNormal(1.6),
                ).rejects.toBeUndefined();

                expect(mockDialogHandler).toBeCalledTimes(1);

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).nthCalledWith(
                    1,
                    `npm1012 buck vout software get 0`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckVOut index with warning dialog - confirm: %p',
            async index => {
                mockDialogHandler.mockImplementationOnce(
                    (dialog: PmicDialog) => {
                        dialog.onConfirm();
                    },
                );

                await pmic.buckModule[index].set.vOutNormal(1.6);

                expect(mockEnqueueRequest).toBeCalledTimes(3);
                expect(mockEnqueueRequest).nthCalledWith(
                    1,
                    `npm1012 buck vout software set 0 1.6`,
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 buck voutselctrl set SOFTWARE`,
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    3,
                    `npm1012 buck enablectrl set SOFTWARE`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckAlternateVOut index: %p',
            async index => {
                await pmic.buckModule[index].set.alternateVOut?.(1.85);

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 buck vout software set 1 1.85`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)('Set buckMode - vSet', async index => {
            await pmic.buckModule[index].set.mode('vSet');

            expect(mockEnqueueRequest).toBeCalledTimes(2);
            expect(mockEnqueueRequest).nthCalledWith(
                1,
                `npm1012 buck voutselctrl set VSET`,
                expect.anything(),
                undefined,
                true,
            );
            expect(mockEnqueueRequest).nthCalledWith(
                2,
                `npm1012 buck enablectrl set VSET`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnBuckUpdate).toBeCalledTimes(0);
        });

        test.each(PMIC_1012_BUCKS)(
            'Set buckModeControl index: %p',
            async index => {
                await pmic.buckModule[index].set.modeControl('LP');

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 buck pwrmode set LP`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckOnOffControl index: %p',
            async index => {
                await pmic.buckModule[index].set.onOffControl('Software');

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 buck enablectrl set SOFTWARE`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)('Set buckEnabled index: %p', async index => {
            await pmic.buckModule[index].set.enabled(true);

            expect(mockEnqueueRequest).toBeCalledTimes(3);
            expect(mockEnqueueRequest).nthCalledWith(
                1,
                `npm1012 buck voutselctrl set SOFTWARE`,
                expect.anything(),
                undefined,
                true,
            );
            expect(mockEnqueueRequest).nthCalledWith(
                2,
                `npm1012 buck enablectrl set SOFTWARE`,
                expect.anything(),
                undefined,
                true,
            );
            expect(mockEnqueueRequest).nthCalledWith(
                3,
                `npm1012 buck enable set on`,
                expect.anything(),
                undefined,
                true,
            );

            expect(mockOnBuckUpdate).toBeCalledTimes(0);
        });

        test.each(PMIC_1012_BUCKS)(
            'Set buckEnabled index: %p false - with dialog cancel',
            async index => {
                mockDialogHandler.mockImplementationOnce(
                    (dialog: PmicDialog) => {
                        dialog.onCancel?.();
                    },
                );

                await expect(
                    pmic.buckModule[index].set.enabled(false),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(0);

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckEnabled index: %p false - with dialog confirm',
            async index => {
                mockDialogHandler.mockImplementationOnce(
                    (dialog: PmicDialog) => {
                        dialog.onConfirm?.();
                    },
                );

                await pmic.buckModule[index].set.enabled(false);

                expect(mockEnqueueRequest).toBeCalledTimes(3);
                expect(mockEnqueueRequest).nthCalledWith(
                    1,
                    `npm1012 buck voutselctrl set SOFTWARE`,
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 buck enablectrl set SOFTWARE`,
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    3,
                    `npm1012 buck enable set off`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckActiveDischargeResistance index: %p',
            async index => {
                await pmic.buckModule[index].set.activeDischargeResistance?.(
                    250,
                );

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 buck pulldown set 250Ohm`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckActiveDischargeResistance index: %p - off',
            async index => {
                await pmic.buckModule[index].set.activeDischargeResistance?.(0);

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 buck pulldown set off`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckAlternateVOutControl index: %p',
            async index => {
                await pmic.buckModule[index].set.alternateVOutControl?.(
                    'Software',
                );

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 buck voutsel set VOUT2`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckAutomaticPassthrough index: %p',
            async index => {
                await pmic.buckModule[index].set.automaticPassthrough?.(true);

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 buck passthrough set on`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckQuickVOutDischarge index: %p',
            async index => {
                await pmic.buckModule[index].set.quickVOutDischarge?.(true);

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 buck autopull set on`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckPeakCurrentLimit index: %p',
            async index => {
                await pmic.buckModule[index].set.peakCurrentLimit?.(142);

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 buck peakilim set 142mA`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckShortCircuitProtection index: %p',
            async index => {
                await pmic.buckModule[index].set.shortCircuitProtection?.(true);

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 buck scprotect set on`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckSoftStartPeakCurrentLimit index: %p',
            async index => {
                await pmic.buckModule[index].set.softStartPeakCurrentLimit?.(
                    142,
                );

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 buck softstartilim set 142mA`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(
            PMIC_1012_BUCKS.map(index => [
                {
                    index,
                    mode: 'LP',
                    value: 1.4,
                },
                {
                    index,
                    mode: 'ULP',
                    value: 28,
                },
            ]).flat(),
        )(
            'Set vOutComparatorBiasCurrent %p',
            async ({ index, mode, value }) => {
                await pmic.buckModule[index].set.vOutComparatorBiasCurrent?.(
                    mode as BuckModeControl,
                    value,
                );

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 buck bias ${mode.toLowerCase()} set ${value}${mode === 'LP' ? 'uA' : 'nA'}`,
                    expect.anything(),
                    undefined,
                    true,
                );
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckVOutRippleControl index: %p',
            async index => {
                await pmic.buckModule[index].set.vOutRippleControl?.('Low');

                expect(mockEnqueueRequest).toBeCalledTimes(1);
                expect(mockEnqueueRequest).toBeCalledWith(
                    `npm1012 buck ripple set Low`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );
    });

    describe('Setters and effects state - error', () => {
        beforeEach(() => {
            jest.clearAllMocks();

            mockEnqueueRequest.mockImplementation(
                helpers.registerCommandCallbackError,
            );
        });

        test.each(PMIC_1012_BUCKS)(
            'Set buckVOut - Fail immediately - index: %p',
            async index => {
                await expect(
                    pmic.buckModule[index].set.vOutNormal(1.85),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).nthCalledWith(
                    1,
                    `npm1012 buck vout software set 0 1.85`,
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 buck vout software get 0`, // Request update on error
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckAlternateVOut - Fail immediately - index: %p',
            async index => {
                await expect(
                    pmic.buckModule[index].set.alternateVOut?.(1.85),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).nthCalledWith(
                    1,
                    `npm1012 buck vout software set 1 1.85`,
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 buck vout software get 1`, // Request update on error
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckMode - Fail immediately - vSet',
            async index => {
                await expect(
                    pmic.buckModule[index].set.mode('vSet'),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).nthCalledWith(
                    1,
                    `npm1012 buck voutselctrl set VSET`,
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 buck voutselctrl get`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckModeControl - Fail immediately - index: %p',
            async index => {
                await expect(
                    pmic.buckModule[index].set.modeControl('GPIO'),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).nthCalledWith(
                    1,
                    `npm1012 buck pwrmode set GPIO`,
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 buck pwrmode get`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckOnOffControl - Fail immediately - index: %p',
            async index => {
                await expect(
                    pmic.buckModule[index].set.onOffControl('GPIO'),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(2);
                expect(mockEnqueueRequest).nthCalledWith(
                    1,
                    `npm1012 buck enablectrl set GPIO`,
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 buck enablectrl get`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );

        test.each(PMIC_1012_BUCKS)(
            'Set buckEnabled - Fail immediately - index: %p',
            async index => {
                await expect(
                    pmic.buckModule[index].set.enabled(true),
                ).rejects.toBeUndefined();

                expect(mockEnqueueRequest).toBeCalledTimes(3);
                expect(mockEnqueueRequest).nthCalledWith(
                    1,
                    `npm1012 buck voutselctrl set SOFTWARE`,
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    2,
                    `npm1012 buck voutselctrl get`,
                    expect.anything(),
                    undefined,
                    true,
                );
                expect(mockEnqueueRequest).nthCalledWith(
                    3,
                    `npm1012 buck enable get`,
                    expect.anything(),
                    undefined,
                    true,
                );

                expect(mockOnBuckUpdate).toBeCalledTimes(0);
            },
        );
    });
});

export {};
