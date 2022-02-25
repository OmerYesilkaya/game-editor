import { ApiModule, Input, Prefab, PostPrefabRequest } from "@app/types";
import { MODULE_DEFAULT_VALUES } from "@core/constants";
import { usePrefabEditorStore } from "@core/store";
import { PutPrefabRequest } from "types/prefab";

function getPrefabInputs(prefab: Prefab): { [key: string]: Input[] } {
    const processingQueue: Prefab[] = [];
    const moduleInputs: { [key: string]: Input[] } = {};
    processingQueue.push(prefab);
    while (processingQueue.length > 0) {
        const prefab = processingQueue.pop();
        if (prefab?.internalId) moduleInputs[prefab!.internalId] = getModuleInputs(prefab.modules);
        prefab?.children.forEach((child) => {
            processingQueue.push(child);
        });
    }
    return moduleInputs;
}

type InputModule = ApiModule & {
    rootModuleId: number;
};

// Gets furthest branching modules of prefab.
// `RootModuleId` gets added so it can be filtered by root module
// later on e.g remove all inputs that comes from `CreatureModule`
function getModuleInputs(modules: ApiModule[]) {
    const processingQueue: InputModule[] = [];
    const moduleInputs: Input[] = [];

    modules.forEach((module) => {
        processingQueue.push({ ...module, rootModuleId: module.id });
    });

    while (processingQueue.length > 0) {
        const module = processingQueue.pop();
        module?.children?.forEach((child) => {
            if (child.children) {
                processingQueue.push({ ...child, rootModuleId: module.rootModuleId });
            } else {
                const value = child.value ? child.value : MODULE_DEFAULT_VALUES[child.valueType];
                moduleInputs.push({
                    id: child.id,
                    value: value,
                    valueType: child.valueType,
                    rootModuleId: module.rootModuleId,
                    arrayIndex: child.arrayIndex,
                    isArray: child.isArray,
                });
            }
        });
    }

    return moduleInputs;
}

function findPrefabInTree(internalId: string, root: Prefab): Prefab | null {
    if (internalId === root.internalId) return root;
    if (!root.children) return null;

    for (let i = 0; i < root.children.length; i++) {
        const child = root.children[i];
        const result = findPrefabInTree(internalId, child);
        if (!result) return result;
    }

    return null;
}

function deletePrefabInTree(internalId: string, root: Prefab): boolean {
    const queue: Prefab[] = [];
    queue.push(root);

    while (queue.length > 0) {
        const prefab = queue.pop()!;
        const idx = prefab.children.findIndex((child) => child.internalId === internalId);
        if (idx !== -1) {
            prefab.children.splice(idx, 1);
            return true;
        }
        if (prefab.children) queue.push(...prefab.children);
    }

    return false;
}

type PrefabNode = {
    prefab: Prefab;
    parentId: string;
};

function getPrefabChildren(root: Prefab): PrefabNode[] {
    if (!root.children) return [];

    const queue: PrefabNode[] = [];
    const children: PrefabNode[] = [];

    queue.push({ parentId: "", prefab: root });

    while (queue.length > 0) {
        const node = queue.pop()!;
        children.push(node);
        if (node.prefab.children) {
            queue.push(
                ...node.prefab.children.map((child) => ({
                    parentId: node.prefab.internalId,
                    prefab: child,
                }))
            );
        }
    }

    return children;
}

function mapToPrefabRequestData(root: Prefab): PostPrefabRequest | PutPrefabRequest {
    const children = root.children.map((child) => mapToPrefabRequestData(child));
    const inputs = usePrefabEditorStore.getState().inputs;

    if (root.id && root.id !== 0) {
        return {
            id: root.id,
            name: root.name,
            transform: { position: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1 }, rotation: 0 },
            renderer: { isVisible: true },
            colliders: [],
            modules: inputs[root.internalId]
                ? inputs[root.internalId].map((input) => ({
                      arrayIndex: input.arrayIndex,
                      modulePartId: input.id,
                      value: input.value,
                  }))
                : [],
            children: children,
        };
    } else {
        return {
            name: root.name,
            transform: { position: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1 }, rotation: 0 },
            renderer: { isVisible: true },
            colliders: [],
            modules: inputs[root.internalId]
                ? inputs[root.internalId].map((input) => ({
                      arrayIndex: input.arrayIndex,
                      modulePartId: input.id,
                      value: input.value,
                  }))
                : [],
            children: children,
        };
    }
}

export default { mapToPrefabRequestData, deletePrefabInTree, findPrefabInTree, getModuleInputs, getPrefabChildren, getPrefabInputs };
