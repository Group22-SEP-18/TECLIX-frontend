/**
 * Format a value to SL currency
 *
 * @param {string | number} price
 *
 * @return {string} of format "Rs. xxx,xxx"
 */
export const formatPrice = (price) => {
	return (
		'Rs. ' +
		price
			.toString()
			.split(/(?=(?:...)*$)/)
			.join(',')
	);
};
