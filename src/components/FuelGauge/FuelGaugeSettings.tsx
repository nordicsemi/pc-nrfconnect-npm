/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Alert,
    Button,
    Dropdown,
    type DropdownItem,
} from '@nordicsemiconductor/pc-nrfconnect-shared';
import path from 'path';

import {
    getProfileBuffer,
    loadBatteryProfile,
    saveBatteryHealthProfileDialog,
} from '../../actions/fileActions';
import { getBundledBatteries } from '../../features/helpers';
import { showDialog } from '../../features/pmicControl/downloadBatteryModelSlice';
import { DocumentationTooltip } from '../../features/pmicControl/npm/documentation/documentation';
import {
    dialogHandler,
    DOWNLOAD_BATTERY_HEALTH_PROFILE_DIALOG_ID,
    DOWNLOAD_BATTERY_HEALTH_PROFILE_DIALOG_TITLE,
    DOWNLOAD_BATTERY_PROFILE_DIALOG_ID,
} from '../../features/pmicControl/npm/pmicHelpers';
import { type BatteryModel } from '../../features/pmicControl/npm/types';
import {
    canProfile,
    fuelGaugeBatteryHealthProfileSupported,
    getActiveBatterModel,
    getHardcodedBatterModels,
    getLatestAdcSample,
    getNpmDevice,
    getStoredBatterModels,
} from '../../features/pmicControl/pmicControlSlice';
import { setProfilingStage } from '../../features/pmicControl/profilingSlice';

