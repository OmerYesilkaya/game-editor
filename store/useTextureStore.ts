import create from "zustand";

type RawTexture = {
	id: string;
	texture: StaticImageData;
};

type Texture = {
	id: string;
	image: HTMLImageElement;
};

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
			image.src = raw.texture.src;

			image.onload = () => {
				set((prev) => ({ textures: [...prev.textures, { id: raw.id, image }], rawTextures: textures }));
			};
		});
	},
}));
