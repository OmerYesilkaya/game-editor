import AnimationPlayer from "@components/Common/AnimationPlayer";
import animationSpeeds from "constants/baseAnimationSpeed";
import Player from "public/assets/images/Player.png";
import { useAnimationStore } from "store/useAnimationStore";

const Animations = () => {
	const { speedIndex, nextAnimationSpeed } = useAnimationStore((state) => ({
		speedIndex: state.speedIndex,
		nextAnimationSpeed: state.nextAnimationSpeed,
	}));

	return (
		<div className="mt-2">
			<div className="card-primary flex-col">
				<p className="sub-header-primary">Animations</p>
				<select className="mt-2 pl-1 rounded-sm shadow-sm">
					<option>Idle</option>
					<option>Walk</option>
					<option>Attack</option>
				</select>
				<div className="card-secondary relative my-2">
					<AnimationPlayer texture={Player} width={250} height={250} />
					<button
						className="absolute right-1 top-1 px-1 py-0 w-12 text-blue-500 text-sm bg-gray-100 active:bg-gray-200 rounded-md shadow-md transition-colors"
						onClick={() => nextAnimationSpeed()}
					>
						{animationSpeeds[speedIndex].label}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Animations;
