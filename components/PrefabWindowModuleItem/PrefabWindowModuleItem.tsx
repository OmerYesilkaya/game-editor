import { useState } from "react";

import cn from "classnames";
import { ChevronRightIcon, TrashIcon } from "@heroicons/react/outline";

import { format } from "@core/string";

import { ApiModule } from "@app/types";
import { usePrefabEditorSelectedPrefab } from "@app/hooks";
import { PrefabWindow } from "@app/components";

const ModuleItem: React.FC<{ themeColor: string; module: ApiModule }> = ({ themeColor, module }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { removeModule } = usePrefabEditorSelectedPrefab();
    const hasChildren = module.children && module.children.length > 0;

    function toggleExpand() {
        if (!hasChildren) return;
        setIsExpanded((prev) => !prev);
    }

    if (!module) return null;

    const indexes = [...new Set(module.children?.map((child) => child.name))];
    const arrays: Dictionary<ApiModule[]> = indexes.reduce((acc, cur) => ({ ...acc, [cur]: [] }), {});
    module.children?.forEach((child) => {
        arrays[child.name].push(child);
    });

    return (
        <div className="bg-zinc-800  font-default  rounded-sm py-0.5 pl-1.5 pr-0.5 text-white flex items-center flex-col">
            <div
                className={cn("flex items-center justify-between w-full", {
                    "cursor-pointer": hasChildren,
                    "cursor-default": !hasChildren,
                })}
                onClick={() => toggleExpand()}
            >
                <div className="text-sm font-bold uppercase mr-2">{format.camelCase(module.name)}</div>
                <div className="flex items-center">
                    <TrashIcon
                        className="bg-red-600 p-0.5 w-5 h-5 shadow-md rounded-sm text-sm font-bold font-defaulttransition-colors hover:bg-red-700 border-2 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeModule(module.id);
                        }}
                    />
                    {hasChildren && (
                        <button
                            type="button"
                            className={`w-5 h-5 bg-${themeColor}-600 border-2 border-white rounded-sm shadow-md ml-1`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand();
                            }}
                        >
                            <ChevronRightIcon
                                className={cn(`transition-transform`, {
                                    "rotate-90": isExpanded,
                                })}
                            />
                        </button>
                    )}
                </div>
            </div>

            {isExpanded && (
                <>
                    <hr className="text-zinc-600 h-px w-full mt-0.5" />
                    <div className="w-full flex flex-col px-0.5 pb-0.5">
                        <div className="flex flex-col w-full h-full items-start gap-y-px mt-1">
                            {Object.keys(arrays).map((moduleName) => (
                                <PrefabWindow.ModuleInput
                                    themeColor={themeColor}
                                    key={`${module.id}-${module.arrayIndex}`}
                                    modules={arrays[moduleName]}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ModuleItem;
