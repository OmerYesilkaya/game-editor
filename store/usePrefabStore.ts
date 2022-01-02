import create from "zustand";

type PrefabStoreProps = {
	moduleIds: number[];
	addModule: (id: number) => void;
	removeModule: (id: number) => void;
	activePreviewTexture: string | null;
	temporaryPreviewTexture: string | null;
	setActivePreviewTexture: (value: string) => void;
	setTemporaryPreviewTexture: (value: string) => void;
};

export const usePrefabStore = create<PrefabStoreProps>((set, get) => ({
	moduleIds: [],
	activePreviewTexture: null,
	temporaryPreviewTexture: null,
	setActivePreviewTexture: (value) => set(() => ({ activePreviewTexture: value })),
	setTemporaryPreviewTexture: (value) => set(() => ({ temporaryPreviewTexture: value })),
	addModule: (id) => set((prev) => ({ moduleIds: [...prev.moduleIds, id] })),
	removeModule: (id) =>
		set((prev) => {
			const moduleIds = [...prev.moduleIds];
			const targetIdx = moduleIds.findIndex((moduleId) => moduleId === id);
			moduleIds.splice(targetIdx, 1);
			return { moduleIds };
		}),
}));
