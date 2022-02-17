import frag from "../shaders/sprite.frag";
import vert from "../shaders/sprite.vert";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { Sprite } from "types/assets";
import { v4 as uuid } from "uuid";

const CustomSpriteMaterial = shaderMaterial(
    {
        time: 0,
        color: new THREE.Color(0.05, 0.0, 0.025),
        uOutlineColor: new THREE.Color(0.05, 0.0, 0.025),
        uTexture: new THREE.Texture(),
        uTextureSize: new THREE.Vector2(),
        uSpriteRect: new THREE.Vector4(),
        uSpritePivot: new THREE.Vector2(),
        uPlaneSize: new THREE.Vector2(),
    },
    vert,
    frag
);

function setMaterialValues(mat: any, sprite: Sprite) {
    mat.uSpriteRect.x = sprite.rect.x;
    mat.uSpriteRect.y = sprite.rect.y;
    mat.uSpriteRect.z = sprite.rect.width;
    mat.uSpriteRect.w = sprite.rect.height;
    mat.uSpritePivot.x = sprite.pivot.x;
    mat.uSpritePivot.y = sprite.pivot.y;
}

function clearMaterialValues(mat: any) {
    if (!mat) return;
    mat.uSpriteRect.x = 0;
    mat.uSpriteRect.y = 0;
    mat.uSpriteRect.z = 0;
    mat.uSpriteRect.w = 0;
    mat.uSpritePivot.x = 0;
    mat.uSpritePivot.y = 0;
}

// @ts-ignore
CustomSpriteMaterial.key = uuid();
extend({ CustomSpriteMaterial });

export default { setMaterialValues, clearMaterialValues };
