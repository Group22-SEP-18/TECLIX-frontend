import { fetchWithAuthorization, patchWithAuthorization } from './baseApi';

const rootUrl = 'https://teclix.herokuapp.com/customer-api/';
const loyaltySchemaUrl = rootUrl + 'loyalty-point-schema/';

export const fetchCustomers = () => {
	return fetchWithAuthorization(rootUrl);
};

export const updateLoyaltyPointSchema = (id, data) => {
	return patchWithAuthorization(`${loyaltySchemaUrl}${id}`, data);
};

export const fetchLoyaltyPointSchema = () => {
	return fetchWithAuthorization(loyaltySchemaUrl);
};
