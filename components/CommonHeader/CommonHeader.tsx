import cn from "classnames";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

const Header: React.FC<Props> = ({ id, className, children, ...restProps }) => {
    return (
        <div
            id={id}
            className={cn("relative flex-col px-4 py-2 text-2xl font-bold text-gray-100 rounded-md navbar-pattern font-default shadow-lg", className)}
            {...restProps}
        >
            {children}
        </div>
    );
};

export default Header;
