import { Common } from "@app/components";
import { usePrefabStore } from "@app/store";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

import ModuleItem from "./ModuleItem";

type ActivePrefabProps = {
	prefab?: any;
};

const ActivePrefab: React.FC<ActivePrefabProps> = ({ prefab }) => {
	const { moduleIds } = usePrefabStore((state) => ({
		moduleIds: state.moduleIds,
	}));

	return (
		<>
			<Common.Header id="drag-handle" className="rounded-sm px-2 py-0 text-lg">
				Enemy Boar
			</Common.Header>
			{moduleIds.length > 0 ? (
				<div className="flex flex-col gap-y-1 mt-1">
					{moduleIds.map((id) => (
						<ModuleItem key={id} moduleId={id} />
					))}
				</div>
			) : (
				<div className="text-white font-bold border-dashed border-2 mt-1 p-4 text-sm flex flex-col justify-center items-center">
					<ExclamationCircleIcon className="w-10 h-10" />
					<span className="w-2/3 text-center">Please add a module from the panel on the right</span>
				</div>
			)}
		</>
	);
};

export default ActivePrefab;
