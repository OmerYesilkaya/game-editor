import { useSelectedInput } from "@prefab-editor/hooks";

const Overylay: React.FC = () => {
	const { selectedInput, clearInputSelection } = useSelectedInput();

	function handleClick() {
		clearInputSelection();
	}

	return selectedInput ? <div className="fixed inset-0 h-screen w-screen z-[15] bg-black opacity-60" onClick={() => handleClick()} /> : null;
};

export default Overylay;
