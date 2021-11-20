import { NextPage } from "next";
import MOCK_DATA from "constants/MOCK_ASSETS";

const EditMonsters: NextPage = () => {
	return (
		<div className="flex flex-col w-full p-2">
			<div className=" card-primary">tag system</div>
			<div className="flex flex-col gap-2 mt-2 card-secondary">
				{MOCK_DATA.MONSTERS.map((monster) => {
					return (
						<div key={monster.id} className="card-primary">
							{monster.name}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default EditMonsters;
