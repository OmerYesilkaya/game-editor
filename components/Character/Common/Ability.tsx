import { ChevronDoubleRightIcon, EyeIcon, LightBulbIcon, LightningBoltIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { AbilityType } from "types/ability";

type AbilityPropTypes = {
	ability: AbilityType; // later this will be Ability
};

type AbilityIconTypeProps = {
	icon: JSX.Element;
};

const AbilityIcon: React.FC<AbilityIconTypeProps> = ({ icon }) => {
	// TODO(omer): give styles according to mastery enum

	return <div className="w-12 h-12 p-1 m-1 ml-0 text-blue-500 bg-gray-100 border-2 border-blue-500 rounded-md shadow-md">{icon}</div>;
};

const Ability: React.FC<AbilityPropTypes> = ({ ability }) => {
	return (
		<div className="flex mt-2">
			<div className="flex flex-col items-start w-full card-secondary">
				<div className="flex w-full">
					<div className="relative ability min-h-20 w-52 h-52 sm:w-20 sm:h-20" style={{ minWidth: "80px" }}>
						<Image src={ability.icon} layout="fill" objectFit="contain" alt="place-holder-item-image" />
					</div>
					<div className="flex flex-col w-full h-full px-2">
						<div className="flex self-start w-full sub-header-primary">{ability.name}</div>
						<div className="flex h-full">
							{/* ability.masteries.map.... */}
							<AbilityIcon icon={<LightBulbIcon height="100%" />} />
							<AbilityIcon icon={<EyeIcon height="100%" />} />
							<AbilityIcon icon={<ChevronDoubleRightIcon height="100%" />} />
							<AbilityIcon icon={<LightningBoltIcon height="100%" />} />
						</div>
					</div>
				</div>
				<div className="mt-1 font-semibold text-gray-100 font-default">
					Voluptate duis sunt proident anim officia ex. Magna officia sit adipisicing occaecat in nostrud consectetur. Esse ipsum anim
					incididunt est id labore eiusmod nostrud.
				</div>
			</div>
		</div>
	);
};

export default Ability;
