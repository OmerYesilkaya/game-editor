import MOCK_ASSETS from "constants/MOCK_ASSETS";
import { AbilityType } from "types/ability";
import Ability from "./Ability";

const Label: React.FC = ({ children }) => {
	return <div className="w-full row-span-1 px-2 font-black bg-gray-300 border-4 border-white rounded-md shadow-md">{children}</div>;
};

const Abilities: React.FC = () => {
	return (
		<div className="flex flex-col mt-2 card-primary">
			<div className="w-full sub-header-primary">Abilities</div>
			<div className="grid gap-1 mt-2" style={{ gridTemplateColumns: "48px repeat(6, 1fr)", gridTemplateRows: "32px repeat(6, 1fr)" }}>
				<div className="w-12 h-8 bg-gray-800 border-4 border-white rounded-md shadow-md" />
				<Label>ENERGY</Label>
				<Label>POWER</Label>
				<Label>MASTERY</Label>
				<Label>SPEED</Label>
				<Label>CDR</Label>
				<Label>HASTE</Label>
				{MOCK_ASSETS.ABILITIES.map((ability: AbilityType, index: number) => (
					<Ability key={index} ability={ability} />
				))}
			</div>
		</div>
	);
};

export default Abilities;
