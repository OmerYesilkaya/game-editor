import { useInputStore, useCanvasStore, useAssetStore } from "@app/store";

const ParticleSystems: React.FC = () => {
	const particleSystems = useAssetStore((state) => state.particleSystems);
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
			{particleSystems.map((particleSystem) => (
				<button
					type="button"
					key={particleSystem.id}
					className="flex px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
					title={particleSystem.name}
					onClick={() => handleSelect(particleSystem.id)}
				>
					{particleSystem.name}
				</button>
			))}
		</div>
	);
};

export default ParticleSystems;
