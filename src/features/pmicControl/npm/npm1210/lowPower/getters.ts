/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { type ModuleParams } from '../../types';

export class LowPowerGet {
    constructor(private sendCommand: ModuleParams['sendCommand']) {}

    all() {
        this.hibernateWakeupByButton();
        this.timeToActive();
        this.shipVBusFilt();
        this.shipVBusFiltTime();
        this.shpHldSlider();
        this.shpHldSlideSwitchDelay();
        this.shpHldSlideSwitchPollTime();
        this.shpHldType();
        this.suspendPinPullDown();
        this.vbusHibernateWait();
        this.vbusStandbyPinSel();
        this.vbusStatus();
    }

    hibernateWakeupByButton() {
        this.sendCommand('npm12xx low_power_ctrl shphld hibernate_wakeup get');
    }

    shipVBusFilt() {
        this.sendCommand('npm12xx low_power_ctrl vbus shipfilt get');
    }

    shipVBusFiltTime() {
        this.sendCommand('npm12xx low_power_ctrl vbus shipfiltset get');
    }

    shpHldSlideSwitchDelay() {
        this.sendCommand('npm12xx low_power_ctrl shphld delay get');
    }

    shpHldSlideSwitchPollTime() {
        this.sendCommand('npm12xx low_power_ctrl shphld polltime get');
    }

    shpHldSlider() {
        this.sendCommand('npm12xx low_power_ctrl shphld slider get');
    }

    shpHldType() {
        this.sendCommand('npm12xx low_power_ctrl shphld type get');
    }

    suspendPinPullDown() {
        this.sendCommand('npm12xx low_power_ctrl suspend_pin pull_down get');
    }

    timeToActive() {
        this.sendCommand('npm12xx low_power_ctrl shphld debounce get');
    }

    vbusHibernateWait() {
        this.sendCommand('npm12xx low_power_ctrl vbus hibernate_wait get');
    }

    vbusStandbyPinSel() {
        this.sendCommand('npm12xx low_power_ctrl vbus standby_pinsel get');
    }

    vbusStandbyWait() {
        this.sendCommand('npm12xx low_power_ctrl vbus standby_wait get');
    }

    vbusStatus() {
        this.sendCommand('npm12xx low_power_ctrl vbus status get');
    }
}
