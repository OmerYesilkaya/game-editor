import { Handle, Position } from "react-flow-renderer";
import { PrefabCreator as PrefabCreatorComponents } from "@app/components";
import { useRef } from "react";

type Props = {
	data: any;
};

const PrefabNodeComponent: React.FC<Props> = ({ data }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const customHandleStyles = containerRef.current && {
		background: "white",
		width: "15px",
		height: "15px",
		border: "2px solid",
		boxShadow: "0 0 10px rgba(0,0,0,0.6)",
		borderColor: window.getComputedStyle(containerRef.current).borderColor,
	};

	return (
		<div ref={containerRef} className="w-96 p-2 my-4 overflow-y-auto border-indigo-700 border-4 rounded-md bg-zinc-900">
			<Handle type="target" position={Position.Top} style={{ transform: "translateY(14.5px)", ...customHandleStyles }} />
			<PrefabCreatorComponents.ActivePrefab prefab={data.prefab} />
			<Handle type="source" position={Position.Bottom} style={{ transform: "translateY(-14.5px)", ...customHandleStyles }} />
		</div>
	);
};

export default PrefabNodeComponent;
