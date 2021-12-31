import icon from "public/assets/svgs/skill1.svg";
import Image from "next/image";
import { KeyIcon, RefreshIcon } from "@heroicons/react/outline";
import { useState } from "react";

type Upgrade = {
	name: string;
	icon: string;
	active: boolean;
};

type SkillTreeType = {
	[key: string]: Upgrade[];
};

const skillTree: SkillTreeType = {
	levelOne: [
		{ name: "upgrade1", icon: icon, active: false },
		{ name: "upgrade2", icon: icon, active: false },
		{ name: "upgrade3", icon: icon, active: false },
	],
	levelTwo: [
		{ name: "upgrade4", icon: icon, active: false },
		{ name: "upgrade5", icon: icon, active: false },
	],
	levelThree: [
		{ name: "upgrade6", icon: icon, active: false },
		{ name: "upgrade7", icon: icon, active: false },
		{ name: "upgrade8", icon: icon, active: false },
		{ name: "upgrade9", icon: icon, active: false },
	],
	levelFour: [
		{ name: "upgrade10", icon: icon, active: false },
		{ name: "upgrade11", icon: icon, active: false },
		{ name: "upgrade12", icon: icon, active: false },
	],
	levelFive: [
		{ name: "upgrade13", icon: icon, active: false },
		{ name: "upgrade14", icon: icon, active: false },
	],
	levelSix: [
		{ name: "upgrade15", icon: icon, active: false },
		{ name: "upgrade16", icon: icon, active: false },
		{ name: "upgrade17", icon: icon, active: false },
		{ name: "upgrade18  ", icon: icon, active: false },
	],
	levelSeven: [
		{ name: "upgrade19", icon: icon, active: false },
		{ name: "upgrade20", icon: icon, active: false },
	],
};

const SkillTree: React.FC = () => {
	const [skillTreeState, setSkillTreeState] = useState(skillTree);

	function handleClick(level: string, upgradeName: string) {
		setSkillTreeState((prev) => {
			const result = prev[level].map((upgrade) => {
				if (upgrade.name === upgradeName) {
					return { ...upgrade, active: !upgrade.active };
				} else {
					return upgrade;
				}
			});
			return { ...prev, [level]: result };
		});
	}

	return (
		<div className="flex flex-col card-primary">
			<p className="sub-header-primary">Skill Tree</p>
			<div className="p-4 mt-2 bg-gray-800 rounded-md shadow-md ">
				{Object.keys(skillTreeState).map((level, index) => (
					<div key={index} className="relative flex justify-center">
						<div className="absolute z-10 px-2 text-sm font-semibold text-white bg-yellow-500 rounded-sm shadow-md -left-8">
							LVL {index}
						</div>
						<div className={`grid grid-cols-${skillTreeState[level].length} gap-10 my-4 place-items-center w-4/5`}>
							{skillTreeState[level].map((upgrade, index) => (
								<div
									key={index}
									className={`relative w-16 h-16 transition-all brightness-${
										upgrade.active ? 100 : 50
									} cursor-pointer ability hover:brightness-150`}
									onClick={() => handleClick(level, upgrade.name)}
								>
									<Image src={upgrade.icon} alt={upgrade.name} objectFit="contain" layout="fill" />
								</div>
							))}
						</div>
					</div>
				))}
			</div>
			<div className="flex mt-1">
				<button className="p-1 text-white transition-all bg-yellow-600 rounded-md shadow-md brightness-105 active:brightness-75">
					<RefreshIcon width={20} height={20} />
				</button>
				<button className="p-1 ml-1 text-white transition-all bg-emerald-600 rounded-md shadow-md brightness-105 active:brightness-75">
					<KeyIcon width={20} height={20} />
				</button>
			</div>
		</div>
	);
};

export default SkillTree;
