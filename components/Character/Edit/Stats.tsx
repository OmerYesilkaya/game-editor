import { Common } from "@app/components";
import {
	ClockIcon,
	CubeTransparentIcon,
	EyeIcon,
	FireIcon,
	HeartIcon,
	LightBulbIcon,
	LightningBoltIcon,
	RefreshIcon,
	ShieldExclamationIcon,
} from "@heroicons/react/outline";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import MOCK_ASSETS from "constants/MOCK_ASSETS";

const stats = [
	{ label: "unknown", icon: HeartIcon },
	{ label: "unknown", icon: CubeTransparentIcon },
	{ label: "unknown", icon: ShieldExclamationIcon },
	{ label: "unknown", icon: LightBulbIcon },
	{ label: "unknown", icon: LightningBoltIcon },
	{ label: "unknown", icon: EyeIcon },
	{ label: "unknown", icon: ChevronDoubleRightIcon },
	{ label: "unknown", icon: ClockIcon },
	{ label: "unknown", icon: FireIcon },
	{ label: "unknown", icon: RefreshIcon },
];

const Stats: React.FC = () => {
	return (
		<div className="flex flex-col mt-2 card-primary">
			<div className="flex w-full mb-2 sub-header-primary">Stats</div>
			<div className="grid grid-cols-5 gap-2">
				{Object.keys(MOCK_ASSETS.PLAYER).map((stat, index: number) => {
					return <Common.InputWithIcon key={index} icon={stats[index].icon} label={stats[index].label} />;
				})}
			</div>
		</div>
	);
};

export default Stats;
