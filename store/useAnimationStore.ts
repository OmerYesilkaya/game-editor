import create from "zustand";
import { AssetAnimation } from "@app/types";

type AnimationStoreTypes = {
	animations: AssetAnimation[];
	setAnimations: (value: AssetAnimation[]) => void;
};

export const useAnimationStore = create<AnimationStoreTypes>((set, get) => ({
	animations: [],
	setAnimations: (value) => set({ animations: value }),
}));
