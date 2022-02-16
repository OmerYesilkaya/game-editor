import cn from "classnames";

type CenterProps = {
	className?: string;
	[key: string]: any;
};

const Center: React.FC<CenterProps> = ({ className, children, ...restProps }) => {
	return (
		<div className={cn("flex items-center justify-center", className)} {...restProps}>
			{children}
		</div>
	);
};

export default Center;
