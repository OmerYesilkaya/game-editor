import { useQuery, UseQueryResult } from "react-query";
import { KEYS, URL } from "@app/constants";
import { QueryOptionTypes } from "@app/types";

async function getTrailSystems(): Promise<any[]> {
    const INIT: RequestInit = {
        method: "GET",
    };

    // return await fetch(URL.TRAIL_SYSTEMS, INIT).then((result) => result.json());
    return await fetch(URL.TRAIL_SYSTEMS, INIT).then((result) => []);
}

export default function useGetTrailSystems(props?: QueryOptionTypes<any[]>): UseQueryResult<any[]> {
    return useQuery(KEYS.TRAIL_SYSTEMS, () => getTrailSystems(), props);
}
