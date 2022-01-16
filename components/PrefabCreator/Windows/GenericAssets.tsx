import { useCanvasStore } from "@app/store";
import { ModuleValueType } from "@app/types";

import Window from "../Window";

const GenericAssets: React.FC = () => {
	const genericWindowData = useCanvasStore((state) => state.genericWindowData);

	function handleSelect(id: number) {
		console.log("selected ", id);
	}

	function getName() {
		let result;
		switch (genericWindowData.type) {
			case ModuleValueType.ItemPool:
				result = "Item Pools";
				break;
			case ModuleValueType.Material:
				result = "Materials";
				break;
			case ModuleValueType.MaterialAnimation:
				result = "Material Animations";
				break;
			case ModuleValueType.ParticleSystem:
				result = "Partical Systems";
				break;
			case ModuleValueType.Prefab:
				result = "Prefabs";
				break;
			case ModuleValueType.TrailSystem:
				result = "Trail Systems";
				break;
			default:
				break;
		}
		return result;
	}

	return (
		<Window
			id="toolbar-file-select"
			width={400}
			height={320}
			order={6}
			title={<>{getName()}</>}
			isActive={genericWindowData.assets.length > 0}
			noContent={null}
		>
			<div className="flex flex-col gap-y-px">
				{genericWindowData.assets.map((data) => (
					<button
						type="button"
						key={data.id}
						className="flex px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
						title={data.name}
						onClick={() => handleSelect(data.id)}
					>
						{data.name}
					</button>
				))}
			</div>
		</Window>
	);
};

export default GenericAssets;
