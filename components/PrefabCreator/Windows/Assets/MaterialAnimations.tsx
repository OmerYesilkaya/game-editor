import { useInputStore, useCanvasStore, useAssetStore } from "@app/store";

const MaterialAnimations: React.FC = () => {
	const materialAnimations = useAssetStore((state) => state.materialAnimations);
	const updateInput = useInputStore((state) => state.updateInput);
	const { activeAssetInput, setActiveAssetInput, activeWindowIds, setActiveWindowIds } = useCanvasStore((state) => ({
		activeWindowIds: state.activeWindowIds,
		setActiveWindowIds: state.setActiveWindowIds,
		activeAssetInput: state.activeAssetInput,
		setActiveAssetInput: state.setActiveAssetInput,
	}));

	function handleSelect(id: number) {
		if (!activeAssetInput) return;
		updateInput(activeAssetInput.id, id);
		setActiveAssetInput(null);
		setActiveWindowIds(activeWindowIds.filter((windowId) => !["toolbar-file-select"].includes(windowId)));
	}

	return (
		<div className="flex flex-col gap-y-px">
			{materialAnimations.map((materialAnimation) => (
				<button
					type="button"
					key={materialAnimation.id}
					className="flex px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
					title={materialAnimation.name}
					onClick={() => handleSelect(materialAnimation.id)}
				>
					{materialAnimation.name}
				</button>
			))}
		</div>
	);
};

export default MaterialAnimations;
