import { useState } from "react";

import cn from "classnames";

import { Common } from "@app/components";
import { usePrefabStore } from "@app/store";
import { api } from "@app/hooks";
import { ChevronRightIcon } from "@heroicons/react/outline";

type ActivePrefabProps = {
	prefab?: any;
};

const Module: React.FC<{ moduleId: number }> = ({ moduleId }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const { removeModule } = usePrefabStore((state) => ({
		removeModule: state.removeModule,
	}));
	const { data: module, isLoading } = api.useGetModuleById({
		params: { id: moduleId },
	});

	function toggleExpand() {
		setIsExpanded((prev) => !prev);
	}

	if (!module) return null;

	return (
		<button
			className={cn(
				"w-full h-full flex flex-col bg-zinc-700 border-2 border-white rounded-md px-1 py-0.5 text-white transition hover:brightness-110",
				{
					"cursor-pointer": !isExpanded,
					"cursor-default": isExpanded,
				}
			)}
			key={module.id}
			onClick={() => (!isExpanded ? toggleExpand() : null)}
		>
			<div className="flex items-center justify-between w-full">
				<div>{module.name}</div>
				<ChevronRightIcon
					onClick={(e) => {
						e.stopPropagation();
						toggleExpand();
					}}
					className={cn("w-5 h-5 bg-zinc-200 text-cyan-900 border-2 border-white rounded-sm shadow-md cursor-pointer", {
						"rotate-90": isExpanded,
					})}
				/>
			</div>

			{isExpanded && (
				<div className="w-full border-t flex flex-col px-0.5 pb-0.5">
					<div className="flex flex-col w-full h-full items-start">
						{module.children && module.children.map((child) => <div key={child.id}>{child.name}</div>)}
					</div>
					<button className="bg-red-600 px-1 shadow-md rounded-sm text-sm font-bold font-default" onClick={() => removeModule(module.id)}>
						REMOVE
					</button>
				</div>
			)}
		</button>
	);
};

const ActivePrefab: React.FC<ActivePrefabProps> = ({ prefab }) => {
	const { moduleIds } = usePrefabStore((state) => ({
		moduleIds: state.moduleIds,
	}));

	return (
		<>
			<Common.Header>Enemy Boar</Common.Header>
			<div className="flex flex-col gap-y-1 mt-1">
				{moduleIds.map((id) => (
					<Module key={id} moduleId={id} />
				))}
			</div>
		</>
	);
};

export default ActivePrefab;
