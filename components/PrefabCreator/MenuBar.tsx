import { Fragment, HTMLAttributes } from "react";
import { Menu, Transition } from "@headlessui/react";

import cn from "classnames";
import { CubeTransparentIcon, FolderOpenIcon, MenuAlt2Icon, SaveAsIcon, SaveIcon } from "@heroicons/react/outline";

const Selection: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...restProps }) => {
	return (
		<div
			{...restProps}
			className={cn("bg-slate-200 px-2 transition hover:bg-slate-300 h-8 flex items-center cursor-pointer font-normal", restProps.className)}
		>
			{children}
		</div>
	);
};

const MenuBar: React.FC = () => {
	return (
		<div className="absolute top-0 w-screen z-[20]">
			<Menu as="div" className="flex items-center font-default font-light w-full bg-slate-100 text-sm h-5 shadow-md">
				{({ open }) => (
					<>
						<Menu.Button className="bg-inherit transition hover:brightness-90 cursor-pointer px-2">
							<MenuAlt2Icon className="w-5 h-5" />
						</Menu.Button>
						<Transition
							show={open}
							as="div"
							className="absolute top-5"
							enter="transition-opacity duration-150"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity duration-150"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Menu.Items className="flex flex-col rounded-b-sm overflow-hidden w-48 ">
								<Menu.Item>
									<Selection>
										<SaveIcon className="w-4 h-4" />
										<span className="ml-2">Save</span>
									</Selection>
								</Menu.Item>
								<Menu.Item>
									<Selection>
										<SaveAsIcon className="w-4 h-4" />
										<span className="ml-2">Save as...</span>
									</Selection>
								</Menu.Item>
								<Menu.Item>
									<Selection>
										<CubeTransparentIcon className="w-4 h-4" /> <span className="ml-2">Create New</span>
									</Selection>
								</Menu.Item>
								<Menu.Item>
									<Selection>
										<FolderOpenIcon className="w-4 h-4" /> <span className="ml-2">Open</span>
									</Selection>
								</Menu.Item>
							</Menu.Items>
						</Transition>
					</>
				)}
			</Menu>
		</div>
	);
};

export default MenuBar;
