import { useState } from "react";

const Number: React.FC = () => {
	const [value, setValue] = useState<number>(0);

	return (
		<input
			type="number"
			className="w-full text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200"
			value={value}
			onChange={(e) => setValue(parseInt(e.target.value))}
		/>
	);
};

export default Number;
