export type RawTexture = {
	id: number;
	texture: string | File | ArrayBuffer | null;
};

export type Texture = {
	id: number;
	image: HTMLImageElement;
};
