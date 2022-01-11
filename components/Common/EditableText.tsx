import { useEffect, useRef, useState } from "react";
import { PencilIcon } from "@heroicons/react/outline";

type EditableTextPropTypes = {
	value: string;
	onChange: (value: string) => void;
	handleNameBlur: () => void;
	placeholder: string;
};

const EditableText: React.FC<EditableTextPropTypes> = ({ value, placeholder, onChange, handleNameBlur }) => {
	const [isEditable, setIsEditable] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		function handleEnter(e: KeyboardEvent) {
			if (!inputRef.current) return;
			if (inputRef.current === document.activeElement && e.key === "Enter") {
				inputRef.current.blur();
			}
		}
		window.addEventListener("keydown", handleEnter);
		return () => window.removeEventListener("keydown", handleEnter);
	}, []);

	return (
		<div className=" bg-zinc-900 w-1/3 h-6 flex items-center justify-between pl-1 pr-0.5 rounded-sm">
			{isEditable ? (
				<input
					ref={inputRef}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					autoFocus
					onBlur={() => {
						setIsEditable(false);
						handleNameBlur();
					}}
					className="font-bold text-white bg-zinc-900 h-5 w-full mr-1 capitalize"
					placeholder={placeholder}
				/>
			) : (
				<span className="font-bold text-white capitalize">{value ?? placeholder}</span>
			)}
			<button
				className="hover:brightness-75 rounded-sm min-w-[20px] w-5 h-5 shadow-md bg-zinc-700 p-px transition-all"
				onClick={() => (isEditable ? setIsEditable(false) : setIsEditable(true))}
			>
				<PencilIcon className="text-white" />
			</button>
		</div>
	);
};

export default EditableText;
