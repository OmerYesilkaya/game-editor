import { useCallback, useMemo } from "react";

import shallow from "zustand/shallow";

import { usePrefabEditorStore } from "@core/store";
import { Input, ModuleValueType, Prefab } from "@app/types";
import editorUtils from "@prefab-editor/editorUtils";

import TimelineInput from "./TimelineInput";

type Props = {
    rootPrefab: Prefab;
    prefabId: string;
    inputs: Input[];
};
const TimelineRow: React.FC<Props> = ({ rootPrefab, prefabId, inputs }) => {
    const { addAnimation, removeAnimation } = usePrefabEditorStore(
        (state) => ({
            addAnimation: state.addAnimation,
            removeAnimation: state.removeAnimation,
        }),
        shallow
    );

    const prefabName = useMemo(() => editorUtils.findPrefabInTree(prefabId, rootPrefab!)?.name ?? "NULL", [rootPrefab, prefabId]);

    // Currently selected animations
    const selectedAnimations = usePrefabEditorStore(useCallback((state) => state.activeTimelines[prefabId] ?? [], [prefabId]));

    // Show only inputs with Sprite or Animation type
    const availableInputs = useMemo(
        () => inputs.filter((input) => [ModuleValueType.Animation, ModuleValueType.Sprite].includes(input.valueType)),
        [inputs]
    );

    function handleClick(inputId: number) {
        const targetAssetId = selectedAnimations.find((assetId) => assetId === inputId);
        if (targetAssetId) {
            removeAnimation(prefabId, inputId);
        } else {
            addAnimation(prefabId, inputId);
        }
    }

    return (
        <div className="w-full flex gap-x-1 text-white" key={prefabId}>
            <div className="flex items-center gap-x-1">
                <div className="px-2 rounded-sm bg-zinc-100 shadow-md font-default select-none border-2 border-zinc-100  text-zinc-800 font-black uppercase text-center">
                    {prefabName}
                </div>
                {availableInputs.map((input) => (
                    <TimelineInput
                        key={`${input.arrayIndex}-${input.id}`}
                        input={input}
                        onClick={handleClick}
                        isActive={selectedAnimations.includes(input.value)}
                        animationIndex={selectedAnimations.findIndex((animation) => input.value === animation)}
                    />
                ))}
            </div>
        </div>
    );
};

export default TimelineRow;
