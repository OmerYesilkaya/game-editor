import { ANIMATION_SPEEDS } from "@app/constants";
import { EditorSlice, PreviewSlice } from "./types";

export const createPreviewSlice: EditorSlice<PreviewSlice> = (set, get) => ({
    zoom: 5,
    speedIndex: 2,
    previewState: { activePreview: null, currentFrame: 0, temporaryPreview: null },
    increaseZoom: (incrementValue) =>
        set((state) => ({
            zoom: Math.min(10, state.zoom + incrementValue),
        })),
    decreaseZoom: (decrementValue) =>
        set((state) => ({
            zoom: Math.max(2, state.zoom - decrementValue),
        })),
    setTemporaryPreview: (value) => {
        const state = get().previewState;
        state.temporaryPreview = value;
        state.currentFrame = 0;
    },
    setActivePreview: (value) => {
        const state = get().previewState;
        state.activePreview = value;
        state.currentFrame = 0;
    },
    increaseCurrentFrame: () => {
        const state = get().previewState;
        state.currentFrame += 1;
    },
    decreaseCurrentFrame: () => {
        const state = get().previewState;
        state.currentFrame -= 1;
    },
    getCurrentSpeed: () => ANIMATION_SPEEDS[get().speedIndex].value,
    nextAnimationSpeed: () =>
        set((prev) => ({
            speedIndex: (prev.speedIndex + 1) % ANIMATION_SPEEDS.length,
        })),
});
