import { DocumentTextIcon } from "@heroicons/react/solid";
import { useFormContext } from "react-hook-form";

import { useCanvasStore } from "@app/store";
import { AssetFileTypes } from "@app/types";
import { array } from "@app/utils";

type Props = {
	type: AssetFileTypes;
	themeColor: string;
	moduleId: number;
};

const FileSelectInput: React.FC<Props> = ({ type, themeColor, moduleId }) => {
	const { register } = useFormContext();
	const { setActiveAssetInput, setActiveWindowIds, activeWindowIds } = useCanvasStore((state) => ({
		setActiveAssetInput: state.setActiveAssetInput,
		setActiveWindowIds: state.setActiveWindowIds,
		activeWindowIds: state.activeWindowIds,
	}));

	function handleFileClick() {
		const windows = [...activeWindowIds, "toolbar-preview", "toolbar-file-select"];
		setActiveAssetInput({ id: moduleId, type });
		setActiveWindowIds(windows.filter(array.onlyUniques));
	}

	return (
		<button
			type="button"
			className={`w-full text-sm flex justify-center items-center rounded-sm bg-${themeColor}-500 px-2 transition hover:bg-${themeColor}-600`}
			onClick={() => handleFileClick()}
		>
			<span>CHOOSE A FILE</span> <DocumentTextIcon className="ml-1 w-4 h-4 mb-px" />
			<input className="invisible w-0 h-0" {...register(moduleId.toString())} />
		</button>
	);
};

export default FileSelectInput;