export default ({ disabled }: { disabled: boolean }) => {
    const dispatch = useDispatch();

    const npmDevice = useSelector(getNpmDevice);
    const activeBatteryModel = useSelector(getActiveBatterModel);
    const storedBatterModels = useSelector(getStoredBatterModels);
    const hardcodedBatterModels = useSelector(getHardcodedBatterModels);
    const latestAdcSample = useSelector(getLatestAdcSample);
    const profilingSupported = useSelector(canProfile);
    const batteryHealthProfileSupported = useSelector(
        fuelGaugeBatteryHealthProfileSupported,
    );

    const getClosest = (
        batteryModel: BatteryModel | undefined,
        temperature: number,
    ) =>
        batteryModel?.characterizations.reduce((prev, curr) =>
            Math.abs(curr.temperature ?? 0 - temperature) <
            Math.abs(prev.temperature ?? 0 - temperature)
                ? curr
                : prev,
        ) ?? undefined;

    const batteryModelItems: DropdownItem[] = useMemo(() => {
        const items = [...hardcodedBatterModels];

        storedBatterModels?.forEach(storedBatterModel => {
            if (storedBatterModel) items.push(storedBatterModel);
        });

        return items.map(batterModel => ({
            label: `${batterModel.name} (${
                getClosest(batterModel, latestAdcSample?.tBat ?? 24)
                    ?.capacity ?? ''
            } mAh)`,
            value: batterModel.name,
        }));
    }, [hardcodedBatterModels, latestAdcSample?.tBat, storedBatterModels]);

    const selectedActiveItemBatteryMode = useMemo(
        () =>
            batteryModelItems.find(
                item => item.value === activeBatteryModel?.name,
            ) ?? {
                label: 'N/A',
                value: '',
            },
        [activeBatteryModel, batteryModelItems],
    );

    const bundledBatteries = useMemo(
        () => getBundledBatteries(npmDevice?.deviceType ?? 'npm1300'),
        [npmDevice],
    );

    const brandsItems: DropdownItem<string>[] = [
        {
            label: 'Select Type',
            value: 'n/a',
        },
        ...bundledBatteries.map(batt => ({
            label: batt.brandName,
            value: batt.brandName,
        })),
        {
            label: 'Custom Model',
            value: 'Browse',
        },
    ];

    const [selectedBrandsItem, setSelectedBrandsItem] = useState(
        brandsItems[0],
    );

    const brandsBatteryItems: DropdownItem<string>[] = useMemo(() => {
        const getModelBatteryList = () => {
            const model = bundledBatteries.find(
                batt => batt.brandName === selectedBrandsItem.value,
            );
            return (
                model?.fileNames
                    .filter(name => name.endsWith('.json'))
                    .map(name => ({
                        label: path.parse(name).name,
                        value: path.join(model.folder, `${name}`),
                    }))
                    .sort((a, b) => {
                        const getMAh = (label: string) => {
                            const regexMatch = label.match(/(\d+ mAh)/) ?? [
                                '0',
                            ];
                            return Number.parseInt(regexMatch[0], 10);
                        };
                        return getMAh(a.label) - getMAh(b.label);
                    }) ?? []
            );
        };

        return [
            {
                label: 'Select Model',
                value: 'n/a',
            },
            ...getModelBatteryList(),
        ];
    }, [bundledBatteries, selectedBrandsItem]);

    return (
        <>
            <Dropdown
                label={
                    <DocumentationTooltip
                        placement="right-start"
                        card="sidePanel"
                        item="ActiveBatteryModel"
                    >
                        Active Battery Model
                    </DocumentationTooltip>
                }
                items={batteryModelItems}
                onSelect={(item: DropdownItem) => {
                    npmDevice?.fuelGaugeModule?.set.activeBatteryModel(
                        item.value,
                    );
                }}
                selectedItem={selectedActiveItemBatteryMode}
                disabled={disabled || batteryModelItems.length === 0}
            />
            <Dropdown
                label={
                    <DocumentationTooltip
                        placement="right-start"
                        card="sidePanel"
                        item="AddNewActiveBatteryModel"
                    >
                        Add New Active Battery Model
                    </DocumentationTooltip>
                }
                items={brandsItems}
                onSelect={item => {
                    if (item.value === 'Browse') {
                        getProfileBuffer()
                            .then(result => {
                                dispatch(
                                    showDialog({
                                        buffer: result.buffer,
                                        name: path.parse(result.filePath).name,
                                    }),
                                );
                            })
                            .catch(res => {
                                dispatch(
                                    dialogHandler({
                                        uuid: DOWNLOAD_BATTERY_PROFILE_DIALOG_ID,
                                        message: (
                                            <>
                                                <div>Write battery model.</div>
                                                <br />
                                                <Alert
                                                    label="Error "
                                                    variant="danger"
                                                >
                                                    {res}
                                                </Alert>
                                            </>
                                        ),
                                        type: 'alert',
                                        confirmLabel: 'Write',
                                        confirmDisabled: true,
                                        cancelLabel: 'Cancel',
                                        title: 'Write',
                                        onConfirm: () => {},
                                        onCancel: () => {},
                                    }),
                                );
                            })
                            .finally(() => {
                                setSelectedBrandsItem(brandsItems[0]);
                            });
                    } else {
                        setSelectedBrandsItem(item);
                    }
                }}
                selectedItem={selectedBrandsItem}
                disabled={disabled}
            />
            <Dropdown
                items={brandsBatteryItems}
                onSelect={item => {
                    loadBatteryProfile(item.value).then(buffer => {
                        dispatch(
                            showDialog({
                                buffer,
                                name: path.parse(item.value).name,
                            }),
                        );
                    });
                }}
                selectedItem={brandsBatteryItems[0]}
                disabled={
                    disabled ||
                    selectedBrandsItem.value === 'n/a' ||
                    selectedBrandsItem.value === 'Browse'
                }
            />
            {profilingSupported && (
                <DocumentationTooltip
                    placement="right-start"
                    card="sidePanel"
                    item="ProfileBattery"
                    keepShowingOnHoverTooltip
                >
                    <Button
                        variant="secondary"
                        className="w-100"
                        onClick={async () => {
                            const result =
                                await npmDevice?.batteryProfiler?.canProfile();

                            if (result === true) {
                                dispatch(setProfilingStage('Configuration'));
                            } else if (result !== undefined) {
                                dispatch(setProfilingStage(result));
                            }
                        }}
                        disabled={disabled}
                    >
                        Profile Battery
                    </Button>
                </DocumentationTooltip>
            )}
            {batteryHealthProfileSupported && (
                <>
                    <DocumentationTooltip
                        placement="right-start"
                        card="sidePanel"
                        item="ActiveBatteryHealthProfile"
                        keepShowingOnHoverTooltip
                    >
                        Active Battery Health Profile
                    </DocumentationTooltip>
                    <Button
                        className="w-100"
                        onClick={async () => {
                            const result =
                                await npmDevice?.requestBatteryHealthProfileData?.();

                            if (result !== undefined) {
                                saveBatteryHealthProfileDialog(result);
                            }
                        }}
                        variant="secondary"
                    >
                        Save Battery Health Profile
                    </Button>
                    <Button
                        variant="secondary"
                        className="w-100"
                        onClick={() => {
                            getProfileBuffer()
                                .then(result => {
                                    dispatch(
                                        dialogHandler({
                                            cancelLabel: 'Cancel',
                                            confirmLabel: 'Confirm',
                                            message: (
                                                <>
                                                    <div>
                                                        Replace currently stored
                                                        battery health profile
                                                        with data from external
                                                        file?
                                                    </div>
                                                    <br />
                                                    Selected file:{' '}
                                                    {result.filePath}
                                                </>
                                            ),
                                            onCancel: () => {},
                                            onConfirm: () => {
                                                if (
                                                    activeBatteryModel !==
                                                    undefined
                                                ) {
                                                    npmDevice?.fuelGaugeModule?.actions.loadBatteryHealthProfile?.(
                                                        result.buffer,
                                                        activeBatteryModel.name,
                                                    );
                                                }
                                            },
                                            title: DOWNLOAD_BATTERY_HEALTH_PROFILE_DIALOG_TITLE,
                                            uuid: DOWNLOAD_BATTERY_HEALTH_PROFILE_DIALOG_ID,
                                        }),
                                    );
                                })
                                .catch(res => {
                                    dispatch(
                                        dialogHandler({
                                            cancelLabel: 'Cancel',
                                            confirmLabel: 'Confirm',
                                            confirmDisabled: true,
                                            message: (
                                                <Alert
                                                    label="Error "
                                                    variant="danger"
                                                >
                                                    {res}
                                                </Alert>
                                            ),
                                            onCancel: () => {},
                                            onConfirm: () => {},
                                            title: DOWNLOAD_BATTERY_HEALTH_PROFILE_DIALOG_TITLE,
                                            type: 'alert',
                                            uuid: DOWNLOAD_BATTERY_HEALTH_PROFILE_DIALOG_ID,
                                        }),
                                    );
                                });
                        }}
                        disabled={disabled}
                    >
                        Load Battery Health Profile
                    </Button>
                </>
            )}
        </>
    );
};
