import { NextPage } from "next";
import { useEffect } from "react";

import { Layout, PrefabCreator as PrefabCreatorComponents } from "@app/components";
import { COLORS, WINDOWS } from "@app/constants";
import { useCanvasStore } from "@app/store";

const PrefabCreator: NextPage = () => {
	const { activeAssetInput, activeWindowIds, toggleActivation } = useCanvasStore((state) => ({
		activeWindowIds: state.activeWindowIds,
		toggleActivation: state.toggleActivation,
		activeAssetInput: state.activeAssetInput,
	}));

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
		<Layout.Center className="relative w-full h-full flex gap-1 p-2" style={{ background: COLORS.BG_DARK }}>
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
		</Layout.Center>
	);
};

export default PrefabCreator;
