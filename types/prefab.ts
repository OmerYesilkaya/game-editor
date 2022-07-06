import { Vec2, Vec3 } from "@core/math/vector";
import { PrefabCollider } from "features/prefab-scene/types/collider";
import { ApiModule } from ".";

export type PrefabTransform = {
    position: Vec3;
    scale: Vec2;
    rotation: number;
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
    children: PostPrefabRequest[];
    transform: PrefabTransform;
    renderer: { isVisible: boolean };
    colliders: PrefabCollider[];
};

export type PutPrefabRequest = {
    id: number;
    name: string;
    modules: {
        arrayIndex: number;
        modulePartId: number;
        value: any;
    }[];
    children: PutPrefabRequest[];
    transform: PrefabTransform;
    renderer: { isVisible: boolean };
    colliders: PrefabCollider[];
};

export type GetPrefabResponse = {
    id: number;
    modules: ApiModule[];
    name: string;
    position: { x: number; y: number };
    children: GetPrefabResponse[];
    transform: PrefabTransform;
    colliders: PrefabCollider[];
    parentId: number;
    renderer: { isVisible: boolean };
};
