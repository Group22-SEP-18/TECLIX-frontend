/**
 * Get date and time from timestamp
 *
 * @param {string} timestamp
 *
 * @return {Object} with property date and time
 */
export const getDateTime = (timestamp) => {
	let dateTime = {};
	let date = new Date(timestamp);
	let time = date.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	});
	let day = date.toLocaleDateString();
	dateTime.day = day;
	dateTime.time = time;
	return dateTime;
};
