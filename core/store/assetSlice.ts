import { Sprite, Animation } from "@app/types";
import { AssetSlice, EditorSlice } from "./types";

export const createAssetSlice: EditorSlice<AssetSlice> = (set, get) => ({
    sprites: [],
    animations: [],
    animationMap: {},
    spriteMap: {},
    loadSprites: (sprites) =>
        set(() => {
            const spriteMap: Dictionary<Sprite> = {};
            sprites.forEach((x) => (spriteMap[x.id] = x));
            return { sprites: sprites, spriteMap: spriteMap };
        }),
    loadAnimations: (animations) =>
        set(() => {
            const animationMap: Dictionary<Animation> = {};
            animations.forEach((x) => (animationMap[x.id] = x));
            return {
                animationMap: animationMap,
                animations: animations,
            };
        }),
});
