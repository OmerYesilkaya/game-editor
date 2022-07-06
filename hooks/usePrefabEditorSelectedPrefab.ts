import { useCallback, useMemo } from "react";

import assert from "assert";

import { ApiModule } from "@app/types";
import { usePrefabEditorStore } from "@core/store";
import { MODULE_DEFAULT_VALUES } from "@core/constants";

import { editorutils } from "utils";
import api from "api";

export default function useSelectedPrefab() {
    // TODO(selim): Use shallow here! It is causing issues with module add and remove for some reason
    const { root, selectedPrefabId, refresh, addModuleToPrefab, removeModuleFromPrefab, setPrefabName } = usePrefabEditorStore((state) => ({
        selectedPrefabId: state.selectedPrefabId,
        root: state.rootPrefab,
        refresh: state.refresh,
        addModuleToPrefab: state.addModuleToPrefab,
        setPrefabName: state.setPrefabName,
        removeModuleFromPrefab: state.removeModuleFromPrefab,
    }));

    const selectedPrefab = useMemo(() => {
        if (!selectedPrefabId || !root) return;
        return editorutils.findPrefabInTree(selectedPrefabId, root);
    }, [selectedPrefabId]);

    const addModule = useCallback(
        (module: ApiModule) => {
            if (!selectedPrefabId) {
                console.error("Trying to add module to null prefab!");
                return;
            }
            addModuleToPrefab(selectedPrefabId, module);
        },
        [selectedPrefabId]
    );

    const removeModule = useCallback(
        (moduleId: number) => {
            if (!selectedPrefabId) {
                console.error("Trying to add module to null prefab!");
                return;
            }
            removeModuleFromPrefab(selectedPrefabId, moduleId);
        },
        [selectedPrefabId]
    );

    function addToArrayInput(moduleId: number) {
        assert(selectedPrefab && moduleId);

        function insertIntoModule(modules: ApiModule[], parentId: number, generatedModule: ApiModule) {
            modules.forEach((module) => {
                if (module.id === parentId) {
                    generatedModule.arrayIndex = module.children ? module.children.length : 0;
                    module.children?.push(generatedModule);
                    refresh();
                } else {
                    if (module.children) insertIntoModule(module.children, module.parentId, generatedModule);
                }
            });
        }

        function convertChildren(children: ApiModule[]): ApiModule[] {
            return children.map((child) => ({
                ...child,
                value: MODULE_DEFAULT_VALUES[child.valueType],
                arrayIndex: 0,
                children: child.children ? convertChildren(child.children) : [],
            }));
        }

        api.getModuleById(moduleId).then((module) => {
            const parentId = module.parentId;
            const generatedModule = {
                children: module.children ? convertChildren(module.children) : [],
                id: module.id,
                isArray: module.isArray,
                name: module.name,
                parentId: parentId,
                value: MODULE_DEFAULT_VALUES[module.valueType],
                valueType: module.valueType,
                arrayIndex: 0,
            };

            insertIntoModule(selectedPrefab.modules, parentId, generatedModule);
        });
    }

    return { selectedPrefab, addModule, removeModule, setPrefabName, addToArrayInput };
}
