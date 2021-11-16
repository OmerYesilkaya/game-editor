import item from "public/assets/svgs/item.svg";
import Image from "next/image";

type AbilityPropTypes = {
	ability: string; // later this will be Ability
};

const Ability: React.FC<AbilityPropTypes> = ({ ability }) => {
	return (
		<div className="flex mt-2">
			<div className="flex flex-col items-start w-full card-secondary">
				<div className="flex w-full">
					<div className="relative ability w-52 h-52 sm:w-20 sm:h-20">
						<Image src={item} layout="fill" objectFit="contain" alt="place-holder-item-image" />
					</div>
					<div className="flex flex-grow">
						<div className="flex self-start flex-grow ml-2 sub-header-primary">{ability}</div>
					</div>
				</div>
				<div className="flex overflow-y-auto">
					<div className="font-semibold text-gray-100 font-default">
						Cupidatat proident ex quis nostrud deserunt mollit aliqua. Aliqua minim ut ut eiusmod incididunt dolor quis cillum eiusmod
					</div>
					<div className="font-semibold text-gray-100 font-default">
						Cupidatat proident ex quis nostrud deserunt mollit aliqua. Aliqua minim ut ut eiusmod incididunt dolor quis cillum eiusmod
					</div>
				</div>
			</div>
		</div>
	);
};

export default Ability;
