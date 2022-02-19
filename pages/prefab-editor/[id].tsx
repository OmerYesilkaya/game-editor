import { GetServerSidePropsContext, NextPage } from "next";

import { v4 as uuid } from "uuid";
import shallow from "zustand/shallow";

import { GetPrefabResponse, Prefab } from "@app/types";

import { api } from "@core/hooks";
import { usePrefabEditorStore } from "@core/store";
import { PrefabEditor } from "@prefab-editor/components";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { KEYS } from "@core/constants";

function convertPrefabResponse(prefabResponse: GetPrefabResponse): Prefab {
    return {
        ...prefabResponse,
        internalId: uuid(),
        children: prefabResponse.children ? prefabResponse.children.map((child) => convertPrefabResponse(child)) : [],
    };
}

type Props = {
    id: number;
};

const Edit: NextPage<Props> = ({ id }) => {
    // TODO(selim): Check if shallow is needed here
    const { setPrefab, setInputs } = usePrefabEditorStore((state) => ({ setPrefab: state.setRootPrefab, setInputs: state.setInputs }), shallow);
    const queryClient = useQueryClient();

    const { isLoading } = api.useGetPrefabById({
        params: { id },
        onSuccess: (data: GetPrefabResponse) => {
            console.log("successfully gotten new prefab");
            const prefab = convertPrefabResponse(data);
            setPrefab(prefab);
            setInputs(prefab);
        },
    });

    console.log("id changed", id);

    useEffect(() => {
        queryClient.invalidateQueries(KEYS.PREFABS);
        console.log("id changed useEffect", id);
    }, [id]);

    // TODO(selim): Styling
    return isLoading ? <>Loading...</> : <PrefabEditor />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const id = Number(context.query.id as string);
    return {
        props: { id },
    };
}

export default Edit;
