import create from "zustand";
import animationSpeeds from "constants/baseAnimationSpeed";

type AnimationStoreTypes = {
	speedIndex: number;
	getCurrentSpeed: () => number;
	nextAnimationSpeed: () => void;
};

export const useAnimationStore = create<AnimationStoreTypes>((set, get) => ({
	speedIndex: 2,
	getCurrentSpeed: () => animationSpeeds[get().speedIndex].value,
	nextAnimationSpeed: () => set((prev) => ({ speedIndex: (prev.speedIndex + 1) % animationSpeeds.length })),
}));
