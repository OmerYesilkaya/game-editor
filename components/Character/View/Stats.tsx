import MOCK_ASSETS from "constants/MOCK_ASSETS";

const Stats: React.FC = () => {
	return (
		<div className="flex flex-col mt-2 card-primary">
			<p className="sub-header-primary">Base Stats</p>
			<div className="grid grid-cols-2 gap-2 mt-2">
				{Object.keys(MOCK_ASSETS.PLAYER).map((stat, index) => (
					<div key={index} className="flex items-center text-white card-secondary">
						<p>{stat}</p>
						<p className="w-5/12 px-2 ml-auto text-lg font-bold text-black bg-gray-100 rounded-sm">{MOCK_ASSETS.PLAYER[stat]}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Stats;
