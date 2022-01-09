type Props = {
	moduleId: number;
	prefabId: string;
};

const Number: React.FC<Props> = ({ moduleId, prefabId }) => {
	return <input type="number" className="w-full text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200" />;
};

export default Number;
