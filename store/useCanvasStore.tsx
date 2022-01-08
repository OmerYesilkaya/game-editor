import { AssetFileTypes } from "@app/types";

import create from "zustand";

type CanvasStoreTypes = {
	activeAssetInput: { id: number; type: AssetFileTypes } | null;
	activeWindowIds: string[];
	setActiveAssetInput: (value: { id: number; type: AssetFileTypes } | null) => void;
	setActiveWindowIds: (ids: string[]) => void;
	toggleActivation: (id: string) => void;
};

export const useCanvasStore = create<CanvasStoreTypes>((set) => ({
	activeAssetInput: null,
	activeWindowIds: [],
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
