import {
	fetchWithAuthorization,
	postWithAuthorization,
	patchWithAuthorization,
} from './baseApi';

const rootUrl = 'https://teclix.herokuapp.com/salesperson-api/';
const locationUrl = rootUrl + 'locations/';
const currentLocationsUrl = rootUrl + 'locations/current';
const leaderboardUrl = rootUrl + 'leaderboard/';
const leaderboardSchemaUrl = rootUrl + 'leaderboard-point-schema/';
const approveUrl =
	'https://teclix.herokuapp.com/staff-api/approve/salesperson/';

export const fetchCurrentLocations = () => {
	return fetchWithAuthorization(currentLocationsUrl);
};

export const fetchSalespersons = () => {
	return fetchWithAuthorization(rootUrl);
};

export const fetchLocations = () => {
	return fetchWithAuthorization(locationUrl);
};

export const fetchLeaderboard = () => {
	return fetchWithAuthorization(leaderboardUrl);
};

export const fetchLeaderboardPointSchema = () => {
	return fetchWithAuthorization(leaderboardSchemaUrl);
};

export const updateLeaderboardPointSchema = (id, data) => {
	return patchWithAuthorization(`${leaderboardSchemaUrl}${id}`, data);
};

export const approveSalespersonAccount = (id) => {
	return postWithAuthorization(`${approveUrl}${id}`, { is_approved: true });
};

export const rejectSalespersonAccount = (id) => {
	return postWithAuthorization(`${approveUrl}${id}`, { is_approved: false });
};
