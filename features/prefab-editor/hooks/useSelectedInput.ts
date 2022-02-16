import { useEffect, useMemo } from "react";

import assert from "assert";
import shallow from "zustand/shallow";

import { usePrefabEditorStore } from "@core/store";

export default function useSelectedInput() {
    const { inputs, selectedPrefabId, selectedInputId, updateInputValue, clearInputSelection, selectInput } = usePrefabEditorStore(
        (state) => ({
            inputs: state.inputs,
            selectedPrefabId: state.selectedPrefabId,
            selectedInputId: state.selectedInputId,
            updateInputValue: state.updateInputValue,
            clearInputSelection: state.clearInputSelection,
            selectInput: state.selectInput,
        }),
        shallow
    );

    const selectedInput = useMemo(() => {
        if (!selectedPrefabId && selectedInputId) {
            clearInputSelection();
            return null;
        }
        if (!selectedInputId) return null;
        assert(inputs);
        const input = inputs[selectedPrefabId!].find((x) => x.id === selectedInputId);
        assert(input);
        return input;
    }, [selectedInputId, selectedPrefabId]);

    const selectedPrefabsInputs = useMemo(() => {
        return selectedPrefabId && inputs ? inputs[selectedPrefabId] : [];
    }, [selectedPrefabId]);

    // TODO(selim): Use useCallback
    function updateInput(value: any) {
        assert(selectedInput && selectedPrefabId && selectedInputId);
        updateInputValue(selectedPrefabId, selectedInputId, value);
        clearInputSelection();
    }

    return {
        selectedInput,
        selectedPrefabsInputs,
        updateInput,
        selectInput,
        clearInputSelection,
    };
}
