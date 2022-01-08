import { useFormContext } from "react-hook-form";

type Props = {
	moduleId: number;
};

const ColorInput: React.FC<Props> = ({ moduleId }) => {
	const { register } = useFormContext();

	return <input className="px-0.5 rounded-sm bg-zinc-800 border w-full" type="color" {...register(moduleId.toString())} defaultValue="#ffffff" />;
};

export default ColorInput;
