import { useQuery, UseQueryResult } from "react-query";
import { URL } from "@core/constants";
import { QueryOptionTypes } from "@app/types";

async function getTrailSystems(): Promise<any[]> {
	const INIT: RequestInit = {
		method: "GET",
	};

	// return await fetch(URL.PARTICLE_SYSTEMS, INIT).then((result) => result.json());
	return await fetch(URL.PARTICLE_SYSTEMS, INIT).then((result) => []);
}

export default function useGetTrailSystems(props?: QueryOptionTypes<any[]>): UseQueryResult<any[]> {
	return useQuery("useGetTrailSystems", () => getTrailSystems(), props);
}
