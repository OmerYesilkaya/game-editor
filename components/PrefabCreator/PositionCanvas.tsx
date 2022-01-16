import { useState } from "react";

import { useInputStore, useAssetStore } from "@app/store";
import { ModuleValueType } from "@app/types";

type PrefabAsset = {
	[key: string]: [{ id: number; type: ModuleValueType }];
} | null;

const PositionCanvas: React.FC = () => {
	const [activePrefabAssets, setActivePrefabAssets] = useState<PrefabAsset>(null);

	//TODO(omer): Change how inputs are stored. Store every prefabs' inputs like PrefabAsset type above (key being the prefabId and value beings Inputs[]), not only the active prefabs' inputs.
	const inputs = useInputStore((state) => state.inputs);
	const { animations, sprites } = useAssetStore((state) => ({ animations: state.animations, sprites: state.sprites }));

	const availableInputs = inputs.filter((input) => [ModuleValueType.Animation, ModuleValueType.Sprite].includes(input.valueType));

	function getName(id: number, type: ModuleValueType) {
		if (!id || !type) return "There are no assets selected for this input";
		if (type === ModuleValueType.Animation) {
			return animations.find((animation) => animation.id === id)?.name;
		} else if (type === ModuleValueType.Sprite) {
			return sprites.find((sprite) => sprite.id === id)?.name;
		}
	}

	function handleClick(id: number, type: ModuleValueType) {}

	return (
		<>
			<div className="w-full grid grid-cols-4 gap-1">
				{availableInputs.map((module) => {
					const name = getName(module.value, module.valueType);
					return (
						<div
							key={module.id}
							className="px-2 py-0.5 rounded-sm bg-zinc-800 shadow-md font-default font-semibold truncate"
							title={name}
							onClick={() => handleClick(module.value, module.valueType)}
						>
							{name}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default PositionCanvas;
