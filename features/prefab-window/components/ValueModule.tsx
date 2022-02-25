import cn from "classnames";

import { ApiModule } from "@app/types";
import { stringUtils } from "@core/utils";

import DynamicInput from "./DynamicInput";

type Props = {
    modules: ApiModule[];
    themeColor: string;
};

const ValueModule: React.FC<Props> = ({ modules, themeColor }) => {
    const isArray = modules[0].isArray;
    return (
        <div className="flex w-full flex-col">
            {modules[0].isArray && (
                <span className="ml-1 w-full text-left uppercase text-sm font-bold">{stringUtils.formatCamelCase(modules[0].name)}</span>
            )}
            {modules.map((module, index) =>
                module.isArray ? (
                    <div key={`${module.id}-${module.arrayIndex}`} className="flex mt-0.5">
                        <div className="mr-1 w-5  rounded-sm bg-zinc-200 text-zinc-700 font-bold text-sm flex items-center justify-center ml-1">
                            {module.arrayIndex + 1}
                        </div>
                        <DynamicInput themeColor={themeColor} module={module} />
                    </div>
                ) : (
                    <div
                        className={cn("flex", {
                            "mt-1": index !== 0,
                        })}
                    >
                        <span className="ml-1 w-full text-left uppercase text-sm font-bold">{stringUtils.formatCamelCase(module.name)}</span>
                        <DynamicInput key={`${module.id}-${module.arrayIndex}`} themeColor={themeColor} module={module} />
                    </div>
                )
            )}
            {isArray && (
                <button className="mt-1 text-zinc-200 bg-emerald-800 flex w-full items-center justify-center rounded-sm font-default uppercase text-sm font-bold transition-all hover:bg-emerald-700 active:bg-emerald-900">
                    Add new item
                </button>
            )}
        </div>
    );
};

export default ValueModule;
