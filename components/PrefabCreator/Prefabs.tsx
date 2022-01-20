import { ChevronRightIcon } from "@heroicons/react/outline";

import { usePrefabStore, useCanvasStore, useInputStore } from "@app/store";
import { api } from "@app/hooks";

const Prefab: React.FC<{ prefabId: string; prefabName: string }> = ({ prefabId, prefabName }) => {
	const { setActivePrefabId } = usePrefabStore((state) => ({
		activePrefabId: state.activePrefabId,
		setActivePrefabId: state.setActivePrefabId,
		setPrefab: state.setPrefab,
	}));
	const setIsPrefabsModalOpen = useCanvasStore((state) => state.setIsPrefabsModalOpen);
	const resetInputStore = useInputStore((state) => state.resetInputStore);

	function handleClick() {
		setActivePrefabId(prefabId);
		resetInputStore();
		setIsPrefabsModalOpen(false);
	}

	return (
		<div
			onClick={() => handleClick()}
			className="px-2 py-1 text-sm  shadow-md text-white min-h-5 w-full flex items-center cursor-pointer bg-zinc-800  transition hover:brightness-125 font-default"
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
					{prefabs && prefabs.map((prefab) => <Prefab key={prefab.id} prefabId={prefab.id.toString()} prefabName={prefab.name} />)}
				</div>
			</div>
		</div>
	);
};

export default Prefabs;
