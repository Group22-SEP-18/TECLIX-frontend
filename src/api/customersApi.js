import { fetchWithAuthorization } from './baseApi';

const rootUrl = 'https://teclix.herokuapp.com/customer-api/';

export const fetchCustomers = () => {
	return fetchWithAuthorization(rootUrl);
};
