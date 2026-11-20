/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

export const shipVBusFiltKV = [
    ['default', 'Normal'],
    ['long', 'Long'],
] as const;
export const shipVBusFiltKeys = shipVBusFiltKV.map(([key, _]) => key);
export type ShipVBusFilt = (typeof shipVBusFiltKeys)[number];

export const shipVBusFiltTimeKV = [
    ['2ms', '2 ms'],
    ['5ms', '5 ms'],
] as const;
export const shipVBusFiltTimeKeys = shipVBusFiltTimeKV.map(([key, _]) => key);
export type ShipVBusFiltTime = (typeof shipVBusFiltTimeKeys)[number];

export const shpHldSlideSwitchDelayKV = [
    ['200ms', '200 ms'],
    ['8s', '8 s'],
] as const;
export const shpHldSlideSwitchDelayKeys = shpHldSlideSwitchDelayKV.map(
    ([key, _]) => key,
);
export type ShpHldSlideSwitchDelay =
    (typeof shpHldSlideSwitchDelayKeys)[number];

export const shpHldSlideSwitchPollTimeKV = [
    ['50ms', '50 ms'],
    ['100ms', '100 ms'],
] as const;
export const shpHldSlideSwitchPollTimeKeys = shpHldSlideSwitchPollTimeKV.map(
    ([key, _]) => key,
);
export type ShpHldSlideSwitchPollTime =
    (typeof shpHldSlideSwitchPollTimeKeys)[number];

export const shpHldSliderKV = [
    ['continuous', 'Continuous'],
    ['poll', 'Polled'],
] as const;
export const shpHldSliderKeys = shpHldSliderKV.map(([key, _]) => key);
export type ShpHldSlider = (typeof shpHldSliderKeys)[number];

export const shpHldTypeKV = [
    ['button', 'Push button'],
    ['slideswitch', 'Slide switch'],
] as const;
export const shpHldTypeKeys = shpHldTypeKV.map(([key, _]) => key);
export type ShpHldType = (typeof shpHldTypeKeys)[number];

export const timeToActiveKV = [
    ['off', 'No debounce'],
    ['50ms', '50 ms'],
    ['100ms', '100 ms'],
    ['500ms', '500 ms'],
    ['1000ms', '1000 ms'],
] as const;
export const timeToActiveKeys = timeToActiveKV.map(([key, _]) => key);
export type TimeToActive = (typeof timeToActiveKeys)[number];

export const vBusStandbyCtrlKV = [
    ['pin', 'Pin'],
    ['software', 'Software'],
] as const;
export const vBusStandbyCtrlKeys = vBusStandbyCtrlKV.map(([key, _]) => key);
export type VBusStandbyCtrl = (typeof vBusStandbyCtrlKeys)[number];

export const vBusStandbySelKV = [
    ['standby1', 'Standby 1'],
    ['standby2', 'Standby 2'],
] as const;
export const vBusStandbySelKeys = vBusStandbySelKV.map(([key, _]) => key);
export type VBusStandbySel = (typeof vBusStandbySelKeys)[number];
