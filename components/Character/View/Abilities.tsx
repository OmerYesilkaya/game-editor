import MOCK_ASSETS from "constants/MOCK_ASSETS";
import { AbilityType } from "types/ability";
import Ability from "../Common/Ability";

const Abilities: React.FC = () => {
	return (
		<div className="card-primary">
			<p className="sub-header-primary">Abilities</p>
			<div className="flex-col mt-1">
				{MOCK_ASSETS.ABILITIES.map((ability: AbilityType, index: number) => (
					<Ability key={index} ability={ability} />
				))}
			</div>
		</div>
	);
};

export default Abilities;
