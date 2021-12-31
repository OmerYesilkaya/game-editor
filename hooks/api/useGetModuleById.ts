import { useQuery, UseQueryResult } from "react-query";
import { URL } from "@app/constants";
import { OptionTypes, Module } from "@app/types";

async function getModuleById(id: number): Promise<Module> {
	return await fetch(URL.GET_MODULES + `/${id}`, {
		method: "GET",
	}).then((result) => result.json());
}

export default function useGetModuleById({ params, ...props }: OptionTypes<Module, { id: number }>): UseQueryResult<Module> {
	return useQuery(["useGetModulesById", params.id], () => getModuleById(params.id), props) as UseQueryResult<Module>;
}
