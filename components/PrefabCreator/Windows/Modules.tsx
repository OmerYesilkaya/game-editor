import { useState } from "react";

import { Common } from "@app/components";
import { api, useDebounce } from "@app/hooks";
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
		<>
			<Common.SearchInput placeholder="Module Name" query={query} setQuery={setQuery} isLoading={isLoading} />
			<div className="flex flex-col gap-y-1 mt-1">
				{filteredModules.length > 0
					? filteredModules.map((module) => (
							<button
								type="button"
								className="bg-zinc-900 border-2 border-white rounded-sm py-0.5 px-1.5 text-white flex items-center cursor-pointer transition hover:brightness-125"
								key={module.id}
								onClick={() => addModuleToPrefab(module)}
							>
								<span className="font-default text-sm font-bold mr-2">{module.name.toUpperCase()}</span>
								{/* <div className="bg-orange-600 text-white font-bold font-default text-xs px-1 rounded-sm ml-1 shadow-md">UTILITY</div>
								<div className="bg-red-600 text-white font-bold font-default text-xs px-1 rounded-sm ml-1 shadow-md">ENEMY</div> */}
							</button>
					  ))
					: getMessage()}
			</div>
		</>
	);
};

export default Modules;
