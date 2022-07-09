import { useCallback, useEffect, useState } from "react";

import * as THREE from "three";
import { Text } from "@react-three/drei";

import CustomSpriteMaterial from "@core/materials/CustomSpriteMaterial";
import { prefabCanvas } from "@app/canvas";

import { usePrefabEditorStore } from "@app/store";
import { editorutils } from "@app/utils";
import { PrefabScene } from "@app/components";

type EntityNameProps = {
    prefabId: string;
    prefabName: string;
};

const EntityName: React.FC<EntityNameProps> = ({ prefabId, prefabName }) => {
    const [name, setName] = useState(prefabName);
    useEffect(
        () =>
            usePrefabEditorStore.subscribe(
                (state) => state.rootPrefab,
                (root) => {
                    const prefab = editorutils.findPrefabInTree(prefabId, root!);
                    if (prefab && name !== prefab.name) setName(prefab.name);
                }
            ),
        []
    );

    return (
        <Text position={[0, 1.2, 3]} fontSize={1 / 4}>
            {name}
        </Text>
    );
};

type Props = {
    prefabId: string;
};

const SceneEntity: React.FC<Props> = ({ prefabId }) => {
    const entity = usePrefabEditorStore(useCallback((state) => state.entities[prefabId], [prefabId]));
    const prefab = usePrefabEditorStore(useCallback((state) => editorutils.findPrefabInTree(prefabId, state.rootPrefab!), [prefabId]));

    if (!prefab) return null;

    return (
        <group ref={entity.group}>
            <EntityName prefabId={prefabId} prefabName={prefab.name} />
            <PrefabScene.Collider entity={entity} />
            <mesh
                ref={entity.mesh}
                onClick={() => prefabCanvas.onPrefabClick(prefabId)}
                onPointerMissed={(e) => e.type === "click" && prefabCanvas.onPrefabMiss()}
                position={[0, 0, 5]}
            >
                <planeBufferGeometry args={[2, 2]} />
                {/* @ts-ignore */}
                <customSpriteMaterial
                    ref={entity.mat}
                    // @ts-ignore
                    key={CustomSpriteMaterial.key}
                    uPlaneSize={new THREE.Vector2(50, 50)}
                    uTextureSize={[500, 500]}
                    transparent={true}
                    uOutlineColor={"white"}
                />
            </mesh>
        </group>
    );
};

export default SceneEntity;
