import cn from "classnames";

import { useInputStore, useAssetStore, usePrefabStore, useTimelineStore } from "@app/store";
import { ModuleValueType } from "@app/types";
import { editorUtils } from "@app/utils";

const BottomBar: React.FC = () => {
	const { activeTimelines, addAnimation, removeAnimation } = useTimelineStore((state) => ({
		activeTimelines: state.activeTimelines,
		addAnimation: state.addAnimation,
		removeAnimation: state.removeAnimation,
	}));
	const { inputs } = useInputStore((state) => ({ inputs: state.inputs }));
	const { animations, sprites } = useAssetStore((state) => ({ animations: state.animations, sprites: state.sprites }));
	const prefab = usePrefabStore((state) => state.prefab);
	const assets = activeTimelines && prefab ? activeTimelines[prefab.internalId] : [];

	function getName(moduleId: number, type: ModuleValueType) {
		if (!moduleId || !type) return null;
		if (type === ModuleValueType.Animation) {
			return animations.find((animation) => animation.id === moduleId)?.name;
		} else if (type === ModuleValueType.Sprite) {
			return sprites.find((sprite) => sprite.id === moduleId)?.name;
		}
	}

	function handleClick(prefabId: string, moduleId: number) {
		const targetAssetId = assets.find((assetId) => assetId === moduleId);
		if (targetAssetId) {
			removeAnimation(prefabId, moduleId);
		} else {
			addAnimation(prefabId, moduleId);
		}
	}

	return (
		<div className="w-full h-1/4 flex flex-col gap-y-1">
			{inputs &&
				Object.keys(inputs).map((prefabId) => {
					const activePrefabInputs = inputs[prefabId];
					const availableInputs = activePrefabInputs.filter((input) =>
						[ModuleValueType.Animation, ModuleValueType.Sprite].includes(input.valueType)
					);

					const targetPrefab = editorUtils.findPrefabInTree(prefabId, prefab!);

					return (
						<div className="w-full flex gap-x-1 text-white" key={prefabId}>
							<div className="flex items-center p-1 gap-x-1">
								<div className="px-2 py-0.5 rounded-sm bg-zinc-100 shadow-md font-default  h-8 select-none border-2 border-zinc-100  text-zinc-800 font-black uppercase text-center">
									{targetPrefab?.name}
								</div>
								{availableInputs.map((module) => {
									const name = getName(module.value, module.valueType);
									const isActive = assets.includes(module.value);

									return name ? (
										<button
											key={module.id}
											className={cn(
												"px-2 py-0.5 rounded-sm bg-zinc-800 shadow-md font-default font-semibold  h-8 select-none border-2 transition flex items-center justify-center",
												{
													"border-yellow-300": isActive && name,
													"border-zinc-800": !isActive && name,
													"border-zinc-500": !name,
												}
											)}
											title={name ?? "There is no asset selected for this module"}
											onClick={() => handleClick(prefabId, module.value)}
										>
											{name}
										</button>
									) : null;
								})}
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default BottomBar;
