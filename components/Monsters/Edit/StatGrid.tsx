import { ExclamationIcon } from "@heroicons/react/outline";
import { MonsterType } from "types/monster";
import MOCK_DATA from "constants/MOCK_ASSETS";
import { Fragment } from "react";

type StatGridPropTypes = {
	selectedTags: string[];
	filteredMonsters: MonsterType[];
};

const StatGrid: React.FC<StatGridPropTypes> = ({ selectedTags, filteredMonsters }) => {
	const monsters = selectedTags.length === 0 ? MOCK_DATA.MONSTERS : filteredMonsters;
	return (
		<div
			className="grid gap-1 p-1 mt-2 bg-gray-200 rounded-sm"
			style={{ gridTemplateColumns: `150px ${selectedTags.length === 0 ? "" : `repeat(${selectedTags.length}, 1fr)`}` }}
		>
			{monsters.length === 0 ? (
				<div className={`flex items-center col-span-${selectedTags.length < 1 ? 2 : "full"} grid-cell`}>
					<ExclamationIcon width={20} height={20} className="mr-1" />
					<p className="mb-0.5">Could not find any monsters with given tags.</p>
				</div>
			) : (
				<>
					<div className="col-start-1 row-start-1" />
					{selectedTags.map((tag, index) => (
						<div key={`tag-${index}`} className="row-start-1 grid-cell">
							{tag.toUpperCase()}
						</div>
					))}
					{monsters.map((monster) => {
						return (
							<Fragment key={monster.id}>
								<div className="col-start-1 grid-cell">{monster.name.toUpperCase()}</div>
								{selectedTags.map((tag, index) => (
									<input
										type="number"
										key={`input-${index}`}
										className="w-full px-1 font-black rounded-sm font-input"
										style={{ lineHeight: "0" }}
										placeholder={tag}
										defaultValue={monster.stats.find((stat) => stat.name.toUpperCase() === tag.toUpperCase())?.value}
									/>
								))}
							</Fragment>
						);
					})}
				</>
			)}
		</div>
	);
};

export default StatGrid;
