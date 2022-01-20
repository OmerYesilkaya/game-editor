import { ModuleValueType, GenericAsset } from "@app/types";

import create from "zustand";

type CanvasStoreTypes = {
	activeAssetInput: { id: number; type: ModuleValueType } | null;
	activeWindowIds: string[];
	isPrefabsModalOpen: boolean;
	genericWindowData: { assets: GenericAsset[]; type: ModuleValueType };
	setIsPrefabsModalOpen: (value: boolean) => void;
	setActiveAssetInput: (value: { id: number; type: ModuleValueType } | null) => void;
	setActiveWindowIds: (ids: string[]) => void;
	setGenericWindowData: (data: { assets: GenericAsset[]; type: ModuleValueType }) => void;
	toggleActivation: (id: string) => void;
	activateWindow: (id: string) => void;
	deactivateWindow: (id: string) => void;
};

export const useCanvasStore = create<CanvasStoreTypes>((set) => ({
	activeAssetInput: null,
	activeWindowIds: [],
	isPrefabsModalOpen: false,
	genericWindowData: { assets: [], type: ModuleValueType.Material },
	setIsPrefabsModalOpen: (value) => set(() => ({ isPrefabsModalOpen: value })),
	setActiveAssetInput: (value) => set(() => ({ activeAssetInput: value })),
	setActiveWindowIds: (ids) => set(() => ({ activeWindowIds: ids })),
	setGenericWindowData: (data) => set(() => ({ genericWindowData: data })),
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
	activateWindow: (id) => {
		set((prev) => {
			const activeWindowIds = prev.activeWindowIds;
			if (activeWindowIds.includes(id)) {
				return { activeWindowIds };
			} else {
				return { activeWindowIds: [...activeWindowIds, id] };
			}
		});
	},
	deactivateWindow: (id) => {
		set((prev) => {
			const activeWindowIds = prev.activeWindowIds;
			if (activeWindowIds.includes(id)) {
				return { activeWindowIds: activeWindowIds.filter((activeWindowId) => activeWindowId !== id) };
			} else {
				return { activeWindowIds };
			}
		});
	},
}));
