import { useAssetStore, useInputStore, usePreviewStore, useCanvasStore } from "@app/store";
import { PhotographIcon } from "@heroicons/react/outline";

const Sprites: React.FC = () => {
	const setTemporaryPreview = usePreviewStore((state) => state.setTemporaryPreview);
	const setActivePreview = usePreviewStore((state) => state.setActivePreview);
	const sprites = useAssetStore((state) => state.sprites);
	const updateInput = useInputStore((state) => state.updateInput);
	const { activeAssetInput, setActiveAssetInput, activeWindowIds, setActiveWindowIds } = useCanvasStore((state) => ({
		activeWindowIds: state.activeWindowIds,
		setActiveWindowIds: state.setActiveWindowIds,
		activeAssetInput: state.activeAssetInput,
		setActiveAssetInput: state.setActiveAssetInput,
	}));

	function handleSelect(id: number) {
		const preview = sprites.find((sprite) => sprite.id === id);
		if (!preview) return;
		setActivePreview(preview);
		if (!activeAssetInput) return;
		updateInput(activeAssetInput.id, id);
		setActiveAssetInput(null);
		setActiveWindowIds(activeWindowIds.filter((windowId) => !["toolbar-preview", "toolbar-file-select"].includes(windowId)));
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
		<div className="flex flex-col gap-y-px grow">
			{sprites.length > 0 ? (
				sprites.map((sprite) => (
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
				))
			) : (
				<div className="grow flex items-center justify-center flex-col gap-y-1">
					<h2 className="uppercase text-xl font-bold">No sprite found</h2>
					<PhotographIcon className="w-12 h-12" />
				</div>
			)}
		</div>
	);
};

export default Sprites;
