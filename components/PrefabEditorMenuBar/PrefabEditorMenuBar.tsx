import { useState } from "react";

import { usePrefabEditorStore } from "@app/store";
import { PrefabEditor } from "@app/components";

const MenuBar: React.FC = () => {
    const rootPrefab = usePrefabEditorStore((state) => state.rootPrefab);
    const [isFileOpen, setIsFileOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <div className="w-screen z-[20]">
            <div className="flex items-center font-default font-light w-full bg-slate-100 text-sm h-5 shadow-md justify-between">
                <div className="flex">
                    <div className="relative">
                        <button
                            onClick={() => setIsFileOpen((prev) => !prev)}
                            className="bg-inherit transition hover:bg-slate-200 active:bg-slate-300 cursor-pointer px-2 border-r"
                        >
                            File
                        </button>
                        <PrefabEditor.FileDropdown isOpen={isFileOpen} setIsOpen={setIsFileOpen} />
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setIsEditOpen((prev) => !prev)}
                            className="bg-inherit transition hover:bg-slate-200 active:bg-slate-300 cursor-pointer px-2 border-r"
                        >
                            Edit
                        </button>
                        <PrefabEditor.EditDropdown isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
                    </div>
                </div>
                <div>{rootPrefab?.name ? rootPrefab.name : "Prefab Creator"}</div>
                <div className="invisible w-9" />
            </div>
        </div>
    );
};

export default MenuBar;
