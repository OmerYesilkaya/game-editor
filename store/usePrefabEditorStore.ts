import create, { GetState, SetState } from "zustand";
import { StoreApiWithSubscribeWithSelector, subscribeWithSelector } from "zustand/middleware";
import { createAssetSlice } from "./assetSlice";
import { createInputSlice } from "./inputSlice";
import { createModalSlice } from "./modalSlice";
import { createPrefabSlice } from "./prefabSlice";
import { createPreviewSlice } from "./previewSlice";
import { createSceneSlice } from "./sceneSlice";
import { createTextureSlice } from "./textureSlice";
import { createTimelineSlice } from "./timelineSlice";
import { EditorState, TimelineAnimations } from "./types";

export const usePrefabEditorStore = create<EditorState, SetState<EditorState>, GetState<EditorState>, StoreApiWithSubscribeWithSelector<EditorState>>(
    subscribeWithSelector((set, get) => ({
        ...createPrefabSlice(set, get),
        ...createSceneSlice(set, get),
        ...createInputSlice(set, get),
        ...createTimelineSlice(set, get),
        ...createTextureSlice(set, get),
        ...createPreviewSlice(set, get),
        ...createModalSlice(set, get),
        ...createAssetSlice(set, get),
    }))
);

// TODO(selim): Move all subscribtion code to a useEffect hook and unsubscribe on unmount
const u1 = usePrefabEditorStore.subscribe(
    (state) => state.selectedPrefabId,
    (v) => console.log("Selected prefab id changed.", v)
);

// Updates the
const u2 = usePrefabEditorStore.subscribe(
    (state) => state.rootPrefab,
    (v) => {
        console.log("Root prefab id changed.", v);
        const state = usePrefabEditorStore.getState();
        if (!v) return;
        state.createEntity(v.internalId);
    },
    { equalityFn: (prev, next) => prev?.internalId === next?.internalId }
);

// Everytime timeline state changes updates the scene entities
// with the current timeline values.
const u3 = usePrefabEditorStore.subscribe(
    (state) => state.activeTimelines,
    (timelines) => {
        const state = usePrefabEditorStore.getState();
        const prefabs = Object.keys(timelines);

        // SPEED(selim): Instead of updating every prefab we should
        // only update the ones that change
        for (let i = 0; i < prefabs.length; i++) {
            const prefabId = prefabs[i];
            const sprites = [];
            const timeline = timelines[prefabs[i]];
            for (let j = 0; j < timeline.length; j++) {
                const timelineAnimation = timeline[j];
                const animation = state.animationMap[timelineAnimation];
                console.assert(animation);
                for (let k = 0; k < animation.sprites.length; k++) {
                    const sprite = state.spriteMap[animation.sprites[k]];
                    sprites.push(sprite);
                }
            }
            state.entities[prefabId].sprites = sprites;
        }
    },
    {
        equalityFn: (prev, next) => {
            return prev === next;
        },
    }
);

const u4 = usePrefabEditorStore.subscribe(
    (state) => state.inputs,
    (prefabInputs) => {
        const state = usePrefabEditorStore.getState();
        const timelines = state.activeTimelines;
        const prefabIds = Object.keys(timelines).filter((prefab) => prefabInputs.hasOwnProperty(prefab));
        const newTimelines: TimelineAnimations = {};
        for (let i = 0; i < prefabIds.length; i++) {
            const key = prefabIds[i];
            const timeline = timelines[key];
            const inputs = prefabInputs[key];

            // Select all animations that exist in current input array,
            // Instead of Id we check against value because animationId is stored inside value.
            // We don't need the input id
            // SPEED(selim): Instead of looping over input array we could use a map
            newTimelines[key] = timeline.filter((n) => inputs.some((x) => x.value === n));
        }
        state.setTimelines(newTimelines);
    },
    {
        equalityFn: (prev, next) => {
            return prev === next;
        },
    }
);
