import { UseMutationOptions, UseQueryOptions } from "react-query";

type QueryOptionTypes<T, S = {}> = UseQueryOptions<T, T, T, any> & {
	params?: S;
};
type MutationOptionTypes<T, S = {}> = UseMutationOptions<T, T, any, T> & {
	params?: S;
};

export type { QueryOptionTypes, MutationOptionTypes };
