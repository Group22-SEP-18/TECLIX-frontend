import { fetchWithAuthorization } from './baseApi';

// salesperson report
export const fetchSalesPerSalespersonForCurrentMonth = () => {
	return fetchWithAuthorization('');
};

export const fetchSalesInLastTwoMonths = () => {
	return fetchWithAuthorization('');
};

//sales report
export const fetchSalesPerMonth = () => {
	return fetchWithAuthorization('');
};

export const fetchSalesByPayAndLater = () => {
	return fetchWithAuthorization('');
};

//product report
export const fetchSalesPerProduct = () => {
	return fetchWithAuthorization(
		'https://run.mocky.io/v3/46d2e675-781c-471d-b0ba-0e0a01b67c41'
	);
};
