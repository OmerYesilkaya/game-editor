import { Camera } from "@react-three/fiber";
import { RefObject, useLayoutEffect, useRef } from "react";
import { MouseState } from "@core/controls/mouse";
import { getNormalizedPosition, projectScreenToWorld } from "@core/graphics/camera";

/**
 * Sets the mouse state for the given store.
 * Store has to implement mouse store interface
 * ```
 * interface MouseStore {
 *     mouseState: MouseState;
 *     canvasRef: RefObject<HTMLCanvasElement>;
 *     cameraRef: RefObject<Camera>;
 * }
 * ```
 * @param store Store to save to
 */
export function useMouse(
    canvasRef: RefObject<HTMLCanvasElement>,
    cameraRef: RefObject<Camera>,
    onLeftClick: (state: MouseState) => void = () => {},
    onLeftRelease: (state: MouseState) => void = () => {}
) {
    const mouseRef = useRef<MouseState>({
        normalized: { x: 0, y: 0 },
        world: { x: 0, y: 0 },
        dragStartTime: 0,
        isDragging: false,
        lastClickNormalized: { x: 0, y: 0 },
        lastClickWorld: { x: 0, y: 0 },
    });

    function onMouseMove(e: MouseEvent) {
        if (!canvasRef || !canvasRef.current || !cameraRef || !cameraRef.current) return;
        const mouseState = mouseRef.current;

        const rect = canvasRef.current.getBoundingClientRect();
        const v = getNormalizedPosition(e.clientX, e.clientY, rect!);
        const r = projectScreenToWorld(v, cameraRef.current);
        mouseState.normalized = v;
        mouseState.world = r;
    }

    function onMouseClick(e: MouseEvent) {
        if (!canvasRef || !canvasRef.current || !cameraRef || !cameraRef.current) return;
        // TODO(selim): Check which button is pressed (right or left)
        const rect = canvasRef.current.getBoundingClientRect();
        const v = getNormalizedPosition(e.clientX, e.clientY, rect!);
        const w = projectScreenToWorld(v, cameraRef.current);
        const mouseState = mouseRef.current;
        mouseState.normalized = v;
        mouseState.world = w;
        if (!mouseState.isDragging) {
            mouseState.isDragging = true;
            mouseState.dragStartTime = Date.now();
            mouseState.lastClickNormalized = v;
            mouseState.lastClickWorld = w;
        }
        onLeftClick(mouseState);
    }

    function onMouseRelease(e: MouseEvent) {
        if (!canvasRef || !canvasRef.current || !cameraRef || !cameraRef.current) return;
        // TODO(selim): Check which button is pressed (right or left)
        const rect = canvasRef.current.getBoundingClientRect();
        const v = getNormalizedPosition(e.clientX, e.clientY, rect!);
        const w = projectScreenToWorld(v, cameraRef.current);
        const mouseState = mouseRef.current;
        mouseState.normalized = v;
        mouseState.world = w;
        if (mouseState.isDragging) {
            mouseState.isDragging = false;
        }
        onLeftRelease(mouseState);
    }

    useLayoutEffect(() => {
        canvasRef.current?.addEventListener("mousemove", onMouseMove);
        canvasRef.current?.addEventListener("mousedown", onMouseClick);
        canvasRef.current?.addEventListener("mouseup", onMouseRelease);
        return () => {
            canvasRef.current?.removeEventListener("mousemove", onMouseMove);
            canvasRef.current?.removeEventListener("mousedown", onMouseClick);
            canvasRef.current?.removeEventListener("mouseup", onMouseRelease);
        };
    });

    return mouseRef;
}
