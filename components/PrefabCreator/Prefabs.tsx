import { Common } from "@app/components";

type PrefabsProps = {
	x?: any;
};

const Prefabs: React.FC<PrefabsProps> = ({ x }) => {
	return (
		<div className="w-2/3 h-full p-2 my-4 overflow-y-auto card-secondary">
			<Common.Header>Prefabs</Common.Header>
		</div>
	);
};

export default Prefabs;
