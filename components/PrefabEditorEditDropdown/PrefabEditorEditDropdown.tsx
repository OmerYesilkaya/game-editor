import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import shallow from "zustand/shallow";
import { useHotkeys } from "react-hotkeys-hook";

import { Transition } from "@headlessui/react";
import { SaveIcon, TrashIcon } from "@heroicons/react/outline";

import { usePrefabEditorStore } from "@app/store";
import { Common } from "@app/components";

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const EditDropdown: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const { selectedPrefabId, deletePrefab, addChild } = usePrefabEditorStore(
        (state) => ({
            selectedPrefabId: state.selectedPrefabId,
            deletePrefab: state.deletePrefab,
            addChild: state.addChild,
        }),
        shallow
    );

    useHotkeys("delete", () => deletePrefab(selectedPrefabId), [selectedPrefabId]);
    useHotkeys(
        "alt+n",
        (e) => {
            e.preventDefault();
            addChild();
        },
        { filterPreventDefault: true, filter: () => true }
    );

    useEffect(() => {
        const element = document.getElementById("react-flow-container");
        function handleOutsideClick(e: MouseEvent) {
            const isOutsideMenu = e.target === menuRef.current || menuRef.current?.contains(e.target as Node);
            if (isOutsideMenu) return;
            setIsOpen(false);
        }

        element?.addEventListener("click", handleOutsideClick);
        window.addEventListener("mousedown", handleOutsideClick);

        return () => {
            element?.removeEventListener("click", handleOutsideClick);
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="absolute top-5 flex flex-col rounded-b-sm overflow-hidden w-72 " ref={menuRef}>
            <Transition
                show={isOpen}
                as="div"
                enter="transition-opacity duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Common.DropdownOption
                    onClick={() => addChild()}
                    icon={<SaveIcon className="w-4 h-4" />}
                    label="New Child Prefab"
                    shortcut="ctrl+n"
                />
                <Common.DropdownOption
                    onClick={() => selectedPrefabId && deletePrefab(selectedPrefabId)}
                    icon={<TrashIcon className="w-4 h-4" />}
                    label="Delete Selected Prefab"
                    shortcut="delete"
                />
            </Transition>
        </div>
    );
};

export default EditDropdown;
