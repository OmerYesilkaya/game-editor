import { Footer, Navbar } from "@app/components";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

const DefaultLayout: NextPage = ({ children }) => {
	const router = useRouter();
	const isInPrefabCreator = router.pathname === "/prefab-creator";
	return (
		<div className="flex flex-col h-screen background-pattern">
			{!isInPrefabCreator && <Navbar />}
			<main className="flex flex-auto overflow-y-auto">{children}</main>
			{!isInPrefabCreator && <Footer />}
		</div>
	);
};

export default DefaultLayout;
