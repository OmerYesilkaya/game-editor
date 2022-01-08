import { useFormContext } from "react-hook-form";

type Props = {
	moduleId: number;
};

const Vec4Input: React.FC<Props> = ({ moduleId }) => {
	const { register } = useFormContext();

	return (
		<div className="grid grid-cols-2 gap-x-1 items-center w-full gap-y-1">
			<div className="flex w-full">
				<span className="w-6">X:</span>
				<input
					type="number"
					className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1"
					{...register(`${moduleId}.x`)}
				/>
			</div>
			<div className="flex w-full">
				<span className="w-6">Y:</span>
				<input
					type="number"
					className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1"
					{...register(`${moduleId}.y`)}
				/>
			</div>
			<div className="flex w-full">
				<span className="w-6">Z:</span>
				<input
					type="number"
					className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1"
					{...register(`${moduleId}.z`)}
				/>
			</div>
			<div className="flex w-full">
				<span className="w-6">W:</span>
				<input
					type="number"
					className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1"
					{...register(`${moduleId}.w`)}
				/>
			</div>
		</div>
	);
};

export default Vec4Input;
