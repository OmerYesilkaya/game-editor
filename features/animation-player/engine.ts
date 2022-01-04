import { useTextureStore, usePreviewStore } from "@app/store";
import { Sprite } from "@app/types";
import { EngineContext } from "./types/engineContext";

// Gets called 24 frames per second
function update(context: EngineContext) {
	const previewState = usePreviewStore.getState();
	const activePreview = previewState.activePreview;
	const temporaryPreview = previewState.temporaryPreview;
	const textures = useTextureStore.getState().textures;
	const frameCount = usePreviewStore.getState().currentFrame;

	usePreviewStore.getState().increaseCurrentFrame();

	const preview = temporaryPreview ? temporaryPreview : activePreview;
	const frame = Array.isArray(preview) ? frameCount % preview.length : 1;
	const sprite = Array.isArray(preview) ? preview[frame] : preview;
	if (!sprite) return;

	const texture = textures.find((texture) => texture.id === sprite.textureId);
	if (!texture) return;

	drawSprite(context, sprite, texture.image);
}

// Draws the given sprite to canvas. Sprite should be within texture boundaries
function drawSprite(context: EngineContext, sprite: Sprite, texture: HTMLImageElement) {
	const pivotX = sprite.pivot.x;
	const pivotY = sprite.pivot.y;

	const spriteWidth = sprite.rect.width;
	const spriteHeight = sprite.rect.height;

	const spriteX = sprite.rect.x;
	const spriteY = sprite.rect.y;

	const scale = Math.floor(context.canvasWidth / spriteWidth);
	const scaledSpriteWidth = spriteWidth * scale;
	const scaledSpriteHeight = spriteHeight * scale;

	const pivotAdjustX = scaledSpriteWidth * pivotX;
	const pivotAdjustY = scaledSpriteHeight - scaledSpriteHeight * pivotY;

	context.canvas.drawImage(
		texture,
		spriteX,
		texture.height - spriteHeight - spriteY,
		spriteWidth,
		spriteHeight,
		context.canvasWidth / 2 - pivotAdjustX,
		context.canvasHeight - pivotAdjustY - context.canvasHeight * 0.2,
		Math.round(scaledSpriteWidth),
		Math.round(scaledSpriteHeight)
	);
}

export default update;
