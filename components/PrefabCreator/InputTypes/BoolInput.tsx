type Props = {
	moduleId: number;
	prefabId: string;
};

const BoolInput: React.FC<Props> = ({ moduleId, prefabId }) => {
	return (
		<div className="w-full h-full flex items-center">
			<input className="w-4 h-4" type="checkbox" />
		</div>
	);
};

export default BoolInput;
