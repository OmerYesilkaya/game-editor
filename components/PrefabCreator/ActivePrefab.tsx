import { useState } from "react";

import cn from "classnames";

import { Common } from "@app/components";
import { usePrefabStore } from "@app/store";
import { api } from "@app/hooks";
import { ChevronRightIcon, ExclamationCircleIcon, TrashIcon } from "@heroicons/react/outline";

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
			className={cn("w-full h-full flex flex-col font-default bg-zinc-800 border-2 border-white rounded-md px-1 py-0.5 text-white", {
				"cursor-pointer": !isExpanded,
				"cursor-default": isExpanded,
			})}
			key={module.id}
			onClick={() => (!isExpanded ? toggleExpand() : null)}
		>
			<div className="flex items-center justify-between w-full">
				<div className="font-bold">{module.name}</div>
				<div className="flex items-center">
					<TrashIcon
						className="bg-red-600 p-0.5 w-5 h-5 shadow-md rounded-sm text-sm font-bold font-default transition-colors hover:bg-red-700 mr-1 border-2 cursor-pointer"
						onClick={() => removeModule(module.id)}
					/>
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
			</div>

			{isExpanded && (
				<>
					<hr className="bg-slate-200 h-px w-full mt-0.5" />
					<div className="w-full flex flex-col px-0.5 pb-0.5">
						<div className="flex flex-col w-full h-full items-start">
							{module.children && module.children.map((child) => <div key={child.id}>{child.name}</div>)}
						</div>
					</div>
				</>
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
			<Common.Header className="rounded-sm px-2 py-0 text-lg">Enemy Boar</Common.Header>
			{moduleIds.length > 0 ? (
				<div className="flex flex-col gap-y-1 mt-1">
					{moduleIds.map((id) => (
						<Module key={id} moduleId={id} />
					))}
				</div>
			) : (
				<div className="text-white font-bold border-dashed border-2 mt-1 p-4 text-sm flex flex-col justify-center items-center">
					<ExclamationCircleIcon className="w-10 h-10" />
					<span className="w-2/3 text-center">Please add a module from the panel on the right</span>
				</div>
			)}
		</>
	);
};

export default ActivePrefab;
