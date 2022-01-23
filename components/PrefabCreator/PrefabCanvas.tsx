import { useState } from "react";

import PhysicsCanvas from "./PhysicsCanvas";
import PositionCanvas from "./PositionCanvas";

enum PrefabCanvasType {
	Physics,
	Position,
}

const PrefabCanvas: React.FC = () => {
	const [activeCanvas, setActiveCanvas] = useState(PrefabCanvasType.Position);

	function handleSelect(id: PrefabCanvasType) {
		setActiveCanvas(id);
	}

	return (
		<div className="relative flex flex-col w-full h-full">
			{activeCanvas === PrefabCanvasType.Physics ? <PhysicsCanvas /> : <PositionCanvas />}
		</div>
	);
};

export default PrefabCanvas;
