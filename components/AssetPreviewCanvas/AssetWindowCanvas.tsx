import { useEffect, useRef } from "react";
import { update } from "features/preview-window";

import { usePrefabEditorStore } from "@app/store";

let lastAnimationRequestID = 0;
let lastFrameTime = 0;

function draw(ctx: CanvasRenderingContext2D, time: number, canvasWidth: number, canvasHeight: number) {
    const getCurrentSpeed = usePrefabEditorStore.getState().getCurrentSpeed;
    if (time - lastFrameTime < getCurrentSpeed()) {
        window.requestAnimationFrame((time) => draw(ctx, time, canvasWidth, canvasHeight));
        return;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    update({ canvas: ctx, canvasWidth, canvasHeight });

    lastFrameTime = time;
    lastAnimationRequestID = window.requestAnimationFrame((time) => draw(ctx, time, canvasWidth, canvasHeight));
}

type CanvasProps = {
    width: number;
    height: number;
};

const Canvas: React.FC<CanvasProps> = ({ width, height }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        ctx.imageSmoothingEnabled = false;
        draw(ctx, 0, width, height);

        return () => window.cancelAnimationFrame(lastAnimationRequestID);
    }, [width, height]);

    return <canvas className="z-[2]" ref={canvasRef} width={width} height={height} />;
};

export default Canvas;
