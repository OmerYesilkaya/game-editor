import { useEffect, useState } from "react";

import { v4 as uuid } from "uuid";

import { api } from "@app/hooks";
import { usePrefabStore, useInputStore } from "@app/store";
import { GetPrefabResponse } from "@app/types";
import { moduleUtils, stringUtils } from "@app/utils";
import { Common } from "@app/components";

import AvailableModules from "./AvailableModules";
import ActiveModules from "./ActiveModules";

const PrefabWindow: React.FC = () => {
	const {
		prefab,
		setName: setPrefabName,
		setPrefab,
		activePrefabId,
	} = usePrefabStore((state) => ({
		prefab: state.prefab,
		setPrefab: state.setPrefab,
		setName: state.setName,
		activePrefabId: state.activePrefabId,
	}));
	const { inputs, setInputs } = useInputStore((state) => ({ inputs: state.inputs, setInputs: state.setInputs }));

	const { refetch } = api.useGetPrefabById({
		params: { id: activePrefabId! },
		enabled: !!activePrefabId,
		onSuccess: (data: GetPrefabResponse) => {
			setPrefab({ ...data, internalId: uuid(), position: { x: 0, y: 0 } });
			setInputs(moduleUtils.getModuleInputs(data.modules));
		},
	});

	const { mutate } = api.usePostPrefab();

	const [name, setName] = useState<string>();

	function handleNameBlur() {
		if (!name) return;
		setPrefabName(stringUtils.capitalize(name));
	}

	function onSubmit() {
		if (!prefab) return;
		const formattedData = {
			name: prefab.name,
			modules: inputs.map((module) => ({ arrayIndex: 0, modulePartId: module.id, value: module.value })),
		};
		console.log("f", formattedData);

		// mutate(formattedData);
	}

	useEffect(() => {
		if (!activePrefabId) return;
		refetch();
	}, [activePrefabId]);

	return (
		<div className="w-full flex h-[400px]">
			<div className="flex flex-col h-full w-full">
				<div className="flex h-full mt-0.5 ">
					<div className="flex flex-col w-full h-full ">
						<div className="flex flex-col grow max-h-full">
							<div className=" bg-zinc-100 w-full rounded-sm">
								<span className="ml-1 font-black uppercase font-default text-zinc-900">Available Modules</span>
							</div>
							<div className="max-h-[342px] overflow-y-auto">
								<AvailableModules />
							</div>
						</div>
					</div>
					<div className="h-full w-1 rounded-full bg-zinc-400 flex mx-1" />
					<div className="h-full w-full flex grow flex-col ">
						<div className=" bg-zinc-100 w-full rounded-sm">
							<span className="ml-1 font-black uppercase font-default text-zinc-900">Active Modules</span>
						</div>
						<ActiveModules prefab={prefab} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrefabWindow;
