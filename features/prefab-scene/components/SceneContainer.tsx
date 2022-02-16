import { Suspense } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";

import shallow from "zustand/shallow";

import { Sprite, Animation } from "@app/types";
import { Scene } from "./Scene";
import { usePrefabEditorStore } from "@core/store";

type Props = {
    animations: Animation[];
    sprites: Sprite[];
};

const SceneContainer: React.FC<Props> = () => {
    const { canvasRef, cameraRef } = usePrefabEditorStore(
        (state) => ({
            canvasRef: state.canvasRef,
            cameraRef: state.cameraRef,
        }),
        shallow
    );

    return (
        <div className="flex z-[2] w-full h-full relative">
            <Canvas
                ref={canvasRef}
                mode="concurrent"
                style={{
                    position: "absolute",
                    top: 0,
                }}
                dpr={Math.max(window.devicePixelRatio, 2)}
                linear={true}
                flat={true}
            >
                <OrthographicCamera ref={cameraRef} makeDefault near={0.5} far={1000} zoom={100} position={[0, 0, 8]} />
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
                <OrbitControls enableRotate={false} />
            </Canvas>
        </div>
    );
};

export default SceneContainer;
