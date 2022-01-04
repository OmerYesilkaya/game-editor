import { useState } from "react";

import { Common } from "@app/components";
import { api, useDebounce } from "@app/hooks";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { usePrefabStore } from "@app/store";

const Modules: React.FC = () => {
	const [query, setQuery] = useState("");

	const { debouncedValue, isLoading } = useDebounce(query.toLowerCase(), 200);
	const { getActivePrefab, addModuleToPrefab } = usePrefabStore((state) => ({
		addModuleToPrefab: state.addModuleToPrefab,
		getActivePrefab: state.getActivePrefab,
	}));

	const { data: rootModules } = api.useGetModules();

	const filteredModules = rootModules
		? rootModules
				.filter(
					(module) =>
						!getActivePrefab()
							?.modules.map((module) => module.id)
							.includes(module.id)
				)
				.filter((module) => debouncedValue === "" || module.name.toLowerCase().includes(debouncedValue))
		: [];

	function getMessage() {
		let message = "No modules found";
		if (debouncedValue) {
			message = "No modules found with given keyword";
		}
		return message ? <div className="border-dashed border-2 px-1.5 text-white">{message}</div> : null;
	}

	return (
		<div className="w-full h-full p-2 overflow-y-auto card-secondary">
			<Common.Header>Modules</Common.Header>
			<Common.SearchInput placeholder="Module Name" query={query} setQuery={setQuery} isLoading={isLoading} />
			<div className="flex flex-col gap-y-1 mt-1">
				{filteredModules.length > 0
					? filteredModules.map((module) => (
							<button
								className="bg-sky-900 border-2 border-white rounded-md px-1.5 py-0.5 text-white flex items-center cursor-pointer transition hover:brightness-110"
								key={module.id}
								onClick={() => addModuleToPrefab(module)}
							>
								<ChevronLeftIcon className="w-5 h-5 bg-zinc-200 text-cyan-900 border-2 border-white rounded-sm shadow-md " />
								<span className="ml-2">{module.name}</span>
								<div className="bg-orange-600 text-white font-bold font-default text-xs px-1 rounded-sm ml-1 shadow-md">UTILITY</div>
								<div className="bg-red-600 text-white font-bold font-default text-xs px-1 rounded-sm ml-1 shadow-md">ENEMY</div>
							</button>
					  ))
					: getMessage()}
			</div>
		</div>
	);
};

export default Modules;
