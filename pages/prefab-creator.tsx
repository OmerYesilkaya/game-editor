import { NextPage } from "next";
import { Layout, PrefabCreator as PrefabCreatorComponents } from "@app/components";
import { COLORS } from "@app/constants";

const PrefabCreator: NextPage = () => {
	return (
		<Layout.Center className="w-full h-full flex gap-2 p-2" style={{ background: COLORS.BG_DARK }}>
			<PrefabCreatorComponents.Prefabs />
			<PrefabCreatorComponents.PrefabCanvas />
			<PrefabCreatorComponents.Modules />
		</Layout.Center>
	);
};

export default PrefabCreator;
