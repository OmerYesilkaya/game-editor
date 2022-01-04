import { useState } from "react";
import { useSpriteStore } from "@app/store";
import { Sprite } from "@app/types";

const SpriteInput: React.FC = () => {
	const [selectedSprite, setSelectedSprite] = useState<Sprite>({} as Sprite);
	const sprites = useSpriteStore((state) => state.sprites);

	return (
		<select
			title={selectedSprite.name}
			className="w-full text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200"
			onChange={(e) => setSelectedSprite(JSON.parse(e.target.value))}
		>
			{sprites.map((sprite) => (
				<option key={sprite.id} label={sprite.name} value={JSON.stringify(sprite)} selected={selectedSprite === sprite} />
			))}
		</select>
	);
};

export default SpriteInput;
