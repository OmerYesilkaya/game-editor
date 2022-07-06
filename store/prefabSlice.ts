import assert from "assert";
import { v4 as uuid } from "uuid";

import { EditorSlice, PrefabSlice } from "./types";
import { ApiModule } from "types/module";
import { MODULE_DEFAULT_VALUES } from "@app/constants";
import { editorutils } from "@app/utils";

import { EditorMode } from "features/prefab-scene/modes";

export const createPrefabSlice: EditorSlice<PrefabSlice> = (set, get) => ({
    rootPrefab: null,
    refresh: () => {
        set((prev) => {
            assert(prev.rootPrefab);
            return { rootPrefab: { ...prev.rootPrefab } };
        });
    },
    setRootPrefab: (value) => {
        set(() => ({
            rootPrefab: value,
            inputs: {},
            selectedInputId: null,
            mode: EditorMode.Default,
            entities: {},
            selectedEntity: null,
            selectedPrefabId: null,
            activeTimelines: {},
        }));
    },
    createNewRoot: () =>
        set(() => {
            return {
                rootPrefab: {
                    children: [],
                    name: "Untitled Prefab",
                    position: { x: 0, y: 0 },
                    modules: [], // TODO(selim): Set transform module
                    id: 0,
                    internalId: uuid(),
                    colliders: [],
                    transform: { position: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1 }, rotation: 0 },
                },
                inputs: {},
                selectedInputId: null,
                mode: EditorMode.Default,
                entities: {},
                selectedEntity: null,
                selectedPrefabId: null,
                activeTimelines: {},
            };
        }),
    selectedPrefabId: null,
    setSelection: (id) => set(() => ({ selectedPrefabId: id })),
    clearSelection: () => set(() => ({ selectedPrefabId: null })),
    setPrefabName: (id, name) => {
        const root = get().rootPrefab;
        if (!root) {
            console.error("Trying to set name but root is null. Should never happen!");
            return;
        }

        const prefab = editorutils.findPrefabInTree(id, root);
        if (!prefab) {
            console.error("setPrefabName: Prefab with given id could not be found.");
            return;
        }

        prefab.name = name;

        // Set root to itself to trigger state refresh
        set(() => ({ rootPrefab: { ...root } }));
    },

    addModuleToPrefab: (id, module) => {
        const root = get().rootPrefab;
        if (!root) {
            console.error("Trying to set name but root is null. Should never happen!");
            return;
        }
        const prefab = editorutils.findPrefabInTree(id, root);
        if (!prefab) {
            console.error("setPrefabName: Prefab with given id could not be found.");
            return;
        }

        function convertApiModule(module: ApiModule): ApiModule {
            return {
                ...module,
                arrayIndex: 0,
                value: MODULE_DEFAULT_VALUES[module.valueType],
                children: module.children ? module.children.map((child) => convertApiModule(child)) : [],
            };
        }
        prefab.modules.push(convertApiModule(module));

        // Add new module inputs to prefab input array
        let inputs = { ...get().inputs };
        if (inputs.hasOwnProperty(prefab.internalId)) {
            const newInputs = editorutils.getModuleInputs([module]);
            inputs[prefab.internalId] = [...inputs[prefab.internalId], ...newInputs];
        } else {
            const newInputs = editorutils.getModuleInputs([module]);
            inputs = {
                [prefab.internalId]: [...newInputs],
            };
        }
        // Set root to itself to trigger state refresh
        // set(() => ({ rootPrefab: root, inputs: inputs, inputUpdateCount: get().inputUpdateCount + 1 }));
        set(() => ({ rootPrefab: root, inputs: inputs }));
    },

    removeModuleFromPrefab: (id, moduleId) => {
        const root = get().rootPrefab;
        if (!root) {
            console.error("Trying to set name but root is null. Should never happen!");
            return;
        }

        const prefab = editorutils.findPrefabInTree(id, root);
        if (!prefab) {
            console.error("setPrefabName: Prefab with given id could not be found.");
            return;
        }

        // Remove module inputs from prefab input array
        prefab.modules = prefab.modules.filter((x) => x.id !== moduleId);
        const inputs = { ...get().inputs };
        if (inputs) {
            inputs[prefab.internalId] = inputs[prefab.internalId].filter((x) => x.rootModuleId !== moduleId);
        }

        // Set root to itself to trigger state refresh
        // set(() => ({ rootPrefab: root, inputs: inputs, inputUpdateCount: get().inputUpdateCount + 1 }));
        set(() => ({ rootPrefab: root, inputs: inputs }));
    },
    addChild: () => {
        const root = get().rootPrefab;
        assert(root);
        const newChildren = root.children;
        newChildren.push({
            children: [],
            name: "Untitled Prefab",
            position: { x: 50, y: 50 }, // TODO(omer): Find a way to position child nodes more accurately
            modules: [], // TODO(omer): Set transform module
            id: 0,
            internalId: uuid(),
            colliders: [],
            transform: { position: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1 }, rotation: 0 },
        });

        set(() => ({
            rootPrefab: {
                ...root,
                children: newChildren,
            },
        }));
    },
    deletePrefab: (id) => {
        if (!id) return;
        const root = get().rootPrefab;
        assert(root);
        const isSuccess = editorutils.deletePrefabInTree(id, root);

        if (isSuccess) {
            set(() => ({ rootPrefab: { ...root } }));
        }
    },
});
