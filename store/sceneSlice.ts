import React from "react";
import { EditorSlice, SceneSlice } from "./types";
import prefabsceneutils from "utils/prefabsceneutils";

import { EditorMode } from "features/prefab-scene/modes";

export const createSceneSlice: EditorSlice<SceneSlice> = (set) => ({
    mode: EditorMode.Default,

    // All the entities in the scene. Each entity represents a prefab.
    entities: {},

    // Currently selected entity. Entities can be selected
    // by clicking on them.
    selectedEntity: null,

    cameraRef: React.createRef(),
    canvasRef: React.createRef(),

    setEditorMode: (mode) => set(() => ({ mode: mode })),

    // Creates a new entity with default values and no sprites.
    createEntity: (id: string) =>
        set((prev) => ({
            entities: {
                ...prev.entities,
                [id]: {
                    textureId: -1,
                    spriteIndex: 0,
                    bufferIndex: 0,
                    buffer: prefabsceneutils.createBufferAttribute(),
                    geom: React.createRef(),
                    mat: React.createRef(),
                    group: React.createRef(),
                    mesh: React.createRef(),
                    sprites: [],
                    shouldUpdate: false,
                    prefabId: id,
                },
            },
        })),

    selectEntity: (id) => {
        set(() => ({ selectedEntity: id, selectedPrefabId: id }));
    },

    // These are drawn during drag and gets saved to collider array on confirmation
    tempCircleCollider: {},
    tempRectCollider: {},

    // TODO(selim): Remove these
    colliderVertices: [],
    addColliderVertex: (pos) =>
        set((prev) => ({
            colliderVertices: [...prev.colliderVertices, pos],
        })),
});
