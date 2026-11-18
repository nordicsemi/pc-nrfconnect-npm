/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

export const parseFloatFromCmdReply = (msg: string): number | undefined => {
    const res = parseValueFromCmdReply(msg);
    return res !== undefined ? Number.parseFloat(res) : undefined;
};

export const parseIntFromCmdReply = (msg: string): number | undefined => {
    const res = parseValueFromCmdReply(msg);
    return res !== undefined ? Number.parseInt(res, 10) : undefined;
};

export const parseOnOffFromCmdReply = (msg: string): boolean | undefined => {
    const res = parseValueFromCmdReply(msg)?.toLowerCase();
    switch (res) {
        case 'on':
            return true;
        case 'off':
            return false;
    }
    return undefined;
};

export const parseValueFromCmdReply = (msg: string): string | undefined =>
    msg.split(':')[1]?.trim();
