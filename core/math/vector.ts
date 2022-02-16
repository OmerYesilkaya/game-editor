export type Vec2 = {
    x: number;
    y: number;
};

export type Vec3 = {
    x: number;
    y: number;
    z: number;
};

export type Vec4 = {
    x: number;
    y: number;
    z: number;
    w: number;
};

export function dist(v1: Vec2, v2: Vec2) {
    return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
}

export function rotate(v: Vec2, angle: number): Vec2 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = v.x * cos + sin * v.y * -1;
    const y = v.x * sin + v.y * cos;
    return { x: x, y: y };
}
