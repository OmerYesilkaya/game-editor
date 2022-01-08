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

enum AssetFileTypes {
	"animation",
	"sprite",
}

export { AnimationPriority, AnimationTransitionType, AssetFileTypes };
