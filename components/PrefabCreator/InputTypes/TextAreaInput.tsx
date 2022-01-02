import { useState } from "react";

const MAX_CHAR_LENGTH = 300;

const TextAreaInput: React.FC = () => {
	const [value, setValue] = useState("");
	return (
		<div className="flex flex-col items-end">
			<textarea
				className="w-full text-white rounded-sm px-1 bg-zinc-700 shadow-md border border-zinc-200"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				rows={3}
				maxLength={MAX_CHAR_LENGTH}
			/>
			<span className="text-xs font-light text-zinc-400">
				{value.length}/{MAX_CHAR_LENGTH}
			</span>
		</div>
	);
};

export default TextAreaInput;
