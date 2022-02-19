import { useQuery, UseQueryResult } from "react-query";
import { KEYS, URL } from "@core/constants";
import { QueryOptionTypes, ApiModule } from "@app/types";

export async function getModuleById(id?: number): Promise<ApiModule> {
    return await fetch(URL.MODULES + `/${id}`, {
        method: "GET",
    }).then((result) => result.json());
}

export default function useGetModuleById({ params, ...props }: QueryOptionTypes<ApiModule, { id: number }>): UseQueryResult<ApiModule> {
    return useQuery([KEYS.MODULES, params?.id], () => getModuleById(params?.id), props) as UseQueryResult<ApiModule>;
}
