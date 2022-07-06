import { useQuery, UseQueryResult } from "react-query";
import { KEYS, URL } from "@core/constants";
import { QueryOptionTypes } from "@app/types";

type ApiTexture = { id: number; name: string };

async function getTextures(): Promise<ApiTexture[]> {
    const INIT: RequestInit = {
        method: "GET",
    };

    return await fetch(URL.TEXTURES, INIT).then((result) => result.json());
}

export default function useGetTextures(props?: QueryOptionTypes<ApiTexture[]>): UseQueryResult<ApiTexture[]> {
    return useQuery(KEYS.TEXTURES, () => getTextures(), props);
}
