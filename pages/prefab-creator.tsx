import { NextPage } from "next";
import { useEffect } from "react";

import { Layout, PrefabCreator as PrefabCreatorComponents, Common } from "@app/components";
import { COLORS, WINDOWS } from "@app/constants";
import { useCanvasStore, usePrefabStore } from "@app/store";
import { FolderOpenIcon } from "@heroicons/react/outline";

const PrefabCreator: NextPage = () => {
	const { prefab, createNewPrefab } = usePrefabStore((state) => ({ prefab: state.prefab, createNewPrefab: state.createNewPrefab }));
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
			{prefab ? (
				<>
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
				</>
			) : (
				<div className="w-1/2 h-2/3 flex flex-col items-center">
					<h2 className="font-default font-bold text-3xl text-zinc-100 mb-3">Welcome to Prefab Editor</h2>
					<div className="w-full h-px my-4 bg-zinc-900 shadow-md" />
					<h4 className="text-zinc-500 my-3 font-default font-light text-sm">EDIT AN EXISTING PREFAB</h4>
					<div className="w-full h-full bg-zinc-800 shadow-lg rounded-sm">
						<PrefabCreatorComponents.Prefabs />
					</div>
					<h4 className="text-zinc-600 my-3 font-default font-light text-sm">OR</h4>
					<button
						onClick={() => createNewPrefab()}
						className="px-5 py-3.5 rounded-sm shadow-lg bg-emerald-600 text-white font-default font-semibold text-sm transition hover:bg-emerald-700 border border-emerald-900 hover:border-emerald-400 active:bg-emerald-800 active:border-emerald-900 active:text-emerald-500"
					>
						CREATE A NEW ONE
					</button>
				</div>
			)}
		</Layout.Center>
	);
};

export default PrefabCreator;
