import axios from 'axios';

export const fetchWithAuthorization = (url) => {
	return new Promise(async (resolve, reject) => {
		try {
			const accessJWT = localStorage.getItem('token');

			if (!accessJWT) {
				reject('Token not found!');
			}

			const res = await axios.get(url, {
				headers: {
					Authorization: `Token ${accessJWT}`,
				},
			});

			resolve(res.data);
		} catch (error) {
			reject(error.message);
		}
	});
};

export const fetchWithOutAuthorization = (url) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.get(url);
			resolve(res.data);
		} catch (error) {
			reject(error.message);
		}
	});
};

export const postWithAuthorization = (url, payload) => {
	return new Promise(async (resolve, reject) => {
		try {
			const accessJWT = localStorage.getItem('token');

			if (!accessJWT) {
				reject('Token not found!');
			}

			const res = await axios.post(url, payload, {
				headers: {
					Authorization: `Token ${accessJWT}`,
				},
			});

			resolve(res.data);
		} catch (error) {
			reject(error.message);
		}
	});
};

export const postWithOutAuthorization = (url, payload) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.post(url, payload);

			resolve(res.data);
		} catch (error) {
			reject(error.message);
		}
	});
};
