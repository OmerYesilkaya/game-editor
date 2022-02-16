import { dist, Vec2 } from "./vector";

export type Circle = {
    center: Vec2;
    r: number;
};

export function intersectionCircleCircle(c1: Circle, c2: Circle): [boolean, Vec2, Vec2] {
    const d = dist(c1.center, c2.center);
    if (d > c1.r + c2.r) return [false, { x: 0, y: 0 }, { x: 0, y: 0 }];
    if (d < c1.r - c2.r) return [false, { x: 0, y: 0 }, { x: 0, y: 0 }];

    // Length of first circle to middle point
    const a = (c1.r * c1.r - c2.r * c2.r + d * d) / (2 * d);

    // Length of middle point to intersection point
    const h = Math.sqrt(c1.r * c1.r - a * a);

    // Find the center point between circles
    const mx = c1.center.x + (a * (c2.center.x - c1.center.x)) / d;
    const my = c1.center.y + (a * (c2.center.y - c1.center.y)) / d;

    const ix1 = mx + (h * (c2.center.y - c1.center.y)) / d;
    const ix2 = mx - (h * (c2.center.y - c1.center.y)) / d;
    const iy1 = my - (h * (c2.center.x - c1.center.x)) / d;
    const iy2 = my + (h * (c2.center.x - c1.center.x)) / d;
    return [true, { x: ix1, y: iy1 }, { x: ix2, y: iy2 }];
}
