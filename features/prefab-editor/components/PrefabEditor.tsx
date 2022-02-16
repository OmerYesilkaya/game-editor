import Core from "@core/components";

import { AssetSelectWindow } from "@asset-window/components";
import { PrefabWindow } from "@prefab-window/components";
import { PrefabScene } from "@prefab-scene/components";
import { Timeline } from "@timeline/components";

import MenuBar from "./MenuBar";
import Modals from "./Modals";
import Overylay from "./Overlay";

const PrefabEditor: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col bg-zinc-dark">
            <MenuBar />
            <Core.Center className="relative w-full h-0 grow flex gap-1 bg-zinc-dark">
                <>
                    <div className="w-full h-full flex flex-col">
                        <div className="w-full flex h-3/4 border-b border-white">
                            <PrefabScene />
                            <PrefabWindow />
                        </div>
                        <div className="w-full h-1/4 flex flex-col gap-y-1 p-1">
                            <Timeline />
                        </div>
                    </div>
                    <Modals />
                    <AssetSelectWindow />
                    <Overylay />
                </>
            </Core.Center>
        </div>
    );
};

export default PrefabEditor;
