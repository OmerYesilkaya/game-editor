import { useState } from "react";

import { PrefabWindow } from "components";

const Container: React.FC = () => {
    const [isModuleWindowOpen, setIsModuleWindowOpen] = useState(false);

    function changeModuleWindowStatus(value: boolean) {
        setIsModuleWindowOpen(value);
    }

    return (
        <div className="w-1/3 flex h-full p-1 border-l border-white">
            <div className="flex flex-col h-full w-full">
                <div className="flex flex-col h-full w-full">
                    <PrefabWindow.Header changeModuleWindowStatus={changeModuleWindowStatus} isModuleWindowOpen={isModuleWindowOpen} />
                    <div className="flex h-0 grow w-full relative">
                        {isModuleWindowOpen && (
                            <div
                                className="absolute right-0 left-0 bg-opacity-90 bg-zinc-dark z-10 w-full h-full"
                                onClick={() => setIsModuleWindowOpen(false)}
                            />
                        )}
                        <div className="h-full w-full flex grow flex-col transition-all">
                            <PrefabWindow.ActiveModules />
                        </div>
                        {isModuleWindowOpen && (
                            <div className="h-full w-3/5 flex grow flex-col absolute right-0 bg-zinc-900 p-1 z-[11]">
                                <PrefabWindow.AvailableModules />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Container;
