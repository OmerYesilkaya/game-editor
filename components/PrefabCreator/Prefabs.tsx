import { usePrefabStore, useCanvasStore } from "@app/store";
import { ChevronRightIcon } from "@heroicons/react/outline";

import cn from "classnames";
import api from "hooks/api";

const Prefab: React.FC<{ prefabId: number; prefabName: string }> = ({ prefabId, prefabName }) => {
	const { activePrefabId, setActivePrefabId } = usePrefabStore((state) => ({
		activePrefabId: state.activePrefabId,
		setActivePrefabId: state.setActivePrefabId,
	}));
	const setIsPrefabsModalOpen = useCanvasStore((state) => state.setIsPrefabsModalOpen);

	function handleClick() {
		setActivePrefabId(prefabId);
		setIsPrefabsModalOpen(false);
	}

	return (
		<div
			onClick={() => handleClick()}
			className={cn(
				"px-2 py-1 text-sm rounded-sm shadow-md text-white min-h-5 w-full flex items-center cursor-pointer  transition hover:bg-zinc-600 font-default",
				{
					"bg-zinc-600": activePrefabId === prefabId,
					"bg-zinc-700": activePrefabId !== prefabId,
				}
			)}
		>
			<ChevronRightIcon className="w-4 h-4 text-white mr-1" />
			<div>{prefabName.toUpperCase()}</div>
		</div>
	);
};

const Prefabs: React.FC = () => {
	const { data: prefabs } = api.useGetPrefabs();

	return (
		<div className="flex flex-col h-full w-full justify-between">
			<div className="flex flex-col">
				<div className="flex flex-col">
					{prefabs && prefabs.map((prefab) => <Prefab key={prefab.id} prefabId={prefab.id} prefabName={prefab.name} />)}
				</div>
			</div>
		</div>
	);
};

export default Prefabs;
