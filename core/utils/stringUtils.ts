function capitalize(value: string) {
	return value
		.split(" ")
		.map((word) => `${word[0].toUpperCase()}${word.slice(1, word.length)}`)
		.join(" ");
}

function formatCamelCase(value: string) {
	return value.split(/(?=[A-Z])/).join(" ");
}

export default { capitalize, formatCamelCase };
