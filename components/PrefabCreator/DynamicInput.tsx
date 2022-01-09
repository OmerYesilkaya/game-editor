import { Module, ModuleValueType, AssetFileTypes } from "@app/types";
import {
	BoolInput,
	ColorInput,
	FileSelectInput,
	NumberInput,
	PercentageInput,
	TextAreaInput,
	TextInput,
	Vec2Input,
	Vec3Input,
	Vec4Input,
} from "./InputTypes";

type DynamicInputPropTypes = {
	module: Module;
	prefabId: string;
};

const DynamicInput: React.FC<DynamicInputPropTypes> = ({ module, prefabId }) => {
	let renderInput: () => JSX.Element | null;

	switch (module.value_type) {
		case ModuleValueType.Animation:
			renderInput = () => <FileSelectInput type={AssetFileTypes.animation} themeColor="rose" moduleId={module.id} prefabId={prefabId} />;
			break;
		case ModuleValueType.Bool:
			renderInput = () => <BoolInput moduleId={module.id} prefabId={prefabId} />;
			break;
		case ModuleValueType.Color:
			renderInput = () => <ColorInput moduleId={module.id} prefabId={prefabId} />;
			break;
		case ModuleValueType.Number:
			renderInput = () => <NumberInput moduleId={module.id} prefabId={prefabId} />;
			break;
		case ModuleValueType.Percentage:
			renderInput = () => <PercentageInput moduleId={module.id} prefabId={prefabId} />;
			break;
		case ModuleValueType.Range:
			renderInput = () => <div>Range</div>;
			break;
		case ModuleValueType.Sprite:
			renderInput = () => <FileSelectInput type={AssetFileTypes.sprite} themeColor="rose" moduleId={module.id} prefabId={prefabId} />;
			break;
		case ModuleValueType.Text:
			renderInput = () => <TextInput moduleId={module.id} prefabId={prefabId} />;
			break;
		case ModuleValueType.TextArea:
			renderInput = () => <TextAreaInput moduleId={module.id} prefabId={prefabId} />;
			break;
		case ModuleValueType.Vec2:
			renderInput = () => <Vec2Input moduleId={module.id} prefabId={prefabId} />;
			break;
		case ModuleValueType.Vec3:
			renderInput = () => <Vec3Input moduleId={module.id} prefabId={prefabId} />;
			break;
		case ModuleValueType.Vec4:
			renderInput = () => <Vec4Input moduleId={module.id} prefabId={prefabId} />;
			break;
		default:
			renderInput = () => (
				<input className="w-full text-white rounded-sm px-1 bg-zinc-700 shadow-md border border-zinc-200" placeholder="UNDEFINED" />
			);
	}

	return <div className="w-full flex">{renderInput()}</div>;
};

export default DynamicInput;
