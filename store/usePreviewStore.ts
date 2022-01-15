import { Sprite } from "@app/types";
import create from "zustand";
import { ANIMATION_SPEEDS } from "@app/constants";

type Preview = Sprite[] | Sprite | null;

type PreviewStoreTypes = {
	speedIndex: number;
	currentFrame: number;
	activePreview: Preview;
	temporaryPreview: Preview;
	zoom: number;
	increaseZoom: (incrementValue: number) => void;
	decreaseZoom: (decrementValue: number) => void;
	setTemporaryPreview: (value: Preview) => void;
	setActivePreview: (value: Preview) => void;
	increaseCurrentFrame: () => void;
	decreaseCurrentFrame: () => void;
	getCurrentSpeed: () => number;
	nextAnimationSpeed: () => void;
};

export const usePreviewStore = create<PreviewStoreTypes>((set, get) => ({
	speedIndex: 2,
	currentFrame: 0,
	activePreview: null,
	temporaryPreview: null,
	zoom: 5,
	increaseZoom: (incrementValue) => set((prev) => ({ zoom: Math.min(10, prev.zoom + incrementValue) })),
	decreaseZoom: (decrementValue) => set((prev) => ({ zoom: Math.max(2, prev.zoom - decrementValue) })),
	setTemporaryPreview: (value) => set(() => ({ temporaryPreview: value, currentFrame: 0 })),
	setActivePreview: (value) => set(() => ({ activePreview: value, currentFrame: 0 })),
	increaseCurrentFrame: () => {
		let currentFrame = get().currentFrame;
		set(() => ({ currentFrame: ++currentFrame }));
	},
	decreaseCurrentFrame: () => {
		let currentFrame = get().currentFrame;
		set(() => ({ currentFrame: --currentFrame }));
	},
	getCurrentSpeed: () => ANIMATION_SPEEDS[get().speedIndex].value,
	nextAnimationSpeed: () => set((prev) => ({ speedIndex: (prev.speedIndex + 1) % ANIMATION_SPEEDS.length })),
}));
