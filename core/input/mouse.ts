import { Vec2 } from "@core/math/vector";

export type MouseState = {
    normalized: Vec2;
    world: Vec2;

    isDragging: boolean;
    dragStartTime: number;

    lastClickWorld: Vec2;
    lastClickNormalized: Vec2;
};
