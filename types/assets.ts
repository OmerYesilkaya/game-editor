import { AnimationPriority, AnimationTransitionType } from "./enums";

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

export type Audio = {
	id: number;
	name: string;
	url: string; // FOR PREVIEW, might change in the future
};

export type Generic = {
	id: number;
	name: string;
};
