import shallow from "zustand/shallow";
import { FolderOpenIcon } from "@heroicons/react/outline";

import { usePrefabEditorStore } from "@core/store";

import { Common, PrefabEditor } from "components";

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
            <Common.Modal
                isOpen={isPrefabsModalOpen}
                setIsOpen={setIsPrefabsModalOpen}
                title="Open"
                icon={<FolderOpenIcon className="w-5 h-5 text-white" />}
            >
                <PrefabEditor.Prefabs />
            </Common.Modal>
        </>
    );
};

export default Modals;
