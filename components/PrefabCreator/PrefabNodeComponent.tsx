import { HTMLAttributes, useRef } from "react";
import { Handle, Position } from "react-flow-renderer";

import { usePrefabStore } from "@app/store";
import { Module } from "@app/types";

import cn from "classnames";
import { DuplicateIcon, TrashIcon } from "@heroicons/react/outline";
import { Common } from "..";

type Props = {
	data: { name: string; modules: Module[]; id: number; internalId: string };
};

type ButtonProps = {
	themeColor: string;
	variant?: "outline" | "default";
} & HTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, themeColor, variant = "default", ...restProps }) => {
	return (
		<button
			type="button"
			onClick={() => console.log("click")}
			className={cn(`w-7 h-7 rounded-sm bg-${themeColor}-500 transition  shadow-md `, {
				[`bg-${themeColor}-500 hover:bg-${themeColor}-600 text-white`]: variant === "default",
				[`bg-transparent border-2 border-${themeColor}-500 hover:bg-${themeColor}-500 hover:border-white text-${themeColor}-500 hover:text-white`]:
					variant === "outline",
			})}
			{...restProps}
		>
			{children}
		</button>
	);
};

const PrefabNodeComponent: React.FC<Props> = ({ data }) => {
	const { activePrefabId, setActivePrefabId } = usePrefabStore((state) => ({
		activePrefabId: state.activePrefabId,
		setActivePrefabId: state.setActivePrefabId,
	}));
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
			onClick={() => setActivePrefabId(data.id)}
			ref={containerRef}
			className={cn(`w-[400px] p-2 my-4 overflow-y-auto  border-4 rounded-md bg-zinc-900`, {
				[`border-${themeColor}-600`]: activePrefabId === data.id,
				[`border-${themeColor}-800`]: activePrefabId !== data.id,
			})}
		>
			<Handle type="target" position={Position.Top} style={{ transform: "translateY(14.5px) translateX(-7.5px)", ...customHandleStyles }} />
			<Common.Header className="w-full" id="drag-handle">
				<div className="flex items-center w-full justify-between">
					<span>{data.name}</span>
					<div className="flex items-center">
						<Button themeColor={themeColor} title="Duplicate">
							<DuplicateIcon className="w-full h-full p-1" />
						</Button>
						<div className="h-6 bg-rose-600  w-0.5 rounded-full mx-1" />
						<Button themeColor={themeColor} variant="outline" title="Delete Prefab">
							<TrashIcon className="w-full h-full p-1" />
						</Button>
					</div>
				</div>
			</Common.Header>
			<Handle type="source" position={Position.Bottom} style={{ transform: "translateY(-14.5px) translateX(-7.5px)", ...customHandleStyles }} />
		</div>
	);
};

export default PrefabNodeComponent;
