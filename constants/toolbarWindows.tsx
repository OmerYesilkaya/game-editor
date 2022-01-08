import dynamic from "next/dynamic";

import { CashIcon, CubeTransparentIcon, DocumentTextIcon, EyeIcon, ViewGridIcon } from "@heroicons/react/outline";
import { CameraIcon } from "@heroicons/react/solid";

const Prefabs = dynamic(() => import("../components/PrefabCreator/Windows/Prefabs"), { ssr: false });
const Modules = dynamic(() => import("../components/PrefabCreator/Windows/Modules"), { ssr: false });
const PreviewWindow = dynamic(() => import("../components/PrefabCreator/Windows/Preview"), { ssr: false });
const PrefabWindow = dynamic(() => import("../components/PrefabCreator/Windows/ActivePrefab"), { ssr: false });
const Assets = dynamic(() => import("../components/PrefabCreator/Windows/Assets"), { ssr: false });

type Window = {
	id: string;
	name: JSX.Element;
	component: JSX.Element;
	width: number;
	height: number;
	icon: JSX.Element;
	order: number;
};

const windows: Window[] = [
	{
		id: "toolbar-prefabs",
		name: <>Prefabs</>,
		component: <Prefabs />,
		width: 400,
		height: 300,
		icon: <CashIcon />,
		order: 1,
	},
	{
		id: "toolbar-modules",
		name: <>Modules</>,
		component: <Modules />,
		width: 400,
		height: 300,
		icon: <ViewGridIcon />,
		order: 2,
	},
	{
		id: "toolbar-preview",
		name: (
			<div className="flex items-center">
				Preview
				<CameraIcon className="w-5 h-5 ml-0.5" />
			</div>
		),
		component: <PreviewWindow width={392} height={276} />,
		width: 400,
		height: 320,
		icon: <EyeIcon />,
		order: 7,
	},
	{
		id: "toolbar-active-prefab",
		name: <>ActivePrefab</>,
		component: <PrefabWindow />,
		width: 400,
		height: 500,
		icon: <CubeTransparentIcon />,
		order: 3,
	},
	{
		id: "toolbar-file-select",
		name: <>Assets</>,
		component: <Assets />,
		width: 400,
		height: 320,
		icon: <DocumentTextIcon className="p-px" />,
		order: 6,
	},
];

export default windows;
