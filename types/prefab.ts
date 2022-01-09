import { ApiModule } from ".";

export type Prefab = {
	id: number;
	name: string;
	modules: ApiModule[];
	internalId: string;
	position: { x: number; y: number };
};

export type PostPrefabRequest = {
	name: string;
	modules: {
		arrayIndex: number;
		modulePartId: number;
		value: any;
	}[];
};

export type GetPrefabResponse = {
	id: number;
	modules: ApiModule[];
	name: string;
};
