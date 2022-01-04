import ReactFlow, { Background, BackgroundVariant, Elements } from "react-flow-renderer";
import PrefabNodeComponent from "./PrefabNodeComponent";
import { usePrefabStore } from "@app/store";

const PrefabCanvas: React.FC = () => {
	const prefabs = usePrefabStore((state) => state.prefabs);

	const elements: Elements = prefabs.map((prefab) => ({
		id: prefab.internalId,
		type: "prefab",
		position: prefab.position,
		data: { name: prefab.name, modules: prefab.modules, id: prefab.id, internalId: prefab.internalId },
		dragHandle: "#drag-handle",
	}));

	const nodeTypes = {
		prefab: PrefabNodeComponent,
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
