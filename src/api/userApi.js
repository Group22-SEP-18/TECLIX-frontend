import axios from 'axios';

const rootUrl = 'http://localhost:8000/staff-api/';
const loginUrl = rootUrl + 'login/web';
const userProfileUrl = rootUrl + 'user';
const logoutUrl = rootUrl + 'logout/';
const newAccessJWT = rootUrl + 'tokens';
const userVerificationUrl = userProfileUrl + '/verify';

export const userRegistration = (frmData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.post(userProfileUrl, frmData);

			resolve(res.data);

			if (res.data.status === 'success') {
				resolve(res.data);
			}
		} catch (error) {
			reject(error);
		}
	});
};
export const userRegistrationVerification = (frmData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.patch(userVerificationUrl, frmData);

			resolve(res.data);
			if (res.data.status === 'success') {
				resolve(res.data);
			}
		} catch (error) {
			reject({ status: 'error', message: error.error });
		}
	});
};

export const userLogin = (frmData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.post(loginUrl, frmData);
			console.log(res.data);
			resolve(res.data);

			if (res.data.token) {
				localStorage.setItem('token', res.data.token);
				// JSON.stringify({ refreshJWT: res.data.token })
			}
		} catch (error) {
			reject(error);
		}
	});
};

export const fetchUser = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const accessJWT = sessionStorage.getItem('accessJWT');

			if (!accessJWT) {
				reject('Token not found!');
			}

			const res = await axios.get(userProfileUrl, {
				headers: {
					Authorization: accessJWT,
				},
			});

			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error.message);
		}
	});
};

export const fetchNewAccessJWT = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const { refreshJWT } = JSON.parse(localStorage.getItem('crmSite'));

			if (!refreshJWT) {
				reject('Token not found!');
			}

			const res = await axios.get(newAccessJWT, {
				headers: {
					Authorization: refreshJWT,
				},
			});

			if (res.data.status === 'success') {
				sessionStorage.setItem('accessJWT', res.data.accessJWT);
			}

			resolve(true);
		} catch (error) {
			if (error.message === 'Request failed with status code 403') {
				localStorage.removeItem('crmSite');
			}

			reject(false);
		}
	});
};

export const userLogout = async () => {
	try {
		await axios.delete(logoutUrl, {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		});
	} catch (error) {
		console.log(error);
	}
};
