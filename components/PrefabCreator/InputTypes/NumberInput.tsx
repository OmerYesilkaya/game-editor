import { useEffect, useState } from "react";

import { useInputStore } from "@app/store";
import { useDebounce } from "@app/hooks";

type Props = {
	moduleId: number;
	defaultValue: string;
};

const Number: React.FC<Props> = ({ moduleId, defaultValue }) => {
	const { updateInput } = useInputStore((state) => ({ updateInput: state.updateInput }));
	const [value, setValue] = useState(defaultValue);
	const { debouncedValue } = useDebounce(value, 300);

	useEffect(() => {
		updateInput(moduleId, debouncedValue);
	}, [debouncedValue]);

	return (
		<input
			type="number"
			className="w-full text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200"
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
};

export default Number;
