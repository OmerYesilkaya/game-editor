import Core from "@core/components";
import { useSelectedInput } from "@prefab-editor/hooks";
import { ModuleValueType } from "types/module";

import AssetSelect from "./AssetSelect";
import Preview from "./Preview";

const Window: React.FC = () => {
    const { selectedInput } = useSelectedInput();

    return (
        <Core.FloatingWindow
            width={720 + 450}
            height={450}
            order={6}
            title={ModuleValueType[selectedInput?.valueType ?? 0].toUpperCase()}
            isActive={!!selectedInput}
            noContent={null}
        >
            <div className="flex gap-x-1">
                <div className="w-[720px] h-[450px] pr-0 pl-1 py-0.5">
                    <AssetSelect selectedInput={selectedInput} />
                </div>
                <div className="w-[450px] h-[450px] pl-0 pr-1 py-0.5">
                    <Preview width={450} height={450} />
                </div>
            </div>
        </Core.FloatingWindow>
    );
};

export default Window;
