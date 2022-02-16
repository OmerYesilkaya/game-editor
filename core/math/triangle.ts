import { EPSILON } from "./constant";
import { Vec2 } from "./vector";

export type Triangle = [Vec2, Vec2, Vec2];
export type Edge = [Vec2, Vec2];

/**
 * Returns whether given triangle is counter clockwise or not
 * @param t Triangle
 * @returns True if given triangle is ordered counter clockwise
 */
export function isCounterClockwise(t: Triangle): boolean {
    return (t[1].x - t[0].x) * (t[2].y - t[0].y) - (t[2].x - t[0].x) * (t[1].y - t[0].y) > 0;
}

/**
 * Returns the three edges of given triangle
 * @param t Triangle
 * @returns Edges for the given triangle
 */
export function getTriangleEdges(t: Triangle): [Edge, Edge, Edge] {
    return [
        [t[0], t[1]],
        [t[1], t[2]],
        [t[2], t[0]],
    ];
}

/**
 * Returns the three edges of given triangle using the provided arra.y so it doesn't
 * allocate memory eveytime it is called.
 * @param t Triangle
 * @returns Edges for the given triangle
 */
export function getTriangleEdgesInPlace(t: Triangle, edges: [Edge, Edge, Edge]) {
    edges[0] = [t[0], t[1]];
    edges[1] = [t[1], t[2]];
    edges[2] = [t[2], t[0]];
}

/**
 * Returns whether point is inside the circumcircle of triangle or not.
 * If triangle is not counterclockwise result should be flipped.
 * @param p Point to check
 * @param t Triangle
 * @returns True if point is inside triangle
 */
export function isPointInCircumcircle(p: Vec2, t: Triangle): boolean {
    let ax_ = t[0].x - p.x;
    let ay_ = t[0].y - p.y;
    let bx_ = t[1].x - p.x;
    let by_ = t[1].y - p.y;
    let cx_ = t[2].x - p.x;
    let cy_ = t[2].y - p.y;

    return (
        (ax_ * ax_ + ay_ * ay_) * (bx_ * cy_ - cx_ * by_) -
            (bx_ * bx_ + by_ * by_) * (ax_ * cy_ - cx_ * ay_) +
            (cx_ * cx_ + cy_ * cy_) * (ax_ * by_ - bx_ * ay_) >
        0
    );
}

export function areEdgesEqual(e1: Edge, e2: Edge) {
    return (
        (e1[0].x === e2[0].x && e1[0].y === e2[0].y && e1[1].x === e2[1].x && e1[1].y === e2[1].y) ||
        (e1[1].x === e2[0].x && e1[1].y === e2[0].y && e1[0].x === e2[1].x && e1[0].y === e2[1].y)
    );
}

export function edgeExistsInTriangles(e: Edge, triangles: Triangle[]): boolean {
    const edges = [{}, {}, {}] as [Edge, Edge, Edge];
    for (let i = 0; i < triangles.length; i++) {
        getTriangleEdgesInPlace(triangles[i], edges);
        for (let j = 0; j < edges.length; j++) {
            if (areEdgesEqual(edges[j], e)) return true;
        }
    }
    return false;
}

export function createTriangle(e: Edge, p: Vec2): Triangle {
    return [e[0], e[1], { x: p.x, y: p.y }];
}

export function doesShareVertex(t1: Triangle, t2: Triangle): boolean {
    for (let i = 0; i < t1.length; i++) {
        for (let j = 0; j < t2.length; j++) {
            if (Math.abs(t1[i].x - t2[j].x) + Math.abs(t1[i].y - t2[j].y) < 0.1) return true;
        }
    }
    return false;
}

export function circumcircle(t: Triangle) {
    // Vertices
    const a = t[0];
    const b = t[1];
    const c = t[2];

    // Middle points
    let bs1: Vec2 = { x: 0, y: 0 };
    let bs2: Vec2 = { x: 0, y: 0 };

    // Slopes
    let m1: number, m2: number;

    let fabsy1y2 = Math.abs(a.y - b.y),
        fabsy2y3 = Math.abs(b.y - c.y),
        xc,
        yc;

    /* Check for coincident points */
    if (fabsy1y2 < EPSILON && fabsy2y3 < EPSILON) return { x: 0, y: 0, r: 0 };

    if (fabsy1y2 < EPSILON) {
        m2 = -((c.x - b.x) / (c.y - b.y));
        bs2.x = (b.x + c.x) / 2.0;
        bs2.y = (b.y + c.y) / 2.0;
        xc = (b.x + a.x) / 2.0;
        yc = m2 * (xc - bs2.x) + bs2.y;
    } else if (fabsy2y3 < EPSILON) {
        m1 = -((b.x - a.x) / (b.y - a.y));
        bs1.x = (a.x + b.x) / 2.0;
        bs1.y = (a.y + b.y) / 2.0;
        xc = (c.x + b.x) / 2.0;
        yc = m1 * (xc - bs1.x) + bs1.y;
    } else {
        m1 = -((b.x - a.x) / (b.y - a.y));
        m2 = -((c.x - b.x) / (c.y - b.y));
        bs1.x = (a.x + b.x) / 2.0;
        bs2.x = (b.x + c.x) / 2.0;
        bs1.y = (a.y + b.y) / 2.0;
        bs2.y = (b.y + c.y) / 2.0;
        xc = (m1 * bs1.x - m2 * bs2.x + bs2.y - bs1.y) / (m1 - m2);
        yc = fabsy1y2 > fabsy2y3 ? m1 * (xc - bs1.x) + bs1.y : m2 * (xc - bs2.x) + bs2.y;
    }

    const dx = b.x - xc;
    const dy = b.y - yc;
    return { x: xc, y: yc, r: Math.sqrt(dx * dx + dy * dy) };
}
