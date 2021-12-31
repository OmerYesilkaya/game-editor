import create from "zustand";

type PrefabStoreProps = {
	moduleIds: number[];
	addModule: (id: number) => void;
	removeModule: (id: number) => void;
};

export const usePrefabStore = create<PrefabStoreProps>((set, get) => ({
	moduleIds: [],
	addModule: (id: number) => set((prev) => ({ moduleIds: [...prev.moduleIds, id] })),
	removeModule: (id) =>
		set((prev) => {
			const moduleIds = [...prev.moduleIds];
			const targetIdx = moduleIds.findIndex((moduleId) => moduleId === id);
			moduleIds.splice(targetIdx, 1);
			return { moduleIds };
		}),
}));
