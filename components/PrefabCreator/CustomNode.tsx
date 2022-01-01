import { Handle, Position } from "react-flow-renderer";
import { PrefabCreator as PrefabCreatorComponents } from "@app/components";

type Props = {
	data: any;
};

const CustomNodeComponent: React.FC<Props> = ({ data }) => {
	return (
		<div className="w-96 h-64 p-2 my-4 overflow-y-auto card-secondary">
			<Handle type="target" position={Position.Left} style={{ borderRadius: 0 }} />
			<PrefabCreatorComponents.ActivePrefab />
			<Handle type="source" position={Position.Right} id="a" style={{ top: "30%", borderRadius: 0 }} />
			<Handle type="source" position={Position.Right} id="b" style={{ top: "70%", borderRadius: 0 }} />
		</div>
	);
};

export default CustomNodeComponent;
