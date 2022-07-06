import { useQuery, UseQueryResult } from "react-query";
import { KEYS, URL } from "@app/constants";
import { QueryOptionTypes, TextureInfo } from "@app/types";

async function getTextureById(id?: number): Promise<TextureInfo> {
    return await fetch(URL.TEXTURES + `/${id}`, {
        method: "GET",
    }).then((result) => result.json());
}

export default function useGetTextureById({ params, ...props }: QueryOptionTypes<TextureInfo, { id: number }>): UseQueryResult<TextureInfo> {
    return useQuery([KEYS.TEXTURES, params?.id], () => getTextureById(params?.id), props) as UseQueryResult<TextureInfo>;
}
