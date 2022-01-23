import create from "zustand";

type TimelineAnimations = {
	[key: string]: number[];
};

type TimelineStoreTypes = {
	activeTimelines: TimelineAnimations | null;
	setActiveTimelines: (prefabId: string, value: number[]) => void;
	addAnimation: (prefabId: string, id: number) => void;
	removeAnimation: (prefabId: string, id: number) => void;
};

export const useTimelineStore = create<TimelineStoreTypes>((set) => ({
	activeTimelines: null,
	setActiveTimelines: (prefabId, value) => set((prev) => ({ activeTimelines: { ...prev.activeTimelines, [prefabId]: value } })),
	addAnimation: (prefabId, id) =>
		set((prev) => {
			const activeTimelines = prev.activeTimelines;
			const existingAnimationIds = activeTimelines ? activeTimelines[prefabId] : [];
			return { activeTimelines: { ...activeTimelines, [prefabId]: [...existingAnimationIds, id] } };
		}),
	removeAnimation: (prefabId, id) =>
		set((prev) => {
			const activeTimelines = prev.activeTimelines;
			if (!activeTimelines) return { activeTimelines: activeTimelines };
			const existingAnimationIds = activeTimelines[prefabId];
			return { activeTimelines: { ...activeTimelines, [prefabId]: existingAnimationIds.filter((existingId) => existingId !== id) } };
		}),
}));
