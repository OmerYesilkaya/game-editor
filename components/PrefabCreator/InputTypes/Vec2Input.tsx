const Vec2Input: React.FC = () => {
	return (
		<div className="flex justify-between items-center w-full">
			<div className="flex w-full">
				<span>X:</span>
				<input type="number" className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1" />
			</div>
			<div className="flex w-full ml-1">
				<span>Y:</span>
				<input type="number" className="w-full h-6  text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200 ml-1" />
			</div>
		</div>
	);
};

export default Vec2Input;
