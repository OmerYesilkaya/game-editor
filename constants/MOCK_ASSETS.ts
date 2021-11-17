import { AbilityType } from "types/ability";
import { AssetAnimation, AssetPlayer, AssetTexture } from "types/assets";
import { AnimationPriority, AnimationTransitionType } from "types/asset_enums";

import defaultAttack from "public/assets/svgs/skill1.svg";
import skill2 from "public/assets/svgs/skill2.svg";
import skill3 from "public/assets/svgs/skill3.svg";
import skill4 from "public/assets/svgs/skill4.svg";
import skill5 from "public/assets/svgs/skill5.svg";
import skill6 from "public/assets/svgs/skill6.svg";

const PLAYER: AssetPlayer = {
	Health: 200,
	Shield: 0,
	Armor: 0,
	Energy: 50,
	Power: 0,
	Mastery: 0,
	Speed: 50,
	CDR: 0,
	Haste: 0,
	TurnRate: 8,
};

const IDLE_ANIMATION: AssetAnimation = {
	name: "idle",
	priority: AnimationPriority.DEFAULT,
	sprites: [
		"5970936442297543168",
		"-3393567847556516773",
		"7749807355932341607",
		"6342897656025227556",
		"5594907966370946705",
		"-1619123944116397290",
		"8707965513103291377",
		"-746206404700068361",
		"-7829305271053624343",
		"-1602783885469669707",
		"7054667483814815233",
		"-4788626202656424822",
		"8778551679735035083",
		"-6028798717957631303",
		"-960832498917958613",
		"5415816877640597890",
	],
	textureId: "37d25c3149f6ce44aafbf5917079cf20",
	transitionType: AnimationTransitionType.LOOP,
};

const PLAYER_TEXTURE: AssetTexture = {
	id: "asldkasd",
	sprites: {
		"5970936442297543168": {
			alignment: 9,
			pivot: { x: 0.44444445, y: 0.12903225 },
			rect: {
				x: 342,
				y: 418,
				width: 45,
				height: 31,
			},
		},
		"-3393567847556516773": {
			alignment: 9,
			pivot: { x: 0.44444445, y: 0.13333334 },
			rect: {
				x: 195,
				y: 418,
				width: 45,
				height: 30,
			},
		},
		"7749807355932341607": {
			alignment: 9,
			pivot: { x: 0.44444445, y: 0.13333334 },
			rect: {
				x: 242,
				y: 418,
				width: 45,
				height: 30,
			},
		},
		"6342897656025227556": {
			alignment: 9,
			pivot: { x: 0.4318182, y: 0.10344828 },
			rect: {
				x: 382,
				y: 385,
				width: 44,
				height: 29,
			},
		},
		"5594907966370946705": {
			alignment: 9,
			pivot: { x: 0.44444445, y: 0.10344828 },
			rect: {
				x: 195,
				y: 387,
				width: 45,
				height: 29,
			},
		},
		"-1619123944116397290": {
			alignment: 9,
			pivot: { x: 0.4318182, y: 0.10344828 },
			rect: {
				x: 382,
				y: 354,
				width: 44,
				height: 29,
			},
		},
		"8707965513103291377": {
			alignment: 9,
			pivot: { x: 0.4318182, y: 0.10344828 },
			rect: {
				x: 382,
				y: 354,
				width: 44,
				height: 29,
			},
		},
		"-746206404700068361": {
			alignment: 9,
			pivot: { x: 0.4318182, y: 0.10344828 },
			rect: {
				x: 382,
				y: 354,
				width: 44,
				height: 29,
			},
		},
		"-7829305271053624343": {
			alignment: 9,
			pivot: { x: 0.4318182, y: 0.10344828 },
			rect: {
				x: 459,
				y: 350,
				width: 44,
				height: 29,
			},
		},
		"-1602783885469669707": {
			alignment: 9,
			pivot: { x: 0.44444445, y: 0.13333334 },
			rect: {
				x: 1,
				y: 417,
				width: 45,
				height: 30,
			},
		},
		"7054667483814815233": {
			alignment: 9,
			pivot: { x: 0.44444445, y: 0.12903225 },
			rect: {
				x: 459,
				y: 381,
				width: 45,
				height: 31,
			},
		},
		"-4788626202656424822": {
			alignment: 9,
			pivot: { x: 0.44444445, y: 0.12903225 },
			rect: {
				x: 459,
				y: 381,
				width: 45,
				height: 31,
			},
		},
		"8778551679735035083": {
			alignment: 9,
			pivot: { x: 0.44444445, y: 0.12903225 },
			rect: {
				x: 148,
				y: 417,
				width: 45,
				height: 31,
			},
		},
		"-6028798717957631303": {
			alignment: 9,
			pivot: { x: 0.44444445, y: 0.12903225 },
			rect: {
				x: 148,
				y: 417,
				width: 45,
				height: 31,
			},
		},
		"-960832498917958613": {
			alignment: 9,
			pivot: { x: 0.44444445, y: 0.12903225 },
			rect: {
				x: 148,
				y: 417,
				width: 45,
				height: 31,
			},
		},
		"5415816877640597890": {
			alignment: 9,
			pivot: { x: 0.44444445, y: 0.12903225 },
			rect: {
				x: 148,
				y: 417,
				width: 45,
				height: 31,
			},
		},
	},
};

const ABILITIES: AbilityType[] = [
	{ name: "Default attack", icon: defaultAttack },
	{ name: "Slam", icon: skill2 },
	{ name: "Enchant Weapon", icon: skill3 },
	{ name: "Knock up", icon: skill4 },
	{ name: "Spectral throw", icon: skill6 },
	{ name: "Rage", icon: skill5 },
];

const exports = { PLAYER, IDLE_ANIMATION, PLAYER_TEXTURE, ABILITIES };
export default exports;
// ?? why is this a warning??!?!?
