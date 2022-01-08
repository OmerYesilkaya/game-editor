import { Module } from ".";

export type Prefab = {
	id: number;
	name: string;
	modules: Module[];
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
