import { DocumentTextIcon } from "@heroicons/react/solid";
import { useFormContext } from "react-hook-form";

type Props = {
	type: "animation" | "sprite";
	themeColor: string;
	moduleId: number;
};

const FileSelectInput: React.FC<Props> = ({ type, themeColor, moduleId }) => {
	const { setValue, register } = useFormContext();

	function handleFileClick() {
		if (type === "animation") {
			setValue(`${moduleId}`, "x");
		} else {
			setValue(`${moduleId}`, "y");
		}
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
