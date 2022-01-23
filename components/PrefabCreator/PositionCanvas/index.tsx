import { useEffect, useState } from "react";

import cn from "classnames";
import useResizeObserver from "use-resize-observer";

import { useDebounce } from "@app/hooks";
import { useTimelineStore } from "@app/store";

import Canvas from "./Canvas";

const PositionCanvas: React.FC = () => {
	const { ref, width, height } = useResizeObserver<HTMLDivElement>();
	const [dimensions, setDimensions] = useState({ width, height });
	const { debouncedValue, isLoading } = useDebounce(dimensions, 100);
	const activeTimelines = useTimelineStore((state) => state.activeTimelines);

	useEffect(() => {
		setDimensions({ width, height });
	}, [width, height]);

	return (
		<div className="w-full h-full flex flex-col">
			<div ref={ref} className="w-full h-full shadow-md relative rounded-sm canvas-pattern">
				<div
					className={cn("w-full h-full bg-slate-300 absolute flex items-center justify-center font-default font-black text-lg transition", {
						"opacity-100": isLoading,
						"opacity-0": !isLoading,
					})}
				>
					CANVAS RESIZING...
				</div>
				{/* <Canvas width={debouncedValue.width ?? 0} height={debouncedValue.height ?? 0} /> */}
				{activeTimelines &&
					Object.keys(activeTimelines).map((prefabId) => {
						return (
							<div>
								{activeTimelines[prefabId].map((animationId) => (
									<p>{animationId}</p>
								))}
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default PositionCanvas;
