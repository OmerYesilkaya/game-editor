const seconds = 1000;
const framesPerSecond = 24;

const baseAnimationSpeed = seconds / framesPerSecond;
const animationSpeeds = [
	{ value: baseAnimationSpeed * 4, label: "0.25X" },
	{ value: baseAnimationSpeed * 2, label: "0.5X" },
	{ value: baseAnimationSpeed, label: "1X" },
	{ value: baseAnimationSpeed / 1.25, label: "1.25X" },
	{ value: baseAnimationSpeed / 1.5, label: "1.5X" },
];

export default animationSpeeds;
