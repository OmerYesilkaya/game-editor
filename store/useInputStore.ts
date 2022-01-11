import create from "zustand";
import { Input } from "@app/types";

type InputStoreTypes = {
	inputs: Input[];
	setInputs: (value: Input[]) => void;
	updateInput: (inputId: number, value: any) => void;
	addInputs: (inputs: Input[]) => void;
};

export const useInputStore = create<InputStoreTypes>((set, get) => ({
	inputs: [],
	setInputs: (value) => {
		set(() => ({ inputs: value }));
	},
	updateInput: (inputId, value) => {
		const inputs = get().inputs;

		const newInputs = inputs.map((input) => {
			if (input.id === inputId) {
				input.value = value;
			}

			return input;
		});

		set(() => ({ inputs: newInputs }));
	},
	addInputs: (inputs: Input[]) => {
		const existingInputs = get().inputs;
		const inputsToAdd: Input[] = [];
		inputs.forEach((input) => {
			if (!existingInputs.includes(input)) {
				inputsToAdd.push(input);
			}
		});
		set(() => ({ inputs: [...existingInputs, ...inputsToAdd] }));
	},
}));
