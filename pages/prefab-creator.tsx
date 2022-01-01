import { NextPage } from "next";
import { Layout, PrefabCreator as PrefabCreatorComponents } from "@app/components";

const PrefabCreator: NextPage = () => {
	return (
		<Layout.Center className="w-full h-full flex gap-2 p-2">
			<PrefabCreatorComponents.Prefabs />
			<PrefabCreatorComponents.PrefabCanvas />
			{/* <PrefabCreatorComponents.ActivePrefab /> */}
			<PrefabCreatorComponents.Modules />
		</Layout.Center>
	);
};

export default PrefabCreator;
