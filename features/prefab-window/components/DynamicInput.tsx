import React from "react";

import shallow from "zustand/shallow";

import { ApiModule, ModuleValueType } from "@app/types";
import { StatusEffect } from "types/enums";

import { usePrefabEditorStore } from "@core/store";

import {
    BoolInput,
    ColorInput,
    FileSelectInput,
    NumberInput,
    PercentageInput,
    TextAreaInput,
    TextInput,
    Vec2Input,
    Vec3Input,
    Vec4Input,
} from "@prefab-editor/input-types";

type DynamicInputPropTypes = {
    module: ApiModule;
};

const moduleTypeDefaultValues = {
    [ModuleValueType.Animation]: null,
    [ModuleValueType.Bool]: false,
    [ModuleValueType.Color]: "#ffffff",
    [ModuleValueType.Nested]: null,
    [ModuleValueType.Number]: 0,
    [ModuleValueType.Object]: null,
    [ModuleValueType.Percentage]: 0.5,
    [ModuleValueType.Range]: [0.3, 0.4],
    [ModuleValueType.Sprite]: null,
    [ModuleValueType.Text]: "",
    [ModuleValueType.TextArea]: "",
    [ModuleValueType.Vec2]: { x: 0, y: 0 },
    [ModuleValueType.Vec3]: { x: 0, y: 0, z: 0 },
    [ModuleValueType.Vec4]: { x: 0, y: 0, z: 0, w: 0 },
    [ModuleValueType.Material]: null,
    [ModuleValueType.ParticleSystem]: null,
    [ModuleValueType.TrailSystem]: null,
    [ModuleValueType.Audio]: null,
    [ModuleValueType.Prefab]: null,
    [ModuleValueType.ItemPool]: null,
    [ModuleValueType.StatusEffect]: StatusEffect.None,
    [ModuleValueType.SpawnPrefab]: { prefab: null, offset: { x: 0, y: 0, z: 0, w: 0 } },
    [ModuleValueType.SkillSpawnPrefab]: { prefab: null, offset: { x: 0, y: 0, z: 0, w: 0 }, isProtected: false },
    [ModuleValueType.MaterialAnimation]: null,
};

function DynamicInput({ module }: DynamicInputPropTypes) {
    const { selectedPrefabId, inputs } = usePrefabEditorStore(
        (state) => ({ selectedPrefabId: state.selectedPrefabId, inputs: state.inputs }),
        shallow
    );

    if (!selectedPrefabId || !inputs) return null;
    const input = inputs[selectedPrefabId].find((input) => input.id === module.id);
    const defaultValue = input?.value ? input.value : module.value ? module.value : moduleTypeDefaultValues[module.valueType];

    function render() {
        let input;
        switch (module.valueType) {
            case ModuleValueType.Animation:
                input = <FileSelectInput type={module.valueType} themeColor="rose" moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.Bool:
                input = <BoolInput prefabId={selectedPrefabId!} moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.Color:
                input = <ColorInput prefabId={selectedPrefabId!} moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.Number:
                input = <NumberInput prefabId={selectedPrefabId!} moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.Percentage:
                input = <PercentageInput prefabId={selectedPrefabId!} moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.Range:
                input = <div>Range</div>;
                break;
            case ModuleValueType.Sprite:
                input = <FileSelectInput type={module.valueType} themeColor="rose" moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.Text:
                input = <TextInput prefabId={selectedPrefabId!} moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.TextArea:
                input = <TextAreaInput prefabId={selectedPrefabId!} moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.Vec2:
                input = <Vec2Input prefabId={selectedPrefabId!} moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.Vec3:
                input = <Vec3Input prefabId={selectedPrefabId!} moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.Vec4:
                input = <Vec4Input prefabId={selectedPrefabId!} moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.Material:
                input = <FileSelectInput type={module.valueType} themeColor="rose" moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.ParticleSystem:
                input = <FileSelectInput type={module.valueType} themeColor="rose" moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.TrailSystem:
                input = <FileSelectInput type={module.valueType} themeColor="rose" moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.Audio:
                input = <FileSelectInput type={module.valueType} themeColor="rose" moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.Prefab:
                input = <FileSelectInput type={module.valueType} themeColor="rose" moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.ItemPool:
                input = <FileSelectInput type={module.valueType} themeColor="rose" moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.MaterialAnimation:
                input = <FileSelectInput type={module.valueType} themeColor="rose" moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.StatusEffect:
                input = (
                    <input className="w-full text-white rounded-sm px-1 bg-zinc-700 shadow-md border border-zinc-200" placeholder="STATUSEFFECT" />
                );
                break;
            case ModuleValueType.SpawnPrefab:
                input = (
                    <input className="w-full text-white rounded-sm px-1 bg-zinc-700 shadow-md border border-zinc-200" placeholder="SPAWNPREFAB" />
                );
                break;
            case ModuleValueType.SkillSpawnPrefab:
                input = (
                    <input
                        className="w-full text-white rounded-sm px-1 bg-zinc-700 shadow-md border border-zinc-200"
                        placeholder="SKILLSPAWNPREFAB"
                    />
                );

                break;

            default:
                input = <input className="w-full text-white rounded-sm px-1 bg-zinc-700 shadow-md border border-zinc-200" placeholder="UNDEFINED" />;
        }
        return input;
    }

    return <div className="w-full flex">{render()}</div>;
}
export default DynamicInput;
