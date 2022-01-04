import { useQuery, UseQueryResult } from "react-query";
import { URL } from "@app/constants";
import { OptionTypes } from "@app/types";

type ApiTexture = { id: number; name: string };

async function getTextures(): Promise<ApiTexture[]> {
	const INIT: RequestInit = {
		method: "GET",
	};

	return await fetch(URL.GET_TEXTURES, INIT).then((result) => result.json());
}

export default function useGetTextures(props?: OptionTypes<ApiTexture[]>): UseQueryResult<ApiTexture[]> {
	return useQuery("useGetTextures", () => getTextures(), props);
}
