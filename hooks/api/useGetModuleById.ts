import { useQuery, UseQueryResult } from "react-query";
import { URL } from "@app/constants";
import { QueryOptionTypes, Module } from "@app/types";

async function getModuleById(id?: number): Promise<Module> {
	return await fetch(URL.MODULES + `/${id}`, {
		method: "GET",
	}).then((result) => result.json());
}

export default function useGetModuleById({ params, ...props }: QueryOptionTypes<Module, { id: number }>): UseQueryResult<Module> {
	return useQuery(["useGetModulesById", params?.id], () => getModuleById(params?.id), props) as UseQueryResult<Module>;
}
