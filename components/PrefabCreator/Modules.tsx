import { useState } from "react";

import { Common } from "@app/components";
import { api, useDebounce } from "@app/hooks";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { usePrefabStore } from "@app/store";

type ModulesProps = {
	x?: any;
};

const Modules: React.FC<ModulesProps> = ({ x }) => {
	const [query, setQuery] = useState("");

	const { data: modules } = api.useGetModules();
	const { debouncedValue, isLoading } = useDebounce(query.toLowerCase(), 200);
	const { moduleIds, addModule } = usePrefabStore((state) => ({
		moduleIds: state.moduleIds,
		addModule: state.addModule,
	}));

	return (
		<div className="w-2/3 h-full p-2 my-4 overflow-y-auto card-secondary">
			<Common.Header>Modules</Common.Header>
			<Common.SearchInput placeholder="Module Name" query={query} setQuery={setQuery} isLoading={isLoading} />
			<div className="flex flex-col gap-y-1 mt-1">
				{modules &&
					modules
						.filter((module) => !moduleIds.includes(module.id))
						.filter((module) => debouncedValue === "" || module.name.toLowerCase().includes(debouncedValue))
						.map((module) => (
							<button
								className="bg-sky-900 border-2 border-white rounded-md px-1.5 py-0.5 text-white flex items-center cursor-pointer transition hover:brightness-110"
								key={module.id}
								onClick={() => addModule(module.id)}
							>
								<ChevronLeftIcon className="w-5 h-5 bg-zinc-200 text-cyan-900 border-2 border-white rounded-sm shadow-md " />
								<span className="ml-2">{module.name}</span>
								<div className="bg-orange-600 text-white font-bold font-default text-xs px-1 rounded-sm ml-1 shadow-md">UTILITY</div>
								<div className="bg-red-600 text-white font-bold font-default text-xs px-1 rounded-sm ml-1 shadow-md">ENEMY</div>
							</button>
						))}
			</div>
		</div>
	);
};

export default Modules;
