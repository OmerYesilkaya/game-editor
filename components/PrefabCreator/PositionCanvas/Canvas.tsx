import { useEffect, useRef } from "react";
import { usePreviewStore } from "@app/store";
import { update } from "@feature/animation-player";

let lastAnimationRequestID = 0;
let lastFrameTime = 0;

function draw(ctx: CanvasRenderingContext2D, time: number, canvasWidth: number, canvasHeight: number) {
	const getCurrentSpeed = usePreviewStore.getState().getCurrentSpeed;
	if (time - lastFrameTime < getCurrentSpeed()) {
		lastAnimationRequestID = window.requestAnimationFrame((time) => draw(ctx, time, canvasWidth, canvasHeight));
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
		console.log("width or height changed");
		if (!canvasRef.current) return;
		const ctx = canvasRef.current.getContext("2d");
		if (!ctx) return;
		ctx.imageSmoothingEnabled = false;
		draw(ctx, 0, width, height);

		return () => window.cancelAnimationFrame(lastAnimationRequestID);
	}, [width, height]);

	return <canvas className="z-[2] w-full h-full" ref={canvasRef} width={width} height={height} />;
};

export default Canvas;
