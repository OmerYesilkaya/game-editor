import AvailableModules from "./AvailableModules";
import ActiveModules from "./ActiveModules";

const PrefabWindow: React.FC = () => {
	return (
		<div className="w-full flex h-[400px]">
			<div className="flex flex-col h-full w-full">
				<div className="flex h-full mt-0.5 ">
					<div className="flex flex-col w-full h-full ">
						<div className="flex flex-col grow max-h-full">
							<div className="max-h-full overflow-y-auto">
								<AvailableModules />
							</div>
						</div>
					</div>
					<div className="h-full w-1 rounded-full bg-zinc-400 flex mx-1" />
					<div className="h-full w-full flex grow flex-col ">
						<ActiveModules />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrefabWindow;
