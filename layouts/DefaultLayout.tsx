import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import { NextPage } from "next";

const DefaultLayout: NextPage = ({ children }) => {
	return (
		<div className="flex flex-col h-screen bg-blue-900 background-pattern">
			<Navbar />
			<main className="flex flex-auto overflow-y-auto">{children}</main>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
