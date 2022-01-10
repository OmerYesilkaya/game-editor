import cn from "classnames";

import { useSpriteStore, useAnimationStore, usePreviewStore, useCanvasStore, useInputStore } from "@app/store";
import { useEffect, useState } from "react";
import { ModuleValueType } from "types/module";

const Sprites: React.FC = () => {
	const setTemporaryPreview = usePreviewStore((state) => state.setTemporaryPreview);
	const sprites = useSpriteStore((state) => state.sprites);
	const updateInput = useInputStore((state) => state.updateInput);
	const { activeAssetInput, setActiveAssetInput } = useCanvasStore((state) => ({
		activeAssetInput: state.activeAssetInput,
		setActiveAssetInput: state.setActiveAssetInput,
	}));

	function handleSelect(id: number) {
		if (!activeAssetInput) return;
		updateInput(activeAssetInput.id, id);
		setActiveAssetInput(null);
	}

	function handlePointerEnter(id: number) {
		const preview = sprites.find((sprite) => sprite.id === id);
		if (!preview) return;
		setTemporaryPreview(preview);
	}

	function handlePointerOut() {
		setTemporaryPreview(null);
	}

	return (
		<div className="flex flex-col gap-y-px">
			{sprites.map((sprite) => (
				<button
					type="button"
					key={sprite.id}
					className="flex px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
					title={sprite.name}
					onClick={() => handleSelect(sprite.id)}
					onPointerEnter={() => handlePointerEnter(sprite.id)}
					onPointerOut={() => handlePointerOut()}
				>
					{sprite.name}
				</button>
			))}
		</div>
	);
};

const Animations: React.FC = () => {
	const setTemporaryPreview = usePreviewStore((state) => state.setTemporaryPreview);
	const animations = useAnimationStore((state) => state.animations);
	const sprites = useSpriteStore((state) => state.sprites);
	const updateInput = useInputStore((state) => state.updateInput);
	const { activeAssetInput, setActiveAssetInput } = useCanvasStore((state) => ({
		activeAssetInput: state.activeAssetInput,
		setActiveAssetInput: state.setActiveAssetInput,
	}));

	function handleSelect(id: number) {
		if (!activeAssetInput) return;
		updateInput(activeAssetInput.id, id);
		setActiveAssetInput(null);
	}

	function handlePointerEnter(id: number) {
		const animation = animations.find((animation) => animation.id === id);
		if (!animation) return;
		const preview = sprites.filter((sprite) => animation.sprites.includes(sprite.id));
		if (!preview) return;
		setTemporaryPreview(preview);
	}

	function handlePointerOut() {
		setTemporaryPreview(null);
	}

	return (
		<div className="flex flex-col gap-y-px">
			{animations.map((animation) => (
				<button
					type="button"
					key={animation.id}
					className="flex px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
					title={animation.name}
					onClick={() => handleSelect(animation.id)}
					onPointerEnter={() => handlePointerEnter(animation.id)}
					onPointerOut={() => handlePointerOut()}
				>
					{animation.name}
				</button>
			))}
		</div>
	);
};

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
				className={cn("flex w-full rounded-sm px-1 py-px justify-center text-sm font-default transition bg-zinc-900 text-white", {
					"outline-rose-500 outline-2 outline opacity-100": selected,
					"opacity-50": !selected,
					"hover:opacity-100 hover:brightness-125": !disabled,
				})}
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
			</div>
			<div className="mt-1 flex flex-col overflow-y-auto font-default text-white">{getPanel()}</div>
		</div>
	);
};

export default Assets;
