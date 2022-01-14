import { FolderOpenIcon } from "@heroicons/react/outline";

import { Common } from "@app/components";

import Prefabs from "../Prefabs";
import { useCanvasStore } from "store/useCanvasStore";

const Modals: React.FC = () => {
	const { isPrefabsModalOpen, setIsPrefabsModalOpen } = useCanvasStore((state) => ({
		isPrefabsModalOpen: state.isPrefabsModalOpen,
		setIsPrefabsModalOpen: state.setIsPrefabsModalOpen,
	}));
	return (
		<>
			<Common.Modal
				isOpen={isPrefabsModalOpen}
				setIsOpen={setIsPrefabsModalOpen}
				title="Open"
				icon={<FolderOpenIcon className="w-5 h-5 text-white" />}
			>
				<Prefabs />
			</Common.Modal>
		</>
	);
};

export default Modals;
