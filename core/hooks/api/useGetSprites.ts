import { useQuery, UseQueryResult } from "react-query";
import { URL } from "@core/constants";
import { QueryOptionTypes, Sprite } from "@app/types";

async function getSprites(): Promise<Sprite[]> {
	const INIT: RequestInit = {
		method: "GET",
	};

	return await fetch(URL.SPRITES, INIT).then((result) => result.json());
}

export default function useGetSprites(props?: QueryOptionTypes<Sprite[]>): UseQueryResult<Sprite[]> {
	return useQuery("useGetSprites", () => getSprites(), props);
}
