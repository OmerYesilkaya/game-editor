import MOCK_ASSETS from "constants/MOCK_ASSETS";
import item from "public/assets/svgs/item.svg";
import { useEffect, useRef } from "react";
import Image from "next/image";

type AbilityPropTypes = {
	index: number;
};

const Ability: React.FC<AbilityPropTypes> = ({ index }) => {
	const abilityIconRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const descriptionContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current || !abilityIconRef.current || !descriptionContainerRef.current) return;
		const optimalHeight = containerRef.current.getBoundingClientRect().height;
		abilityIconRef.current.style.width = `${optimalHeight}px`;
		abilityIconRef.current.style.minWidth = `${optimalHeight}px`;

		// TODO(omer)add dependency of abilities when abilities are gotten from an api
	}, [abilityIconRef.current?.style.height]);

	return (
		<div ref={containerRef} className={`flex mt-2 h-1/${MOCK_ASSETS.ABILITIES.length}`}>
			<div ref={abilityIconRef} className={`ability relative h-full`}>
				<Image src={item} layout="fill" objectFit="contain" alt="place-holder-item-image" />
			</div>
			<div className="card-secondary flex flex-col items-start ml-2 w-full">
				<div className="sub-header-primary flex self-start">{MOCK_ASSETS.ABILITIES[index]}</div>
				<div ref={descriptionContainerRef} className="flex overflow-y-auto">
					<div className="text-gray-100 font-text font-semibold">
						Cupidatat proident ex quis nostrud deserunt mollit aliqua. Aliqua minim ut ut eiusmod incididunt dolor quis cillum eiusmod
					</div>
					<div className="text-gray-100 font-text font-semibold">
						Cupidatat proident ex quis nostrud deserunt mollit aliqua. Aliqua minim ut ut eiusmod incididunt dolor quis cillum eiusmod
					</div>
				</div>
			</div>
		</div>
	);
};

export default Ability;
