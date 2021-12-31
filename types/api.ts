import { UseQueryOptions } from "react-query";

type OptionTypes<T, S = {}> = UseQueryOptions<T, T, T, any> & {
	params: S;
};

export type { OptionTypes };
