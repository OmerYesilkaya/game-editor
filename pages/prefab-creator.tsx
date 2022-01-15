import { NextPage } from "next";
import { useEffect } from "react";

import { v4 as uuid } from "uuid";
import Split from "react-split";

import { Layout, PrefabCreator as PrefabCreatorComponents } from "@app/components";
import { COLORS, WINDOWS } from "@app/constants";
import { useCanvasStore, usePrefabStore, useInputStore } from "@app/store";
import { api } from "@app/hooks";
import { GetPrefabResponse } from "@app/types";
import { moduleUtils } from "@app/utils";

const PrefabCreator: NextPage = () => {
	const { prefab, activePrefabId, setPrefab } = usePrefabStore((state) => ({
		prefab: state.prefab,
		activePrefabId: state.activePrefabId,
		setPrefab: state.setPrefab,
	}));
	const { activeAssetInput, activeWindowIds, toggleActivation } = useCanvasStore((state) => ({
		activeWindowIds: state.activeWindowIds,
		toggleActivation: state.toggleActivation,
		activeAssetInput: state.activeAssetInput,
	}));
	const setInputs = useInputStore((state) => state.setInputs);

	const { refetch } = api.useGetPrefabById({
		params: { id: activePrefabId! },
		enabled: !!activePrefabId,
		onSuccess: (data: GetPrefabResponse) => {
			setPrefab({ ...data, internalId: uuid(), position: { x: 0, y: 0 } });
			setInputs(moduleUtils.getModuleInputs(data.modules));
		},
	});

	useEffect(() => {
		if (!activePrefabId) return;
		refetch();
	}, [activePrefabId]);

	useEffect(() => {
		function handleShortcuts(e: KeyboardEvent) {
			if ((document.activeElement && document.activeElement?.tagName === "INPUT") || document.activeElement?.tagName === "TEXTAREA") return;
			switch (e.key) {
				case "1":
					toggleActivation("toolbar-preview");
					break;
				case "2":
					toggleActivation("toolbar-active-prefab");
					break;
				case "3":
					toggleActivation("toolbar-file-select");
					break;
				default:
					break;
			}
		}

		window.addEventListener("keydown", handleShortcuts);
		return () => window.removeEventListener("keydown", handleShortcuts);
	}, []);

	return prefab ? (
		<div className="w-full h-full flex flex-col" style={{ background: COLORS.BG_DARK }}>
			<PrefabCreatorComponents.MenuBar />
			<Layout.Center className="relative w-full h-full flex gap-1" style={{ background: COLORS.BG_DARK }}>
				<>
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
					<Split
						className="w-full h-full flex"
						sizes={[75, 25]}
						minSize={100}
						expandToMin={false}
						gutterSize={10}
						gutterAlign="center"
						snapOffset={30}
						dragInterval={1}
						direction="horizontal"
						cursor="col-resize"
						gutter={(index, direction) => {
							const gutter = document.createElement("div");
							gutter.className = `gutter gutter-${direction}`;
							return gutter;
						}}
					>
						<PrefabCreatorComponents.FlowCanvas />
						<PrefabCreatorComponents.PrefabCanvas />
					</Split>

					<PrefabCreatorComponents.Toolbar />
					<PrefabCreatorComponents.Modals />
					{activeAssetInput && <PrefabCreatorComponents.Overlay />}
				</>
			</Layout.Center>
		</div>
	) : (
		<Layout.Center className="relative w-full h-full flex gap-1" style={{ background: COLORS.BG_DARK }}>
			<PrefabCreatorComponents.WelcomePage />
		</Layout.Center>
	);
};

export default PrefabCreator;
