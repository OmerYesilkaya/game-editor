import { ViewGridAddIcon } from "@heroicons/react/solid";

import { Module } from "@app/types";

import ModuleItem from "./ModuleItem";

type ActivePrefabProps = {
	prefab: { name: string; modules: Module[]; id: number; internalId: string };
	themeColor: string;
};

const ActivePrefab: React.FC<ActivePrefabProps> = ({ prefab, themeColor }) => {
	return (
		<div className="flex flex-col h-full">
			{prefab.modules.length > 0 ? (
				<div className="flex flex-col gap-y-1 mt-1">
					{prefab.modules.map((module) => (
						<ModuleItem themeColor={themeColor} key={module.id} moduleId={module.id} />
					))}
				</div>
			) : (
				<div className="text-white border-dashed border-2 mt-1 p-4 flex flex-col justify-center items-center font-default grow">
					<ViewGridAddIcon className="w-24 h-24" />
					<span className="text-2xl font-bold mb-2">This prefab has no modules</span>
					<span className="w-2/3 text-center">Please add a module from the panel on the left</span>
				</div>
			)}
		</div>
	);
};

export default ActivePrefab;
