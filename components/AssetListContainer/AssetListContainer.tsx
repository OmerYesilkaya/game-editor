import { useState } from "react";

import { ModuleValueType, Input } from "@app/types";
import { AssetList, Common } from "@app/components";
import { useDebounce } from "@app/hooks";

type Props = {
    selectedInput: Input | null;
};

const Container: React.FC<Props> = ({ selectedInput }) => {
    const [keyword, setKeyword] = useState("");
    const { debouncedValue, isLoading } = useDebounce(keyword, 300);

    function getPanel() {
        let panel;
        switch (selectedInput?.valueType) {
            case ModuleValueType.Animation:
                panel = <AssetList.Animations query={debouncedValue} />;
                break;
            case ModuleValueType.Sprite:
                panel = <AssetList.Sprites query={debouncedValue} />;
                break;
            case ModuleValueType.Audio:
                panel = <AssetList.Audios />;
                break;
            case ModuleValueType.Material:
                panel = <AssetList.Materials />;
                break;
            case ModuleValueType.ParticleSystem:
                panel = <AssetList.ParticleSystems />;
                break;
            case ModuleValueType.TrailSystem:
                panel = <AssetList.TrailSystems />;
                break;
            case ModuleValueType.Prefab:
                panel = <AssetList.Prefabs />;
                break;
            case ModuleValueType.ItemPool:
                panel = <AssetList.ItemPools />;
                break;
            case ModuleValueType.MaterialAnimation:
                panel = <AssetList.MaterialAnimations />;
                break;
            default:
                panel = null;
                break;
        }
        return panel;
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex gap-x-1">
                <Common.SearchInput query={keyword} setQuery={setKeyword} isLoading={isLoading} placeholder="Search..." />
            </div>
            <div className="mt-1 flex flex-col overflow-y-auto font-default text-white grow">{getPanel()}</div>
        </div>
    );
};

export default Container;
