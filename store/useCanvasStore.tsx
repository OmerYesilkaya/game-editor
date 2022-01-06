import create from "zustand";

type CanvasStoreTypes = {
	activeWindowIds: string[];
	setActiveWindowIds: (ids: string[]) => void;
	toggleActivation: (id: string) => void;
};

export const useCanvasStore = create<CanvasStoreTypes>((set) => ({
	activeWindowIds: [],
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
