import { useEffect, useState } from "react";

import { usePrefabEditorStore } from "@app/store";
import { useDebounce } from "@app/hooks";

const MAX_CHAR_LENGTH = 50;

type Props = {
    prefabId: string;
    moduleId: number;
    defaultValue: string;
};

const TextInput: React.FC<Props> = ({ prefabId, moduleId, defaultValue }) => {
    const updateInput = usePrefabEditorStore((state) => state.updateInputValue);

    const [value, setValue] = useState(defaultValue);
    const { debouncedValue } = useDebounce(value, 300);

    useEffect(() => {
        updateInput(prefabId, moduleId, debouncedValue);
    }, [debouncedValue]);

    return (
        <div className="flex flex-col items-end">
            <input
                className="w-full text-white rounded-sm px-1 bg-zinc-700 shadow-md border border-zinc-200"
                maxLength={MAX_CHAR_LENGTH}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <span className="text-xs font-light text-zinc-400">
                {0 ?? 0}/{MAX_CHAR_LENGTH}
            </span>
        </div>
    );
};

export default TextInput;
