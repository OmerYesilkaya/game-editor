import create from "zustand";
import { Input } from "@app/types";

type InputStoreTypes = {
	inputs: { [key: string]: Input[] } | null;
	activePrefabInputs: Input[];
	setInputs: (value: { [key: string]: Input[] } | null) => void;
	setActivePrefabInputs: (value: Input[]) => void;
	updateInput: (inputId: number, value: any) => void;
	addInputs: (inputs: Input[], prefabId: string) => void;
	storeActivePrefabInputs: (prefabId: string) => void;
	restoreActivePrefabInputs: (prefabId: string) => void;
	resetInputStore: () => void;
};

export const useInputStore = create<InputStoreTypes>((set, get) => ({
	inputs: null,
	activePrefabInputs: [],
	setInputs: (value) => {
		set(() => ({ inputs: value }));
	},
	setActivePrefabInputs: (value) => {
		set(() => ({ activePrefabInputs: value }));
	},
	updateInput: (inputId, value) => {
		const inputs = get().activePrefabInputs;

		const newInputs = inputs.map((input) => {
			if (input.id === inputId) {
				input.value = value;
			}

			return input;
		});

		set(() => ({ activePrefabInputs: newInputs }));
	},
	addInputs: (inputs: Input[], prefabId: string) => {
		const existingInputs = get().activePrefabInputs;
		const inputsToAdd: Input[] = [];
		inputs.forEach((input) => {
			if (!existingInputs.includes(input)) {
				inputsToAdd.push(input);
			}
		});

		set((prev) => ({
			inputs: { ...prev.inputs, [prefabId]: [...existingInputs, ...inputsToAdd] },
			activePrefabInputs: [...existingInputs, ...inputsToAdd],
		}));
	},
	storeActivePrefabInputs: (prefabId) => {
		const inputs = get().inputs;
		const activePrefabInputs = get().activePrefabInputs;
		set(() => ({ inputs: { ...inputs, [prefabId]: activePrefabInputs }, activePrefabInputs: [] }));
	},
	restoreActivePrefabInputs: (prefabId) => {
		const inputs = get().inputs;
		let newActivePrefabInputs: Input[] = [];
		if (!inputs) return;

		const storedInputs = inputs[prefabId.toString()];
		if (storedInputs.length !== 0) {
			newActivePrefabInputs = storedInputs;
		}

		set(() => ({ activePrefabInputs: newActivePrefabInputs }));
	},
	resetInputStore: () => set(() => ({ inputs: null, activePrefabInputs: [] })),
}));
