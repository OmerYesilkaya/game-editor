import { ApiModule, ModuleValueType } from "@app/types";
import { PrefabWindow } from "@app/components";

type Props = {
    modules: ApiModule[];
    themeColor: string;
};

const ModuleInput: React.FC<Props> = ({ themeColor, modules }) => {
    const module = modules[0];
    const hasChildren = module.valueType === ModuleValueType.Object;

    return (
        <div className="flex flex-col w-full bg-zinc-900 rounded-sm p-1">
            {hasChildren ? (
                <PrefabWindow.ChildrenModule themeColor={themeColor} modules={modules} />
            ) : (
                <PrefabWindow.ValueModule themeColor={themeColor} modules={modules} />
            )}
        </div>
    );
};

export default ModuleInput;
