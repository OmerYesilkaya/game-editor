import { useEffect, useState } from "react";

import { CubeTransparentIcon, ViewGridAddIcon } from "@heroicons/react/outline";
import { useFormContext } from "react-hook-form";

import { usePrefabStore } from "@app/store";
import { Prefab } from "@app/types";
import ModuleItem from "../ModuleItem";
import { api } from "@app/hooks";

const PrefabWindow: React.FC = () => {
	const { prefabs, activePrefabId } = usePrefabStore((state) => ({ activePrefabId: state.activePrefabId, prefabs: state.prefabs }));
	const [prefab, setPrefab] = useState<Prefab | null>(null);
	const { mutate } = api.usePostPrefab();

	const themeColor = "rose";

	useEffect(() => {
		const activePrefab = prefabs.find((prefab) => prefab.internalId === activePrefabId);
		if (!activePrefab) return;
		setPrefab(activePrefab);
	}, [activePrefabId]);

	const methods = useFormContext();
	const { handleSubmit } = methods;

	function onSubmit(data: any) {
		if (!prefab) return;

		const formattedData = {
			name: prefab.name,
			modules: Object.keys(data).map((id) => ({ arrayIndex: 0, modulePartId: Number(id), value: data[id] })),
		};

		console.log("f", formattedData);

		// mutate(formattedData);
	}

	return (
		<>
			{prefab ? (
				<div className="h-full w-full flex flex-col overflow-y-auto">
					<div className="flex flex-col h-full">
						<form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col">
							{prefab.modules.length > 0 ? (
								<div className="flex flex-col gap-y-1 mt-1">
									{prefab.modules.map((module) => (
										<ModuleItem themeColor={themeColor} key={module.id} moduleId={module.id} />
									))}
									<button
										type="submit"
										className="bg-rose-500 font-default text-white rounded-sm text-sm font-bold transition-all hover:bg-rose-600"
									>
										SAVE
									</button>
								</div>
							) : (
								<div className="text-white border-dashed border-2 mt-1 p-4 flex flex-col justify-center items-center font-default grow">
									<ViewGridAddIcon className="w-24 h-24" />
									<span className="text-2xl font-bold mb-2">{prefab.name} has no modules</span>
									<span className="w-2/3 text-center">Please add a module from the panel on the left</span>
								</div>
							)}
						</form>
					</div>
				</div>
			) : (
				<div className="border-dashed border-2 w-full h-full text-white font-default flex flex-col items-center justify-center">
					<CubeTransparentIcon className="w-24 h-24 mb-4" />
					<span className="text-2xl font-bold mb-2">No active prefab</span>
					<span className="w-2/3 text-center">Please select a prefab from the panel on the left</span>
				</div>
			)}
		</>
	);
};

export default PrefabWindow;
