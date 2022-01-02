import { useState } from "react";

const ColorInput: React.FC = () => {
	const [color, setColor] = useState<string>("#ffffff");

	return <input className="px-0.5 rounded-sm bg-zinc-800 border w-full" type="color" value={color} onChange={(e) => setColor(e.target.value)} />;
};

export default ColorInput;
