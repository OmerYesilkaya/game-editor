import { useInputStore, useCanvasStore, useAssetStore } from "@app/store";

const TrailSystems: React.FC = () => {
	const trailSystems = useAssetStore((state) => state.trailSystems);
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
			{trailSystems.map((trailSystem) => (
				<button
					type="button"
					key={trailSystem.id}
					className="flex px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
					title={trailSystem.name}
					onClick={() => handleSelect(trailSystem.id)}
				>
					{trailSystem.name}
				</button>
			))}
		</div>
	);
};

export default TrailSystems;
