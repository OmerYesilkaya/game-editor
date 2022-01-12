import { SetStateAction, useEffect, useRef } from "react";

type EditableTextPropTypes = {
	value: string;
	onChange: (value: string) => void;
	handleNameBlur: () => void;
	placeholder: string;
	isEditable: boolean;
	setIsEditable: React.Dispatch<SetStateAction<boolean>>;
};

const EditableText: React.FC<EditableTextPropTypes> = ({ value, placeholder, onChange, handleNameBlur, isEditable, setIsEditable }) => {
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
		<div className="h-8 flex items-center justify-between  pr-0.5 rounded-sm">
			{isEditable ? (
				<input
					ref={inputRef}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					autoFocus
					spellCheck={false}
					onBlur={() => {
						setIsEditable(false);
						handleNameBlur();
					}}
					className="font-bold text-white bg-zinc-900 h-7 w-full capitalize mr-1 pl-1"
					placeholder={placeholder}
				/>
			) : (
				<span className="font-bold text-white capitalize w-full pl-1">{value ?? placeholder}</span>
			)}
		</div>
	);
};

export default EditableText;
