import { CubeTransparentIcon, ViewGridAddIcon } from "@heroicons/react/outline";

import { Prefab } from "@app/types";

import ModuleItem from "../../ModuleItem";

type Props = {
	prefab: Prefab | null;
};

const ActiveModules: React.FC<Props> = ({ prefab }) => {
	const themeColor = "rose";

	return (
		<>
			{prefab ? (
				<div className="flex flex-col grow mt-1 max-h-[342px] overflow-y-auto">
					{prefab.modules.length > 0 ? (
						<div className="flex flex-col gap-y-0.5 ">
							{prefab.modules.map((module) => (
								<ModuleItem themeColor={themeColor} key={module.id} moduleId={module.id} prefabId={prefab.internalId} />
							))}
						</div>
					) : (
						<div className="text-white text-center border-dashed border-2 p-4 flex flex-col justify-center items-center font-default grow">
							<ViewGridAddIcon className="w-24 h-24" />
							<span className="text-2xl font-bold mb-2">{prefab.name} has no modules</span>
							<span className="w-2/3 text-center">Please add a module from the panel on the left</span>
						</div>
					)}
				</div>
			) : (
				<div className="border-dashed border-2 w-full h-full text-white font-default flex flex-col items-center justify-center mt-1">
					<CubeTransparentIcon className="w-24 h-24 mb-4" />
					<span className="text-2xl font-bold mb-2">No active prefab</span>
					<span className="w-2/3 text-center">Please select a prefab from the panel on the left</span>
				</div>
			)}
		</>
	);
};

export default ActiveModules;
