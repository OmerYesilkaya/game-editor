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

type Sprite = {
	pivot: Position;
	alignment: number;
	rect: Rect;
};

type SpriteMap = {
	[key: string]: Sprite;
};

export type AssetTexture = {
	id: string;
	sprites: SpriteMap;
};

export type AssetAnimation = {
	name: string;
	textureId: string;
	priority: AnimationPriority;
	transitionType: AnimationTransitionType;
	sprites: string[];
};
