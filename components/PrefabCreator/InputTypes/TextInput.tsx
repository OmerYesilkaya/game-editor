const MAX_CHAR_LENGTH = 50;

type Props = {
	moduleId: number;
	prefabId: string;
};

const TextInput: React.FC<Props> = ({ moduleId, prefabId }) => {
	return (
		<div className="flex flex-col items-end">
			<input className="w-full text-white rounded-sm px-1 bg-zinc-700 shadow-md border border-zinc-200" maxLength={MAX_CHAR_LENGTH} />
			<span className="text-xs font-light text-zinc-400">
				{0 ?? 0}/{MAX_CHAR_LENGTH}
			</span>
		</div>
	);
};

export default TextInput;
