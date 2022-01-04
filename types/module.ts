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
	isCollapsed: boolean;
	value: any | null;
	prefabInternalId: string;
};
