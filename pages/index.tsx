import Link from "next/link";
import type { NextPage } from "next";

import { PencilAltIcon, EyeIcon } from "@heroicons/react/outline";

import { Layout } from "@app/components";

const Home: NextPage = () => {
	return (
		<Layout.Center className="w-full h-full flex-col gap-4">
			<h2 className="font-default font-bold text-4xl text-white">RogueChampions Editor</h2>
			<div className="flex w-full justify-center gap-2 select-none">
				<a href="/edit" className="w-1/5 h-32">
					<Layout.Center className="menu-card-primary w-full h-full">
						<div className="flex items-center">
							<h2 className="font-default font-bold text-3xl">Edit</h2>
							<PencilAltIcon className="w-8 h-8 ml-2" />
						</div>
					</Layout.Center>
				</a>
				<a href="/view" className="w-1/5 h-32">
					<Layout.Center className="menu-card-primary w-full h-full">
						<h2 className="font-default font-bold text-3xl">View</h2>
						<EyeIcon className="w-8 h-8 ml-2" />
					</Layout.Center>
				</a>
			</div>
		</Layout.Center>
	);
};

export default Home;
