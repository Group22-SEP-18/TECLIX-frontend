import { fetchWithAuthorization, postWithAuthorization } from './baseApi';

const rootUrl = 'https://teclix.herokuapp.com/staff-api/distribution-officer';
const approveUrl = '/staff-api/approve/distribution-officer/{id}';

export const fetchDistributionOfficers = () => {
	return fetchWithAuthorization(rootUrl + '/pending/');
};

export const approveDOAccount = (id) => {
	return postWithAuthorization(`${approveUrl}${id}`, { is_approved: true });
};

export const rejectDOAccount = (id) => {
	return postWithAuthorization(`${approveUrl}${id}`, { is_approved: false });
};
