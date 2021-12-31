import { Common, Character as CharacterComponents } from "@app/components";

const ViewCharacter = () => {
	return (
		<div className="flex justify-center">
			<div className="flex justify-between w-full h-full ">
				<div className="flex-col w-1/4 p-4 m-4 overflow-y-auto rounded-md card-secondary">
					<Common.Header>Tankart</Common.Header>
					<CharacterComponents.View.Stats />
					<CharacterComponents.View.Description />
					<CharacterComponents.View.Animations />
				</div>
				<div className="w-1/2 p-2 my-4 overflow-y-auto card-secondary">
					<CharacterComponents.View.Abilities />
				</div>
				<div className="w-1/4 p-4 m-4 overflow-y-auto card-secondary">
					<CharacterComponents.View.Upgrades />
				</div>
			</div>
		</div>
	);
};

export default ViewCharacter;
