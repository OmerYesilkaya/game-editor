export enum ModuleValueType {
	Object,
	Range,
	Color,
	Animation,
	Sprite,
	Percentage,
	Vec2,
	Vec3,
	Vec4,
	Nested,
	Bool,
	Number,
	Text,
	TextArea,
}

export type Module = {
	name: string;
	id: number;
	children: Module[] | null;
	value_type: ModuleValueType;
	value: any | null;
	isCollapsed: boolean;
	prefabInternalId: string;
};

export type ApiModule = {
	name: string;
	id: number;
	children: ApiModule[] | null;
	value_type: ModuleValueType;
	value: any | null;
};
