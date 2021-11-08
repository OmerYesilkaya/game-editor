import Navbar from "@components/Navbar";
import { NextPage } from "next";

const DefaultLayout: NextPage = ({ children }) => {
	return (
		<div className="background-pattern flex flex-col w-screen h-screen bg-blue-900">
			<Navbar />
			<main className="flex flex-grow">{children}</main>
			{/* <Footer /> */}
		</div>
	);
};

export default DefaultLayout;
