export const capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const sentenceFromCamelCase = (word) =>
	capitalizeFirstLetter(word)
		.match(/[A-Z][a-z]+|[0-9]+/g)
		.join(' ');
