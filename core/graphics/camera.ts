import { Camera } from "@react-three/fiber";
import * as THREE from "three";

// Converts mouse position to webgl scene position
export function projectScreenToWorld(pos: { x: number; y: number }, camera: Camera): THREE.Vector3 {
    const v = new THREE.Vector3();
    const r = new THREE.Vector3();
    v.set(pos.x, pos.y, 0.5);
    v.unproject(camera);
    r.copy(v);
    return r;
}

// Returns the local position relative to
// the given rect and normalized between -1 to 1
export function getNormalizedPosition(x: number, y: number, bounds: DOMRect): { x: number; y: number } {
    return {
        x: ((x - bounds!.left) / bounds!.width) * 2 - 1,
        y: -(((y - bounds!.top) / bounds!.height) * 2 - 1),
    };
}
