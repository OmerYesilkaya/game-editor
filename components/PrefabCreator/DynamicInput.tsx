import { ApiModule, ModuleValueType } from "@app/types";
import { useInputStore } from "store/useInputStore";

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

const moduleTypeDefaultValues = {
	[ModuleValueType.Animation]: null,
	[ModuleValueType.Bool]: false,
	[ModuleValueType.Color]: "#ffffff",
	[ModuleValueType.Nested]: null,
	[ModuleValueType.Number]: 0,
	[ModuleValueType.Object]: null,
	[ModuleValueType.Percentage]: 0.5,
	[ModuleValueType.Range]: [0.3, 0.4],
	[ModuleValueType.Sprite]: null,
	[ModuleValueType.Text]: "",
	[ModuleValueType.TextArea]: "",
	[ModuleValueType.Vec2]: { x: 0, y: 0 },
	[ModuleValueType.Vec3]: { x: 0, y: 0, z: 0 },
	[ModuleValueType.Vec4]: { x: 0, y: 0, z: 0, w: 0 },
};

const DynamicInput: React.FC<DynamicInputPropTypes> = ({ module }) => {
	const inputs = useInputStore((state) => state.inputs);
	const input = inputs.find((input) => input.id === module.id);
	const defaultValue = input?.value ? input.value : module.value ? module.value : moduleTypeDefaultValues[module.valueType];

	// const defaultValue = module.value ?? null;

	function render() {
		let input;
		switch (module.valueType) {
			case ModuleValueType.Animation:
				input = <FileSelectInput type={module.valueType} themeColor="rose" moduleId={module.id} defaultValue={defaultValue} />;
				break;
			case ModuleValueType.Bool:
				input = <BoolInput moduleId={module.id} defaultValue={defaultValue} />;
				break;
			case ModuleValueType.Color:
				input = <ColorInput moduleId={module.id} defaultValue={defaultValue} />;
				break;
			case ModuleValueType.Number:
				input = <NumberInput moduleId={module.id} defaultValue={defaultValue} />;
				break;
			case ModuleValueType.Percentage:
				input = <PercentageInput moduleId={module.id} defaultValue={defaultValue} />;
				break;
			case ModuleValueType.Range:
				input = <div>Range</div>;
				break;
			case ModuleValueType.Sprite:
				input = <FileSelectInput type={module.valueType} themeColor="rose" moduleId={module.id} defaultValue={defaultValue} />;
				break;
			case ModuleValueType.Text:
				input = <TextInput moduleId={module.id} defaultValue={defaultValue} />;
				break;
			case ModuleValueType.TextArea:
				input = <TextAreaInput moduleId={module.id} defaultValue={defaultValue} />;
				break;
			case ModuleValueType.Vec2:
				input = <Vec2Input moduleId={module.id} defaultValue={defaultValue} />;
				break;
			case ModuleValueType.Vec3:
				input = <Vec3Input moduleId={module.id} defaultValue={defaultValue} />;
				break;
			case ModuleValueType.Vec4:
				input = <Vec4Input moduleId={module.id} defaultValue={defaultValue} />;
				break;
			default:
				input = <input className="w-full text-white rounded-sm px-1 bg-zinc-700 shadow-md border border-zinc-200" placeholder="UNDEFINED" />;
		}
		return input;
	}

	return <div className="w-full flex">{render()}</div>;
};

export default DynamicInput;
