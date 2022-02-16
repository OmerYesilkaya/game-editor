import { DocumentTextIcon } from "@heroicons/react/solid";

import { ModuleValueType } from "@app/types";
import { useSelectedInput } from "@prefab-editor/hooks";

type Props = {
    type: ModuleValueType;
    themeColor: string;
    moduleId: number;
    defaultValue: number | null;
};

const FileSelectInput: React.FC<Props> = ({ type, themeColor, moduleId, defaultValue }) => {
    const { selectInput } = useSelectedInput();
    return (
        <button
            type="button"
            className={`w-full text-sm flex justify-center items-center rounded-sm my-px bg-${themeColor}-500 px-2 transition hover:bg-${themeColor}-600`}
            onClick={() => selectInput(moduleId)}
        >
            <span title={defaultValue ? defaultValue.toString() : "Choose a file"} className="max-w-[112px] truncate">
                {defaultValue ? defaultValue : "CHOOSE A FILE"}
            </span>
            {defaultValue && <DocumentTextIcon className="ml-1 w-4 h-4 mb-px" />}
        </button>
    );
};

export default FileSelectInput;
