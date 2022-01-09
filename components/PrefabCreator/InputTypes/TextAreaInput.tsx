const MAX_CHAR_LENGTH = 300;

type Props = {
	moduleId: number;
	prefabId: string;
};

const TextAreaInput: React.FC<Props> = ({ moduleId, prefabId }) => {
	return (
		<div className="flex flex-col items-end">
			<textarea
				className="w-full text-white rounded-sm px-1 bg-zinc-700 shadow-md border border-zinc-200"
				rows={3}
				maxLength={MAX_CHAR_LENGTH}
			/>
			<span className="text-xs font-light text-zinc-400">
				{0 ?? 0}/{MAX_CHAR_LENGTH}
			</span>
		</div>
	);
};

export default TextAreaInput;
