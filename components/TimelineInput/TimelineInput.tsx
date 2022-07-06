import { useMemo } from "react";

import shallow from "zustand/shallow";
import cn from "classnames";

import { usePrefabEditorStore } from "@app/store";
import { ModuleValueType, Input } from "@app/types";

type Props = {
    input: Input;
    isActive: boolean;
    onClick: (inputId: number) => void;
    animationIndex: number;
};

const TimelineInput: React.FC<Props> = ({ input, isActive, onClick, animationIndex }) => {
    const { animations, sprites } = usePrefabEditorStore(
        (state) => ({
            animations: state.animations,
            sprites: state.sprites,
        }),
        shallow
    );

    function getName(moduleId: number, type: ModuleValueType) {
        if (!moduleId || !type) return "NULL";
        if (type === ModuleValueType.Animation) {
            return animations?.find((animation) => animation.id === moduleId)?.name ?? "UNDEFINED";
        } else if (type === ModuleValueType.Sprite) {
            return sprites?.find((sprite) => sprite.id === moduleId)?.name ?? "UNDEFINED";
        }
        return "UNDEFINED";
    }

    const name = useMemo(() => getName(input.value, input.valueType), [input.value]);

    return (
        <button
            disabled={name === "NULL" || name === "UNDEFINED"}
            key={input.id}
            className={cn(
                "px-2 rounded-sm bg-zinc-800 shadow-md font-default font-semibold select-none border-2 transition flex items-center justify-center relative",
                {
                    "border-yellow-300": isActive && name,
                    "border-zinc-800": !isActive && name,
                    "border-zinc-500": !name,
                }
            )}
            title={name === "NULL" || name === "UNDEFINED" ? "There is no asset selected for this module" : name}
            onClick={() => onClick(input.value)}
        >
            {isActive && (
                <div className="absolute -top-1 -right-1 bg-zinc-900 border-2 border-yellow-300 rounded-full shadow-md w-4 h-4 text-xs font-default font-bold text-yellow-300 flex items-center justify-center">
                    {animationIndex + 1}
                </div>
            )}
            {name}
        </button>
    );
};

export default TimelineInput;
