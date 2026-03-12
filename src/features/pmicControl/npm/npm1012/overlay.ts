/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { NpmExportLatest } from '../types';
import type Npm1012 from './pmic1012Device';

export default (_npmConfig: NpmExportLatest, npmDevice: Npm1012) => `/*
* Copyright (C) 2025 Nordic Semiconductor ASA
* SPDX-License-Identifier: Apache-2.0
*/

#include <dt-bindings/regulator/npm10xx.h>
#include <zephyr/dt-bindings/input/input-event-codes.h>

&arduino_i2c {
   ${npmDevice.deviceType}_ek_pmic: pmic@6b {
       compatible = "nordic,${npmDevice.deviceType}";
       reg = <0x6b>;
   };
};`;
