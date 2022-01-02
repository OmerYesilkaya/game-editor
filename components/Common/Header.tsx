import cn from "classnames";

type Props = {
	className?: string;
	[key: string]: any;
};

const Header: React.FC<Props> = ({ id, className, children }) => {
	return (
		<div
			id={id}
			className={cn("relative flex-col px-4 py-2 text-2xl font-bold text-gray-100 rounded-md navbar-pattern font-default shadow-lg", className)}
		>
			{children}
		</div>
	);
};

export default Header;
