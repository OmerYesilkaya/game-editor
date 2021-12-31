enum AnimationPriority {
	DEFAULT,
	ATTACK,
	HIT_AND_UNCANCELLABLE,
	DEATH,
}

enum AnimationTransitionType {
	LOOP,
	FREEZE,
	DESTROY,
}

export { AnimationPriority, AnimationTransitionType };
