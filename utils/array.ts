function onlyUniques<T>(value: T, index: number, self: T[]) {
	return self.indexOf(value) === index;
}

export default { onlyUniques };
