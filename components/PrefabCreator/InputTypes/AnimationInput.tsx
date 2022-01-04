import { useState } from "react";

import { Common } from "@app/components";
import { usePreviewStore, useAnimationStore, useSpriteStore } from "@app/store";
import { Animation } from "@app/types";

const AnimationInput: React.FC = () => {
	const [selectedAnimation, setSelectedAnimation] = useState<Animation | null>(null);
	const setTemporaryPreview = usePreviewStore((state) => state.setTemporaryPreview);
	const animations = useAnimationStore((state) => state.animations);
	const sprites = useSpriteStore((state) => state.sprites);

	function handleSelect(id: number) {
		const target = animations.find((animation) => animation.id === id);
		if (target) {
			setSelectedAnimation(target);
		}
	}

	function handlePointerEnter(id: number) {
		const animation = animations.find((animation) => animation.id === id);
		if (!animation) return;
		const preview = sprites.filter((sprite) => animation.sprites.includes(sprite.id));
		if (!preview) return;
		setTemporaryPreview(preview);
	}

	function handlePointerOut() {
		setTemporaryPreview(null);
	}

	return (
		<Common.Select
			title={selectedAnimation?.name}
			className="w-full text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200"
			optionClassName="hover:bg-zinc-600 w-full text-left px-1 bg-zinc-700 cursor-pointer"
			options={animations.map((animation) => ({ id: animation.id, label: animation.name }))}
			selectedValue={selectedAnimation}
			setSelectedValue={handleSelect}
			handlePointerEnter={handlePointerEnter}
			handlePointerOut={handlePointerOut}
		/>
	);
};

export default AnimationInput;
