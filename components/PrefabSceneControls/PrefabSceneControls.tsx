import { useMemo } from "react";

import shallow from "zustand/shallow";
import { TransformControls } from "@react-three/drei";

import { usePrefabEditorStore } from "@app/store";
import { EditorMode } from "@app/types";

const Controls: React.FC = () => {
    const { entities, selectedEntity, mode } = usePrefabEditorStore(
        (state) => ({ entities: state.entities, selectedEntity: state.selectedEntity, mode: state.mode }),
        shallow
    );
    const ref = useMemo(() => {
        if (!selectedEntity) return null;
        return entities[selectedEntity].group as any;
    }, [selectedEntity]);

    const controlProps = {
        isEnabled: true,
        mode: "translate",
        showX: false,
        showY: false,
        showZ: false,
    };
    switch (mode) {
        case EditorMode.Default:
            controlProps.mode = "translate";
            controlProps.showX = true;
            controlProps.showY = true;
            controlProps.showZ = false;
            break;
        case EditorMode.Scale:
            controlProps.mode = "scale";
            controlProps.showX = true;
            controlProps.showY = true;
            controlProps.showZ = false;
            break;
        case EditorMode.Rotate:
            controlProps.mode = "rotate";
            controlProps.showX = false;
            controlProps.showY = false;
            controlProps.showZ = true;
            break;
        case EditorMode.CircleCollider:
        case EditorMode.TriangleCollider:
        case EditorMode.RectCollider:
            controlProps.isEnabled = false;
            break;
    }
    return (
        ref && (
            <TransformControls
                object={controlProps.isEnabled ? ref : null}
                mode={controlProps.mode}
                showX={controlProps.showX}
                showY={controlProps.showY}
                showZ={controlProps.showZ}
            />
        )
    );
};

export default Controls;
