const Header: React.FC = ({ children }) => {
	return (
		<div className="relative flex-col px-4 py-2 text-2xl font-bold text-gray-100 rounded-md navbar-pattern h-min font-default">{children}</div>
	);
};

export default Header;
