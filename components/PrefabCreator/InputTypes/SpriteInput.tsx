import { useState } from "react";

type Rect = {
	x: number;
	y: number;
	width: number;
	height: number;
};

type Vec2 = {
	x: number;
	y: number;
};

type Vec4 = {
	x: number;
	y: number;
	z: number;
	w: number;
};

type Sprite = {
	textureId: number;
	spriteId: string;
	internalId: string;
	name: string;
	pivot: Vec2;
	border: Vec4;
	rect: Rect;
	alignment: number;
};

const SpriteInput: React.FC = () => {
	const [selectedSprite, setSelectedSprite] = useState<Sprite>({} as Sprite);

	const spriteData = [
		{
			textureId: 1,
			spriteId: "ca89b01a71c54eef0800000000000000",
			internalId: "-79837636829931348",
			name: "enemy-default-attack-effect-0",
			pivot: { x: 0.5, y: 0.5 },
			border: { x: 0.0, y: 0.0, z: 0.0, w: 0.0 },
			rect: { x: 1, y: 15, width: 8, height: 16 },
			alignment: 0,
		},
		{
			textureId: 1,
			spriteId: "f7f485b6470b5ce50800000000000000",
			internalId: "6829058424040869759",
			name: "enemy-default-attack-effect-1",
			pivot: { x: 0.333333343, y: 0.5 },
			border: { x: 0.0, y: 0.0, z: 0.0, w: 0.0 },
			rect: { x: 11, y: 15, width: 6, height: 16 },
			alignment: 9,
		},
		{
			textureId: 1,
			spriteId: "8951c9bbadaf673c0800000000000000",
			internalId: "-4362023371704363624",
			name: "enemy-default-attack-effect-2",
			pivot: { x: 0.2, y: 0.5 },
			border: { x: 0.0, y: 0.0, z: 0.0, w: 0.0 },
			rect: { x: 19, y: 17, width: 5, height: 14 },
			alignment: 9,
		},
		{
			textureId: 1,
			spriteId: "2a34bcf0bd8d51250800000000000000",
			internalId: "5914872120995431330",
			name: "enemy-default-attack-effect-3",
			pivot: { x: 0.0, y: 0.5 },
			border: { x: 0.0, y: 0.0, z: 0.0, w: 0.0 },
			rect: { x: 1, y: 3, width: 4, height: 10 },
			alignment: 4,
		},
		{
			textureId: 1,
			spriteId: "",
			internalId: "0",
			name: "enemy-default-attack-effect-4",
			pivot: { x: -0.333333343, y: 0.5 },
			border: { x: 0.0, y: 0.0, z: 0.0, w: 0.0 },
			rect: { x: 7, y: 9, width: 3, jeight: 4 },
			alignment: 9,
		},
	];

	return (
		<select
			title={selectedSprite.name}
			className="w-full text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200"
			onChange={(e) => setSelectedSprite(JSON.parse(e.target.value))}
		>
			{spriteData.map((sprite) => (
				<option key={sprite.spriteId} label={sprite.name} value={JSON.stringify(sprite)} selected={selectedSprite === sprite} />
			))}
		</select>
	);
};

export default SpriteInput;
