import { useQuery, UseQueryResult } from "react-query";
import { URL } from "@app/constants";
import { OptionTypes, Module } from "@app/types";

async function getModules(): Promise<Module[]> {
	const INIT: RequestInit = {
		method: "GET",
	};

	return await fetch(URL.GET_MODULES, INIT).then((result) => result.json());
}

export default function useGetModules(props?: OptionTypes<Module[]>): UseQueryResult<Module[]> {
	return useQuery("useGetModules", () => getModules(), props);
}
