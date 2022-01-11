import { useEffect, useState } from "react";

import { useInputStore } from "@app/store";
import { useDebounce } from "@app/hooks";

type Props = {
	moduleId: number;
	defaultValue: number;
};

const PercentageInput: React.FC<Props> = ({ moduleId, defaultValue }) => {
	const { updateInput } = useInputStore((state) => ({ updateInput: state.updateInput }));
	const [value, setValue] = useState(defaultValue);
	const { debouncedValue } = useDebounce(value, 300);

	useEffect(() => {
		updateInput(moduleId, debouncedValue);
	}, [debouncedValue]);

	return (
		<div className="flex items-center justify-between w-full">
			<input value={value} type="range" min={0} max={1} step={0.01} onChange={(e) => setValue(parseFloat(e.target.value))} />
			<span className="text-sm">{`${Math.floor((value ?? 0) * 100)}%`}</span>
		</div>
	);
};

export default PercentageInput;
