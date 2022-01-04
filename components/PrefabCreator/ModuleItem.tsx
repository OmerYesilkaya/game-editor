import { useState } from "react";

import cn from "classnames";

import { usePrefabStore } from "@app/store";
import { ChevronRightIcon, TrashIcon } from "@heroicons/react/outline";
import { Module, ModuleValueType } from "types/module";
import DynamicInput from "./DynamicInput";
import api from "hooks/api";

const ModuleInput: React.FC<{ themeColor: string; child: Module }> = ({ themeColor, child: module }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	function toggleExpand() {
		setIsExpanded((prev) => !prev);
	}

	return (
		<div className="flex flex-col w-full bg-zinc-900 rounded-sm px-1 py-1">
			<div className="flex w-full">
				<span className="w-full text-left">{module.name}</span>
				{module.value_type === ModuleValueType.Object ? (
					<div className="ml-1 flex items-center justify-between">
						<ChevronRightIcon
							onClick={(e) => {
								e.stopPropagation();
								toggleExpand();
							}}
							className={cn(`w-5 h-5 bg-${themeColor}-600 border-2 border-white rounded-sm shadow-md cursor-pointer`, {
								"rotate-90": isExpanded,
							})}
						/>
					</div>
				) : (
					<DynamicInput module={module} />
				)}
			</div>
			{isExpanded && (
				<div className="flex h-full w-full">
					<hr className="w-0.5 h-auto bg-zinc-200 rounded-full my-0.5 ml-2" />
					<div className="ml-1 rounded-sm  my-0.5 pl-1  w-full">
						<div className="flex flex-col w-full h-full items-start">
							{module.children && module.children.map((child) => <ModuleInput themeColor={themeColor} key={child.id} child={child} />)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const ModuleItem: React.FC<{ themeColor: string; moduleId: number }> = ({ themeColor, moduleId }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const { removeModuleFromPrefab } = usePrefabStore((state) => ({
		removeModuleFromPrefab: state.removeModuleFromPrefab,
	}));

	const { data: module } = api.useGetModuleById({ params: { id: moduleId } });

	function toggleExpand() {
		setIsExpanded((prev) => !prev);
	}

	if (!module) return null;

	return (
		<button
			className={cn("w-full h-full flex flex-col font-default bg-zinc-800 border-2 rounded-sm px-1 py-0.5 text-white", {
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
						onClick={(e) => {
							e.stopPropagation();
							console.log("module", module);
							removeModuleFromPrefab(module.id, module.prefabInternalId);
						}}
					/>
					<ChevronRightIcon
						onClick={(e) => {
							e.stopPropagation();
							toggleExpand();
						}}
						className={cn(`w-5 h-5 bg-${themeColor}-600 border-2 border-white rounded-sm shadow-md cursor-pointer`, {
							"rotate-90": isExpanded,
						})}
					/>
				</div>
			</div>

			{isExpanded && (
				<>
					<hr className="text-zinc-600 h-px w-full mt-0.5" />
					<div className="w-full flex flex-col px-0.5 pb-0.5">
						<div className="flex flex-col w-full h-full items-start gap-y-px mt-1">
							{module.children && module.children.map((child) => <ModuleInput themeColor={themeColor} key={child.id} child={child} />)}
						</div>
					</div>
				</>
			)}
		</button>
	);
};

export default ModuleItem;
