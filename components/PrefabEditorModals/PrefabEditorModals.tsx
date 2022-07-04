import shallow from "zustand/shallow";
import { FolderOpenIcon } from "@heroicons/react/outline";

import Core from "@core/components";
import { usePrefabEditorStore } from "@core/store";

import { PrefabEditor } from "components";

const Modals: React.FC = () => {
    const { isPrefabsModalOpen, setIsPrefabsModalOpen } = usePrefabEditorStore(
        (state) => ({
            isPrefabsModalOpen: state.isPrefabsModalOpen,
            setIsPrefabsModalOpen: state.setIsPrefabsModalOpen,
        }),
        shallow
    );

    return (
        <>
            <Core.Modal
                isOpen={isPrefabsModalOpen}
                setIsOpen={setIsPrefabsModalOpen}
                title="Open"
                icon={<FolderOpenIcon className="w-5 h-5 text-white" />}
            >
                <PrefabEditor.Prefabs />
            </Core.Modal>
        </>
    );
};

export default Modals;
