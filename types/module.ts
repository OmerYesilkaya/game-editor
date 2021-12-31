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
}

export type Module = {
	name: string;
	id: number;
	children: Module[] | null;
	value_type: ModuleValueType;
};
