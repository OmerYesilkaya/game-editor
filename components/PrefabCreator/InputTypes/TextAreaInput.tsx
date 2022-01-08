import { useFormContext, useWatch } from "react-hook-form";

const MAX_CHAR_LENGTH = 300;

type Props = {
	moduleId: number;
};

const TextAreaInput: React.FC<Props> = ({ moduleId }) => {
	const { register, control } = useFormContext();
	const watchValue = useWatch({ name: `${moduleId}`, control });

	return (
		<div className="flex flex-col items-end">
			<textarea
				className="w-full text-white rounded-sm px-1 bg-zinc-700 shadow-md border border-zinc-200"
				rows={3}
				maxLength={MAX_CHAR_LENGTH}
				{...register(moduleId.toString())}
			/>
			<span className="text-xs font-light text-zinc-400">
				{watchValue?.length ?? 0}/{MAX_CHAR_LENGTH}
			</span>
		</div>
	);
};

export default TextAreaInput;
