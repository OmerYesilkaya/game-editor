import { Common, Layout } from "@app/components";

// aseprite exports
import monster from "public/assets/svgs/monsters.svg";
import item from "public/assets/svgs/items.svg";
import character from "public/assets/svgs/characters2.svg";
import perk from "public/assets/svgs/perks.svg";
// TODO(omer): Update aseprite exports to be the same size e.g. 16x16px / 32x32px

import type { NextPage } from "next";

const View: NextPage = () => {
	return (
		<Layout.Center>
			<div className="flex flex-col items-center">
				<p className="flex justify-center w-full mb-4 text-4xl font-bold card-primary font-text" style={{ background: "white" }}>
					View
				</p>
				<Layout.Grid row={2} col={2}>
					<Common.MenuItem title="Monsters" image={monster} url="/view/monsters" />
					<Common.MenuItem title="Items" image={item} />
					<Common.MenuItem title="Characters" image={character} url="/view/characters" />
					<Common.MenuItem title="Perks" image={perk} />
				</Layout.Grid>
			</div>
		</Layout.Center>
	);
};

export default View;
