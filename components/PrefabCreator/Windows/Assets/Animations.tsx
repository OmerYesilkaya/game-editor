import { useAssetStore, useInputStore, usePreviewStore, useCanvasStore } from "@app/store";
import { FilmIcon } from "@heroicons/react/outline";

const Animations: React.FC = () => {
	const setTemporaryPreview = usePreviewStore((state) => state.setTemporaryPreview);
	const setActivePreview = usePreviewStore((state) => state.setActivePreview);
	const { animations, sprites } = useAssetStore((state) => ({ animations: state.animations, sprites: state.sprites }));

	const updateInput = useInputStore((state) => state.updateInput);
	const { activeAssetInput, setActiveAssetInput, activeWindowIds, setActiveWindowIds } = useCanvasStore((state) => ({
		activeWindowIds: state.activeWindowIds,
		setActiveWindowIds: state.setActiveWindowIds,
		activeAssetInput: state.activeAssetInput,
		setActiveAssetInput: state.setActiveAssetInput,
	}));

	function handleSelect(id: number) {
		const animation = animations.find((animation) => animation.id === id);
		if (!animation) return;
		const preview = sprites.filter((sprite) => animation.sprites.includes(sprite.id));
		if (!preview) return;
		setActivePreview(preview);
		if (!activeAssetInput) return;
		updateInput(activeAssetInput.id, id);
		setActiveAssetInput(null);
		setActiveWindowIds(activeWindowIds.filter((windowId) => !["toolbar-preview", "toolbar-file-select"].includes(windowId)));
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
		<div className="flex flex-col gap-y-px grow">
			{animations.length > 0 ? (
				animations.map((animation) => (
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
				))
			) : (
				<div className="grow flex items-center justify-center flex-col gap-y-1">
					<h2 className="uppercase text-xl font-bold">No animation found</h2>
					<FilmIcon className="w-12 h-12" />
				</div>
			)}
		</div>
	);
};

export default Animations;
