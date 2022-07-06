import * as THREE from "three";
import { EditorSlice, TextureSlice } from "./types";

export const createTextureSlice: EditorSlice<TextureSlice> = (set, get) => ({
    textures: [],
    rawTextures: [],

    setTextures: (textures) => {
        textures.forEach((raw) => {
            const image = new Image();
            image.src = raw.texture as string;
            image.onload = () => {
                const t = new THREE.Texture();
                t.image = image;
                t.needsUpdate = true;
                t.magFilter = THREE.NearestFilter;
                set((prev) => ({
                    textures: [...prev.textures, { id: raw.id, image, texture: t }],
                }));
            };
        });
    },

    addTexture: (raw) => {
        const image = new Image();
        image.src = raw.texture as string;
        image.onload = () => {
            set((prev) => {
                const t = new THREE.Texture();
                t.image = image;
                t.needsUpdate = true;
                t.magFilter = THREE.NearestFilter;
                return {
                    textures: [...prev.textures, { id: raw.id, image, texture: t }],
                };
            });
        };
    },
});
