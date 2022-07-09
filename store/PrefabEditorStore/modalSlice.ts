import { EditorSlice, ModalSlice } from "./types";

export const createModalSlice: EditorSlice<ModalSlice> = (set, get) => ({
    isPrefabsModalOpen: false,
    setIsPrefabsModalOpen: (isOpen) => set(() => ({ isPrefabsModalOpen: isOpen })),
});
