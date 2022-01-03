import { Sprite } from "@app/types";
import create from "zustand";

type SpriteStoreTypes = {
	sprites: Sprite[];
	setSprites: (sprites: Sprite[]) => void;
};

export const useSpriteStore = create<SpriteStoreTypes>((set) => ({
	sprites: [],
	setSprites: (value) => set({ sprites: value }),
}));
