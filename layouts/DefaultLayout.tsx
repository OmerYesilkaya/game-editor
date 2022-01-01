import { Footer, Navbar } from "@app/components";
import { NextPage } from "next";

const DefaultLayout: NextPage = ({ children }) => {
	return (
		<div className="flex flex-col h-screen bg-slate-900 background-pattern">
			<Navbar />
			<main className="flex flex-auto overflow-y-auto">{children}</main>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
