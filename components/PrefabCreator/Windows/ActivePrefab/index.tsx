import { useEffect, useRef, useState } from "react";

import { PencilIcon } from "@heroicons/react/outline";
import uniqId from "uniqId";

import { api } from "@app/hooks";
import { usePrefabStore } from "@app/store";
import { GetPrefabResponse } from "@app/types";

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

	api.useGetPrefabById({
		params: { id: activePrefabId! },
		enabled: !!activePrefabId,
		onSuccess: (data: GetPrefabResponse) => {
			setPrefab({ ...data, internalId: uniqId(), position: { x: 0, y: 0 } });
		},
	});

	const { mutate } = api.usePostPrefab();

	const [isEditable, setIsEditable] = useState(false);
	const [name, setName] = useState<string>();
	const nameRef = useRef<HTMLInputElement>(null);

	function handleNameBlur() {
		setIsEditable(false);
		if (!name) return;
		setPrefabName(name);
	}

	function onSubmit() {
		if (!prefab) return;

		const formattedData = {
			name: prefab.name,
			modules: prefab.modules.map((module) => ({ arrayIndex: 0, modulePartId: module.id, value: module.value })),
		};

		console.log("f", formattedData);

		// mutate(formattedData);
	}

	useEffect(() => {
		function handleEnter(e: KeyboardEvent) {
			if (!nameRef.current) return;
			if (nameRef.current === document.activeElement && e.key === "Enter") {
				nameRef.current.blur();
			}
		}
		window.addEventListener("keydown", handleEnter);
		return () => window.removeEventListener("keydown", handleEnter);
	}, []);

	useEffect(() => {}, [activePrefabId]);

	return (
		<div className="w-full flex h-[400px]">
			<div className="flex flex-col h-full w-full">
				<div className="flex items-center justify-between w-full font-default h-7 py-0.5 mt-0.5 mb-0.5 p-0.5 bg-zinc-800 rounded-sm">
					{prefab ? (
						<div className=" bg-zinc-900 w-1/3 h-6 flex items-center justify-between pl-1 pr-0.5 rounded-sm">
							{isEditable ? (
								<input
									ref={nameRef}
									value={name}
									onChange={(e) => setName(e.target.value)}
									autoFocus
									onBlur={() => handleNameBlur()}
									className="font-bold text-white bg-zinc-900 h-5 w-full mr-1 capitalize"
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
						onClick={onSubmit}
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
