import { useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import shallow from "zustand/shallow";

import { prefabCanvas } from "@app/canvas";
import { usePrefabEditorStore } from "@app/store";
import { PrefabScene } from "@app/components";
import { useMouse } from "@app/hooks";

// Entry point for prefab scene, registers core actions and update loop
const Content: React.FC = () => {
    const { canvasRef, cameraRef, entityMap, textureInfos } = usePrefabEditorStore(
        (state) => ({
            canvasRef: state.canvasRef,
            cameraRef: state.cameraRef,
            entityMap: state.entities,
            textureInfos: state.textures,
        }),
        shallow
    );
    const entities = useMemo(() => Object.keys(entityMap).map((key) => entityMap[key]), [entityMap]);

    // Controls
    useMouse(canvasRef, cameraRef, prefabCanvas.onMouseClick, prefabCanvas.onMouseRelease);
    // TODO(selim): Add keyboard and right click inputs here

    // Main Update Loop
    const state = {
        clock: 0,
        dt: 0,
        entities: entities,
        textureInfos: textureInfos,
    };
    useFrame(({}, dt) => {
        state.clock += dt;
        state.dt = dt;
        prefabCanvas.update(state);
    });

    return (
        <>
            {Object.keys(entityMap).map((key) => (
                <PrefabScene.Entity key={key} prefabId={key} />
            ))}
            <PrefabScene.Controls />
        </>
    );
};

export default Content;
