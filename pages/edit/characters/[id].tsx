import { Header } from "@components/Character/Common";
import { Stats, Abilities } from "@components/Character/Edit";

const EditCharacter = () => {
	return (
		<div className="flex justify-center w-full h-full">
			<div className="flex-col w-full p-4 m-4 overflow-y-auto rounded-md card-secondary">
				<Header />
				<Stats />
				<Abilities />
			</div>
		</div>
	);
};

export default EditCharacter;
