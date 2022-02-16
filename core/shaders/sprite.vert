varying vec2 vUv;
uniform vec4 uSpriteRect;
uniform vec2 uSpritePivot;
uniform vec2 uTextureSize;
uniform vec2 uPlaneSize;

varying vec4 vBounds;
varying vec4 vRect;

void main() {
  float offsetX = uSpriteRect.x / uTextureSize.x;
  float offsetY = uSpriteRect.y / uTextureSize.y;
  float spriteWidth = uSpriteRect.z / uTextureSize.x;
  float spriteHeight = uSpriteRect.w / uTextureSize.y;
  float width = uPlaneSize.x / uTextureSize.x; 
  float height = uPlaneSize.y / uTextureSize.y;
  vBounds = vec4(offsetX, offsetY, spriteWidth + offsetX, spriteHeight + offsetY);
  vUv = vec2(uv.x * width - width / 2.0 + spriteWidth * uSpritePivot.x + offsetX, uv.y * height - height / 2.0 + spriteHeight * uSpritePivot.y + offsetY);
  vRect = vec4(
     0.0 * width - width / 2.0 + spriteWidth * uSpritePivot.x + offsetX,
     0.0 * height - height / 2.0 + spriteHeight * uSpritePivot.y + offsetY, 
     1.0 * width - width / 2.0 + spriteWidth * uSpritePivot.x + offsetX,
     1.0 * height - height / 2.0 + spriteHeight * uSpritePivot.y + offsetY);
  
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}