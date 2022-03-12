import React from "react";

import shallow from "zustand/shallow";

import { ApiModule, ModuleValueType } from "@app/types";

import { usePrefabEditorStore } from "@core/store";
import { MODULE_DEFAULT_VALUES } from "@core/constants";

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
    themeColor: string;
};

function DynamicInput({ themeColor, module }: DynamicInputPropTypes) {
    const { selectedPrefabId, inputs } = usePrefabEditorStore(
        (state) => ({ selectedPrefabId: state.selectedPrefabId, inputs: state.inputs }),
        shallow
    );

    if (!selectedPrefabId || !inputs) return null;
    const input = inputs[selectedPrefabId].find((input) => input.id === module.id);
    const defaultValue = input?.value ? input.value : module.value ? module.value : MODULE_DEFAULT_VALUES[module.valueType];
    // const guid = input.guid -> Probably get guid from input here?
    // const arrayIndex = input.arrayIndex -> Also arrayIndex?

    function render() {
        let input;
        switch (module.valueType) {
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
            case ModuleValueType.Animation:
            case ModuleValueType.Sprite:
            case ModuleValueType.Material:
            case ModuleValueType.ParticleSystem:
            case ModuleValueType.TrailSystem:
            case ModuleValueType.Audio:
            case ModuleValueType.Prefab:
            case ModuleValueType.ItemPool:
            case ModuleValueType.MaterialAnimation:
                input = <FileSelectInput type={module.valueType} themeColor={themeColor} moduleId={module.id} defaultValue={defaultValue} />;
                break;
            case ModuleValueType.Range:
                input = <input className="w-full text-white rounded-sm px-1 bg-zinc-700 shadow-md border border-zinc-200" placeholder="RANGE" />;
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
