import axios from 'axios';
import { postWithAuthorization, postWithOutAuthorization } from './baseApi';

const rootUrl = 'https://teclix.herokuapp.com/staff-api/';
const loginUrl = rootUrl + 'login/web';
const userProfileUrl = rootUrl + 'logged-in-user/';
const logoutUrl = rootUrl + 'logout/';
const userRegisterUrl = rootUrl + 'register/';
const userVerificationUrl = userProfileUrl + '/verify';

export const userRegistration = (frmData) => {
	return postWithOutAuthorization(userRegisterUrl, frmData);
};
export const userRegistrationVerification = (frmData) => {
	return postWithAuthorization(userVerificationUrl, frmData);
};

export const userLogin = (frmData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.post(loginUrl, frmData);
			resolve(res.data);

			if (res.data.token) {
				localStorage.setItem('token', res.data.token);
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
			}
		} catch (error) {
			reject(error.message);
		}
	});
};

export const userLogout = async () => {
	try {
		const accessJWT = localStorage.getItem('token');
		await axios.delete(logoutUrl, {
			headers: {
				Authorization: `Token ${accessJWT}`,
			},
		});
	} catch (error) {}
};
