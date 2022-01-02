import ReactFlow, { Background, BackgroundVariant, Elements } from "react-flow-renderer";
import PrefabNodeComponent from "./PrefabNodeComponent";

const PrefabCanvas: React.FC = () => {
	const elements: Elements = [
		{
			id: "2",
			type: "special",
			position: { x: 100, y: 100 },
			data: { text: "A custom node" },
			dragHandle: "#drag-handle",
		},
	];

	const nodeTypes = {
		special: PrefabNodeComponent,
	};

	return (
		<div className="w-full h-full rounded-md border-4">
			<ReactFlow elements={elements} nodeTypes={nodeTypes}>
				<Background variant={BackgroundVariant.Dots} gap={24} size={1} color="rgb(39,39,42)" />
			</ReactFlow>
		</div>
	);
};

export default PrefabCanvas;
