import { useState } from "react";

import { ChevronRightIcon } from "@heroicons/react/outline";

import { Common } from "@app/components";
import { api, useDebounce } from "@app/hooks";
import { usePrefabStore, useInputStore } from "@app/store";
import { ApiModule } from "@app/types";
import { moduleUtils } from "@app/utils";

const AvailableModules: React.FC = () => {
	const [query, setQuery] = useState("");

	const { debouncedValue, isLoading } = useDebounce(query.toLowerCase(), 200);
	const addInputs = useInputStore((state) => state.addInputs);
	const { prefab, addModuleToPrefab } = usePrefabStore((state) => ({
		prefab: state.prefab,
		addModuleToPrefab: state.addModuleToPrefab,
	}));

	const { data: rootModules } = api.useGetModules();

	const filteredModules = rootModules
		? rootModules
				.filter((module) => !prefab?.modules.map((module) => module.id).includes(module.id))
				.filter((module) => debouncedValue === "" || module.name.toLowerCase().includes(debouncedValue))
		: [];

	function getMessage() {
		let message = "No modules found";
		if (debouncedValue) {
			message = "No modules found with given keyword";
		}
		return message ? <div className="border-dashed border-2 px-1.5 text-white">{message}</div> : null;
	}

	function handleAddModule(module: ApiModule) {
		addModuleToPrefab(module);
		addInputs(moduleUtils.getModuleInputs([module]));
	}

	return (
		<>
			<Common.SearchInput placeholder="Module Name" query={query} setQuery={setQuery} isLoading={isLoading} />
			<div className="flex flex-col gap-y-0.5 mt-1">
				{filteredModules.length > 0
					? filteredModules.map((module) => (
							<button
								type="button"
								className="bg-zinc-800 rounded-sm py-0.5 px-1.5 text-white flex justify-between items-center cursor-pointer transition hover:brightness-125"
								key={module.id}
								onClick={() => api.getModuleById(module.id).then((result) => handleAddModule(result))}
							>
								<span className="font-default text-sm font-bold mr-2">{module.name.toUpperCase()}</span>
								{/* <div className="bg-orange-600 text-white font-default font-bold text-xs px-1 rounded-sm ml-1 shadow-md">UTILITY</div>
								<div className="bg-red-600 text-white font-default font-bold text-xs px-1 rounded-sm ml-1 shadow-md">ENEMY</div> */}
								<ChevronRightIcon className="w-4 h-4" />
							</button>
					  ))
					: getMessage()}
			</div>
		</>
	);
};

export default AvailableModules;