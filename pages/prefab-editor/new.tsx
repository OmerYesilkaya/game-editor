import { useEffect } from "react";

import { NextPage } from "next";

import { usePrefabEditorStore } from "@core/store";
import { PrefabEditor } from "components";

const New: NextPage = () => {
    const createNewRoot = usePrefabEditorStore((state) => state.createNewRoot);
    useEffect(() => {
        createNewRoot();
    }, []);

    return <PrefabEditor.Container />;
};

export default New;
