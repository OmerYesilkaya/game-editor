import { useRef } from "react";
import { Handle, Position } from "react-flow-renderer";

import { PrefabCreator as PrefabCreatorComponents } from "@app/components";
import { usePrefabStore } from "@app/store";

import cn from "classnames";

type Props = {
	data: { name: string; moduleIds: number[]; id: number; internalId: string };
};

const PrefabNodeComponent: React.FC<Props> = ({ data }) => {
	const { activePrefabId } = usePrefabStore((state) => ({ prefabs: state.prefabs, activePrefabId: state.activePrefabId }));
	const containerRef = useRef<HTMLDivElement>(null);
	const themeColor = "rose";

	const customHandleStyles = containerRef.current && {
		background: "white",
		width: "15px",
		height: "15px",
		border: "2px solid",
		boxShadow: "0 0 10px rgba(0,0,0,0.6)",
		borderColor: window.getComputedStyle(containerRef.current).borderColor,
	};

	return (
		<div
			ref={containerRef}
			className={cn(`w-[400px] p-2 my-4 overflow-y-auto  border-4 rounded-md bg-zinc-900`, {
				[`border-${themeColor}-600`]: activePrefabId === data.internalId,
				[`border-${themeColor}-800`]: activePrefabId !== data.internalId,
			})}
		>
			<Handle type="target" position={Position.Top} style={{ transform: "translateY(14.5px)", ...customHandleStyles }} />
			<PrefabCreatorComponents.ActivePrefab prefab={data} themeColor={themeColor} />
			<Handle type="source" position={Position.Bottom} style={{ transform: "translateY(-14.5px)", ...customHandleStyles }} />
		</div>
	);
};

export default PrefabNodeComponent;
