import { useState } from "react";

import cn from "classnames";

import { usePrefabStore } from "@app/store";
import { api } from "@app/hooks";
import { ChevronRightIcon, TrashIcon } from "@heroicons/react/outline";
import { Module } from "types/module";

const ModuleInput: React.FC<{ child: Module }> = ({ child: module }) => {
	return (
		<div className="grid grid-cols-2 place-items-start">
			<span className="">{module.name}</span>
			<input className="w-full text-black rounded-sm px-1" />
		</div>
	);
};

const ModuleItem: React.FC<{ moduleId: number }> = ({ moduleId }) => {
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
						<div className="flex flex-col w-full h-full items-start gap-y-1 mt-1">
							{module.children && module.children.map((child) => <ModuleInput key={child.id} child={child} />)}
						</div>
					</div>
				</>
			)}
		</button>
	);
};

export default ModuleItem;
