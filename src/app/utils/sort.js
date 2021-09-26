export const sortArrayOfObjects = (objs, sortBy = null, ascending = true) =>
	sortBy
		? objs.sort((a, b) => ascending && a[sortBy].localeCompare(b[sortBy]))
		: objs;
