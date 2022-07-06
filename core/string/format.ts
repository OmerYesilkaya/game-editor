function capitalize(value: string) {
    return value
        .split(" ")
        .map((word) => `${word[0].toUpperCase()}${word.slice(1, word.length)}`)
        .join(" ");
}

function camelCase(value: string) {
    return value.split(/(?<=[a-z])(?=[A-Z])/).join(" ");
}

export default { capitalize, camelCase };
