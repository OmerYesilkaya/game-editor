import { useFormContext, useWatch } from "react-hook-form";

type Props = {
	moduleId: number;
};

const PercentageInput: React.FC<Props> = ({ moduleId }) => {
	const { register, control } = useFormContext();
	const watchValue = useWatch({ name: moduleId.toString(), control, defaultValue: 0 });

	return (
		<div className="flex items-center">
			<input {...register(`${moduleId.toString()}`)} type="range" min={0} max={1} step={0.01} defaultValue={0} />
			<span className="ml-1">{`${Math.floor((watchValue ?? 0) * 100)}%`}</span>
		</div>
	);
};

export default PercentageInput;
