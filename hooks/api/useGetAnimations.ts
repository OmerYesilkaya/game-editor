import { useQuery, UseQueryResult } from "react-query";
import { URL } from "@app/constants";
import { OptionTypes, Animation } from "@app/types";

async function getAnimations(): Promise<Animation[]> {
	const INIT: RequestInit = {
		method: "GET",
	};

	return await fetch(URL.GET_ANIMATIONS, INIT).then((result) => result.json());
}

export default function useGetAnimations(props?: OptionTypes<Animation[]>): UseQueryResult<Animation[]> {
	return useQuery("useGetAnimations", () => getAnimations(), props);
}
