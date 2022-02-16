import { ModuleValueType, Input } from "@app/types";
import Core from "@core/components";

import Animations from "./Animations";
import Sprites from "./Sprites";
import Audios from "./Audios";
import Materials from "./Materials";
import ParticleSystems from "./ParticleSystems";
import TrailSystems from "./TrailSystems";
import ItemPools from "./ItemPools";
import MaterialAnimations from "./MaterialAnimations";
import Prefabs from "./Prefabs";
import { useState } from "react";
import { useDebounce } from "@core/hooks";

type Props = {
    selectedInput: Input | null;
};

const AssetSelect: React.FC<Props> = ({ selectedInput }) => {
    const [keyword, setKeyword] = useState("");
    const { debouncedValue, isLoading } = useDebounce(keyword, 300);

    function getPanel() {
        let panel;
        switch (selectedInput?.valueType) {
            case ModuleValueType.Animation:
                panel = <Animations query={debouncedValue} />;
                break;
            case ModuleValueType.Sprite:
                panel = <Sprites query={debouncedValue} />;
                break;
            case ModuleValueType.Audio:
                panel = <Audios />;
                break;
            case ModuleValueType.Material:
                panel = <Materials />;
                break;
            case ModuleValueType.ParticleSystem:
                panel = <ParticleSystems />;
                break;
            case ModuleValueType.TrailSystem:
                panel = <TrailSystems />;
                break;
            case ModuleValueType.Prefab:
                panel = <Prefabs />;
                break;
            case ModuleValueType.ItemPool:
                panel = <ItemPools />;
                break;
            case ModuleValueType.MaterialAnimation:
                panel = <MaterialAnimations />;
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
                <Core.SearchInput query={keyword} setQuery={setKeyword} isLoading={isLoading} placeholder="Search..." />
            </div>
            <div className="mt-1 flex flex-col overflow-y-auto font-default text-white grow">{getPanel()}</div>
        </div>
    );
};

export default AssetSelect;
