import InputWithIcon from "@components/Common/Editable";
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
import { Stat } from "types/character";

const stats = [
	{ label: Stat.Health, icon: HeartIcon },
	{ label: Stat.Shield, icon: CubeTransparentIcon },
	{ label: Stat.Armor, icon: ShieldExclamationIcon },
	{ label: Stat.Energy, icon: LightBulbIcon },
	{ label: Stat.Power, icon: LightningBoltIcon },
	{ label: Stat.Mastery, icon: EyeIcon },
	{ label: Stat.Speed, icon: ChevronDoubleRightIcon },
	{ label: Stat.CDR, icon: ClockIcon },
	{ label: Stat.Haste, icon: FireIcon },
	{ label: Stat.TurnRate, icon: RefreshIcon },
];

const Stats: React.FC = () => {
	return (
		<div>
			<div className="card-primary flex flex-col w-96">
				<div className="sub-header-primary flex mb-2 w-full">Stats</div>
				{Object.keys(MOCK_ASSETS.PLAYER).map((stat, index: number) => {
					return <InputWithIcon key={index} icon={stats[index].icon} label={stats[index].label} />;
				})}
			</div>
		</div>
	);
};

export default Stats;
