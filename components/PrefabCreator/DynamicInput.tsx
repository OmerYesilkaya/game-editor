import { ApiModule, ModuleValueType } from "@app/types";
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
	module: ApiModule;
};

const DynamicInput: React.FC<DynamicInputPropTypes> = ({ module }) => {
	let renderInput: () => JSX.Element | null;

	switch (module.valueType) {
		case ModuleValueType.Animation:
			renderInput = () => <FileSelectInput type={module.valueType} themeColor="rose" moduleId={module.id} defaultValue={module.value} />;
			break;
		case ModuleValueType.Bool:
			renderInput = () => <BoolInput moduleId={module.id} defaultValue={module.value} />;
			break;
		case ModuleValueType.Color:
			renderInput = () => <ColorInput moduleId={module.id} defaultValue={module.value} />;
			break;
		case ModuleValueType.Number:
			renderInput = () => <NumberInput moduleId={module.id} defaultValue={module.value} />;
			break;
		case ModuleValueType.Percentage:
			renderInput = () => <PercentageInput moduleId={module.id} defaultValue={module.value} />;
			break;
		case ModuleValueType.Range:
			renderInput = () => <div>Range</div>;
			break;
		case ModuleValueType.Sprite:
			renderInput = () => <FileSelectInput type={module.valueType} themeColor="rose" moduleId={module.id} defaultValue={module.value} />;
			break;
		case ModuleValueType.Text:
			renderInput = () => <TextInput moduleId={module.id} defaultValue={module.value} />;
			break;
		case ModuleValueType.TextArea:
			renderInput = () => <TextAreaInput moduleId={module.id} defaultValue={module.value} />;
			break;
		case ModuleValueType.Vec2:
			renderInput = () => <Vec2Input moduleId={module.id} defaultValue={module.value} />;
			break;
		case ModuleValueType.Vec3:
			renderInput = () => <Vec3Input moduleId={module.id} defaultValue={module.value} />;
			break;
		case ModuleValueType.Vec4:
			renderInput = () => <Vec4Input moduleId={module.id} defaultValue={module.value} />;
			break;
		default:
			renderInput = () => (
				<input className="w-full text-white rounded-sm px-1 bg-zinc-700 shadow-md border border-zinc-200" placeholder="UNDEFINED" />
			);
	}

	return <div className="w-full flex">{renderInput()}</div>;
};

export default DynamicInput;
