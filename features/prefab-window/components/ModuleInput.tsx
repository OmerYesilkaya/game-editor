import { ApiModule, ModuleValueType } from "@app/types";

import ChildrenModule from "./ChildrenModule";
import ValueModule from "./ValueModule";

type Props = {
    modules: ApiModule[];
    themeColor: string;
};

const ModuleInput: React.FC<Props> = ({ themeColor, modules }) => {
    const module = modules[0];
    const hasChildren = module.valueType === ModuleValueType.Object;

    return (
        <div className="flex flex-col w-full bg-zinc-900 rounded-sm p-0.5">
            {hasChildren ? <ChildrenModule themeColor={themeColor} modules={modules} /> : <ValueModule themeColor={themeColor} modules={modules} />}
        </div>
    );
};

export default ModuleInput;
