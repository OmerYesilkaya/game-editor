import { useState } from "react";

import { Common } from "@app/components";
import { usePreviewStore, useAnimationStore, useSpriteStore } from "@app/store";
import { AnimationPriority, AnimationTransitionType } from "@app/types";

type Animation = {
	id: string;
	name: string;
	priority: AnimationPriority;
	sprites: string[];
	transitionType: AnimationTransitionType;
};

const AnimationInput: React.FC = () => {
	const [selectedAnimation, setSelectedAnimation] = useState<Animation | null>(null);
	const setTemporaryPreview = usePreviewStore((state) => state.setTemporaryPreview);
	const animations = useAnimationStore((state) => state.animations);
	const sprites = useSpriteStore((state) => state.sprites);

	function handleSelect(id: string) {
		const target = animations.find((animation) => animation.id === id);
		if (target) {
			setSelectedAnimation(target);
		}
	}

	function handlePointerEnter(id: string) {
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
			optionClassName="hover:bg-zinc-600 w-full text-left px-1"
			options={animations.map((animation) => ({ id: animation.id, value: JSON.stringify(animation), label: animation.name }))}
			selectedValue={selectedAnimation}
			setSelectedValue={handleSelect}
			handlePointerEnter={handlePointerEnter}
			handlePointerOut={handlePointerOut}
		/>
	);
};

export default AnimationInput;
