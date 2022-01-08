import { useFormContext } from "react-hook-form";

type Props = {
	moduleId: number;
};

const BoolInput: React.FC<Props> = ({ moduleId }) => {
	const { register } = useFormContext();

	return (
		<div className="w-full h-full flex items-center">
			<input className="w-4 h-4" type="checkbox" {...register(moduleId.toString())} />
		</div>
	);
};

export default BoolInput;
