import { GetServerSidePropsContext, NextPage } from "next";

import { v4 as uuid } from "uuid";
import shallow from "zustand/shallow";

import { GetPrefabResponse, Prefab } from "@app/types";

import { api } from "@core/hooks";
import { usePrefabEditorStore } from "@core/store";
import { PrefabEditor } from "@prefab-editor/components";

function convertPrefabResponse(prefabResponse: GetPrefabResponse): Prefab {
	return { ...prefabResponse, internalId: uuid(), children: prefabResponse.children.map((child) => convertPrefabResponse(child)) };
}

type Props = {
	id: number;
};

const Edit: NextPage<Props> = ({ id }) => {
	// TODO(selim): Check if shallow is needed here
	const { setPrefab, setInputs } = usePrefabEditorStore((state) => ({ setPrefab: state.setRootPrefab, setInputs: state.setInputs }), shallow);

	const { isLoading } = api.useGetPrefabById({
		params: { id },
		onSuccess: (data: GetPrefabResponse) => {
			const prefab = convertPrefabResponse(data);
			setPrefab(prefab);
			setInputs(prefab);
		},
	});

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
