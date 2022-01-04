import { useQuery, UseQueryResult } from "react-query";
import { URL } from "@app/constants";
import { OptionTypes, Texture } from "@app/types";

async function getTextureById(id?: number): Promise<Texture> {
	return await fetch(URL.GET_TEXTURES + `/${id}`, {
		method: "GET",
	}).then((result) => result.json());
}

export default function useGetTextureById({ params, ...props }: OptionTypes<Texture, { id: number }>): UseQueryResult<Texture> {
	return useQuery(["useGetTextureById", params?.id], () => getTextureById(params?.id), props) as UseQueryResult<Texture>;
}
