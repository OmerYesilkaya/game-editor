import { useState } from "react";

const BoolInput: React.FC = () => {
	const [isChecked, setIsChecked] = useState(false);

	function toggleIsChecked() {
		setIsChecked((prev) => !prev);
	}

	return (
		<div className="w-full h-full flex items-center">
			<input className="w-4 h-4" type="checkbox" checked={isChecked} onChange={toggleIsChecked} />
		</div>
	);
};

export default BoolInput;
