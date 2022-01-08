import { useFormContext, useWatch } from "react-hook-form";

const MAX_CHAR_LENGTH = 50;

type Props = {
	moduleId: number;
};

const TextInput: React.FC<Props> = ({ moduleId }) => {
	const { register, control } = useFormContext();
	const watchValue = useWatch({ name: `${moduleId}`, control });

	return (
		<div className="flex flex-col items-end">
			<input
				className="w-full text-white rounded-sm px-1 bg-zinc-700 shadow-md border border-zinc-200"
				{...register(moduleId.toString())}
				maxLength={MAX_CHAR_LENGTH}
			/>
			<span className="text-xs font-light text-zinc-400">
				{watchValue?.length ?? 0}/{MAX_CHAR_LENGTH}
			</span>
		</div>
	);
};

export default TextInput;
