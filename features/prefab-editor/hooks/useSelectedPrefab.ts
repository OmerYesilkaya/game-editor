import { useCallback, useMemo } from "react";

import { ApiModule } from "@app/types";
import { usePrefabEditorStore } from "@core/store";

import editorUtils from "../editorUtils";

export default function useSelectedPrefab() {
    // TODO(selim): Use shallow here! It is causing issues with module add and remove for some reason
    const { root, selectedPrefabId, addModuleToPrefab, removeModuleFromPrefab, setPrefabName } = usePrefabEditorStore((state) => ({
        selectedPrefabId: state.selectedPrefabId,
        root: state.rootPrefab,
        addModuleToPrefab: state.addModuleToPrefab,
        setPrefabName: state.setPrefabName,
        removeModuleFromPrefab: state.removeModuleFromPrefab,
    }));

    const selectedPrefab = useMemo(() => {
        if (!selectedPrefabId || !root) return;
        return editorUtils.findPrefabInTree(selectedPrefabId, root);
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

    return { selectedPrefab, addModule, removeModule, setPrefabName };
}
