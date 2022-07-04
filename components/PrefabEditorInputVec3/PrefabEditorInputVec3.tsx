import { useEffect, useState } from "react";

import { useDebounce } from "@core/hooks";
import { usePrefabEditorStore } from "@core/store";

type Props = {
    prefabId: string;
    moduleId: number;
    defaultValue: { x: number; y: number; z: number };
};

const Vec3Input: React.FC<Props> = ({ prefabId, moduleId, defaultValue }) => {
    const updateInput = usePrefabEditorStore((state) => state.updateInputValue);

    const [value, setValue] = useState(defaultValue);
    const { debouncedValue } = useDebounce(value, 300);

    useEffect(() => {
        updateInput(prefabId, moduleId, debouncedValue);
    }, [debouncedValue]);

    return (
        <div className="flex items-center w-full gap-y-1">
            <div className="flex w-full ">
                <span className="w-6">X:</span>
                <input
                    type="number"
                    className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1"
                    value={value.x}
                    onChange={(e) =>
                        setValue((prev) => ({
                            ...prev,
                            x: parseInt(e.target.value),
                        }))
                    }
                />
            </div>
            <div className="flex w-full ml-1">
                <span className="w-6">Y:</span>
                <input
                    type="number"
                    className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1"
                    value={value.y}
                    onChange={(e) =>
                        setValue((prev) => ({
                            ...prev,
                            y: parseInt(e.target.value),
                        }))
                    }
                />
            </div>
            <div className="flex w-full ml-1">
                <span className="w-6">Z:</span>
                <input
                    type="number"
                    className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1"
                    value={value.z}
                    onChange={(e) =>
                        setValue((prev) => ({
                            ...prev,
                            z: parseInt(e.target.value),
                        }))
                    }
                />
            </div>
        </div>
    );
};

export default Vec3Input;
