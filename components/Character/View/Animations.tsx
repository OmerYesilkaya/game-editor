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
			<div className="flex-col card-primary">
				<p className="sub-header-primary">Animations</p>
				<select className="w-full pl-1 mt-2 rounded-sm shadow-sm">
					<option>Idle</option>
					<option>Walk</option>
					<option>Attack</option>
				</select>
				<div className="relative my-2 card-secondary">
					<AnimationPlayer texture={Player} width={250} height={250} />
					<button
						className="absolute w-12 px-1 py-0 text-sm text-blue-500 transition-colors bg-gray-100 rounded-md shadow-md right-1 top-1 active:bg-gray-200"
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
