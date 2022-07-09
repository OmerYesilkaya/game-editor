import { createRef, useMemo } from "react";

import * as THREE from "three";
import shallow from "zustand/shallow";
import { Circle } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { usePrefabEditorStore, SceneEntity } from "@app/store";

type Props = {
    entity: SceneEntity;
};

const Collider: React.FC<Props> = ({ entity }) => {
    const { cameraRef, colliderVertices } = usePrefabEditorStore(
        (state) => ({
            colliderVertices: state.colliderVertices,
            cameraRef: state.cameraRef,
        }),
        shallow
    );

    const refs = useMemo(() => {
        return colliderVertices.map((_) => createRef<THREE.Mesh>());
    }, [colliderVertices]);

    useFrame(() => {
        const scale = cameraRef.current ? 3 / cameraRef.current.zoom : 3;
        refs.forEach((r) => {
            r.current?.scale.set(scale, scale, scale);
        });
    });

    return (
        <>
            <mesh>
                <bufferGeometry ref={entity.geom} attributes={{ position: entity.buffer }} />
                <meshBasicMaterial side={THREE.DoubleSide} color={"#befc58"} opacity={0.2} transparent wireframe />
            </mesh>
            {colliderVertices.map((v, idx) => {
                return <Circle ref={refs[idx]} position={[v.x, v.y, 0]} />;
            })}
        </>
    );
};

export default Collider;
