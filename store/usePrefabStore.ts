import create from "zustand";
import { Prefab, ApiModule } from "@app/types";
import { v4 as uuid } from "uuid";

type PrefabStoreProps = {
	prefab: Prefab | null;
	activePrefabId: number | null;
	setActivePrefabId: (id: number | null) => void;
	addModuleToPrefab: (module: ApiModule) => void;
	removeModuleFromPrefab: (moduleId: number) => void;
	createNewPrefab: () => void;
	setPrefab: (value: Prefab | null) => void;
	updatePrefabValue: (moduleId: number, value: any) => void;
	setName: (name: string) => void;
};

export const usePrefabStore = create<PrefabStoreProps>((set, get) => ({
	prefab: null,
	activePrefabId: null,
	setActivePrefabId: (id) => {
		set(() => ({ activePrefabId: id }));
	},
	addModuleToPrefab: (module) => {
		const prefab = get().prefab;
		if (!prefab) return;

		prefab.modules.push(module);
		set(() => ({ prefab }));
	},
	removeModuleFromPrefab: (moduleId) => {
		const prefab = get().prefab;
		if (!prefab) return;

		prefab.modules = prefab.modules.filter((module) => module.id !== moduleId);
		set(() => ({ prefab }));
	},
	createNewPrefab: () => {
		set(() => ({
			prefab: {
				id: 0,
				name: "Unnamed Prefab",
				modules: [],
				internalId: uuid(),
				position: {
					x: 0,
					y: 0,
				},
			},
			activePrefabId: null,
		}));
	},
	setPrefab: (value) => set(() => ({ prefab: value })),
	updatePrefabValue: (moduleId, value) => {
		const prefab = get().prefab;
		if (!prefab) return;

		const newModules = prefab.modules.map((module) => {
			if (module.id === moduleId) {
				module.value = value;
			}
			return module;
		});

		set({ prefab: { ...prefab, modules: newModules } });
	},
	setName: (name) => {
		const prefab = get().prefab;
		if (!prefab) return;
		prefab.name = name;

		set(() => ({ prefab }));
	},
}));
