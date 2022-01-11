import { PlusIcon } from "@heroicons/react/outline";

import { usePrefabStore } from "@app/store";

import cn from "classnames";
import api from "hooks/api";

const Prefab: React.FC<{ prefabId: number; prefabName: string }> = ({ prefabId, prefabName }) => {
	const { activePrefabId, setActivePrefabId } = usePrefabStore((state) => ({
		activePrefabId: state.activePrefabId,
		setActivePrefabId: state.setActivePrefabId,
	}));

	return (
		<div
			onClick={() => setActivePrefabId(prefabId)}
			className={cn(
				"px-2 py-1 text-sm rounded-sm shadow-md text-white min-h-5 w-full flex items-center cursor-pointer  transition hover:bg-zinc-600 font-default",
				{
					"bg-zinc-600": activePrefabId === prefabId,
					"bg-zinc-700": activePrefabId !== prefabId,
				}
			)}
		>
			<div>{prefabName.toUpperCase()}</div>
		</div>
	);
};

const Prefabs: React.FC = () => {
	const createNewPrefab = usePrefabStore((state) => state.createNewPrefab);

	const { data: prefabs } = api.useGetPrefabs();

	return (
		<div className="flex flex-col h-full justify-between">
			<div className="flex flex-col">
				<div className="mt-1 flex flex-col gap-y-1">
					{prefabs && prefabs.map((prefab) => <Prefab key={prefab.id} prefabId={prefab.id} prefabName={prefab.name} />)}
				</div>
			</div>
			<button
				type="button"
				className="bg-emerald-600 mt-1 rounded-sm text-white px-2 py-1 text-sm font-default font-bold shadow-md flex items-center justify-between transition hover:bg-emerald-700"
				onClick={() => createNewPrefab()}
			>
				CREATE PREFAB
				<PlusIcon className="w-4 h-4 ml-2 text-emerald-600 bg-white rounded-sm" />
			</button>
		</div>
	);
};

export default Prefabs;
