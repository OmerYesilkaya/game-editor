import { Sprite } from "@app/types";
import { usePrefabEditorStore } from "@core/store";

import { EngineContext } from "./types/engineContext";

// Gets called 24 frames per second
function update(context: EngineContext) {
    const store = usePrefabEditorStore.getState();
    const previewState = store.previewState;
    const textures = store.textures;

    const activePreview = previewState.activePreview;
    const temporaryPreview = previewState.temporaryPreview;
    const frameCount = previewState.currentFrame;
    const zoom = store.zoom;

    store.increaseCurrentFrame();
    const preview = temporaryPreview ? temporaryPreview : activePreview;
    const frame = Array.isArray(preview) ? frameCount % preview.length : 1;
    const sprite = Array.isArray(preview) ? preview[frame] : preview;
    if (!sprite) return;

    const texture = textures.find((texture) => texture.id === sprite.textureId);
    if (!texture) return;

    drawSprite(context, sprite, texture.image, zoom);
}

// Draws the given sprite to canvas. Sprite should be within texture boundaries
function drawSprite(context: EngineContext, sprite: Sprite, texture: HTMLImageElement, scale: number) {
    const pivotX = sprite.pivot.x;
    const pivotY = sprite.pivot.y;

    const spriteWidth = sprite.rect.width;
    const spriteHeight = sprite.rect.height;

    const spriteX = sprite.rect.x;
    const spriteY = sprite.rect.y;

    const pivotAdjustX = spriteWidth * scale * pivotX;
    const pivotAdjustY = spriteHeight * scale - spriteHeight * scale * pivotY;

    const sx = spriteX;
    const sy = texture.height - spriteHeight - spriteY;
    const sw = spriteWidth;
    const sh = spriteHeight;
    const dx = context.canvasWidth / 2 - pivotAdjustX;
    const dy = context.canvasHeight / 2 - pivotAdjustY;
    const dw = spriteWidth * scale;
    const dh = spriteHeight * scale;

    context.canvas.drawImage(texture, sx, sy, sw, sh, dx, dy, dw, dh);
}

export default update;
