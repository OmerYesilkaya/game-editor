import create from "zustand";
import { Prefab } from "@app/types";
import uniqId from "uniqid";

type PrefabStoreProps = {
	activePrefabId: string | null;
	prefabs: Prefab[];
	moduleIds: number[];
	addModule: (id: number) => void;
	removeModule: (id: number) => void;
	addPrefab: () => void;
	removePrefab: (id: number) => void;
	setActivePrefabId: (id: string | null) => void;
};

export const usePrefabStore = create<PrefabStoreProps>((set, get) => ({
	activePrefabId: null,
	prefabs: [],
	moduleIds: [],
	addModule: (id) => set((prev) => ({ moduleIds: [...prev.moduleIds, id] })),
	removeModule: (id) =>
		set((prev) => {
			const moduleIds = [...prev.moduleIds];
			const targetIdx = moduleIds.findIndex((moduleId) => moduleId === id);
			moduleIds.splice(targetIdx, 1);
			return { moduleIds };
		}),
	addPrefab: () => {
		const id = uniqId();
		set((prev) => ({
			prefabs: [...prev.prefabs, { id: 0, name: "New Prefab", moduleIds: [], internalId: id, position: { x: 0, y: 0 } }],
			activePrefabId: id,
		}));
	},
	removePrefab: (id) =>
		set((prev) => {
			const newPrefabs = prev.prefabs;
			const targetIdx = newPrefabs.findIndex((prefab) => prefab.id === id);
			newPrefabs.splice(targetIdx, 1);
			return { prefabs: newPrefabs };
		}),
	setActivePrefabId: (id) => set(() => ({ activePrefabId: id })),
}));
