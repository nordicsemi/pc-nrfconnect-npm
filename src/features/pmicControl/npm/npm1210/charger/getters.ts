/*
 * Copyright (c) 2026 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { ChargerModuleGetBase } from '../../types';

export class ChargerGet extends ChargerModuleGetBase {
    all() {
        this.enabled();
        this.enabledBatteryDischargeCurrentLimit();
        this.enabledChargeCurrentThrottling();
        this.enableChgEnPinControl();
        this.enableChgEnPinPullDown();
        this.enableSafetyTimersResetByChgEnPin();
        this.enabledRecharging();
        this.enabledVBatLow();
        this.enabledWeakBatteryCharging();
        this.iChg();
        this.iBatLim();
        this.iChgCool();
        this.iChgDouble();
        this.iChgWarm();
        this.iTerm();
        this.iThrottle();
        this.iTrickle();
        this.state();
        this.tChgReduce();
        this.tChgResume();
        this.tChgStatus();
        this.tCold();
        this.tCool();
        this.tHot();
        this.tOutCharge();
        this.tOutTrickle();
        this.tWarm();
        this.vBatLow();
        this.vTerm();
        this.vTermCool();
        this.vTermWarm();
        this.vThrottle();
        this.vTrickleFast();
        this.vWeak();
    }

    dropoutRecovery() {
        this.sendCommand('npm12xx charger dropout_recovery get');
    }
    enabled() {
        this.sendCommand('npm12xx charger enable get');
    }
    enabledAdvancedChargingProfile() {
        this.sendCommand('npm12xx charger jeita_charging get');
    }
    enabledBatteryDischargeCurrentLimit() {
        this.sendCommand('npm12xx charger discharge_limit get');
    }
    enabledChargeCurrentThrottling() {
        this.sendCommand('npm12xx charger throttling get');
    }
    enableChgEnPinControl() {
        this.sendCommand('npm12xx charger enablectrl get');
    }
    enableChgEnPinPullDown() {
        this.sendCommand('npm12xx charger chgenpin pulldown get');
    }
    enabledNtcMonitoring() {
        this.sendCommand('npm12xx charger ntc monitoring get');
    }
    enableSafetyTimersResetByChgEnPin() {
        this.sendCommand('npm12xx charger pin_timer_reset get');
    }
    enabledRecharging() {
        this.sendCommand('npm12xx charger recharge get');
    }
    enabledVBatLow() {
        this.sendCommand('npm12xx charger lowbat_charging get');
    }
    enabledWeakBatteryCharging() {
        this.sendCommand('npm12xx charger weakbat_charging get');
    }
    iBatLim() {
        this.sendCommand('npm12xx charger discharge_limit get');
    }
    iChg() {
        this.sendCommand('npm12xx charger current charge get');
    }
    iChgCool() {
        this.sendCommand('npm12xx charger current charge_cool get');
    }
    iChgDouble() {
        this.sendCommand('npm12xx charger current isetdouble get');
    }
    iChgWarm() {
        this.sendCommand('npm12xx charger current charge_warm get');
    }
    iTerm() {
        this.sendCommand('npm12xx charger current termination get');
    }
    iThrottle() {
        this.sendCommand('npm12xx charger current throttle get');
    }
    iTrickle() {
        this.sendCommand('npm12xx charger current trickle get');
    }
    softstartCurrent() {
        this.sendCommand('npm12xx charger current softstart get');
    }
    startupMode() {
        this.sendCommand('npm12xx charger startup_mode get');
    }
    state() {
        this.sendCommand('npm12xx charger state get');
    }
    tChgReduce() {
        this.sendCommand('npm12xx charger dietemp reduce get');
    }
    tChgResume() {
        this.sendCommand('npm12xx charger dietemp resume get');
    }
    tChgStatus() {
        this.sendCommand('npm12xx charger dietemp status get');
    }
    tCold() {
        this.sendCommand('npm12xx charger ntc cold get');
    }
    tCool() {
        this.sendCommand('npm12xx charger ntc cool get');
    }
    tHot() {
        this.sendCommand('npm12xx charger ntc hot get');
    }
    tOutCharge() {
        this.sendCommand('npm12xx charger timeout charging get');
    }
    tOutTrickle() {
        this.sendCommand('npm12xx charger timeout trickle get');
    }
    tWarm() {
        this.sendCommand('npm12xx charger ntc warm get');
    }
    vBatLow() {
        this.sendCommand('npm12xx charger voltage batlow get');
    }
    vTerm() {
        this.sendCommand('npm12xx charger voltage termination get');
    }
    vTermCool() {
        this.sendCommand('npm12xx charger voltage termination_cool get');
    }
    vTermWarm() {
        this.sendCommand('npm12xx charger voltage termination_warm get');
    }
    vThrottle() {
        this.sendCommand('npm12xx charger voltage throttle get');
    }
    vTrickleFast() {
        this.sendCommand('npm12xx charger voltage trickle get');
    }
    vWeak() {
        this.sendCommand('npm12xx charger voltage weak get');
    }
}
