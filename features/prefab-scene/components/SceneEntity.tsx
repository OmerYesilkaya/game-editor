import CustomSpriteMaterial from "@core/materials/CustomSpriteMaterial";
import editorUtils from "@prefab-editor/editorUtils";
import { usePrefabEditorStore } from "@core/store";
import { Text } from "@react-three/drei";
import { useCallback, useEffect, useState } from "react";
import Collider from "./Collider";
import * as THREE from "three";
import { onPrefabClick, onPrefabMiss } from "@prefab-scene/controls";

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
                    const prefab = editorUtils.findPrefabInTree(prefabId, root!);
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
    const prefab = usePrefabEditorStore(useCallback((state) => editorUtils.findPrefabInTree(prefabId, state.rootPrefab!), [prefabId]));

    if (!prefab) return null;

    return (
        <group ref={entity.group}>
            <EntityName prefabId={prefabId} prefabName={prefab.name} />
            <Collider entity={entity} />
            <mesh
                ref={entity.mesh}
                onClick={() => onPrefabClick(prefabId)}
                onPointerMissed={(e) => e.type === "click" && onPrefabMiss()}
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

export { SceneEntity };
