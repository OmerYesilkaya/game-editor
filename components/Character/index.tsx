import Abilities from "./Abilities";
import Animations from "./Animations";
import Description from "./Description";
import Header from "./Header";
import Stats from "./Stats";

const Character: React.FC = () => {
	return (
		<div className="flex justify-between w-full">
			<div className="flex-col max-w-md p-4 m-4 rounded-md card-secondary">
				<Header />
				<Description />
				<Animations />
			</div>
			<div className="w-full p-2 my-4 card-secondary">
				<Abilities />
			</div>
			<div className="p-4 m-4 card-secondary">
				<Stats />
			</div>
		</div>
	);
};

export default Character;
