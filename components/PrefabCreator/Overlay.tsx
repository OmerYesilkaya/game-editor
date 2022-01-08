import { useCanvasStore } from "store/useCanvasStore";

const Overylay: React.FC = () => {
	const setActiveAssetInput = useCanvasStore((state) => state.setActiveAssetInput);
	return <div className="fixed inset-0 h-screen w-screen z-[15] bg-black opacity-60" onClick={() => setActiveAssetInput(null)} />;
};

export default Overylay;
