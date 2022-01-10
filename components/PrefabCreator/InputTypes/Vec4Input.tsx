import { useEffect, useState } from "react";

import { useInputStore } from "@app/store";
import { useDebounce } from "@app/hooks";

type Props = {
	moduleId: number;
	defaultValue: { x: number; y: number; z: number; w: number };
};

const Vec4Input: React.FC<Props> = ({ moduleId, defaultValue }) => {
	const { updateInput } = useInputStore((state) => ({ updateInput: state.updateInput }));
	const [value, setValue] = useState(defaultValue);
	const { debouncedValue } = useDebounce(value, 300);

	useEffect(() => {
		updateInput(moduleId, debouncedValue);
	}, [debouncedValue]);

	return (
		<div className="grid grid-cols-2 gap-x-1 items-center w-full gap-y-1">
			<div className="flex w-full">
				<span className="w-6">X:</span>
				<input
					type="number"
					className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1"
					value={value.x}
					onChange={(e) => setValue((prev) => ({ ...prev, x: parseInt(e.target.value) }))}
				/>
			</div>
			<div className="flex w-full">
				<span className="w-6">Y:</span>
				<input
					type="number"
					className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1"
					value={value.y}
					onChange={(e) => setValue((prev) => ({ ...prev, y: parseInt(e.target.value) }))}
				/>
			</div>
			<div className="flex w-full">
				<span className="w-6">Z:</span>
				<input
					type="number"
					className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1"
					value={value.z}
					onChange={(e) => setValue((prev) => ({ ...prev, z: parseInt(e.target.value) }))}
				/>
			</div>
			<div className="flex w-full">
				<span className="w-6">W:</span>
				<input
					type="number"
					className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1"
					value={value.w}
					onChange={(e) => setValue((prev) => ({ ...prev, w: parseInt(e.target.value) }))}
				/>
			</div>
		</div>
	);
};

export default Vec4Input;
