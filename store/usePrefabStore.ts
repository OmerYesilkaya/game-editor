import create from "zustand";
import { Prefab, Module, ApiModule, Input } from "@app/types";
import uniqId from "uniqid";

type PrefabStoreProps = {
	prefab: Prefab | null;
	activePrefabId: number | null;
	setActivePrefabId: (id: number | null) => void;
	addModuleToPrefab: (module: Module) => void;
	removeModuleFromPrefab: (moduleId: number) => void;
	createNewPrefab: () => void;
	setPrefab: (value: Prefab | null) => void;
	updatePrefabValue: (moduleId: number, value: any) => void;
	setName: (name: string) => void;
	getModules: () => Input[];
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
				name: "New Prefab",
				modules: [],
				internalId: uniqId(),
				position: {
					x: 0,
					y: 0,
				},
			},
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
	// gets furthest branching modules of prefab
	getModules: () => {
		const prefab = get().prefab;
		if (!prefab) return [];
		const processingQueue: ApiModule[] = [];
		const valueModules: Input[] = [];

		prefab.modules.forEach((module) => {
			processingQueue.push(module);
		});

		while (processingQueue.length > 0) {
			const module = processingQueue.pop();
			module?.children?.forEach((child) => {
				if (child.children) {
					processingQueue.push(child);
				} else {
					valueModules.push({ id: child.id, value: child.value, valueType: child.valueType });
				}
			});
		}

		return valueModules;
	},
}));
