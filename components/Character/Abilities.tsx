import MOCK_ASSETS from "constants/MOCK_ASSETS";
import Ability from "./Ability";

const Abilities: React.FC = () => {
	return (
		<div className="card-primary">
			<p className="sub-header-primary">Abilities</p>
			<div className="flex-col flex-auto min-h-0 mt-1 overflow-y-auto">
				{MOCK_ASSETS.ABILITIES.map((ability: string, index: number) => (
					<Ability key={index} ability={ability} />
				))}
			</div>
		</div>
	);
};

export default Abilities;
