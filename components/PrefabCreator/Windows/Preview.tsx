import { Common } from "@app/components";
import { usePreviewStore, useCanvasStore } from "@app/store";
import { ANIMATION_SPEEDS } from "@app/constants";
import { useEffect, useRef } from "react";
import { ChevronDoubleRightIcon, ZoomInIcon } from "@heroicons/react/outline";

const ZOOM_CHANGE_BASE_VALUE = 0.5;

const PlayRateControl: React.FC = () => {
	const speedIndex = usePreviewStore((state) => state.speedIndex);
	const nextAnimationSpeed = usePreviewStore((state) => state.nextAnimationSpeed);

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
	const zoom = usePreviewStore((state) => state.zoom);
	const increaseZoom = usePreviewStore((state) => state.increaseZoom);

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

const PreviewWindow: React.FC<Props> = ({ width, height }) => {
	const increaseZoom = usePreviewStore((state) => state.increaseZoom);
	const decreaseZoom = usePreviewStore((state) => state.decreaseZoom);
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
		<div ref={containerRef} className="canvas-pattern w-full h-full">
			<Common.PreviewCanvas width={width} height={height} />
			<div className="absolute right-2 top-10 flex gap-x-1">
				<PlayRateControl />
				<ZoomControl />
			</div>
		</div>
	);
};

export default PreviewWindow;
