import { InputWithIcon } from "@components/Common";
import Image from "next/image";
import { AbilityType } from "types/ability";

type AbilityPropTypes = {
	ability: AbilityType; // later this will be Ability
};

type MasteryInputPropTypes = {
	skillFavored?: boolean;
};

const MasteryInput: React.FC<MasteryInputPropTypes> = ({ skillFavored }) => {
	return (
		<div className="flex flex-col justify-around">
			<input
				className="h-8 px-2 rounded-md shadow-md"
				type="number"
				style={{ marginBottom: skillFavored ? 0 : "auto", marginTop: skillFavored ? 0 : "2px" }}
			/>
			{skillFavored && <div className="h-2 bg-yellow-600 rounded-md shadow-md " />}
		</div>
	);
};

const Ability: React.FC<AbilityPropTypes> = ({ ability }) => {
	return (
		<>
			<div className="relative w-24 h-24 col-span-1 ability sm:w-12 sm:h-12" style={{ minWidth: "48px" }}>
				<Image src={ability.icon} layout="fill" objectFit="contain" alt="place-holder-item-image" />
			</div>
			<MasteryInput skillFavored={true} />
			<MasteryInput />
			<MasteryInput />
			<MasteryInput />
			<MasteryInput skillFavored={true} />
			<MasteryInput />
		</>
	);
};

{
	/* <div className="flex self-start w-full sub-header-primary">{ability.name}</div> */
}

export default Ability;
