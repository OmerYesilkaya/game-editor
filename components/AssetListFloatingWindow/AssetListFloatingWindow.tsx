import { ModuleValueType } from "types/module";

import { AssetList, AssetPreview, Common } from "@app/components";
import { usePrefabEditorSelectedInput } from "@app/hooks";

const AssetListFloatingWindow: React.FC = () => {
    const { selectedInput } = usePrefabEditorSelectedInput();

    return (
        <Common.FloatingWindow
            width={720 + 450}
            height={450}
            order={6}
            title={ModuleValueType[selectedInput?.valueType ?? 0].toUpperCase()}
            isActive={!!selectedInput}
            noContent={null}
        >
            <div className="flex gap-x-1">
                <div className="w-[720px] h-[450px] pr-0 pl-1 py-0.5">
                    <AssetList.Container selectedInput={selectedInput} />
                </div>
                <div className="w-[450px] h-[450px] pl-0 pr-1 py-0.5">
                    <AssetPreview.Container width={450} height={450} />
                </div>
            </div>
        </Common.FloatingWindow>
    );
};

export default AssetListFloatingWindow;
