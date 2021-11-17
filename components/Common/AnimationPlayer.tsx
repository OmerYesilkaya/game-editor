import MOCK_ASSETS from "constants/MOCK_ASSETS";
import { useEffect, useRef } from "react";
import { useAnimationStore } from "store/useAnimationStore";

let lastAnimationRequestID = 0;
let lastFrameTime = 0;

function draw(ctx: CanvasRenderingContext2D, time: number, texture: HTMLImageElement, frame: number, canvasWidth: number, canvasHeight: number) {
	const getCurrentSpeed = useAnimationStore.getState().getCurrentSpeed;
	if (time - lastFrameTime < getCurrentSpeed()) {
		window.requestAnimationFrame((time) => draw(ctx, time, texture, frame, canvasWidth, canvasHeight));
		return;
	}

	frame = frame % MOCK_ASSETS.IDLE_ANIMATION.sprites.length;
	const spriteId = MOCK_ASSETS.IDLE_ANIMATION.sprites[frame];
	const sprite = MOCK_ASSETS.PLAYER_TEXTURE.sprites[spriteId];

	const pivotX = sprite.pivot.x;
	const pivotY = sprite.pivot.y;

	const spriteWidth = sprite.rect.width;
	const spriteHeight = sprite.rect.height;

	const spriteX = sprite.rect.x;
	const spriteY = sprite.rect.y;

	const scale = Math.floor(canvasWidth / spriteWidth);
	const scaledSpriteWidth = spriteWidth * scale;
	const scaledSpriteHeight = spriteHeight * scale;

	const pivotAdjustX = scaledSpriteWidth * pivotX;
	const pivotAdjustY = scaledSpriteHeight - scaledSpriteHeight * pivotY;

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ctx.drawImage(
		texture,
		spriteX,
		texture.height - spriteHeight - spriteY,
		spriteWidth,
		spriteHeight,
		canvasWidth / 2 - pivotAdjustX,
		canvasHeight - pivotAdjustY - canvasHeight * 0.2,
		Math.round(scaledSpriteWidth),
		Math.round(scaledSpriteHeight)
	);

	lastFrameTime = time;
	lastAnimationRequestID = window.requestAnimationFrame((time) => draw(ctx, time, texture, ++frame, canvasWidth, canvasHeight));
}

type AnimationPlayerProps = {
	width: number;
	height: number;
	texture: StaticImageData;
};

const AnimationPlayer: React.FC<AnimationPlayerProps> = ({ texture, width, height }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current) return;
		const ctx = canvasRef.current.getContext("2d");
		if (!ctx) return;
		ctx.imageSmoothingEnabled = false;

		const image = new Image();
		image.src = texture.src;

		image.onload = () => {
			draw(ctx, 0, image, 0, width, height);
		};

		return () => window.cancelAnimationFrame(lastAnimationRequestID);
	}, [texture.src, width, height]);

	return <canvas className="z-10" ref={canvasRef} width={width} height={height} />;
};

export default AnimationPlayer;
