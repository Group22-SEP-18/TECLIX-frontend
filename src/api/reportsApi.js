import { fetchWithAuthorization } from './baseApi';

// salesperson report
export const fetchSalesPerSalespersonForCurrentMonth = () => {
	return fetchWithAuthorization(
		'https://run.mocky.io/v3/b37460a4-4650-415f-93a2-bbf36f97f2dd'
	);
};

export const fetchSalesInLastTwoMonths = () => {
	return fetchWithAuthorization(
		'https://run.mocky.io/v3/61d9a5f5-f09a-4e9d-a082-25aa3ee21af8'
	);
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
