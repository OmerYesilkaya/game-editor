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

enum StatusEffect {
	None = 0 << 0,
	Burning = 1 << 0,
	Poisoned = 1 << 1,
	Chilled = 1 << 2,
	Frozen = 1 << 3,
	Stunned = 1 << 4,
	HitFreeze = 1 << 5,
	Interrupted = HitFreeze | Stunned,
	ActionDisabling = HitFreeze | Stunned | Frozen,
	All = 0xff,
}

export { AnimationPriority, AnimationTransitionType, StatusEffect };
