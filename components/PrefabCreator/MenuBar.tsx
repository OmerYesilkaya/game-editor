import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";

import cn from "classnames";
import { CubeTransparentIcon, FolderOpenIcon, MenuAlt2Icon, SaveAsIcon, SaveIcon } from "@heroicons/react/outline";
import { usePrefabStore } from "store/usePrefabStore";

const Selection: React.FC<HTMLAttributes<HTMLButtonElement>> = ({ children, ...restProps }) => {
	return (
		<button
			{...restProps}
			className={cn("bg-slate-200 px-2 transition hover:bg-slate-300 h-8 flex items-center cursor-pointer font-normal", restProps.className)}
		>
			{children}
		</button>
	);
};

const MenuBar: React.FC = () => {
	const prefab = usePrefabStore((state) => state.prefab);
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = document.getElementById("react-flow-container");
		function handleOutsideClick(e: MouseEvent) {
			const isOutsideMenu = e.target === menuRef.current || menuRef.current?.contains(e.target as Node);
			if (isOutsideMenu) return;
			setIsOpen(false);
		}

		element?.addEventListener("click", handleOutsideClick);
		window.addEventListener("mousedown", handleOutsideClick);

		return () => {
			element?.removeEventListener("click", handleOutsideClick);
			window.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	return (
		<div className="absolute top-0 w-screen z-[20]">
			<div className="flex items-center font-default font-light w-full bg-slate-100 text-sm h-5 shadow-md justify-between">
				<button onClick={() => setIsOpen((prev) => !prev)} className="bg-inherit transition hover:brightness-90 cursor-pointer px-2">
					<MenuAlt2Icon className="w-5 h-5" />
				</button>
				<Transition
					show={isOpen}
					ref={menuRef}
					as="div"
					className="absolute top-5 flex flex-col rounded-b-sm overflow-hidden w-48"
					enter="transition-opacity duration-150"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Selection onClick={() => console.log("Saved")}>
						<SaveIcon className="w-4 h-4" />
						<span className="ml-2">Save</span>
					</Selection>
					<Selection onClick={() => console.log("Saved as")}>
						<SaveAsIcon className="w-4 h-4" />
						<span className="ml-2">Save as...</span>
					</Selection>
					<Selection onClick={() => console.log("Created")}>
						<CubeTransparentIcon className="w-4 h-4" /> <span className="ml-2">Create New</span>
					</Selection>
					<Selection onClick={() => console.log("Opened")}>
						<FolderOpenIcon className="w-4 h-4" /> <span className="ml-2">Open</span>
					</Selection>
				</Transition>
				<div>{prefab?.name ? prefab.name : "Prefab Creator"}</div>
				<div className="invisible w-9" />
			</div>
		</div>
	);
};

export default MenuBar;