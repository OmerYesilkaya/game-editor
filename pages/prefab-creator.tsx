import { NextPage } from "next";
import { useEffect } from "react";

import { Layout, PrefabCreator as PrefabCreatorComponents, Common } from "@app/components";
import { COLORS, WINDOWS } from "@app/constants";
import { useCanvasStore } from "@app/store";
import { FolderOpenIcon } from "@heroicons/react/outline";

const PrefabCreator: NextPage = () => {
	const { activeAssetInput, activeWindowIds, toggleActivation, isPrefabsModalOpen, setIsPrefabsModalOpen } = useCanvasStore((state) => ({
		activeWindowIds: state.activeWindowIds,
		toggleActivation: state.toggleActivation,
		activeAssetInput: state.activeAssetInput,
		setIsPrefabsModalOpen: state.setIsPrefabsModalOpen,
		isPrefabsModalOpen: state.isPrefabsModalOpen,
	}));

	function handleOpenClick() {
		setIsPrefabsModalOpen(true);
	}

	useEffect(() => {
		function handleShortcuts(e: KeyboardEvent) {
			if ((document.activeElement && document.activeElement?.tagName === "INPUT") || document.activeElement?.tagName === "TEXTAREA") return;
			switch (e.key) {
				case "1":
					toggleActivation("toolbar-prefabs");
					break;
				case "2":
					toggleActivation("toolbar-modules");
					break;
				case "3":
					toggleActivation("toolbar-preview");
					break;
				case "4":
					toggleActivation("toolbar-active-prefab");
					break;
				case "5":
					toggleActivation("toolbar-file-select");
					break;
				default:
					break;
			}
		}

		window.addEventListener("keydown", handleShortcuts);
		return () => window.removeEventListener("keydown", handleShortcuts);
	}, []);

	return (
		<Layout.Center className="relative w-full h-full flex gap-1" style={{ background: COLORS.BG_DARK }}>
			<PrefabCreatorComponents.MenuBar handleOpenClick={handleOpenClick} />
			<PrefabCreatorComponents.Toolbar />
			{WINDOWS.map((window) => {
				const isActive = activeWindowIds.includes(window.id);
				return (
					<PrefabCreatorComponents.Window
						key={window.id}
						width={window.width}
						height={window.height}
						noContent={<div>no content</div>}
						title={window.name}
						isActive={isActive}
						id={window.id}
						order={window.order}
					>
						{window.component}
					</PrefabCreatorComponents.Window>
				);
			})}
			<PrefabCreatorComponents.PrefabCanvas />
			{activeAssetInput && <PrefabCreatorComponents.Overlay />}
			<Common.Modal
				title="Open"
				icon={<FolderOpenIcon className="w-5 h-5 text-white" />}
				isOpen={isPrefabsModalOpen}
				setIsOpen={setIsPrefabsModalOpen}
			>
				<PrefabCreatorComponents.Prefabs />
			</Common.Modal>
		</Layout.Center>
	);
};

export default PrefabCreator;
