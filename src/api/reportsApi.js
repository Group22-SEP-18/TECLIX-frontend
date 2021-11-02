import { fetchWithAuthorization } from './baseApi';

const rootUrl = 'https://teclix.herokuapp.com/report-api/';
// salesperson report
export const fetchSalesPerSalespersonForCurrentMonth = () => {
	return fetchWithAuthorization(`${rootUrl}salesperson-sales-current-month`);
};

export const fetchSalesInLastTwoMonths = () => {
	return fetchWithAuthorization(`${rootUrl}salesperson-sales-progress`);
};

//sales report
export const fetchSalesPerMonth = () => {
	return fetchWithAuthorization(`${rootUrl}total-sales-by-month`);
};

export const fetchSalesByPayAndLater = () => {
	return fetchWithAuthorization(`${rootUrl}pay-and-pay-later`);
};

//product report
export const fetchSalesPerProduct = () => {
	return fetchWithAuthorization(`${rootUrl}sales-per-product`);
};
