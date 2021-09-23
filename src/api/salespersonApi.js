import axios from 'axios';
import { fetchWithAuthorization } from './baseApi';

const rootUrl = 'https://teclix.herokuapp.com/salesperson-api/';
const locationUrl = rootUrl + 'locations/';
const currentLocationsUrl = rootUrl + 'locations/current';
const leaderboardUrl = rootUrl + 'leaderboard/';
const leaderboardSchemaUrl = rootUrl + 'leaderboard-point-schema';
const approveUrl =
	'https://teclix.herokuapp.com/staff-api/approve/salesperson/';

export const fetchCurrentLocations = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const accessJWT = localStorage.getItem('token');

			if (!accessJWT) {
				reject('Token not found!');
			}

			const res = await axios.get(currentLocationsUrl, {
				headers: {
					Authorization: accessJWT,
				},
			});

			resolve(res.data);
		} catch (error) {
			reject(error.message);
		}
	});
};

export const fetchSalespersons = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const accessJWT = localStorage.getItem('token');

			if (!accessJWT) {
				reject('Token not found!');
			}

			const res = await axios.get(rootUrl, {
				headers: {
					Authorization: accessJWT,
				},
			});

			resolve(res.data);
		} catch (error) {
			reject(error.message);
		}
	});
};

export const fetchLocations = () => {
	return fetchWithAuthorization(locationUrl);
};

export const fetchLeaderboard = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const accessJWT = localStorage.getItem('token');

			if (!accessJWT) {
				reject('Token not found!');
			}

			const res = await axios.get(leaderboardUrl, {
				headers: {
					Authorization: accessJWT,
				},
			});

			resolve(res.data);
		} catch (error) {
			reject(error.message);
		}
	});
};

export const fetchLeaderboardPointSchema = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const accessJWT = localStorage.getItem('token');

			if (!accessJWT) {
				reject('Token not found!');
			}

			const res = await axios.get(leaderboardSchemaUrl, {
				headers: {
					Authorization: accessJWT,
				},
			});

			resolve(res.data);
		} catch (error) {
			reject(error.message);
		}
	});
};

export const approveSalespersonAccount = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const accessJWT = localStorage.getItem('token');

			if (!accessJWT) {
				reject('Token not found!');
			}

			const res = await axios.post(
				`${approveUrl}${id}`,
				{ is_approved: true },
				{
					headers: {
						Authorization: accessJWT,
					},
				}
			);

			resolve(res.data);
		} catch (error) {
			reject(error.message);
		}
	});
};
