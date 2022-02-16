import { useQuery, UseQueryResult } from "react-query";
import { URL } from "@core/constants";
import { QueryOptionTypes, TextureInfo } from "@app/types";

async function getTextureById(id?: number): Promise<TextureInfo> {
    return await fetch(URL.TEXTURES + `/${id}`, {
        method: "GET",
    }).then((result) => result.json());
}

export default function useGetTextureById({
    params,
    ...props
}: QueryOptionTypes<TextureInfo, { id: number }>): UseQueryResult<TextureInfo> {
    return useQuery(
        ["useGetTextureById", params?.id],
        () => getTextureById(params?.id),
        props
    ) as UseQueryResult<TextureInfo>;
}
