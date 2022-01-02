import { NextPage } from "next";
import { Layout, PrefabCreator as PrefabCreatorComponents } from "@app/components";
import { COLORS } from "@app/constants";

const PrefabCreator: NextPage = () => {
	return (
		<Layout.Center className="relative w-full h-full flex gap-1 p-2" style={{ background: COLORS.BG_DARK }}>
			<PrefabCreatorComponents.PreviewWindow />
			<div className="flex flex-col w-1/3 h-full gap-y-1">
				<PrefabCreatorComponents.Prefabs />
				<PrefabCreatorComponents.Modules />
			</div>

			<PrefabCreatorComponents.PrefabCanvas />
		</Layout.Center>
	);
};

export default PrefabCreator;
