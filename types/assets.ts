import { AnimationPriority, AnimationTransitionType } from "./asset_enums";

export type AssetPlayer = {
	[key: string]: number;
};

type Position = {
	x: number;
	y: number;
};

type Rect = {
	x: number;
	y: number;
	width: number;
	height: number;
};

export type Sprite = {
	id: number;
	pivot: Position;
	alignment: number;
	name: string;
	rect: Rect;
	textureId: number;
};

export type Animation = {
	id: number;
	name: string;
	priority: AnimationPriority;
	transitionType: AnimationTransitionType;
	sprites: number[];
};
