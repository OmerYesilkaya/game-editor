import editorUtils from "@prefab-editor/editorUtils";
import { EditorSlice, InputSlice } from "./types";

export const createInputSlice: EditorSlice<InputSlice> = (set, get) => ({
    inputs: {},
    selectedInputId: null,
    selectInput: (id) => set(() => ({ selectedInputId: id })),
    clearInputSelection: () => set(() => ({ selectedInputId: null })),
    setInputs: (value) => {
        const inputs = editorUtils.getPrefabInputs(value);
        set(() => ({ inputs: inputs }));
    },
    updateInputValue: (prefabId, inputId, value) =>
        set((prev) => {
            // TODO(selim): Instead of if checks add assertions
            if (!prev.inputs) {
                console.error("Trying to set input value while no input exists!");
                return { inputs: prev.inputs };
            }
            const input = prev.inputs[prefabId].find((x) => x.id === inputId);

            if (!input) {
                console.error(`input with given id(${inputId}) could not be found`);
                return { inputs: prev.inputs };
            }

            // TODO(selim): Check if `value` fits the `valueType` of the input
            input.value = value;
            return { inputs: { ...prev.inputs } };
        }),
});
