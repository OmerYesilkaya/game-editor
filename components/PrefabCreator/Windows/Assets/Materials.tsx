import { useInputStore, useCanvasStore, useAssetStore } from "@app/store";

const Materials: React.FC = () => {
	const materials = useAssetStore((state) => state.materials);
	const updateInput = useInputStore((state) => state.updateInput);
	const { activeAssetInput, setActiveAssetInput, activeWindowIds, setActiveWindowIds } = useCanvasStore((state) => ({
		activeWindowIds: state.activeWindowIds,
		activeAssetInput: state.activeAssetInput,
		setActiveWindowIds: state.setActiveWindowIds,
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
			{materials.map((material) => (
				<button
					type="button"
					key={material.id}
					className="flex px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
					title={material.name}
					onClick={() => handleSelect(material.id)}
				>
					{material.name}
				</button>
			))}
		</div>
	);
};

export default Materials;
