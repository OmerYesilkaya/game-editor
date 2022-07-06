import { Camera } from "@react-three/fiber";
import * as THREE from "three";
import { TextureInfo } from "types/texture";

// Converts mouse position to webgl scene position
function projectMousePosToWorldPos(pos: { x: number; y: number }, camera: Camera): THREE.Vector3 {
    const v = new THREE.Vector3();
    const r = new THREE.Vector3();
    v.set(pos.x, pos.y, -1);
    v.unproject(camera);
    r.copy(v);
    return r;
    v.sub(camera.position).normalize();
    const d = -camera.position.z / v.z;
    r.copy(camera.position).add(v.multiplyScalar(d));
    return r;
}

// Returns the local mouse position relative to
// the given rect and normalized between -1 to 1
function getLocalMousePos(x: number, y: number, bounds: DOMRect): { x: number; y: number } {
    return {
        x: ((x - bounds!.left) / bounds!.width) * 2 - 1,
        y: -(((y - bounds!.top) / bounds!.height) * 2 - 1),
    };
}

function setTexture(mat: any, textureId: number, textures: TextureInfo[]) {
    for (let i = 0; i < textures.length; i++) {
        if (textures[i].id === textureId) {
            mat.uTexture = textures[i].texture;
            mat.uTextureSize = new THREE.Vector2(textures[i].image.width, textures[i].image.height);
        }
    }
}

function createBufferAttribute() {
    const maxPointCount = 100;
    const points = [];
    for (let i = 0; i < 3 * maxPointCount; i++) {
        points.push(0);
    }

    const vertices = new Float32Array(points);
    return new THREE.BufferAttribute(vertices, 3);
}

export default { projectMousePosToWorldPos, getLocalMousePos, setTexture, createBufferAttribute };
