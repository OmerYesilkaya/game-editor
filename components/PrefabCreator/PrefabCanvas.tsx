import ReactFlow, { Background, BackgroundVariant, Elements } from "react-flow-renderer";
import PrefabNodeComponent from "./PrefabNodeComponent";
import { usePrefabStore } from "@app/store";

const PrefabCanvas: React.FC = () => {
	const prefab = usePrefabStore((state) => state.prefab);

	const elements: Elements = prefab
		? [
				{
					id: prefab.internalId,
					type: "prefab",
					position: prefab.position,
					data: { name: prefab.name, modules: prefab.modules, id: prefab.id, internalId: prefab.internalId },
					dragHandle: "#drag-handle",
				},
		  ]
		: [];

	//TODO(omer): also add children of the current prefab into flow canvas

	const nodeTypes = {
		prefab: PrefabNodeComponent,
	};

	return (
		<div className="w-full h-full">
			<ReactFlow elements={elements} nodeTypes={nodeTypes}>
				<Background variant={BackgroundVariant.Dots} gap={24} size={1} color="rgb(39,39,42)" />
			</ReactFlow>
		</div>
	);
};

export default PrefabCanvas;
