import { CameraIcon } from "@heroicons/react/solid";

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
			className="absolute w-12 px-1 py-0 text-xs  transition-colors bg-gray-100 rounded-sm shadow-md right-2 top-12 active:bg-gray-200 font-default font-semibold"
			onClick={() => nextAnimationSpeed()}
		>
			{ANIMATION_SPEEDS[speedIndex].label}
		</button>
	);
};

const Label: React.FC = () => {
	return (
		<div className="font-default font-bold text-xs text-zinc-800 max-w-min bg-white whitespace-nowrap px-1 absolute left-2 top-12 rounded-sm flex items-center">
			PREVIEW
			<CameraIcon className="w-3 h-3 ml-0.5" />
		</div>
	);
};

type Props = {
	width: number;
	height: number;
};

const PreviewWindow: React.FC<Props> = ({ width, height }) => {
	return (
		<div className="canvas-pattern h-auto">
			<Label />
			<Common.AnimationPlayer width={width} height={height} />
			<PlayRateControl />
		</div>
	);
};

export default PreviewWindow;
