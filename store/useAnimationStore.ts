import create from "zustand";
import { Animation } from "@app/types";

type AnimationStoreTypes = {
	animations: Animation[];
	setAnimations: (value: Animation[]) => void;
};

export const useAnimationStore = create<AnimationStoreTypes>((set) => ({
	animations: [],
	setAnimations: (value) => set({ animations: value }),
}));
