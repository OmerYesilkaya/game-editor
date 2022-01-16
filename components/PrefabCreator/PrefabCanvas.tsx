import { useState } from "react";

import cn from "classnames";

import PhysicsCanvas from "./PhysicsCanvas";
import PositionCanvas from "./PositionCanvas";

enum PrefabCanvasType {
	Physics,
	Position,
}

type Props = {
	activeTabId: PrefabCanvasType;
	tabId: PrefabCanvasType;
	handleSelect: (id: PrefabCanvasType) => void;
};

const Tab: React.FC<Props> = ({ tabId, activeTabId, handleSelect, children }) => {
	const selected = tabId === activeTabId;

	return (
		<button className="flex mt-px w-full" onClick={() => handleSelect(tabId)}>
			<div
				className={cn(
					"flex w-full rounded-sm px-1 py-px justify-center text-sm font-default transition bg-zinc-900 text-white border-2 border-rose-600 hover:brightness-125",
					{
						" opacity-100": selected,
						"opacity-25": !selected,
					}
				)}
			>
				{children}
			</div>
		</button>
	);
};

const PrefabCanvas: React.FC = () => {
	const [activeCanvas, setActiveCanvas] = useState(PrefabCanvasType.Position);

	function handleSelect(id: PrefabCanvasType) {
		setActiveCanvas(id);
	}

	return (
		<div className="relative flex flex-col w-full h-full p-1">
			<div className="w-full flex gap-x-1">
				<Tab handleSelect={handleSelect} tabId={PrefabCanvasType.Physics} activeTabId={activeCanvas}>
					PHYSICS
				</Tab>
				<Tab handleSelect={handleSelect} tabId={PrefabCanvasType.Position} activeTabId={activeCanvas}>
					POSITION
				</Tab>
			</div>
			<div className="grow flex flex-col text-white p-1 bg-zinc-900 rounded-sm mt-1 ">
				{activeCanvas === PrefabCanvasType.Physics ? <PhysicsCanvas /> : <PositionCanvas />}
			</div>
		</div>
	);
};

export default PrefabCanvas;
