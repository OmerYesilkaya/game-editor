import { useEffect, useRef } from "react";

import { ChevronDoubleRightIcon, ZoomInIcon } from "@heroicons/react/outline";

import { ANIMATION_SPEEDS } from "@core/constants";
import { usePrefabEditorStore } from "@core/store";
import { AssetPreview } from "components";

const ZOOM_CHANGE_BASE_VALUE = 0.5;

const PlayRateControl: React.FC = () => {
    const speedIndex = usePrefabEditorStore((state) => state.speedIndex);
    const nextAnimationSpeed = usePrefabEditorStore((state) => state.nextAnimationSpeed);

    return (
        <button
            type="button"
            className="w-14 px-1 py-0 text-xs  transition-colors bg-gray-100 rounded-sm shadow-md active:bg-gray-200 font-default font-semibold flex items-center justify-between text-black"
            onClick={() => nextAnimationSpeed()}
        >
            <ChevronDoubleRightIcon className="w-3 h-3" />
            {ANIMATION_SPEEDS[speedIndex].label}
        </button>
    );
};
const ZoomControl: React.FC = () => {
    const zoom = usePrefabEditorStore((state) => state.zoom);
    const increaseZoom = usePrefabEditorStore((state) => state.increaseZoom);

    return (
        <button
            type="button"
            className="w-14 px-1 py-0 text-xs  transition-colors bg-gray-100 rounded-sm shadow-md active:bg-gray-200 font-default font-semibold flex items-center justify-between text-black"
            onClick={() => increaseZoom(ZOOM_CHANGE_BASE_VALUE)}
        >
            <ZoomInIcon className="w-3 h-3" />
            <div>
                <span>{(zoom / 2).toFixed(1)}</span>X
            </div>
        </button>
    );
};

type Props = {
    width: number;
    height: number;
};

const Wrapper: React.FC<Props> = ({ width, height }) => {
    const increaseZoom = usePrefabEditorStore((state) => state.increaseZoom);
    const decreaseZoom = usePrefabEditorStore((state) => state.decreaseZoom);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!containerRef.current) return;
        function handleWheel(e: WheelEvent) {
            if (e.deltaY > 0) {
                decreaseZoom(ZOOM_CHANGE_BASE_VALUE);
            } else {
                increaseZoom(ZOOM_CHANGE_BASE_VALUE);
            }
        }

        containerRef.current.addEventListener("wheel", handleWheel);
        return () => {
            if (!containerRef.current) return;
            return containerRef.current.removeEventListener("wheel", handleWheel);
        };
    }, []);

    return (
        <div ref={containerRef} className="canvas-pattern w-full h-full border-dashed border-2 border-white rounded-sm">
            {/* Subracting border and header space from canvas to prevent scrolling */}
            <AssetPreview.Canvas width={width - 6} height={height - 6} />
            <div className="absolute right-3 top-12 flex gap-x-1 ">
                <PlayRateControl />
                <ZoomControl />
            </div>
        </div>
    );
};

export default Wrapper;
