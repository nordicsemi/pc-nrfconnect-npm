/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type LdoSetExtraArgs } from '../../types';
import { PMIC_1012_LDOS, setupMocksBase } from '../tests/helpers';

// UI should get update events immediately and not wait for feedback from shell responses when offline as there is no shell
describe('PMIC 1012 - Setters Offline tests', () => {
    const { mockOnLdoUpdate, pmic } = setupMocksBase();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const extraArgs: LdoSetExtraArgs = {
        currState: {
            mode: 'LDO',
            onOffControl: 'Software',
            vOutSel: 'Software',
        },
    };

    test.each(PMIC_1012_LDOS)('Set ldoVoltage index: %p', async index => {
        const res = pmic.ldoModule[index].set.voltage?.(1.2, extraArgs);

        // Disabled for Load Switch 2
        if (index === 1) {
            await expect(res).rejects.toBeUndefined();
            expect(mockOnLdoUpdate).toBeCalledTimes(0);
            return;
        }

        await res;
        expect(mockOnLdoUpdate).toBeCalledTimes(1);
        expect(mockOnLdoUpdate).nthCalledWith(1, {
            data: {
                mode: 'LDO',
                onOffControl: 'Software',
                vOutSel: 'Software',
                voltage: 1.2,
            },
            index,
        });
    });

    test.each(PMIC_1012_LDOS)('Set ldoEnabled index: %p', async index => {
        await pmic.ldoModule[index].set.enabled(false, extraArgs);

        expect(mockOnLdoUpdate).toBeCalledTimes(1);
        expect(mockOnLdoUpdate).toBeCalledWith({
            data: {
                enabled: false,
                onOffControl: 'Software',
                vOutSel: 'Software',
            },
            index,
        });
    });

    test.each(PMIC_1012_LDOS)('Set ldoSoftStart index: %p', async index => {
        await pmic.ldoModule[index].set.softStart?.(true);

        expect(mockOnLdoUpdate).toBeCalledTimes(1);
        expect(mockOnLdoUpdate).toBeCalledWith({
            data: { softStart: true },
            index,
        });
    });

    test.each(PMIC_1012_LDOS)(
        'Set ldoSoftStartCurrentLimit index: %p',
        async index => {
            await pmic.ldoModule[index].set.softStartCurrent?.('10mA');

            expect(mockOnLdoUpdate).toBeCalledTimes(1);
            expect(mockOnLdoUpdate).toBeCalledWith({
                data: { softStartCurrent: '10mA' },
                index,
            });
        },
    );

    test.each(PMIC_1012_LDOS)('Set ldoSoftStartTime index: %p', async index => {
        await pmic.ldoModule[index].set.softStartTime?.('4.5ms');

        expect(mockOnLdoUpdate).toBeCalledTimes(1);
        expect(mockOnLdoUpdate).toBeCalledWith({
            data: { softStartTime: '4.5ms' },
            index,
        });
    });

    test.each(PMIC_1012_LDOS)(
        'Set ldoActiveDischarge index: %p',
        async index => {
            await pmic.ldoModule[index].set.activeDischarge?.(true);

            expect(mockOnLdoUpdate).toBeCalledTimes(1);
            expect(mockOnLdoUpdate).toBeCalledWith({
                data: { activeDischarge: true },
                index,
            });
        },
    );

    test.each(PMIC_1012_LDOS)(
        'Set ldoOvercurrentProtection index: %p',
        async index => {
            await pmic.ldoModule[index].set.overcurrentProtection?.(true);

            expect(mockOnLdoUpdate).toBeCalledTimes(1);
            expect(mockOnLdoUpdate).toBeCalledWith({
                data: { overcurrentProtection: true },
                index,
            });
        },
    );

    test.each(PMIC_1012_LDOS)('Set ldoOnOffControl index: %p', async index => {
        await pmic.ldoModule[index].set.onOffControl?.('Software');

        expect(mockOnLdoUpdate).toBeCalledTimes(1);
        expect(mockOnLdoUpdate).toBeCalledWith({
            data: {
                onOffControl: 'Software',
            },
            index,
        });
    });

    test.each(PMIC_1012_LDOS)('Set ldoVOutSel index: %p', async index => {
        const res = pmic.ldoModule[index].set.vOutSel?.('Software', extraArgs);

        // Disabled for Load Switch 2
        if (index === 1) {
            await expect(res).rejects.toBeUndefined();
            expect(mockOnLdoUpdate).toBeCalledTimes(0);
            return;
        }

        await res;
        expect(mockOnLdoUpdate).toBeCalledTimes(1);
        expect(mockOnLdoUpdate).toBeCalledWith({
            data: { onOffControl: 'Software', vOutSel: 'Software' },
            index,
        });
    });

    test.each(PMIC_1012_LDOS)('Set ldoWeakPullDown index: %p', async index => {
        await pmic.ldoModule[index].set.weakPullDown?.(true);

        // Disabled for Load Switch 2
        if (index === 1) {
            expect(mockOnLdoUpdate).toBeCalledTimes(0);
            return;
        }

        expect(mockOnLdoUpdate).toBeCalledTimes(1);
        expect(mockOnLdoUpdate).toBeCalledWith({
            data: { weakPullDown: true },
            index,
        });
    });
});

export {};
