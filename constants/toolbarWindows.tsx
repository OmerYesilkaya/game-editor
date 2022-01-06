import dynamic from "next/dynamic";

import { CashIcon, CubeTransparentIcon, EyeIcon, ViewGridIcon } from "@heroicons/react/outline";

const Prefabs = dynamic(() => import("../components/PrefabCreator/Prefabs"), { ssr: false });
const Modules = dynamic(() => import("../components/PrefabCreator/Modules"), { ssr: false });
const PreviewWindow = dynamic(() => import("../components/PrefabCreator/PreviewWindow"), { ssr: false });
const PrefabWindow = dynamic(() => import("../components/PrefabCreator/PrefabWindow"), { ssr: false });

type Window = {
	id: string;
	name: string;
	component: JSX.Element;
	width: number;
	height: number;
	icon: JSX.Element;
};

const windows: Window[] = [
	{
		id: "toolbar-prefabs",
		name: "Prefabs",
		component: <Prefabs />,
		width: 300,
		height: 200,
		icon: <CashIcon />,
	},
	{
		id: "toolbar-modules",
		name: "Modules",
		component: <Modules />,
		width: 300,
		height: 200,
		icon: <ViewGridIcon />,
	},
	{
		id: "toolbar-preview",
		name: "Preview",
		component: <PreviewWindow width={400} height={320} />,
		width: 400,
		height: 320,
		icon: <EyeIcon />,
	},
	{
		id: "toolbar-active-prefab",
		name: "ActivePrefab",
		component: <PrefabWindow />,
		width: 400,
		height: 500,
		icon: <CubeTransparentIcon />,
	},
];

export default windows;
