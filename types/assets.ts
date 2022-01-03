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
	id: string;
	pivot: Position;
	alignment: number;
	rect: Rect;
	textureId: string;
};

export type Animation = {
	id: string;
	name: string;
	priority: AnimationPriority;
	transitionType: AnimationTransitionType;
	sprites: string[];
};
