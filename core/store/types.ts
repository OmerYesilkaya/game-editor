import { Animation, Sprite } from "@app/types";
import { EditorMode } from "@prefab-scene/modes";
import { Vec2 } from "@prefab-scene/types/math";
import { Camera } from "@react-three/fiber";
import { RefObject } from "react";
import { Input } from "types/input";
import { ApiModule } from "types/module";
import { Prefab } from "types/prefab";
import { TextureInfo, RawTexture } from "types/texture";
import { SetState, GetState } from "zustand";

export type EditorState = PrefabSlice & SceneSlice & InputSlice & TimelineSlice & TextureSlice & PreviewSlice & ModalSlice & AssetSlice;

export type EditorSlice<T> = (set: SetState<EditorState>, get: GetState<EditorState>) => T;

export type TimelineAnimations = {
    [key: string]: number[];
};

export type AssetSlice = {
    animations: Animation[];
    sprites: Sprite[];
    animationMap: Dictionary<Animation>;
    spriteMap: Dictionary<Sprite>;
    loadAnimations: (animations: Animation[]) => void;
    loadSprites: (sprites: Sprite[]) => void;
};

export type TimelineSlice = {
    activeTimelines: TimelineAnimations;
    // TODO(selim): Bad naming! Fix
    setTimelines: (timeline: TimelineAnimations) => void;
    setActiveTimelines: (prefabId: string, value: number[]) => void;
    addAnimation: (prefabId: string, id: number) => void;
    removeAnimation: (prefabId: string, id: number) => void;
    clearAllTimelines: () => void;
};

export interface ModalSlice {
    isPrefabsModalOpen: boolean;
    setIsPrefabsModalOpen: (isOpen: boolean) => void;
}

export interface TextureSlice {
    textures: TextureInfo[];
    setTextures: (textures: RawTexture[]) => void;
    addTexture: (texture: RawTexture) => void;
}

export type InputSlice = {
    inputs: { [key: string]: Input[] };
    selectedInputId: number | null;
    setInputs: (value: Prefab) => void;
    selectInput: (id: number) => void;
    clearInputSelection: () => void;
    updateInputValue: (prefabId: string, inputId: number, value: any) => void;
};

export type SceneEntity = {
    prefabId: string;
    shouldUpdate: boolean;
    textureId: number;
    sprites: Sprite[];
    bufferIndex: number;

    // Which frame is currently playing
    spriteIndex: number;

    buffer: THREE.BufferAttribute;
    group: RefObject<THREE.Group>;
    mesh: RefObject<THREE.Mesh>;
    geom: RefObject<THREE.BufferGeometry>;
    mat: RefObject<THREE.ShaderMaterial>;
};

export interface SceneSlice {
    mode: EditorMode;

    // These are the prefabs that will be drawn to WebGL scene.
    // Uses prefab internal ids as keys.
    entities: Dictionary<SceneEntity>;

    colliderVertices: Vec2[];
    selectedEntity: string | null;
    canvasRef: RefObject<HTMLCanvasElement>;
    cameraRef: RefObject<Camera>;
    createEntity: (id: string) => void;
    selectEntity: (id: string | null) => void;
    addColliderVertex: (pos: Vec2) => void;
    setEditorMode: (mode: EditorMode) => void;
}

export type Preview = Sprite[] | Sprite | null;

export type PreviewState = { currentFrame: number; activePreview: Preview; temporaryPreview: Preview };

export type PreviewSlice = {
    zoom: number;
    speedIndex: number;
    previewState: PreviewState;
    increaseZoom: (incrementValue: number) => void;
    decreaseZoom: (decrementValue: number) => void;
    setTemporaryPreview: (value: Preview) => void;
    setActivePreview: (value: Preview) => void;
    increaseCurrentFrame: () => void;
    decreaseCurrentFrame: () => void;
    getCurrentSpeed: () => number;
    nextAnimationSpeed: () => void;
};

export type PrefabSlice = {
    // Root
    rootPrefab: Prefab | null;
    setRootPrefab: (value: Prefab) => void;
    createNewRoot: () => void;

    // ! Internal Id. Module Part Id should not be used.
    selectedPrefabId: string | null;
    setSelection: (id: string) => void;
    clearSelection: () => void;
    setPrefabName: (id: string, name: string) => void;
    addModuleToPrefab: (id: string, module: ApiModule) => void;
    removeModuleFromPrefab: (id: string, moduleId: number) => void;
    addChild: () => void;
    deletePrefab: (id: string | null) => void;
};
