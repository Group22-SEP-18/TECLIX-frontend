import axios from 'axios';

const rootUrl = 'https://teclix.herokuapp.com/staff-api/';
const loginUrl = rootUrl + 'login/web';
const userProfileUrl = rootUrl + 'logged-in-user/';
const logoutUrl = rootUrl + 'logout/';
const userRegisterUrl = rootUrl + 'register/';
const newAccessJWT = rootUrl + 'tokens';
const userVerificationUrl = userProfileUrl + '/verify';
const approveUrl = rootUrl + 'approve/distribution-officer/';

export const userRegistration = (frmData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.post(userRegisterUrl, frmData);

			resolve(res.data);

			if (res.data.email !== frmData.email) {
				reject('Error while user registration');
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
			const accessJWT = localStorage.getItem('token');

			if (!accessJWT) {
				reject('Token not found!');
			}

			const res = await axios.get(userProfileUrl, {
				headers: {
					Authorization: `Token ${accessJWT}`,
				},
			});

			resolve(res.data);
			if (res.data.token) {
				localStorage.setItem('token', res.data.token);
				// JSON.stringify({ refreshJWT: res.data.token })
			}
		} catch (error) {
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
	} catch (error) {}
};

export const approveUserAccount = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const accessJWT = localStorage.getItem('token');

			if (!accessJWT) {
				reject('Token not found!');
			}

			const res = await axios.get(approveUrl + id, {
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
