import create from "zustand";
import { Prefab, Module } from "@app/types";
import uniqId from "uniqid";

type PrefabStoreProps = {
	activePrefabId: string | null;
	prefabs: Prefab[];
	modules: Module[];
	addModuleToPrefab: (modue: Module) => void;
	removeModuleFromPrefab: (id: number, prefabId: string) => void;
	getActivePrefab: () => Prefab | null;
	createPrefab: () => void;
	removePrefab: (id: number) => void;
	setActivePrefabId: (id: string | null) => void;
	setModules: (value: Module[]) => void;
	setPrefabs: (value: Prefab[]) => void;
};

export const usePrefabStore = create<PrefabStoreProps>((set, get) => ({
	activePrefabId: null,
	prefabs: [],
	modules: [],
	addModuleToPrefab: (module) => {
		const prefabs = get().prefabs;
		const activePrefabId = get().activePrefabId;
		let newPrefabs = prefabs.map((prefab) => {
			if (prefab.internalId === activePrefabId) {
				prefab.modules.push(module);
			}
			return prefab;
		});
		set(() => ({ prefabs: newPrefabs }));
	},
	removeModuleFromPrefab: (id, prefabId) =>
		set(() => {
			const prefabs = get().prefabs;

			const newPrefabs = prefabs.map((prefab) => {
				if (prefab.internalId === prefabId) {
					prefab.modules = prefab.modules.filter((module) => module.id !== id);
				}
				return prefab;
			});
			return { prefabs: newPrefabs };
		}),
	getActivePrefab: () => {
		const prefabId = get().activePrefabId;
		const prefabs = get().prefabs;
		const activePrefab = prefabs.find((prefab) => prefab.internalId === prefabId);
		return activePrefab ?? null;
	},
	createPrefab: () => {
		const id = uniqId();
		set((prev) => ({
			prefabs: [...prev.prefabs, { id: 0, name: "New Prefab", modules: [], internalId: id, position: { x: 0, y: 0 } }],
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
	setModules: (value: Module[]) => set(() => ({ modules: value })),
	setPrefabs: (value: Prefab[]) => set(() => ({ prefabs: value })),
}));
