import create from "zustand";

import { Animation, Sprite, Audio, GenericAsset } from "@app/types";

type AssetStoreTypes = {
	animations: Animation[];
	sprites: Sprite[];
	audios: Audio[];
	materials: GenericAsset[];
	particleSystems: GenericAsset[];
	trailSystems: GenericAsset[];
	prefabs: GenericAsset[];
	itemPools: GenericAsset[];
	materialAnimations: GenericAsset[];
	setAnimations: (value: Animation[]) => void;
	setSprites: (value: Sprite[]) => void;
	setAudios: (value: Audio[]) => void;
	setMaterials: (value: GenericAsset[]) => void;
	setParticleSystems: (value: GenericAsset[]) => void;
	setTrailSystems: (value: GenericAsset[]) => void;
	setPrefabs: (value: GenericAsset[]) => void;
	setItemPools: (value: GenericAsset[]) => void;
	setMaterialAnimations: (value: GenericAsset[]) => void;
};

export const useAssetStore = create<AssetStoreTypes>((set) => ({
	animations: [],
	sprites: [],
	audios: [],
	materials: [],
	particleSystems: [],
	trailSystems: [],
	prefabs: [],
	itemPools: [],
	materialAnimations: [],
	setAnimations: (value) => set({ animations: value }),
	setSprites: (value) => set({ sprites: value }),
	setAudios: (value) => set({ audios: value }),
	setMaterials: (value) => set({ materials: value }),
	setParticleSystems: (value) => set({ particleSystems: value }),
	setTrailSystems: (value) => set({ trailSystems: value }),
	setPrefabs: (value) => set({ prefabs: value }),
	setItemPools: (value) => set({ itemPools: value }),
	setMaterialAnimations: (value) => set({ materialAnimations: value }),
}));
