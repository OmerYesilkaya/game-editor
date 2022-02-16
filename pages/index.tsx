import type { NextPage } from "next";

import { AdjustmentsIcon, CubeTransparentIcon } from "@heroicons/react/outline";

import Core from "@core/components";

const Home: NextPage = () => {
	return (
		<Core.Center className="w-full h-full flex-col gap-4 text-white">
			<Core.Center className="w-full h-full">
				<div className="flex gap-x-2">
					<Core.MenuItem title="Balance Master" icon={<AdjustmentsIcon className="w-full h-full text-zinc-200" />} url="/balance-master" />
					<Core.MenuItem
						title="Prefab Creator"
						icon={<CubeTransparentIcon className="w-full h-full text-zinc-200" />}
						url="/prefab-editor"
					/>
				</div>
			</Core.Center>
		</Core.Center>
	);
};

export default Home;
