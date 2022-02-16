import { useEffect } from "react";

import { NextPage } from "next";

import { usePrefabEditorStore } from "@core/store";
import { PrefabEditor } from "@prefab-editor/components";

const New: NextPage = () => {
    const createNewRoot = usePrefabEditorStore((state) => state.createNewRoot);
    useEffect(() => {
        createNewRoot();
    }, []);

    return <PrefabEditor />;
};

export default New;
