import { Common, PrefabEditor, AssetList, PrefabScene, PrefabWindow, Timeline } from "@app/components";

const Container: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col bg-zinc-dark">
            <PrefabEditor.MenuBar />
            <Common.Center className="relative w-full h-0 grow flex gap-1 bg-zinc-dark">
                <>
                    <div className="w-full h-full flex flex-col">
                        <div className="w-full flex h-3/4 border-b border-white">
                            <PrefabScene.Container />
                            <PrefabWindow.Container />
                        </div>
                        <div className="w-full h-1/4 flex flex-col gap-y-1 p-1">
                            <Timeline.Container />
                        </div>
                    </div>
                    <PrefabEditor.Modals />
                    <AssetList.FloatingWindow />
                    <PrefabEditor.Overlay />
                </>
            </Common.Center>
        </div>
    );
};

export default Container;
