import { useRef } from "react";

type InputWithIconTypeProps = {
	icon: (props: React.ComponentProps<"svg">) => JSX.Element;
	label: string;
};

const InputWithIcon: React.FC<InputWithIconTypeProps> = ({ label, icon: Icon }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className="card-secondary flex items-center justify-center mt-1 w-full h-14">
			<div className="flex items-center justify-center p-1 w-8 h-8 text-gray-800 bg-gray-100 rounded-md shadow-md">
				<Icon width={20} height={20} />
			</div>
			<input className="ml-1 px-2 py-1 w-11/12 rounded-md shadow-md" ref={inputRef} placeholder={label} type="number" />
		</div>
	);
};

export default InputWithIcon;
