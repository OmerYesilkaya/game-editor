import { EditorSlice, TimelineAnimations, TimelineSlice } from "./types";

export const createTimelineSlice: EditorSlice<TimelineSlice> = (set, get) => ({
    activeTimelines: {},
    setTimelines: (value) => set(() => ({ activeTimelines: value })),
    setActiveTimelines: (prefabId, value) => set((prev) => ({ activeTimelines: { ...prev.activeTimelines, [prefabId]: value } })),
    addAnimation: (prefabId, id) =>
        set((prev) => {
            const activeTimelines = prev.activeTimelines;
            const existingAnimationIds = activeTimelines[prefabId] ?? [];
            return { activeTimelines: { ...activeTimelines, [prefabId]: [...existingAnimationIds, id] } };
        }),
    removeAnimation: (prefabId, id) =>
        set((prev) => {
            const activeTimelines = prev.activeTimelines;
            const existingAnimationIds = activeTimelines[prefabId] ?? [];
            return { activeTimelines: { ...activeTimelines, [prefabId]: existingAnimationIds.filter((existingId) => existingId !== id) } };
        }),
    clearAllTimelines: () =>
        set((prev) => {
            const newTimelines: TimelineAnimations = {};
            Object.keys(prev.activeTimelines).forEach((key) => (newTimelines[key] = []));
            return { activeTimelines: newTimelines };
        }),
});
