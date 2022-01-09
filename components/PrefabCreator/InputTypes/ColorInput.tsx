type Props = {
	moduleId: number;
	prefabId: string;
};

const ColorInput: React.FC<Props> = ({ moduleId, prefabId }) => {
	return <input className="px-0.5 rounded-sm bg-zinc-800 border w-full" type="color" />;
};

export default ColorInput;
