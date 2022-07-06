import { useQuery, UseQueryResult } from "react-query";
import { KEYS, URL } from "@app/constants";
import { QueryOptionTypes } from "@app/types";

async function getMaterials(): Promise<any[]> {
    const INIT: RequestInit = {
        method: "GET",
    };

    // return await fetch(URL.AUDIOS, INIT).then((result) => result.json());
    return await fetch(URL.MATERIAL_ANIMATIONS, INIT).then((result) => []);
}

export default function useGetMaterials(props?: QueryOptionTypes<any[]>): UseQueryResult<any[]> {
    return useQuery(KEYS.MATERIALS, () => getMaterials(), props);
}
