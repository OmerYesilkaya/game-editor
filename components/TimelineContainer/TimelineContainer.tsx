import { FilmIcon } from "@heroicons/react/outline";

import shallow from "zustand/shallow";

import { usePrefabEditorStore } from "@core/store";

import { Timeline } from "components";

const Container: React.FC = () => {
    const { inputs, rootPrefab } = usePrefabEditorStore(
        (state) => ({
            inputs: state.inputs,
            rootPrefab: state.rootPrefab,
        }),
        shallow
    );

    if (!rootPrefab) return null;

    const inputKeys = Object.keys(inputs);
    return (
        <>
            {inputKeys.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center text-white border-2 border-dashed border-white">
                    <div className="flex flex-col items-center ">
                        <FilmIcon className="w-12 h-12" />
                        <p className="font-default font-semibold text-xl">There are no animations</p>
                        <p className="font-default text-md">Please add an animation module to your prefab</p>
                    </div>
                </div>
            ) : (
                inputKeys.map((prefabId) => <Timeline.Row key={prefabId} inputs={inputs[prefabId]} rootPrefab={rootPrefab} prefabId={prefabId} />)
            )}
        </>
    );
};

export default Container;
