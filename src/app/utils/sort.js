export const sortArrayOfObjects = (objs, sortBy = null, ascending = true) =>
	sortBy
		? ascending
			? objs.sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
			: objs.sort((a, b) => a[sortBy].localeCompare(b[sortBy])).reverse()
		: objs;

export const reverseSortArrayOfObjectsByFloat = (objs, sortBy = null) =>
	objs
		.slice()
		.sort((a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
		.reverse();
