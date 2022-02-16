import { useQuery, UseQueryResult } from "react-query";
import { URL } from "@core/constants";
import { QueryOptionTypes } from "@app/types";

async function getMaterialAnimations(): Promise<any[]> {
	const INIT: RequestInit = {
		method: "GET",
	};

	// return await fetch(URL.AUDIOS, INIT).then((result) => result.json());
	return await fetch(URL.MATERIAL_ANIMATIONS, INIT).then((result) => []);
}

export default function useGetMaterialAnimations(props?: QueryOptionTypes<any[]>): UseQueryResult<any[]> {
	return useQuery("useGetMaterialAnimations", () => getMaterialAnimations(), props);
}
