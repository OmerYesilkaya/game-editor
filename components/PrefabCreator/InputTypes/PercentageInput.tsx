type Props = {
	moduleId: number;
	prefabId: string;
};

const PercentageInput: React.FC<Props> = ({ moduleId, prefabId }) => {
	return (
		<div className="flex items-center">
			<input value={0} type="range" min={0} max={1} step={0.01} defaultValue={0} />
			<span className="ml-1">{`${Math.floor((0 ?? 0) * 100)}%`}</span>
		</div>
	);
};

export default PercentageInput;
