import {
    Edge,
    Triangle,
    areEdgesEqual,
    createTriangle,
    doesShareVertex,
    getTriangleEdgesInPlace,
    isCounterClockwise,
    isPointInCircumcircle,
} from "@core/math/triangle";
import { Vec2 } from "@core/math/vector";
import { v4 as uuid } from "uuid";

const superTriangle: TriangleInfo = {
    t: [
        { x: -10000, y: -10000 },
        { x: -10000, y: 10000 },
        { x: 10000, y: 0 },
    ],
    id: "super",
    ccw: false,
};

/**
 * Caches some additional info about triangle to speed up some algorithms
 */
type TriangleInfo = {
    t: Triangle;
    id: string;
    ccw: boolean;
};

function edgeExistsInOtherTriangles(e: Edge, triangles: TriangleInfo[], id: string): boolean {
    const edges = [{}, {}, {}] as [Edge, Edge, Edge];
    for (let i = 0; i < triangles.length; i++) {
        if (triangles[i].id === id) continue;
        getTriangleEdgesInPlace(triangles[i].t, edges);
        for (let j = 0; j < edges.length; j++) {
            if (areEdgesEqual(edges[j], e)) return true;
        }
    }
    return false;
}

export function triangulate(points: Vec2[]): Triangle[] {
    const triangles: Dictionary<TriangleInfo> = {};
    triangles["super"] = superTriangle;
    for (let i = 0; i < points.length; i++) {
        const badTriangles: TriangleInfo[] = [];
        const point = points[i];
        const triangleIds = Object.keys(triangles);
        triangleIds.forEach((k) => {
            const info = triangles[k];
            if (info.ccw == isPointInCircumcircle(point, info.t)) {
                badTriangles.push(info);
            }
        });
        const polygon: Edge[] = [];
        const edges = [{}, {}, {}] as [Edge, Edge, Edge];
        badTriangles.forEach((triangleInfo) => {
            getTriangleEdgesInPlace(triangleInfo.t, edges);
            edges.forEach((edge) => {
                if (!edgeExistsInOtherTriangles(edge, badTriangles, triangleInfo.id)) {
                    polygon.push(edge);
                }
            });
        });

        badTriangles.forEach((t) => {
            if (triangles.hasOwnProperty(t.id)) {
                delete triangles[t.id];
            }
        });
        polygon.forEach((e) => {
            const triangle = createTriangle(e, point);
            const id = uuid();
            triangles[id] = {
                t: triangle,
                id: id,
                ccw: isCounterClockwise(triangle),
            };
        });
    }
    const triangleIds = Object.keys(triangles);
    for (let i = 0; i < triangleIds.length; i++) {
        const id = triangleIds[i];
        if (doesShareVertex(superTriangle.t, triangles[id].t)) {
            delete triangles[id];
        }
    }

    return Object.keys(triangles).map((key) => triangles[key].t);
}
