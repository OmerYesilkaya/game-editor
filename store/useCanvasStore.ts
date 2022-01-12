import { ModuleValueType } from "@app/types";

import create from "zustand";

type CanvasStoreTypes = {
	activeAssetInput: { id: number; type: ModuleValueType } | null;
	activeWindowIds: string[];
	isPrefabsModalOpen: boolean;
	setIsPrefabsModalOpen: (value: boolean) => void;
	setActiveAssetInput: (value: { id: number; type: ModuleValueType } | null) => void;
	setActiveWindowIds: (ids: string[]) => void;
	toggleActivation: (id: string) => void;
};

export const useCanvasStore = create<CanvasStoreTypes>((set) => ({
	activeAssetInput: null,
	activeWindowIds: [],
	isPrefabsModalOpen: false,
	setIsPrefabsModalOpen: (value) => {
		console.log("setting to", value);
		set(() => ({ isPrefabsModalOpen: value }));
	},
	setActiveAssetInput: (value) => set(() => ({ activeAssetInput: value })),
	setActiveWindowIds: (ids) => set(() => ({ activeWindowIds: ids })),
	toggleActivation: (id) => {
		set((prev) => {
			const index = prev.activeWindowIds.indexOf(id);
			if (index === -1) {
				return { activeWindowIds: [...prev.activeWindowIds, id] };
			} else {
				prev.activeWindowIds.splice(index, 1);
				return { activeWindowIds: prev.activeWindowIds };
			}
		});
	},
}));
