import { fetchWithAuthorization } from './baseApi';

const rootUrl = 'https://teclix.herokuapp.com/customer-api/service-orders/';

export const fetchServiceOrders = () => {
	return fetchWithAuthorization(rootUrl);
};
