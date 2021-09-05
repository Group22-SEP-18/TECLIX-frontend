export const sortArrayOfObjects = (objs, sortBy, ascending = true) =>
	objs.sort((a, b) => ascending && a[sortBy].localeCompare(b[sortBy]));
