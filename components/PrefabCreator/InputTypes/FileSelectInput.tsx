import { DocumentTextIcon } from "@heroicons/react/solid";

import { useCanvasStore, useAnimationStore, useSpriteStore, useInputStore } from "@app/store";
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

	const { setActiveAssetInput, setActiveWindowIds, activeWindowIds } = useCanvasStore((state) => ({
		setActiveAssetInput: state.setActiveAssetInput,
		setActiveWindowIds: state.setActiveWindowIds,
		activeWindowIds: state.activeWindowIds,
	}));
	const animations = useAnimationStore((state) => state.animations);
	const sprites = useSpriteStore((state) => state.sprites);

	function handleFileClick() {
		const windows = [...activeWindowIds, "toolbar-preview", "toolbar-file-select"];
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
