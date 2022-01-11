function capitalize(value: string) {
	return value
		.split(" ")
		.map((word) => `${word[0].toUpperCase()}${word.slice(1, word.length)}`)
		.join(" ");
}

export default { capitalize };
