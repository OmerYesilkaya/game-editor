import { Layout, PrefabCreator as PrefabCreatorComponents } from "@app/components";
import { COLORS, WINDOWS } from "@app/constants";
import { api } from "@app/hooks";
import { useCanvasStore, useInputStore, usePrefabStore } from "@app/store";
import { GetPrefabResponse, Prefab } from "@app/types";
import { array as arrayUtils, moduleUtils } from "@app/utils";
import { NextPage } from "next";
import { useEffect } from "react";
import Split from "react-split";
import { v4 as uuid } from "uuid";

function convertPrefabResponse(prefabResponse: GetPrefabResponse): Prefab {
	return { ...prefabResponse, internalId: uuid(), children: prefabResponse.children.map((child) => convertPrefabResponse(child)) };
}

const PrefabCreator: NextPage = () => {
	const { prefab, activePrefabId, setPrefab } = usePrefabStore((state) => ({
		prefab: state.prefab,
		activePrefabId: state.activePrefabId,
		setPrefab: state.setPrefab,
	}));
	const { activeAssetInput, activeWindowIds, toggleActivation, genericWindowData, activateWindow, deactivateWindow } = useCanvasStore((state) => ({
		activeWindowIds: state.activeWindowIds,
		toggleActivation: state.toggleActivation,
		activeAssetInput: state.activeAssetInput,
		genericWindowData: state.genericWindowData,
		activateWindow: state.activateWindow,
		deactivateWindow: state.deactivateWindow,
	}));
	const setInputs = useInputStore((state) => state.setActivePrefabInputs);

	const { refetch } = api.useGetPrefabById({
		params: { id: activePrefabId! },
		enabled: !!Number(activePrefabId),
		onSuccess: (data: GetPrefabResponse) => {
			setPrefab(convertPrefabResponse(data));
			setInputs(moduleUtils.getModuleInputs(data.modules));
		},
	});

	useEffect(() => {
		if (!Number(activePrefabId)) return;
		refetch();
	}, [activePrefabId]);

	useEffect(() => {
		if (!activePrefabId) {
			deactivateWindow("toolbar-active-prefab");
		} else {
			activateWindow("toolbar-active-prefab");
		}
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
						gutter={(_, direction) => {
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
					<PrefabCreatorComponents.GenericAssetWindow />
					{(activeAssetInput || genericWindowData.assets.length > 0) && <PrefabCreatorComponents.Overlay />}
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
