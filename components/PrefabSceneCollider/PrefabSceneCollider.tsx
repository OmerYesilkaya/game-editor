import { usePrefabEditorStore } from "@core/store";
import { Circle } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { createRef, useMemo } from "react";
import { Mesh } from "three";
import shallow from "zustand/shallow";
import * as THREE from "three";
import { SceneEntity } from "@core/store/types";

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
        return colliderVertices.map((_) => createRef<Mesh>());
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
