import { DocumentTextIcon } from "@heroicons/react/solid";

import { useCanvasStore, useAssetStore, useInputStore } from "@app/store";
import { array } from "@app/utils";
import { ModuleValueType } from "@app/types";

type Props = {
	type: ModuleValueType;
	themeColor: string;
	moduleId: number;
	defaultValue: number;
};

const FileSelectInput: React.FC<Props> = ({ type, themeColor, moduleId, defaultValue }) => {
	const inputs = useInputStore((state) => state.inputs);
	// A hacky/bad way to solve the issue of showing currently selected files data on inputs

	const { setActiveAssetInput, setActiveWindowIds, activeWindowIds, setGenericWindowData } = useCanvasStore((state) => ({
		setActiveAssetInput: state.setActiveAssetInput,
		setActiveWindowIds: state.setActiveWindowIds,
		activeWindowIds: state.activeWindowIds,
		setGenericWindowData: state.setGenericWindowData,
	}));
	const { animations, audios, itemPools, materialAnimations, materials, particleSystems, prefabs, sprites, trailSystems } = useAssetStore(
		(state) => ({
			animations: state.animations,
			audios: state.audios,
			itemPools: state.itemPools,
			materialAnimations: state.materialAnimations,
			materials: state.materials,
			particleSystems: state.particleSystems,
			prefabs: state.prefabs,
			sprites: state.sprites,
			trailSystems: state.trailSystems,
		})
	);

	function handleFileClick() {
		let windowsToShow: string[] = [];
		switch (type) {
			case ModuleValueType.Animation:
				windowsToShow = ["toolbar-preview", "toolbar-file-select"];
				break;
			case ModuleValueType.Sprite:
				windowsToShow = ["toolbar-preview", "toolbar-file-select"];
				break;
			case ModuleValueType.Audio:
				windowsToShow = ["toolbar-preview", "toolbar-file-select"];
				break;
			case ModuleValueType.ItemPool:
				setGenericWindowData({ assets: itemPools, type: ModuleValueType.ItemPool });
				break;
			case ModuleValueType.Material:
				setGenericWindowData({ assets: materials, type: ModuleValueType.Material });
				break;
			case ModuleValueType.MaterialAnimation:
				setGenericWindowData({ assets: materialAnimations, type: ModuleValueType.MaterialAnimation });
				break;
			case ModuleValueType.ParticleSystem:
				setGenericWindowData({ assets: particleSystems, type: ModuleValueType.ParticleSystem });
				break;
			case ModuleValueType.Prefab:
				setGenericWindowData({ assets: prefabs, type: ModuleValueType.Prefab });
				break;
			case ModuleValueType.TrailSystem:
				setGenericWindowData({ assets: trailSystems, type: ModuleValueType.TrailSystem });
				break;
			default:
				break;
		}

		const windows = [...activeWindowIds, ...windowsToShow];
		setActiveAssetInput({ id: moduleId, type });
		setActiveWindowIds(windows.filter(array.onlyUniques));
	}

	function getSelectedValue() {
		const module = inputs.find((input) => input.id === moduleId);
		const id = module ? module.value : defaultValue;

		let selectedValue;
		switch (type) {
			case ModuleValueType.Animation:
				selectedValue = animations.find((animation) => animation.id === id)?.name;
				break;
			case ModuleValueType.Sprite:
				selectedValue = sprites.find((sprite) => sprite.id === id)?.name;
				break;
			case ModuleValueType.Audio:
				selectedValue = audios.find((audio) => audio.id === id)?.name;
				break;
			case ModuleValueType.ItemPool:
				selectedValue = itemPools.find((itemPool) => itemPool.id === id)?.name;
				break;
			case ModuleValueType.Material:
				selectedValue = materials.find((material) => material.id === id)?.name;
				break;
			case ModuleValueType.MaterialAnimation:
				selectedValue = materialAnimations.find((materialAnimation) => materialAnimation.id === id)?.name;
				break;
			case ModuleValueType.ParticleSystem:
				selectedValue = particleSystems.find((particleSystem) => particleSystem.id === id)?.name;
				break;
			case ModuleValueType.Prefab:
				selectedValue = prefabs.find((prefab) => prefab.id === id)?.name;
				break;
			case ModuleValueType.TrailSystem:
				selectedValue = trailSystems.find((trailSystem) => trailSystem.id === id)?.name;
				break;
			default:
				break;
		}
		return selectedValue;
	}

	const selectedValue = getSelectedValue();

	return (
		<button
			type="button"
			className={`w-full text-sm flex justify-center items-center rounded-sm my-px bg-${themeColor}-500 px-2 transition hover:bg-${themeColor}-600`}
			onClick={() => handleFileClick()}
		>
			<span title={selectedValue} className="max-w-[112px] truncate">
				{selectedValue ? selectedValue : "CHOOSE A FILE"}
			</span>
			{!selectedValue && <DocumentTextIcon className="ml-1 w-4 h-4 mb-px" />}
		</button>
	);
};

export default FileSelectInput;
