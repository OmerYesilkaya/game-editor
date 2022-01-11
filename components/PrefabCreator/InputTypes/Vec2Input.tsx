import { useEffect, useState } from "react";

import { useInputStore } from "@app/store";
import { useDebounce } from "@app/hooks";

type Props = {
	moduleId: number;
	defaultValue: { x: string; y: string };
};

const Vec2Input: React.FC<Props> = ({ moduleId, defaultValue }) => {
	const { updateInput } = useInputStore((state) => ({ updateInput: state.updateInput }));
	const [value, setValue] = useState(defaultValue);
	const { debouncedValue } = useDebounce(value, 300);

	useEffect(() => {
		updateInput(moduleId, debouncedValue);
	}, [debouncedValue]);

	return (
		<div className="flex justify-between items-center w-full">
			<div className="flex w-full">
				<span>X:</span>
				<input
					type="number"
					className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1"
					value={value.x}
					onChange={(e) => setValue((prev) => ({ ...prev, x: e.target.value }))}
				/>
			</div>
			<div className="flex w-full ml-1">
				<span>Y:</span>
				<input
					type="number"
					className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1"
					value={value.y}
					onChange={(e) => setValue((prev) => ({ ...prev, y: e.target.value }))}
				/>
			</div>
		</div>
	);
};

export default Vec2Input;
