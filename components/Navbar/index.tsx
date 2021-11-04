import Logo from "./Logo";

const Navbar: React.FC = () => {
	return (
		<div className="flex items-center p-6 w-full text-white bg-purple-500 shadow-lg">
			<Logo />
		</div>
	);
};

export default Navbar;
