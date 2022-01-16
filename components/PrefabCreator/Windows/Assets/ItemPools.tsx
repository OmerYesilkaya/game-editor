import { useInputStore, useCanvasStore, useAssetStore } from "@app/store";

const ItemPools: React.FC = () => {
	const itemPools = useAssetStore((state) => state.itemPools);
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
			{itemPools.map((itemPool) => (
				<button
					type="button"
					key={itemPool.id}
					className="flex px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
					title={itemPool.name}
					onClick={() => handleSelect(itemPool.id)}
				>
					{itemPool.name}
				</button>
			))}
		</div>
	);
};

export default ItemPools;
