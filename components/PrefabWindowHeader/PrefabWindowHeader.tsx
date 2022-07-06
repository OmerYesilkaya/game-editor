import { useEffect, useState } from "react";

import { CashIcon } from "@heroicons/react/outline";

import assert from "assert";
import cn from "classnames";

import { Common } from "components";
import { usePrefabEditorSelectedPrefab } from "hooks";
import { format } from "@core/string";

type Props = {
    isModuleWindowOpen: boolean;
    changeModuleWindowStatus: (value: boolean) => void;
};

const PrefabHeader: React.FC<Props> = ({ isModuleWindowOpen, changeModuleWindowStatus }) => {
    const [isEditable, setIsEditable] = useState(false);

    const { selectedPrefab, setPrefabName } = usePrefabEditorSelectedPrefab();

    const [name, setName] = useState<string | null>(null);

    function handleNameBlur() {
        if (!name) return;
        assert(selectedPrefab);
        setPrefabName(selectedPrefab.internalId, format.capitalize(name));
    }

    useEffect(() => {
        changeModuleWindowStatus(false);
        if (!selectedPrefab) return;
        setName(selectedPrefab.name);
    }, [selectedPrefab]);

    return (
        <div className="navbar-pattern mb-1 p-1 rounded-sm h-9 flex items-center font-default">
            {selectedPrefab ? (
                <Common.EditableText
                    value={name ?? ""}
                    onChange={(e) => setName(e)}
                    handleNameBlur={handleNameBlur}
                    placeholder="Unnamed Prefab"
                    isEditable={isEditable}
                    setIsEditable={setIsEditable}
                />
            ) : (
                <span className="font-bold text-lg text-white capitalize w-full pl-1">Please Select a Prefab</span>
            )}
            {selectedPrefab && (
                <button
                    className={cn(
                        "h-7 p-1 rounded-sm  shadow-md text-white border transition-all whitespace-nowrap flex items-center text-xs uppercase font-bold font-default px-2",
                        {
                            "bg-zinc-900 border-zinc-100": isModuleWindowOpen,
                            "bg-zinc-700 border-zinc-700": !isModuleWindowOpen,
                        }
                    )}
                    onClick={() => changeModuleWindowStatus(!isModuleWindowOpen)}
                >
                    <CashIcon className="w-5 h-5 mr-1" />
                    Modules
                </button>
            )}
        </div>
    );
};

export default PrefabHeader;
