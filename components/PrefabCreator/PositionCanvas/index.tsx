import { useEffect, useState } from "react";

import cn from "classnames";
import useResizeObserver from "use-resize-observer";

import { useDebounce } from "@app/hooks";

import Assets from "./Assets";
import Canvas from "./Canvas";

type PrefabAsset = {
	[key: string]: number[];
} | null;

const PositionCanvas: React.FC = () => {
	const [assets, setAssets] = useState<PrefabAsset>(null);
	const { ref, width, height } = useResizeObserver<HTMLDivElement>();
	const [dimensions, setDimensions] = useState({ width, height });
	const { debouncedValue, isLoading } = useDebounce(dimensions, 300);

	useEffect(() => {
		setDimensions({ width, height });
	}, [width, height]);

	return (
		<div className="w-full h-full flex flex-col">
			<Assets assets={assets} setAssets={setAssets} />
			<div ref={ref} className="w-full h-full  border-2 border-white rounded-sm relative">
				<div
					className={cn(
						"w-full h-full  bg-slate-300 rounded-sm absolute flex items-center justify-center font-default font-black text-lg transition",
						{
							"opacity-100": isLoading,
							"opacity-0": !isLoading,
						}
					)}
				>
					CANVAS RESIZING...
				</div>
				<Canvas width={debouncedValue.width ?? 0} height={debouncedValue.height ?? 0} />
			</div>
		</div>
	);
};

export default PositionCanvas;
