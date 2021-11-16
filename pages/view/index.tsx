// components
import MenuItem from "@components/Common/MenuItem";
import Center from "@components/Layout/Center";
import Grid from "@components/Layout/Grid";

// aseprite exports
import monster from "public/assets/svgs/monsters.svg";
import item from "public/assets/svgs/items.svg";
import character from "public/assets/svgs/characters2.svg";
import perk from "public/assets/svgs/perks.svg";
// TODO(omer): Update aseprite exports to be the same size e.g. 16x16px / 32x32px

import type { NextPage } from "next";

const View: NextPage = () => {
	return (
		<Center>
			<div className="flex flex-col items-center">
				<p className="flex justify-center w-full mb-4 text-4xl font-bold card-primary font-text" style={{ background: "white" }}>
					View
				</p>
				<Grid row={2} col={2}>
					<MenuItem title="Monsters" image={monster} url="/edit/monsters" />
					<MenuItem title="Items" image={item} />
					<MenuItem title="Characters" image={character} url="/edit/characters" />
					<MenuItem title="Perks" image={perk} />
				</Grid>
			</div>
		</Center>
	);
};

export default View;
