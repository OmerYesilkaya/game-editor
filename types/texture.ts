export type RawTexture = {
    id: number;
    texture: string | File | ArrayBuffer | null;
};

export type TextureInfo = {
    id: number;
    image: HTMLImageElement;
    texture: THREE.Texture;
};
