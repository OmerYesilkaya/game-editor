import { useEffect, useState } from "react";

import { usePrefabEditorStore } from "@core/store";
import { useDebounce } from "hooks";

type Props = {
    prefabId: string;
    moduleId: number;
    defaultValue: string;
};

const ColorInput: React.FC<Props> = ({ prefabId, moduleId, defaultValue }) => {
    const { updateInput } = usePrefabEditorStore((state) => ({ updateInput: state.updateInputValue }));
    const [value, setValue] = useState(defaultValue);
    const { debouncedValue } = useDebounce(value, 300);

    useEffect(() => {
        updateInput(prefabId, moduleId, debouncedValue);
    }, [debouncedValue]);

    return <input className="px-0.5 rounded-sm bg-zinc-800 border w-full" type="color" value={value} onChange={(e) => setValue(e.target.value)} />;
};

export default ColorInput;
