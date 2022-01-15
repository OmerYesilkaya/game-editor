import { useCanvasStore } from "store/useCanvasStore";

const Overylay: React.FC = () => {
	const { setActiveAssetInput, setActiveWindowIds, activeWindowIds } = useCanvasStore((state) => ({
		setActiveWindowIds: state.setActiveWindowIds,
		activeWindowIds: state.activeWindowIds,
		setActiveAssetInput: state.setActiveAssetInput,
	}));

	function handleClick() {
		setActiveAssetInput(null);
		setActiveWindowIds(activeWindowIds.filter((windowId) => !["toolbar-preview", "toolbar-file-select"].includes(windowId)));
	}

	return <div className="fixed inset-0 h-screen w-screen z-[15] bg-black opacity-60" onClick={() => handleClick()} />;
};

export default Overylay;
