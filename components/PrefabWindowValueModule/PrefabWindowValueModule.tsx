import cn from "classnames";

import { ApiModule } from "@app/types";
import { format } from "@core/string";

import { usePrefabEditorSelectedPrefab } from "@app/hooks";
import { PrefabWindow } from "@app/components";

type Props = {
    modules: ApiModule[];
    themeColor: string;
};

const ValueModule: React.FC<Props> = ({ modules, themeColor }) => {
    const { addToArrayInput } = usePrefabEditorSelectedPrefab();
    const isArray = modules[0].isArray;

    function handleAdd(moduleId: number) {
        addToArrayInput(moduleId);
    }

    return (
        <div className="flex w-full flex-col">
            {modules[0].isArray && <span className="ml-1 w-full text-left uppercase text-sm font-bold h-6">{format.camelCase(modules[0].name)}</span>}
            {modules.map((module, index) =>
                module.isArray ? (
                    <div key={`${module.id}-${module.arrayIndex}`} className={cn("flex", { "mt-1": index !== 0 })}>
                        <div className="mr-1 w-5 rounded-sm bg-zinc-200 text-zinc-700 font-bold text-sm flex items-center justify-center">
                            {module.arrayIndex + 1}
                        </div>
                        <PrefabWindow.DynamicInput themeColor={themeColor} module={module} />
                    </div>
                ) : (
                    <div
                        className={cn("flex", {
                            "mt-1": index !== 0,
                        })}
                    >
                        <span className="ml-1 w-full text-left uppercase text-sm font-bold">{format.camelCase(module.name)}</span>
                        <PrefabWindow.DynamicInput key={`${module.id}-${module.arrayIndex}`} themeColor={themeColor} module={module} />
                    </div>
                )
            )}
            {isArray && (
                <button
                    onClick={() => handleAdd(modules[0].id)}
                    className="mt-1 text-zinc-200 bg-sky-700 flex w-full items-center justify-center rounded-sm font-default uppercase text-sm font-bold transition-all hover:bg-sky-800 active:bg-sky-900"
                >
                    Add new item
                </button>
            )}
        </div>
    );
};

export default ValueModule;
