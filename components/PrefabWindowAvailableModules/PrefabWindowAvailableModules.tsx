import { useState } from "react";

import { stringUtils } from "@core/utils";

import { Common } from "components";
import { useDebounce, usePrefabEditorSelectedPrefab } from "hooks";
import api from "api";

const AvailableModules: React.FC = () => {
    const { data: rootModules } = api.useGetModules();
    const [search, setSearch] = useState("");
    const { debouncedValue, isLoading } = useDebounce(search.toLowerCase(), 200);
    const { selectedPrefab, addModule } = usePrefabEditorSelectedPrefab();

    const filteredModules = rootModules
        ? rootModules
              .filter((module) => !selectedPrefab?.modules.map((module) => module.id).includes(module.id))
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
            <div className=" bg-zinc-100 w-full rounded-sm">
                <span className="ml-1 font-black uppercase font-default text-zinc-900">Available Modules</span>
            </div>
            <Common.SearchInput placeholder="Module Name" query={search} setQuery={setSearch} isLoading={isLoading} />
            <div className="flex flex-col grow mt-1 max-h-full overflow-y-auto gap-y-0.5">
                {filteredModules.length > 0
                    ? filteredModules.map((module) => (
                          <button
                              type="button"
                              className="bg-zinc-800 rounded-sm py-0.5 px-1.5 text-white flex justify-between items-center cursor-pointer transition hover:brightness-125"
                              key={module.id}
                              onClick={() => api.getModuleById(module.id).then((detailedModule) => addModule(detailedModule))}
                          >
                              <span className="font-default text-sm font-bold mr-1 uppercase">{stringUtils.formatCamelCase(module.name)}</span>
                              {/* <div className="bg-orange-600 text-white font-default font-bold text-xs px-1 rounded-sm ml-1 shadow-md">UTILITY</div>
								<div className="bg-red-600 text-white font-default font-bold text-xs px-1 rounded-sm ml-1 shadow-md">ENEMY</div> */}
                          </button>
                      ))
                    : getMessage()}
            </div>
        </>
    );
};

export default AvailableModules;
