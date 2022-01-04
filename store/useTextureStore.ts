import create from "zustand";
import { Texture, RawTexture } from "@app/types";

type TextureStoreTypes = {
	textures: Texture[];
	rawTextures: RawTexture[];
	setRawTextures: (textures: RawTexture[]) => void;
};

export const useTextureStore = create<TextureStoreTypes>((set) => ({
	textures: [],
	rawTextures: [],
	setRawTextures: (textures) => {
		textures.forEach((raw) => {
			const image = new Image();
			image.src = raw.texture as string;
			image.onload = () => {
				set((prev) => ({ textures: [...prev.textures, { id: raw.id, image }], rawTextures: textures }));
			};
		});
	},
}));
