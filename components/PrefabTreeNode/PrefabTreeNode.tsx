import { HTMLAttributes, useRef, useState } from "react";

import cn from "classnames";
import shallow from "zustand/shallow";
import { Handle, Position } from "react-flow-renderer";
import { CubeTransparentIcon, DuplicateIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/outline";

import { format } from "@core/string";

import { usePrefabEditorStore } from "@app/store";
import { ApiModule } from "@app/types";
import { Common } from "@app/components";

type Props = {
    data: { name: string; modules: ApiModule[]; id: string; internalId: string };
};

type ButtonProps = {
    themeColor: string;
    variant?: "outline" | "default";
    disabled?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, themeColor, variant = "default", disabled = false, ...restProps }) => {
    return (
        <button
            disabled={disabled}
            type="button"
            {...restProps}
            className={cn(`w-7 h-7 rounded-sm bg-${themeColor}-500 transition  shadow-md ml-1`, {
                [`bg-${themeColor}-500 hover:bg-${themeColor}-600 text-white`]: variant === "default",
                [`bg-transparent border-2 border-${themeColor}-500 hover:bg-${themeColor}-500 hover:border-white text-${themeColor}-500 hover:text-white`]:
                    variant === "outline",
                "opacity-50 pointer-events-none": disabled,
            })}
        >
            {children}
        </button>
    );
};

const TreeNode: React.FC<Props> = ({ data }) => {
    const [name, setName] = useState<string>(data.name);
    const [isEditable, setIsEditable] = useState(false);

    const { selectedPrefabId, setSelection, setPrefabName } = usePrefabEditorStore(
        (state) => ({
            selectedPrefabId: state.selectedPrefabId,
            setSelection: state.setSelection,
            setPrefabName: state.setPrefabName,
        }),
        shallow
    );

    const containerRef = useRef<HTMLDivElement>(null);
    const themeColor = "rose";

    const customHandleStyles = containerRef.current && {
        zIndex: 2,
        background: "white",
        width: "15px",
        height: "15px",
        border: "2px solid",
        boxShadow: "0 0 10px rgba(0,0,0,0.6)",
        borderColor: window.getComputedStyle(containerRef.current).borderColor,
    };

    function handleNameBlur() {
        if (!name) return;
        setPrefabName(data.internalId, format.capitalize(name));
    }

    return (
        <div
            onClick={() => {
                setSelection(data.internalId);
            }}
            ref={containerRef}
            className={cn(`w-[400px] p-1 my-4 overflow-y-auto  border-4 rounded-md bg-zinc-900 transition`, {
                [`border-${themeColor}-600`]: selectedPrefabId === data.id || selectedPrefabId === data.internalId,
                [`border-${themeColor}-800`]: selectedPrefabId !== data.id && selectedPrefabId !== data.internalId,
            })}
        >
            <Handle type="target" position={Position.Top} style={{ transform: "translateY(14.5px) translateX(-7.5px)", ...customHandleStyles }} />
            <Common.Header className="w-full px-1.5 py-1" id="drag-handle">
                <div className="flex items-center w-full justify-between">
                    <Common.EditableText
                        value={name ?? "Unnamed Prefab"}
                        onChange={(e) => setName(e)}
                        handleNameBlur={handleNameBlur}
                        placeholder="Unnamed Prefab"
                        isEditable={isEditable}
                        setIsEditable={setIsEditable}
                    />
                    <div className="flex items-center">
                        <Button themeColor={themeColor} title="Rename">
                            <CubeTransparentIcon className="w-full h-full p-1" />
                        </Button>
                        <Button themeColor={themeColor} title="Rename" onClick={() => setIsEditable(true)} disabled={isEditable}>
                            <PencilAltIcon className="w-full h-full p-1" />
                        </Button>
                        <Button themeColor={themeColor} title="Duplicate">
                            <DuplicateIcon className="w-full h-full p-1" />
                        </Button>
                        <div className="h-6 bg-rose-600 w-0.5 rounded-full ml-1" />
                        <Button themeColor={themeColor} variant="outline" title="Delete Prefab">
                            <TrashIcon className="w-full h-full p-1" />
                        </Button>
                    </div>
                </div>
            </Common.Header>
            <Handle type="source" position={Position.Bottom} style={{ transform: "translateY(-14.5px) translateX(-7.5px)", ...customHandleStyles }} />
        </div>
    );
};

export default TreeNode;
