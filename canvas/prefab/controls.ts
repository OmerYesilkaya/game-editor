import { MouseState } from "@core/input/mouse";
import { triangulate } from "@core/graphics/procedural";
import { Vec2 } from "@core/math/vector";
import { usePrefabEditorStore, EditorState } from "@app/store";
import { EditorMode } from "@app/types";

export function onPrefabClick(id: string) {
    const store = usePrefabEditorStore.getState();
    const mat = store.entities[id].mat.current as any;
    if (store.selectedPrefabId == null && mat) {
        store.selectEntity(id);
        mat.uOutlineColor.set("red");
    }
}

export function onPrefabMiss() {
    const store = usePrefabEditorStore.getState();
    if (store.selectedPrefabId) {
        const mat = store.entities[store.selectedPrefabId].mat.current as any;
        store.selectEntity(null);
        mat.uOutlineColor.set("white");
    }
}

export function onMouseClick(state: MouseState) {}

export function onMouseDrag(state: MouseState) {
    // TODO(selim): Draw the temp collider while dragging
}

const MIN_DRAG_TIME = 200;
export function onMouseRelease(state: MouseState) {
    if (!state.isDragging) {
        const dragDuration = Date.now() - state.dragStartTime;
        if (dragDuration > MIN_DRAG_TIME) {
            const store = usePrefabEditorStore.getState();
            switch (store.mode) {
                case EditorMode.CircleCollider:
                    saveCircleCollider(state, store);
                    break;
                case EditorMode.RectCollider:
                    saveCircleCollider(state, store);
                    break;
                case EditorMode.TriangleCollider:
                    break;
                default:
                    break;
            }
        }
    }
}

// Saves the currently drawn temp collider to colliders
function saveRectCollider(startPosition: Vec2, endPosition: Vec2) {}

function saveCircleCollider(state: MouseState, store: EditorState) {
    const entities = store.entities;
    const selectedEntity = store.selectedEntity;
    if (selectedEntity) {
        const entity = entities[selectedEntity];
        const vertices = usePrefabEditorStore.getState().colliderVertices;
        const triangles = triangulate([...vertices, { x: state.world.x, y: state.world.y }]);

        for (let i = 0; i < triangles.length; i++) {
            const t = triangles[i];
            entity.geom.current?.attributes.position.setX(i * 3, t[0].x);
            entity.geom.current?.attributes.position.setY(i * 3, t[0].y);
            entity.geom.current?.attributes.position.setZ(i * 3, 0);

            entity.geom.current?.attributes.position.setX(i * 3 + 1, t[1].x);
            entity.geom.current?.attributes.position.setY(i * 3 + 1, t[1].y);
            entity.geom.current?.attributes.position.setZ(i * 3 + 1, 0);

            entity.geom.current?.attributes.position.setX(i * 3 + 2, t[2].x);
            entity.geom.current?.attributes.position.setY(i * 3 + 2, t[2].y);
            entity.geom.current?.attributes.position.setZ(i * 3 + 2, 0);
        }

        entity.geom.current!.attributes.position.needsUpdate = true;
        usePrefabEditorStore.getState().addColliderVertex({ x: state.world.x, y: state.world.y });
        entity.bufferIndex += 1;
    }
}
