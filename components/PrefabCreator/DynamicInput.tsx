import { Module, ModuleValueType } from "@app/types";
import {
	AnimationInput,
	BoolInput,
	ColorInput,
	NumberInput,
	PercentageInput,
	SpriteInput,
	TextAreaInput,
	TextInput,
	Vec2Input,
	Vec3Input,
	Vec4Input,
} from "./InputTypes";

type DynamicInputPropTypes = {
	module: Module;
};

const DynamicInput: React.FC<DynamicInputPropTypes> = ({ module }) => {
	let renderInput: () => JSX.Element | null;

	switch (module.value_type) {
		case ModuleValueType.Animation:
			renderInput = () => <AnimationInput />;
			break;
		case ModuleValueType.Bool:
			renderInput = () => <BoolInput />;
			break;
		case ModuleValueType.Color:
			renderInput = () => <ColorInput />;
			break;
		case ModuleValueType.Number:
			renderInput = () => <NumberInput />;
			break;
		case ModuleValueType.Percentage:
			renderInput = () => <PercentageInput />;
			break;
		case ModuleValueType.Range:
			renderInput = () => <div>Range</div>;
			break;
		case ModuleValueType.Sprite:
			renderInput = () => <SpriteInput />;
			break;
		case ModuleValueType.Text:
			renderInput = () => <TextInput />;
			break;
		case ModuleValueType.TextArea:
			renderInput = () => <TextAreaInput />;
			break;
		case ModuleValueType.Vec2:
			renderInput = () => <Vec2Input />;
			break;
		case ModuleValueType.Vec3:
			renderInput = () => <Vec3Input />;
			break;
		case ModuleValueType.Vec4:
			renderInput = () => <Vec4Input />;
			break;
		default:
			renderInput = () => (
				<input className="w-full text-white rounded-sm px-1 bg-zinc-700 shadow-md border border-zinc-200" placeholder="UNDEFINED" />
			);
	}

	return <div className="w-full flex">{renderInput()}</div>;
};

export default DynamicInput;
