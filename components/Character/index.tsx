import Abilities from "./Abilities";
import Animations from "./Animations";
import Description from "./Description";
import Header from "./Header";
import Stats from "./Stats";

const Character: React.FC = () => {
	return (
		<div className="flex justify-between w-full">
			<div className="card-secondary flex-col m-4 p-4 max-w-md rounded-md">
				<Header />
				<Description />
				<Animations />
			</div>
			<div className="card-secondary flex-col my-4 p-2 w-full">
				<Abilities />
			</div>
			<div className="card-secondary m-4 p-4">
				<Stats />
			</div>
		</div>
	);
};

export default Character;
