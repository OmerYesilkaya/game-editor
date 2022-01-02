const Vec4Input: React.FC = () => {
	return (
		<div className="grid grid-cols-2 gap-x-1 items-center w-full gap-y-1">
			<div className="flex w-full">
				<span className="w-6">X:</span>
				<input type="number" className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1" />
			</div>
			<div className="flex w-full">
				<span className="w-6">Y:</span>
				<input type="number" className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1" />
			</div>
			<div className="flex w-full">
				<span className="w-6">Z:</span>
				<input type="number" className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1" />
			</div>
			<div className="flex w-full">
				<span className="w-6">W:</span>
				<input type="number" className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1" />
			</div>
		</div>
	);
};

export default Vec4Input;
