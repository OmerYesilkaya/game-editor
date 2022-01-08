import { useFormContext } from "react-hook-form";

type Props = {
	moduleId: number;
};

const Number: React.FC<Props> = ({ moduleId }) => {
	const { register } = useFormContext();

	return (
		<input
			type="number"
			className="w-full text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200"
			{...register(moduleId.toString())}
		/>
	);
};

export default Number;
