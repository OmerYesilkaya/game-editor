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
			type="button"
			className="absolute w-12 px-1 py-0 text-xs  transition-colors bg-gray-100 rounded-sm shadow-md right-2 top-10 active:bg-gray-200 font-default font-semibold"
			onClick={() => nextAnimationSpeed()}
		>
			{ANIMATION_SPEEDS[speedIndex].label}
		</button>
	);
};

type Props = {
	width: number;
	height: number;
};

const PreviewWindow: React.FC<Props> = ({ width, height }) => {
	return (
		<div className="canvas-pattern w-full h-full">
			<Common.Player width={width} height={height} />
			<PlayRateControl />
		</div>
	);
};

export default PreviewWindow;
