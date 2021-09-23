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
	return fetchWithAuthorization(
		'https://run.mocky.io/v3/7686c5f2-9912-4665-be95-18f54fadd8d7'
	);
};

export const fetchSalesByPayAndLater = () => {
	return fetchWithAuthorization(
		'https://run.mocky.io/v3/0a6f5008-15e1-4bf7-92a0-0347072881d0'
	);
};

//product report
export const fetchSalesPerProduct = () => {
	return fetchWithAuthorization(
		'https://run.mocky.io/v3/46d2e675-781c-471d-b0ba-0e0a01b67c41'
	);
};
