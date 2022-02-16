import Core from "@core/components";
import { ViewGridAddIcon } from "@heroicons/react/outline";

import { useSelectedPrefab } from "@prefab-editor/hooks";

import ModuleItem from "./ModuleItem";

const ActiveModules: React.FC = () => {
    const themeColor = "rose";
    const { selectedPrefab } = useSelectedPrefab();

    return (
        <>
            {selectedPrefab ? (
                <div className="flex flex-col grow max-h-full overflow-y-auto">
                    {selectedPrefab.modules.length > 0 ? (
                        <div className="flex flex-col gap-y-0.5 ">
                            {selectedPrefab.modules.map((module) => (
                                <ModuleItem themeColor={themeColor} key={module.id} module={module} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-white text-center border-dashed border-2 p-4 flex flex-col justify-center items-center font-default grow">
                            <ViewGridAddIcon className="w-24 h-24" />
                            <span className="text-2xl font-bold mb-2">{selectedPrefab.name} has no modules</span>
                            <span className="w-2/3 text-center">Please add a module from the panel on the left</span>
                        </div>
                    )}
                </div>
            ) : (
                <Core.NoPrefab />
            )}
        </>
    );
};

export default ActiveModules;
