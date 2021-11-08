import { AnimationPriority, AnimationTransitionType } from "./asset_enums";

export type AssetPlayer = {
	Health: number;
	Shield: number;
	Armor: number;
	Energy: number;
	Power: number;
	Mastery: number;
	Speed: number;
	CDR: number;
	Haste: number;
	TurnRate: number;
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
