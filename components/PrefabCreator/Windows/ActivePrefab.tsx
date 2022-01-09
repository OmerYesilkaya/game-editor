import { useEffect, useRef, useState } from "react";

import { CubeTransparentIcon, PencilIcon, ViewGridAddIcon } from "@heroicons/react/outline";
import { useFormContext } from "react-hook-form";

import { usePrefabStore } from "@app/store";
import { Prefab } from "@app/types";
import { api } from "@app/hooks";

import ModuleItem from "../ModuleItem";
import Modules from "./Modules";

const PrefabWindow: React.FC = () => {
	const { prefabs, activePrefabId } = usePrefabStore((state) => ({ activePrefabId: state.activePrefabId, prefabs: state.prefabs }));
	const [prefab, setPrefab] = useState<Prefab | null>(null);
	const [isEditable, setIsEditable] = useState(false);
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

	function handleNameBlur() {
		// set active prefab name
		setIsEditable(false);
	}

	return (
		<div className="w-full flex h-[406px]">
			<div className="flex flex-col h-full w-full">
				<div className="flex items-center justify-between w-full font-default h-7 py-0.5 mt-0.5 mb-0.5 p-0.5 bg-zinc-800 rounded-sm">
					{prefab ? (
						<div className=" bg-zinc-900 w-1/3 h-6 flex items-center justify-between pl-1 pr-0.5 rounded-sm">
							{isEditable ? (
								<input
									autoFocus
									onBlur={() => handleNameBlur()}
									className="font-bold text-white bg-zinc-900 h-5 w-full mr-1"
									placeholder={prefab.name}
								/>
							) : (
								<span className="font-bold text-white">{prefab.name}</span>
							)}
							<button
								className="hover:brightness-75 rounded-sm min-w-[20px] w-5 h-5 shadow-md bg-zinc-700 p-px transition-all"
								onClick={() => (isEditable ? setIsEditable(false) : setIsEditable(true))}
							>
								<PencilIcon className="text-white" />
							</button>
						</div>
					) : (
						<div className="invisible" />
					)}
					<button
						type="submit"
						className="bg-rose-500 h-full text-white rounded-sm text-sm font-bold transition-all hover:bg-rose-600 w-24"
					>
						SAVE
					</button>
				</div>
				<div className="flex h-full mt-0.5 ">
					<div className="flex flex-col w-full h-full ">
						<div className="flex flex-col grow max-h-full">
							<div className=" bg-zinc-100 w-full rounded-sm">
								<span className="ml-1 font-black uppercase font-default text-zinc-900">Available Modules</span>
							</div>
							<div className="max-h-[340px] overflow-y-auto">
								<Modules />
							</div>
						</div>
					</div>
					<div className="h-full w-1 rounded-full bg-zinc-400 flex mx-1" />
					<div className="h-full w-full flex grow flex-col ">
						<div className=" bg-zinc-100 w-full rounded-sm">
							<span className="ml-1 font-black uppercase font-default text-zinc-900">Active Modules</span>
						</div>
						{prefab ? (
							<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col grow  mt-1 max-h-[340px] overflow-y-auto">
								{prefab.modules.length > 0 ? (
									<div className="flex flex-col gap-y-0.5 ">
										{prefab.modules.map((module) => (
											<ModuleItem themeColor={themeColor} key={module.id} moduleId={module.id} />
										))}
									</div>
								) : (
									<div className="text-white text-center border-dashed border-2 p-4 flex flex-col justify-center items-center font-default grow">
										<ViewGridAddIcon className="w-24 h-24" />
										<span className="text-2xl font-bold mb-2">{prefab.name} has no modules</span>
										<span className="w-2/3 text-center">Please add a module from the panel on the left</span>
									</div>
								)}
							</form>
						) : (
							<div className="border-dashed border-2 w-full h-full text-white font-default flex flex-col items-center justify-center">
								<CubeTransparentIcon className="w-24 h-24 mb-4" />
								<span className="text-2xl font-bold mb-2">No active prefab</span>
								<span className="w-2/3 text-center">Please select a prefab from the panel on the left</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrefabWindow;
