import { useState } from "react";

import { Tab } from "@headlessui/react";

import cn from "classnames";

import { useSpriteStore, useAnimationStore, usePreviewStore } from "@app/store";
import { Animation } from "@app/types";

const Sprites: React.FC = () => {
	const sprites = useSpriteStore((state) => state.sprites);

	return (
		<div className="flex flex-col gap-y-px">
			{sprites.map((sprite) => (
				<div
					key={sprite.id}
					className="cursor-pointer px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
					title={sprite.name}
				>
					{sprite.name}
				</div>
			))}
		</div>
	);
};

const Animations: React.FC = () => {
	const setTemporaryPreview = usePreviewStore((state) => state.setTemporaryPreview);
	const animations = useAnimationStore((state) => state.animations);
	const sprites = useSpriteStore((state) => state.sprites);

	function handleSelect(id: number) {
		const target = animations.find((animation) => animation.id === id);
		if (target) {
			// setSelectedAnimation(target);
		}
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
				<div
					key={animation.id}
					className="cursor-pointer px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
					title={animation.name}
					onPointerEnter={() => handlePointerEnter(animation.id)}
					onPointerOut={() => handlePointerOut()}
				>
					{animation.name}
				</div>
			))}
		</div>
	);
};

const CustomTab: React.FC = ({ children }) => {
	return (
		<Tab className="w-full">
			{({ selected }) => (
				<div
					className={cn(
						"flex w-full rounded-sm px-1 py-px justify-center text-sm font-default transition bg-zinc-900 text-white hover:opacity-100 hover:brightness-125",
						{
							"outline-rose-500 outline-2 outline opacity-100": selected,
							"opacity-50": !selected,
						}
					)}
				>
					{children}
				</div>
			)}
		</Tab>
	);
};

const Assets: React.FC = () => {
	return (
		<Tab.Group as="div" className="flex flex-col h-full">
			<Tab.List className="flex mt-1 gap-x-1">
				<CustomTab>ANIMATIONS</CustomTab>
				<CustomTab>SPRITES</CustomTab>
			</Tab.List>
			<Tab.Panels className="mt-1 flex flex-col overflow-y-auto font-default text-white">
				<Tab.Panel>
					<Animations />
				</Tab.Panel>
				<Tab.Panel>
					<Sprites />
				</Tab.Panel>
			</Tab.Panels>
		</Tab.Group>
	);
};

export default Assets;
