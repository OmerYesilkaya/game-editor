import { ChipIcon, EyeIcon, MapIcon, MoonIcon, SunIcon } from "@heroicons/react/outline";

enum UpgradeType {
	Legendary,
	Mythical,
	Magic,
	Common,
}

const dummyUpgrades = [
	{ name: "Legendary Upgrade #1", type: UpgradeType.Legendary },
	{ name: "Legendary Upgrade #2", type: UpgradeType.Legendary },
	{ name: "Legendary Upgrade #3", type: UpgradeType.Legendary },
	{ name: "Legendary Upgrade #4", type: UpgradeType.Legendary },
	{ name: "Mythical Upgrade #1", type: UpgradeType.Mythical },
	{ name: "Mythical Upgrade #2", type: UpgradeType.Mythical },
	{ name: "Mythical Upgrade #3", type: UpgradeType.Mythical },
	{ name: "Mythical Upgrade #4", type: UpgradeType.Mythical },
	{ name: "Mythical Upgrade #5", type: UpgradeType.Mythical },
	{ name: "Mythical Upgrade #6", type: UpgradeType.Mythical },
	{ name: "Magic Upgrade #1", type: UpgradeType.Magic },
	{ name: "Magic Upgrade #2", type: UpgradeType.Magic },
	{ name: "Magic Upgrade #3", type: UpgradeType.Magic },
	{ name: "Magic Upgrade #4", type: UpgradeType.Magic },
	{ name: "Magic Upgrade #5", type: UpgradeType.Magic },
	{ name: "Magic Upgrade #6", type: UpgradeType.Magic },
	{ name: "Magic Upgrade #7", type: UpgradeType.Magic },
	{ name: "Magic Upgrade #8", type: UpgradeType.Magic },
	{ name: "Magic Upgrade #9", type: UpgradeType.Magic },
	{ name: "Common Upgrade #1", type: UpgradeType.Common },
	{ name: "Common Upgrade #2", type: UpgradeType.Common },
	{ name: "Common Upgrade #3", type: UpgradeType.Common },
	{ name: "Common Upgrade #4", type: UpgradeType.Common },
	{ name: "Common Upgrade #5", type: UpgradeType.Common },
	{ name: "Common Upgrade #6", type: UpgradeType.Common },
	{ name: "Common Upgrade #7", type: UpgradeType.Common },
	{ name: "Common Upgrade #8", type: UpgradeType.Common },
	{ name: "Common Upgrade #9", type: UpgradeType.Common },
	{ name: "Common Upgrade #10", type: UpgradeType.Common },
];

const RarityLookUp = {
	[UpgradeType.Legendary]: { bg: "amber-800", border: "amber-300", text: "white", icon: <ChipIcon /> },
	[UpgradeType.Mythical]: { bg: "violet-900", border: "violet-500", text: "gray-100", icon: <EyeIcon /> },
	[UpgradeType.Magic]: { bg: "blue-700", border: "blue-300", text: "gray-200", icon: <MoonIcon /> },
	[UpgradeType.Common]: { bg: "gray-600", border: "gray-50", text: "gray-200", icon: <MapIcon /> },
};

const Upgrades: React.FC = () => {
	return (
		<div className="flex flex-col card-primary">
			<p className="sub-header-primary">Upgrades</p>
			<div className="flex flex-col gap-1.5 mt-1 card-secondary">
				{dummyUpgrades.map((upgrade, index) => (
					<div
						key={index}
						className={`
          bg-${RarityLookUp[upgrade.type].bg}
          text-${RarityLookUp[upgrade.type].text}
          border-${RarityLookUp[upgrade.type].border}
          border-4  rounded-sm px-1 flex items-center  shadow-md h-10`}
					>
						<div className={`w-6 h-6 bg-${RarityLookUp[upgrade.type].border} rounded-sm`}>{RarityLookUp[upgrade.type].icon}</div>
						<p className="ml-2 font-bold">{upgrade.name.toUpperCase()}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Upgrades;
