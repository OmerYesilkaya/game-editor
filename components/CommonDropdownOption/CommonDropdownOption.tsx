import { HTMLAttributes } from "react";

import cn from "classnames";

type Props = {
    icon: JSX.Element;
    label: string;
    shortcut?: string;
} & HTMLAttributes<HTMLButtonElement>;

const DropdownOption: React.FC<Props> = ({ className, icon, label, shortcut, ...restProps }) => {
    return (
        <button
            {...restProps}
            className={cn(
                "bg-slate-200 px-2 transition hover:bg-slate-300 w-full h-8 flex items-center justify-between cursor-pointer font-normal",
                className
            )}
        >
            <div className="flex items-center">
                {icon}
                <span className="ml-2">{label}</span>
            </div>
            {shortcut && <p className="text-xs font-bold text-gray-400">{shortcut.toUpperCase()}</p>}
        </button>
    );
};

export default DropdownOption;
