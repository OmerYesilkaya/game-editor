import { useQuery, UseQueryResult } from "react-query";
import { KEYS, URL } from "@core/constants";
import { QueryOptionTypes } from "@app/types";

async function getParticleSystems(): Promise<any[]> {
    const INIT: RequestInit = {
        method: "GET",
    };

    // return await fetch(URL.PARTICLE_SYSTEMS, INIT).then((result) => result.json());
    return await fetch(URL.PARTICLE_SYSTEMS, INIT).then((result) => []);
}

export default function useGetParticleSystems(props?: QueryOptionTypes<any[]>): UseQueryResult<any[]> {
    return useQuery(KEYS.PARTICLE_SYSTEMS, () => getParticleSystems(), props);
}
