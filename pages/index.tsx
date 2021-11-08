import MenuItem from "@components/MenuItem";
import Center from "@components/Layout/Center";
import Grid from "@components/Layout/Grid";
import monster from "public/assets/svgs/monster-image3.svg";
import item from "public/assets/svgs/item.svg";

import type { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<Center>
			<Grid row={2} col={2}>
				<MenuItem title="Enemies" image={monster} url="/enemies" />
				<MenuItem title="Items" image={item} />
				<MenuItem title="Characters" url="/characters" />
				<MenuItem title="Arenas" />
			</Grid>
		</Center>
	);
};

export default Home;
