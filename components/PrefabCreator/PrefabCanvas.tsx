import ReactFlow, { Background, BackgroundVariant, Elements } from "react-flow-renderer";
import CustomNodeComponent from "./CustomNode";

const PrefabCanvas: React.FC = () => {
	const elements: Elements = [
		{
			id: "2",
			type: "special",
			position: { x: 100, y: 100 },
			data: { text: "A custom node" },
		},
	];

	const nodeTypes = {
		special: CustomNodeComponent,
	};

	return (
		<div className="w-full h-full rounded-md border-4">
			<ReactFlow elements={elements} nodeTypes={nodeTypes}>
				<Background variant={BackgroundVariant.Dots} gap={24} size={1} />
			</ReactFlow>
		</div>
	);
};

export default PrefabCanvas;
