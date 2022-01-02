import Common from "components/Common";
import { useState } from "react";

type Animation = {
	id: string;
	name: string;
	spriteIds: string[];
};

const AnimationInput: React.FC = () => {
	const [selectedAnimation, setSelectedAnimation] = useState<Animation | null>(null);

	function handleSelect(id: string) {
		const target = animationData.find((animation) => animation.id === id);
		if (target) {
			setSelectedAnimation(target);
		}
	}

	const animationData: Animation[] = [
		{
			id: "random-animation-id-1",
			name: "Animation 1",
			spriteIds: [
				"ca89b01a71c54eef0800000000000000",
				"f7f485b6470b5ce50800000000000000",
				"8951c9bbadaf673c0800000000000000",
				"2a34bcf0bd8d51250800000000000000",
			],
		},
		{
			id: "random-animation-id-2",
			name: "Animation 2",
			spriteIds: [
				"ca89b01a71c54eef0800000000000000",
				"f7f485b6470b5ce50800000000000000",
				"8951c9bbadaf673c0800000000000000",
				"2a34bcf0bd8d51250800000000000000",
			],
		},
	];

	return (
		<Common.Select
			title={selectedAnimation?.name}
			className="w-full text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200"
			optionClassName="hover:bg-zinc-600 w-full text-left px-1"
			options={animationData.map((animation) => ({ id: animation.id, value: animation.spriteIds, label: animation.name }))}
			handleSelect={handleSelect}
			selectedValue={selectedAnimation}
		/>
	);
};

export default AnimationInput;
