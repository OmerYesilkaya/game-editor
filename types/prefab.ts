import { Vec2 } from "@core/math/vector";
import { ApiModule } from ".";

export type PrefabTransform = {
    position: Vec2;
    scale: Vec2;
    rotation: number;
};

export type PrefabCollider = {
    offset: Vec2;
};

export type Prefab = {
    id: number;
    name: string;
    transform: PrefabTransform;
    colliders: PrefabCollider[];
    modules: ApiModule[];
    internalId: string;
    position: { x: number; y: number };
    children: Prefab[];
};

export type PostPrefabRequest = {
    name: string;
    modules: {
        arrayIndex: number;
        modulePartId: number;
        value: any;
    }[];
};

export type GetPrefabResponse = {
    id: number;
    modules: ApiModule[];
    name: string;
    position: { x: number; y: number };
    children: GetPrefabResponse[];
};
