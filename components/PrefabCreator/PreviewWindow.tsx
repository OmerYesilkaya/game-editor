import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import { CameraIcon } from "@heroicons/react/solid";

import { useWindowBounds, useResponsive } from "@app/hooks";
import { Common } from "@app/components";
import { usePreviewStore } from "@app/store";
import { ANIMATION_SPEEDS } from "@app/constants";

const PlayRateControl: React.FC = () => {
	const { speedIndex, nextAnimationSpeed } = usePreviewStore((state) => ({
		speedIndex: state.speedIndex,
		nextAnimationSpeed: state.nextAnimationSpeed,
	}));

	return (
		<button
			className="absolute w-12 px-1 py-0 text-xs  transition-colors bg-gray-100 rounded-sm shadow-md right-1 top-1 active:bg-gray-200 font-default font-semibold"
			onClick={() => nextAnimationSpeed()}
		>
			{ANIMATION_SPEEDS[speedIndex].label}
		</button>
	);
};

const Label: React.FC = () => {
	return (
		<div className="font-default font-bold text-xs text-zinc-800 max-w-min bg-white whitespace-nowrap px-1 absolute top-1 left-1 rounded-sm flex items-center">
			PREVIEW
			<CameraIcon className="w-3 h-3 ml-0.5" />
		</div>
	);
};

const PreviewWindow: React.FC = () => {
	const bounds = useWindowBounds();
	const { isXS, isSM, isMD } = useResponsive();
	const isSmallDevice = isXS || isSM || isMD;

	const WINDOW_WIDTH = isSmallDevice ? 250 : 300;
	const WINDOW_HEIGHT = isSmallDevice ? 175 : 200;

	const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
	const borderWidth = 2;
	const bind = useDrag(({ down, offset: [ox, oy] }) => api.start({ x: ox, y: oy, immediate: down }), {
		bounds: {
			left: bounds.left + (WINDOW_WIDTH / 2 + borderWidth),
			right: bounds.right - (WINDOW_WIDTH / 2 + borderWidth),
			top: bounds.top + (WINDOW_HEIGHT / 2 + borderWidth),
			bottom: bounds.bottom - (WINDOW_HEIGHT / 2 + borderWidth),
		},
	});

	return (
		<animated.div
			className={`w-[${WINDOW_WIDTH}] h-[${WINDOW_HEIGHT}] rounded-sm absolute z-50 touch-none border-zinc-200 canvas-pattern`}
			style={{ x, y, borderWidth }}
			{...bind()}
		>
			<Label />
			<Common.AnimationPlayer width={WINDOW_WIDTH} height={WINDOW_HEIGHT} />
			<PlayRateControl />
		</animated.div>
	);
};

export default PreviewWindow;
