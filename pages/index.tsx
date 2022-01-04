import type { NextPage } from "next";

import { Layout, Common } from "@app/components";

import { AdjustmentsIcon, CubeTransparentIcon } from "@heroicons/react/outline";

const Home: NextPage = () => {
	return (
		<Layout.Center className="w-full h-full flex-col gap-4 text-white">
			<Layout.Center className="w-full h-full">
				<div className="flex gap-x-2">
					<Common.MenuItem
						title="Balance Master"
						icon={<AdjustmentsIcon className="w-full h-full text-zinc-200" />}
						url="/balance-master"
					/>
					<Common.MenuItem
						title="Prefab Creator"
						icon={<CubeTransparentIcon className="w-full h-full text-zinc-200" />}
						url="/prefab-creator"
					/>
				</div>
			</Layout.Center>
		</Layout.Center>
	);
};

export default Home;
