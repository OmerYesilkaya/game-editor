import { Common, Character as CharacterComponents } from "@app/components";

const EditCharacter = () => {
	return (
		<div className="flex justify-center w-full h-full">
			<div className="flex-col w-full p-4 m-4 overflow-y-auto rounded-md card-secondary">
				<Common.Header>Tankart</Common.Header>
				<CharacterComponents.Edit.Stats />
				<CharacterComponents.Edit.Abilities />
			</div>
		</div>
	);
};

export default EditCharacter;
