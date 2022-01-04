import { useQuery, UseQueryResult } from "react-query";
import { URL } from "@app/constants";
import { OptionTypes, Sprite } from "@app/types";

async function getSprites(): Promise<Sprite[]> {
	const INIT: RequestInit = {
		method: "GET",
	};

	return await fetch(URL.GET_SPRITES, INIT).then((result) => result.json());
}

export default function useGetSprites(props?: OptionTypes<Sprite[]>): UseQueryResult<Sprite[]> {
	return useQuery("useGetSprites", () => getSprites(), props);
}
