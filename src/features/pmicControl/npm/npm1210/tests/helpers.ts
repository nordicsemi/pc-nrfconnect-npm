/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ShellParser } from '@nordicsemiconductor/pc-nrfconnect-shared';

import {
    setupMocksBase as GenericsetupMocksBase,
    setupMocksWithShellParser as GenericSetupMocksWithShellParser,
} from '../../tests/helpers';
import { type PmicDialog } from '../../types';
import Npm1210 from '../pmic1210Device';

export const PMIC_1210_BUCKS = [0];
export const PMIC_1210_GPIOS = [0, 1, 2, 3, 4];
export const PMIC_1210_LEDS = [0, 1, 2];

export const setupMocksBase = (
    shellParser: ShellParser | undefined = undefined,
) =>
    GenericsetupMocksBase(
        (
            sp: ShellParser | undefined,
            dialogHandler: ((dialog: PmicDialog) => void) | null,
        ) => new Npm1210(sp, dialogHandler),
        shellParser,
    );

export const setupMocksWithShellParser = () =>
    GenericSetupMocksWithShellParser(
        (
            sp: ShellParser | undefined,
            dialogHandler: ((dialog: PmicDialog) => void) | null,
        ) => new Npm1210(sp, dialogHandler),
    );
