import { Vec2 } from "@core/math/vector";

export enum ColliderType {
    Rect,
    Circle,
}

export type CircleCollider = {
    center: Vec2;
    radius: number;
};

export type RectCollider = {
    bl: Vec2;
    tr: Vec2;
};

export type PrefabCollider = {
    type: ColliderType;
    data: CircleCollider | RectCollider;
};
