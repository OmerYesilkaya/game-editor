import { useEffect, useState } from "react";

import { usePrefabEditorStore } from "@app/store";
import { useDebounce } from "@app/hooks";

type Props = {
    prefabId: string;
    moduleId: number;
    defaultValue: number;
};

const PercentageInput: React.FC<Props> = ({ prefabId, moduleId, defaultValue }) => {
    const updateInput = usePrefabEditorStore((state) => state.updateInputValue);
    const [value, setValue] = useState(defaultValue);
    const { debouncedValue } = useDebounce(value, 300);

    useEffect(() => {
        updateInput(prefabId, moduleId, debouncedValue);
    }, [debouncedValue]);

    return (
        <div className="flex items-center justify-between w-full">
            <input value={value} type="range" min={0} max={1} step={0.01} onChange={(e) => setValue(parseFloat(e.target.value))} />
            <span className="text-sm">{`${Math.floor((value ?? 0) * 100)}%`}</span>
        </div>
    );
};

export default PercentageInput;
