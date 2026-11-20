/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { ChargerModuleGetBase } from '../../types';

export class ChargerGet extends ChargerModuleGetBase {
    all() {
        this.enabled();
        this.enabledBatteryDischargeCurrentLimit();
        this.enabledChargeCurrentThrottling();
        this.enabledRecharging();
        this.enabledVBatLow();
        this.enabledWeakBatteryCharging();
        this.iChg();
        this.iChgCool();
        this.iChgDouble();
        this.iChgWarm();
        this.iTerm();
        this.iThrottle();
        this.iTrickle();
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

        this.state();
    }

    state() {
        this.sendCommand('npm1012 charger state get');
    }

    enabled() {
        this.sendCommand('npm1012 charger enable get');
    }
    enabledAdvancedChargingProfile() {
        this.sendCommand('npm1012 charger jeita_charging get');
    }
    enabledBatteryDischargeCurrentLimit() {
        this.sendCommand('npm1012 charger discharge_limit get');
    }
    enabledChargeCurrentThrottling() {
        this.sendCommand('npm1012 charger throttling get');
    }
    enabledNtcMonitoring() {
        this.sendCommand('npm1012 charger ntc monitoring get');
    }
    enabledRecharging() {
        this.sendCommand('npm1012 charger recharge get');
    }
    enabledWeakBatteryCharging() {
        this.sendCommand('npm1012 charger weakbat_charging get');
    }
    enabledVBatLow() {
        this.sendCommand('npm1012 charger lowbat_charging get');
    }
    iChg() {
        this.sendCommand('npm1012 charger current charge get');
    }
    iChgCool() {
        this.sendCommand('npm1012 charger current charge_cool get');
    }
    iChgDouble() {
        this.sendCommand('npm1012 charger current isetdouble get');
    }
    iChgWarm() {
        this.sendCommand('npm1012 charger current charge_warm get');
    }
    iTerm() {
        this.sendCommand('npm1012 charger current termination get');
    }
    iThrottle() {
        this.sendCommand('npm1012 charger current throttle get');
    }
    iTrickle() {
        this.sendCommand('npm1012 charger current trickle get');
    }
    tChgReduce() {
        this.sendCommand('npm1012 charger dietemp reduce get');
    }
    tChgResume() {
        this.sendCommand('npm1012 charger dietemp resume get');
    }
    tChgStatus() {
        this.sendCommand('npm1012 charger dietemp status get'); // TODO: Add callback
    }
    tCold() {
        this.sendCommand('npm1012 charger ntc cold get');
    }
    tCool() {
        this.sendCommand('npm1012 charger ntc cool get');
    }
    tHot() {
        this.sendCommand('npm1012 charger ntc hot get');
    }
    tWarm() {
        this.sendCommand('npm1012 charger ntc warm get');
    }
    tOutCharge() {
        this.sendCommand('npm1012 charger timeout charging get');
    }
    tOutTrickle() {
        this.sendCommand('npm1012 charger timeout trickle get');
    }
    vBatLow() {
        this.sendCommand('npm1012 charger voltage batlow get');
    }
    vTerm() {
        this.sendCommand('npm1012 charger voltage termination get');
    }
    vTermCool() {
        this.sendCommand('npm1012 charger voltage termination_cool get');
    }
    vTermWarm() {
        this.sendCommand('npm1012 charger voltage termination_warm get');
    }
    vThrottle() {
        this.sendCommand('npm1012 charger voltage throttle get');
    }
    vTrickleFast() {
        this.sendCommand('npm1012 charger voltage trickle get');
    }
    vWeak() {
        this.sendCommand('npm1012 charger voltage weak get');
    }
}
