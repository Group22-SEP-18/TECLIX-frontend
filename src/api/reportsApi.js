import axios from 'axios';
import { fetchWithAuthorization } from './baseApi';

const rootUrl = 'https://teclix.herokuapp.com/report-api/';

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
	return fetchWithAuthorization('');
};
