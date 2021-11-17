import { useRef } from "react";

type InputWithIconTypeProps = {
	icon: (props: React.ComponentProps<"svg">) => JSX.Element;
	label: string;
};

const InputWithIcon: React.FC<InputWithIconTypeProps> = ({ label, icon: Icon }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className="flex items-center justify-center w-full mt-1 card-secondary h-14">
			<div className="flex items-center justify-center w-8 h-8 p-1 text-gray-800 bg-gray-100 rounded-md shadow-md">
				<Icon width={20} height={20} />
			</div>
			<input className="w-11/12 px-2 py-1 ml-1 rounded-md shadow-md" ref={inputRef} placeholder={label} type="number" />
		</div>
	);
};

export default InputWithIcon;
