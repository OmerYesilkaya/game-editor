import { useState } from "react";

const MAX_CHAR_LENGTH = 50;

const TextInput: React.FC = () => {
	const [value, setValue] = useState("");
	return (
		<div className="flex flex-col items-end">
			<input
				className="w-full text-white rounded-sm px-1 bg-zinc-700 shadow-md border border-zinc-200"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				maxLength={MAX_CHAR_LENGTH}
			/>
			<span className="text-xs font-light text-zinc-400">
				{value.length}/{MAX_CHAR_LENGTH}
			</span>
		</div>
	);
};

export default TextInput;
