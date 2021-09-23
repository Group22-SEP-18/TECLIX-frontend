import { fetchWithAuthorization, postWithAuthorization } from './baseApi';

const rootUrl = 'https://teclix.herokuapp.com/staff-api/distribution-officer';
const approveUrl = '/staff-api/approve/distribution-officer/{id}';

export const fetchDistributionOfficers = () => {
	return fetchWithAuthorization(rootUrl);
};

export const approveDOAccount = (id) => {
	return postWithAuthorization(`${approveUrl}${id}`, { is_approved: true });
};
