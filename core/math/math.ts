/**
 * Clamps the value between minimum and maximum values
 * @param x Value to clamp
 * @param min Minimum value
 * @param max Maximum value
 * @returns Clamped value
 */
export function clamp(x: number, min: number, max: number) {
    return Math.max(Math.min(max, x), min);
}
