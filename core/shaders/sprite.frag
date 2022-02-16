varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec3 uOutlineColor;
varying vec4 vBounds;
varying vec4 vRect;

void main() {
  vec4 texColor = texture2D(uTexture, vUv);
  vec4 mixColor = vec4(0);
  texColor = mix(mixColor, texColor,  step(vBounds.x, vUv.x) * step(vUv.x, vBounds.z));
  texColor = mix(mixColor, texColor,  step(vBounds.y, vUv.y) * step(vUv.y, vBounds.w));

  texColor += mix(vec4(0), vec4(uOutlineColor, 1.0), step(vUv.x, vRect.x + 0.001));
  texColor += mix(vec4(0), vec4(uOutlineColor, 1.0), step(vUv.y, vRect.y + 0.001));
  texColor += mix(vec4(0), vec4(uOutlineColor, 1.0), step(vRect.z - 0.001, vUv.x));
  texColor += mix(vec4(0), vec4(uOutlineColor, 1.0), step(vRect.w - 0.001, vUv.y));

  gl_FragColor = texColor;
}