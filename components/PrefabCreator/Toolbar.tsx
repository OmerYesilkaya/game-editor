import cn from "classnames";
import { useCanvasStore } from "@app/store";
import { WINDOWS } from "@app/constants";

const Toolbar: React.FC = () => {
	const { activeWindowIds, toggleActivation } = useCanvasStore((state) => ({
		activeWindowIds: state.activeWindowIds,
		toggleActivation: state.toggleActivation,
	}));

	return (
		<div className="absolute bottom-5 left-5 flex items-center gap-x-2 z-[1002]">
			{WINDOWS.map((window) => {
				const isActive = activeWindowIds.includes(window.id);
				return (
					<button
						onClick={() => toggleActivation(window.id)}
						key={window.id}
						className={cn(
							"rounded-full w-12 h-12 bg-zinc-900 text-white p-1 cursor-pointer transition-all duration-75  hover:opacity-100",
							{
								"opacity-40": !isActive,
								"hover:brightness-150 opacity-90 border-4 border-white": isActive,
							}
						)}
						title={window.name}
					>
						{window.icon}
					</button>
				);
			})}
		</div>
	);
};

export default Toolbar;
