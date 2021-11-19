import { Header } from "@components/Character/Common";
import { Abilities, Animations, Description, Stats, Upgrades } from "@components/Character/View";

const ViewCharacter = () => {
	return (
		<div className="flex justify-center">
			<div className="flex justify-between w-full h-full ">
				<div className="flex-col w-1/4 p-4 m-4 overflow-y-auto rounded-md card-secondary">
					<Header />
					<Stats />
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
		</div>
	);
};

export default ViewCharacter;
