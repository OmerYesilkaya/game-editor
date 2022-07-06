import { useEffect } from "react";

import { NextPage } from "next";

import { usePrefabEditorStore } from "@app/store";
import { PrefabEditor } from "@app/components";

const New: NextPage = () => {
    const createNewRoot = usePrefabEditorStore((state) => state.createNewRoot);
    useEffect(() => {
        createNewRoot();
    }, []);

    return <PrefabEditor.Container />;
};

export default New;
