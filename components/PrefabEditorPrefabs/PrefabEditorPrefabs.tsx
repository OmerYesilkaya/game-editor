import { useState } from "react";

import { useRouter } from "next/dist/client/router";
import { TrashIcon } from "@heroicons/react/outline";
import cn from "classnames";

import { usePrefabEditorStore } from "@core/store";
import api from "api";

const Prefab: React.FC<{ prefabId: string; prefabName: string }> = ({ prefabId, prefabName }) => {
    const router = useRouter();
    const [areDetailsShowing, setAreDetailsShowing] = useState(false);
    const setIsPrefabsModalOpen = usePrefabEditorStore((state) => state.setIsPrefabsModalOpen);
    const { mutate: deletePrefab } = api.useDeletePrefab();

    function handleClick() {
        setIsPrefabsModalOpen(false);
        router.push(`/prefab-editor/${prefabId}`);
    }

    function handleDeleteClick() {
        deletePrefab({
            id: parseInt(prefabId),
        });
    }

    return (
        <div
            onPointerOver={() => setAreDetailsShowing(true)}
            onPointerOut={() => setAreDetailsShowing(false)}
            onClick={() => handleClick()}
            className="px-2 py-1 text-sm shadow-md text-white min-h-5 w-full flex items-center cursor-pointer bg-zinc-800 transition hover:brightness-125 font-default justify-between"
        >
            <div>{prefabName.toUpperCase()}</div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick();
                }}
                className={cn("w-6 h-6 p-1 rounded-sm transition-all text-zinc-500 bg-inherit hover:brightness-125 active:brightness-75", {
                    "opacity-0": !areDetailsShowing,
                    "opacity-100": areDetailsShowing,
                })}
            >
                <TrashIcon />
            </button>
        </div>
    );
};

const Prefabs: React.FC = () => {
    const { data: prefabs } = api.useGetPrefabs();
    const rootPrefab = usePrefabEditorStore((state) => state.rootPrefab);
    return (
        <div className="flex flex-col h-full w-full justify-between">
            <div className="flex flex-col">
                <div className="flex flex-col gap-y-px">
                    {prefabs &&
                        Array.isArray(prefabs) &&
                        prefabs
                            .filter((prefab) => prefab.id !== rootPrefab?.id)
                            .map((prefab) => <Prefab key={prefab.id} prefabId={prefab.id.toString()} prefabName={prefab.name} />)}
                </div>
            </div>
        </div>
    );
};

export default Prefabs;
