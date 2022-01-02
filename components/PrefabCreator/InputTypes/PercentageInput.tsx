import { useState } from "react";

const PercentageInput: React.FC = () => {
	const [value, setValue] = useState(0);

	return (
		<div className="flex items-center">
			<input type="range" min={0} max={100} value={value} onChange={(e) => setValue(parseInt(e.target.value))} />
			<span className="ml-1">{`${value}%`}</span>
		</div>
	);
};

export default PercentageInput;
