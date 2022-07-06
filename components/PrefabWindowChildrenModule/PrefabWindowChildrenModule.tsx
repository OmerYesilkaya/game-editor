import { useState } from "react";

import { ChevronRightIcon } from "@heroicons/react/outline";
import cn from "classnames";

import { ApiModule } from "@app/types";
import { stringUtils } from "@core/utils";
import { usePrefabEditorSelectedPrefab } from "hooks";
import { PrefabWindow } from "components";

type Props = {
    modules: ApiModule[];
    themeColor: string;
};

const ChildrenModule: React.FC<Props> = ({ themeColor, modules }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { addToArrayInput } = usePrefabEditorSelectedPrefab();

    function handleAdd(moduleId: number) {
        addToArrayInput(moduleId);
    }

    function toggleExpand() {
        setIsExpanded((prev) => !prev);
    }

    return (
        <>
            <div className="w-full flex items-center">
                <span className="ml-1 w-full text-left uppercase text-sm font-bold">{stringUtils.formatCamelCase(modules[0].name)}</span>
                <button
                    type="button"
                    className={`min-w-[20px] min-h-[20px] bg-${themeColor}-600 border-2 border-white rounded-sm shadow-md mr-px`}
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
            </div>
            {modules.map((module) => {
                const indexes = [...new Set(module.children?.map((child) => child.arrayIndex))];
                const arrays: NumberMap<ApiModule[]> = indexes.reduce((acc, cur) => ({ ...acc, [cur]: [] }), {});
                module.children?.forEach((child) => {
                    arrays[child.arrayIndex].push(child);
                });

                return (
                    <div key={`${module.id}-${module.arrayIndex}`} className="w-full flex flex-col">
                        {isExpanded && (
                            <div className="flex flex-col w-full h-full mt-0.5">
                                {Object.keys(arrays).map((index) => {
                                    const childModules = arrays[Number(index)];
                                    return (
                                        <div key={index} className="flex h-full w-full items-center mt-0.5">
                                            {module.isArray && (
                                                <div className="w-5 h-full rounded-sm bg-zinc-200 text-zinc-700 font-bold text-sm flex items-center justify-center ">
                                                    {module.arrayIndex + 1}
                                                </div>
                                            )}
                                            <hr className="w-0.5 h-full bg-zinc-200 rounded-full my-0.5 ml-1" />
                                            <div className="ml-1 rounded-sm w-full border border-zinc-600">
                                                <div className="flex flex-col w-full h-full items-start">
                                                    <PrefabWindow.ModuleInput
                                                        themeColor={themeColor}
                                                        key={`${module.id}-${module.arrayIndex}`}
                                                        modules={childModules}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
            {isExpanded && modules[0].isArray && (
                <button
                    onClick={() => handleAdd(modules[0].id)}
                    className="mt-1 text-zinc-200 bg-sky-700 flex w-full items-center justify-center rounded-sm font-default uppercase text-sm font-bold transition-all hover:bg-sky-800 active:bg-sky-900"
                >
                    Add new item
                </button>
            )}
        </>
    );
};

export default ChildrenModule;
