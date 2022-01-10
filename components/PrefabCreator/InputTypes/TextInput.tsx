import { useEffect, useState } from "react";

import { useInputStore } from "@app/store";
import { useDebounce } from "@app/hooks";

const MAX_CHAR_LENGTH = 50;

type Props = {
	moduleId: number;
	defaultValue: string;
};

const TextInput: React.FC<Props> = ({ moduleId, defaultValue }) => {
	const { updateInput } = useInputStore((state) => ({ updateInput: state.updateInput }));
	const [value, setValue] = useState(defaultValue);
	const { debouncedValue } = useDebounce(value, 300);

	useEffect(() => {
		updateInput(moduleId, debouncedValue);
	}, [debouncedValue]);

	return (
		<div className="flex flex-col items-end">
			<input
				className="w-full text-white rounded-sm px-1 bg-zinc-700 shadow-md border border-zinc-200"
				maxLength={MAX_CHAR_LENGTH}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<span className="text-xs font-light text-zinc-400">
				{0 ?? 0}/{MAX_CHAR_LENGTH}
			</span>
		</div>
	);
};

export default TextInput;
