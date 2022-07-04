import { useEffect, useState } from "react";

import { useDebounce } from "@core/hooks";
import { usePrefabEditorStore } from "@core/store";

type Props = {
    prefabId: string;
    moduleId: number;
    defaultValue: boolean;
};

const BoolInput: React.FC<Props> = ({ prefabId, moduleId, defaultValue }) => {
    const updateInput = usePrefabEditorStore((state) => state.updateInputValue);
    const [value, setValue] = useState(defaultValue);
    const { debouncedValue } = useDebounce(value, 300);

    useEffect(() => {
        updateInput(prefabId, moduleId, debouncedValue);
    }, [debouncedValue]);

    return (
        <div className="w-full h-full flex items-center">
            <input className="w-4 h-4" type="checkbox" checked={value} onChange={() => setValue((prev) => !prev)} />
        </div>
    );
};

export default BoolInput;
