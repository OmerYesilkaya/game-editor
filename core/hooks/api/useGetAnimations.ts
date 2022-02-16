import { useQuery, UseQueryResult } from "react-query";
import { URL } from "@core/constants";
import { QueryOptionTypes, Animation } from "@app/types";

async function getAnimations(): Promise<Animation[]> {
	const INIT: RequestInit = {
		method: "GET",
	};

	return await fetch(URL.ANIMATIONS, INIT).then((result) => result.json());
}

export default function useGetAnimations(props?: QueryOptionTypes<Animation[]>): UseQueryResult<Animation[]> {
	return useQuery("useGetAnimations", () => getAnimations(), props);
}
