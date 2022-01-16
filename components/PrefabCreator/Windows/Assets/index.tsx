import { useEffect, useState } from "react";

import cn from "classnames";

import { useCanvasStore } from "@app/store";
import { ModuleValueType } from "@app/types";

import Animations from "./Animations";
import Sprites from "./Sprites";
import Audios from "./Audios";
import Materials from "./Materials";
import ParticleSystems from "./ParticleSystems";
import TrailSystems from "./TrailSystems";
import Prefabs from "components/PrefabCreator/Prefabs";
import ItemPools from "./ItemPools";
import MaterialAnimations from "./MaterialAnimations";

type Props = {
	activeTabId: ModuleValueType;
	tabId: ModuleValueType;
	handleSelect: (id: ModuleValueType) => void;
};

const Tab: React.FC<Props> = ({ tabId, activeTabId, handleSelect, children }) => {
	const activeAssetInput = useCanvasStore((state) => state.activeAssetInput);

	const selected = tabId === activeTabId;
	const disabled = activeAssetInput?.type === undefined ? false : activeAssetInput?.type !== tabId;

	return (
		<button className="flex mt-1 gap-x-1 w-full" onClick={() => handleSelect(tabId)} disabled={disabled}>
			<div
				className={cn(
					"flex w-full rounded-sm px-1 py-px justify-center text-sm font-default transition bg-zinc-900 text-white border-2 border-rose-600",
					{
						"opacity-100": selected,
						"opacity-25": !selected,
						"hover:opacity-100 hover:brightness-125": !disabled,
					}
				)}
			>
				{children}
			</div>
		</button>
	);
};

const Assets: React.FC = () => {
	const activeAssetInput = useCanvasStore((state) => state.activeAssetInput);
	const [activeTab, setActiveTab] = useState<ModuleValueType>(ModuleValueType.Animation);

	function handleSelect(id: ModuleValueType) {
		setActiveTab(id);
	}

	function getPanel() {
		let panel;
		switch (activeTab) {
			case ModuleValueType.Animation:
				panel = <Animations />;
				break;
			case ModuleValueType.Sprite:
				panel = <Sprites />;
				break;
			case ModuleValueType.Audio:
				panel = <Audios />;
				break;
			case ModuleValueType.Material:
				panel = <Materials />;
				break;
			case ModuleValueType.ParticleSystem:
				panel = <ParticleSystems />;
				break;
			case ModuleValueType.TrailSystem:
				panel = <TrailSystems />;
				break;
			case ModuleValueType.Prefab:
				panel = <Prefabs />;
				break;
			case ModuleValueType.ItemPool:
				panel = <ItemPools />;
				break;
			case ModuleValueType.MaterialAnimation:
				panel = <MaterialAnimations />;
				break;
			default:
				panel = null;
				break;
		}
		return panel;
	}

	useEffect(() => {
		if (!activeAssetInput) return;
		setActiveTab(activeAssetInput?.type);
	}, [activeAssetInput]);

	return (
		<div className="flex flex-col h-full">
			<div className="flex gap-x-1">
				<Tab handleSelect={handleSelect} tabId={ModuleValueType.Animation} activeTabId={activeTab}>
					ANIMATIONS
				</Tab>
				<Tab handleSelect={handleSelect} tabId={ModuleValueType.Sprite} activeTabId={activeTab}>
					SPRITES
				</Tab>
				<Tab handleSelect={handleSelect} tabId={ModuleValueType.Audio} activeTabId={activeTab}>
					AUDIOS
				</Tab>
			</div>
			<div className="mt-1 flex flex-col overflow-y-auto font-default text-white grow">{getPanel()}</div>
		</div>
	);
};

export default Assets;
