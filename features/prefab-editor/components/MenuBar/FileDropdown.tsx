import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import { Transition } from "@headlessui/react";
import { CubeTransparentIcon, FolderOpenIcon, SaveAsIcon, SaveIcon } from "@heroicons/react/outline";
import { useHotkeys } from "react-hotkeys-hook";
import shallow from "zustand/shallow";
import { useRouter } from "next/dist/client/router";

import { api } from "@core/hooks";
import { usePrefabEditorStore } from "@core/store";

import editorUtils from "@prefab-editor/editorUtils";
import { PutPrefabRequest } from "types/prefab";

import { Option } from "./Option";

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const FileDropdown: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    const { prefab, createNewPrefab, setIsPrefabsModalOpen } = usePrefabEditorStore(
        (state) => ({
            prefab: state.rootPrefab,
            createNewPrefab: state.createNewRoot,
            setIsPrefabsModalOpen: state.setIsPrefabsModalOpen,
        }),
        shallow
    );

    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);

    const query = router.query;
    const id = query.id as string;

    useHotkeys(
        "ctrl+s",
        (e) => {
            e.preventDefault();
            handleSave();
        },
        { filterPreventDefault: true, filter: () => true }
    );

    useHotkeys(
        "ctrl+alt+n",
        (e) => {
            e.preventDefault();
            router.push("/prefab-editor/new");
        },
        { filterPreventDefault: true, filter: () => true }
    );

    useHotkeys(
        "ctrl+o",
        (e) => {
            e.preventDefault();
            setIsPrefabsModalOpen(true);
        },
        { filterPreventDefault: true, filter: () => true }
    );

    const { mutate: post } = api.usePostPrefab();
    const { mutate: put } = api.usePutPrefab();

    function handleSave() {
        if (!prefab) return;
        console.log("prefab", prefab);
        const formattedData = editorUtils.mapToPrefabRequestData(prefab);
        console.log("formattedData", formattedData);

        if (id) {
            put(formattedData as PutPrefabRequest);
        } else {
            post(formattedData);
        }
    }

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
                enter="transition-opacity duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Option onClick={handleSave} icon={<SaveIcon className="w-4 h-4" />} label="Save" shortcut="ctrl+s" />
                <Option onClick={() => console.log("Saved as")} icon={<SaveAsIcon className="w-4 h-4" />} label="Save as..." shortcut="ctrl+alt+s" />
                <Option
                    onClick={() => {
                        createNewPrefab();
                    }}
                    icon={<CubeTransparentIcon className="w-4 h-4" />}
                    label="Create New"
                    shortcut="ctrl+alt+n"
                />
                <Option onClick={() => setIsPrefabsModalOpen(true)} icon={<FolderOpenIcon className="w-4 h-4" />} label="Open" shortcut="ctrl+o" />
            </Transition>
        </div>
    );
};

export default FileDropdown;
