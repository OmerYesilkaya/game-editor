import { useFrame } from "@react-three/fiber";
import { usePrefabEditorStore } from "@core/store";
import { SceneEntity } from "./SceneEntity";
import shallow from "zustand/shallow";
import Controls from "./Controls";
import { useMouse } from "@core/controls/hooks/useMouse";
import update from "@prefab-scene/engine";
import { useMemo } from "react";
import { onMouseClick, onMouseRelease } from "@prefab-scene/controls";

// Entry point for prefab scene, registers core actions and update loop
const Scene: React.FC = () => {
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
    useMouse(canvasRef, cameraRef, onMouseClick, onMouseRelease);
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
        update(state);
    });

    return (
        <>
            {Object.keys(entityMap).map((key) => (
                <SceneEntity key={key} prefabId={key} />
            ))}
            <Controls />
        </>
    );
};

export { Scene };
