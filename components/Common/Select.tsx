import { HTMLAttributes, useEffect, useRef, useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/outline";

import cn from "classnames";
import { usePrefabStore } from "store/usePrefabStore";

type Option = {
	id: string;
	label: string;
	value: any;
};
type Props = {
	options: Option[];
	selectedValue: any | null;
	setSelectedValue: (id: string) => void;
	handlePointerEnter: (id: string) => void;
	handlePointerOut: () => void;
	optionClassName?: string;
};

const Select: React.FC<Props & HTMLAttributes<HTMLDivElement>> = ({
	options,
	selectedValue,
	setSelectedValue,
	handlePointerEnter,
	handlePointerOut,
	className,
	optionClassName,
	...restProps
}) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleOutsideClick(e: MouseEvent) {
			if (e.target === containerRef.current || containerRef.current?.contains(e.target as Node)) return;
			setIsDropdownOpen(false);
		}

		window.addEventListener("mousedown", handleOutsideClick);
		return () => window.removeEventListener("mousedown", handleOutsideClick);
	}, []);

	return (
		<div tabIndex={0} onBlur={() => setIsDropdownOpen(false)} ref={containerRef} className={cn("relative", className)} {...restProps}>
			<div onClick={() => setIsDropdownOpen((prev) => !prev)} className="flex relative">
				<span>{selectedValue ? options.find((option) => option.id === selectedValue.id)?.label : "Select..."}</span>
				<div className="absolute right-0 w-6 h-6 flex items-center justify-center">
					<ChevronDownIcon className="w-4 h-4" />
				</div>
			</div>
			{isDropdownOpen && (
				<div className="absolute top-7 bg-zinc-700 -translate-x-[5px] border rounded-sm flex flex-col items-start overflow-hidden w-[101%]">
					{options.map((option) => (
						<div
							className={cn(optionClassName, { "bg-zinc-600": option.id === selectedValue?.id })}
							key={option.id}
							onClick={() => {
								setSelectedValue(option.id);
								setIsDropdownOpen(false);
							}}
							onPointerEnter={() => handlePointerEnter(option.id)}
							onPointerOut={() => handlePointerOut()}
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Select;
