import Abilities from "./Abilities";
import Animations from "./Animations";
import BaseStats from "./BaseStats";
import Description from "./Description";
import Header from "./Header";
import Upgrades from "./Upgrades";

const Character: React.FC = () => {
	return (
		<div className="flex justify-between w-full h-full ">
			<div className="flex-col w-1/4 p-4 m-4 overflow-y-auto rounded-md card-secondary">
				<Header />
				<BaseStats />
				<Description />
				<Animations />
			</div>
			<div className="w-1/2 p-2 my-4 overflow-y-auto card-secondary">
				<Abilities />
			</div>
			<div className="w-1/4 p-4 m-4 overflow-y-auto card-secondary">
				<Upgrades />
			</div>
		</div>
	);
};

export default Character;
