import MOCK_ASSETS from "constants/MOCK_ASSETS";
import Ability from "./Ability";

const Abilities: React.FC = () => {
	return (
		<div className="card-primary flex-col h-full">
			<p className="sub-header-primary">Abilities</p>
			<div className="flex flex-col mt-1 h-full overflow-y-auto">
				{MOCK_ASSETS.ABILITIES.map((_, index: number) => (
					<Ability key={index} index={index} />
				))}
			</div>
		</div>
	);
};

export default Abilities;
