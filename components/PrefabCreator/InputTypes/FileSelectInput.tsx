import { DocumentTextIcon } from "@heroicons/react/solid";
import { useFormContext, useWatch } from "react-hook-form";

import { useCanvasStore, useAnimationStore, useSpriteStore } from "@app/store";
import { AssetFileTypes } from "@app/types";
import { array } from "@app/utils";

type Props = {
	type: AssetFileTypes;
	themeColor: string;
	moduleId: number;
};

const FileSelectInput: React.FC<Props> = ({ type, themeColor, moduleId }) => {
	const { register, control } = useFormContext();
	const value = useWatch({ name: moduleId.toString(), control });
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
		let selectedValue;

		switch (type) {
			case AssetFileTypes.animation:
				selectedValue = animations.find((animation) => animation.id === value)?.name;
				break;
			case AssetFileTypes.sprite:
				selectedValue = sprites.find((sprite) => sprite.id === value)?.name;
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
			className={`w-full text-sm flex justify-center items-center rounded-sm bg-${themeColor}-500 px-2 transition hover:bg-${themeColor}-600`}
			onClick={() => handleFileClick()}
		>
			<span title={selectedValue} className="w-32 truncate">
				{selectedValue ? selectedValue : "CHOOSE A FILE"}
			</span>
			{!selectedValue && <DocumentTextIcon className="ml-1 w-4 h-4 mb-px" />}
			<input className="invisible w-0 h-0" {...register(moduleId.toString())} />
		</button>
	);
};

export default FileSelectInput;
