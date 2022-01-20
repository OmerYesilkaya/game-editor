import { SetStateAction } from "react";

import cn from "classnames";

import { useInputStore, useAssetStore } from "@app/store";
import { ModuleValueType } from "@app/types";

type PrefabAsset = {
	[key: string]: number[];
} | null;

type AssetsPropTypes = {
	assets: PrefabAsset;
	setAssets: React.Dispatch<SetStateAction<PrefabAsset>>;
};

const Assets: React.FC<AssetsPropTypes> = ({ assets, setAssets }) => {
	const { inputs } = useInputStore((state) => ({ inputs: state.inputs }));
	const { animations, sprites } = useAssetStore((state) => ({ animations: state.animations, sprites: state.sprites }));

	function getName(moduleId: number, type: ModuleValueType) {
		if (!moduleId || !type) return "There are no assets selected for this input";
		if (type === ModuleValueType.Animation) {
			return animations.find((animation) => animation.id === moduleId)?.name;
		} else if (type === ModuleValueType.Sprite) {
			return sprites.find((sprite) => sprite.id === moduleId)?.name;
		}
	}

	function handleClick(prefabId: string, moduleId: number) {
		setAssets((prev) => {
			if (!prev) return { [prefabId]: [moduleId] };
			const moduleIds = prev[prefabId];

			if (moduleIds.includes(moduleId)) {
				const newModuleIds = moduleIds.filter((id) => moduleId !== id);
				return { ...prev, [prefabId]: newModuleIds };
			} else {
				return { ...prev, [prefabId]: [...moduleIds, moduleId] };
			}
		});
	}

	return (
		<div className="flex flex-col gap-y-1">
			{inputs &&
				Object.keys(inputs).map((prefabId) => {
					const activePrefabInputs = inputs[prefabId];
					const availableInputs = activePrefabInputs.filter((input) =>
						[ModuleValueType.Animation, ModuleValueType.Sprite].includes(input.valueType)
					);
					return (
						<div className="w-full flex gap-x-1" key={prefabId}>
							{availableInputs.map((module) => {
								const name = getName(module.value, module.valueType);
								const activeModuleIds = assets ? assets[prefabId] : [];

								const isActive = activeModuleIds.includes(module.value);

								return (
									<button
										key={module.id}
										className={cn(
											"px-2 py-0.5 rounded-sm bg-zinc-800 shadow-md font-default font-semibold w-32 select-none border-2 truncate transition",
											{
												"border-yellow-300": isActive,
												"border-zinc-800": !isActive,
											}
										)}
										title={name}
										onClick={() => handleClick(prefabId, module.value)}
									>
										{name}
									</button>
								);
							})}
						</div>
					);
				})}
		</div>
	);
};

export default Assets;
