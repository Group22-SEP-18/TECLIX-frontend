import axios from 'axios';
import { postWithAuthorization } from './baseApi';

const rootUrl = 'https://teclix.herokuapp.com/asset-api/';
const productgetUrl = rootUrl + 'products';
const productregisterUrl = rootUrl + 'products/';
const deleteproducturl = rootUrl + 'products/';

export const fetchAllProducts = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const accessJWT = localStorage.getItem('token');

			if (!accessJWT) {
				reject('Token not found!');
			}

			const res = await axios.get(productgetUrl, {
				headers: {
					Authorization: `Token ${accessJWT}`,
				},
			});

			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error.message);
		}
	});
};

export const productRegistration = (frmData) => {
	return postWithAuthorization(productregisterUrl, frmData);
};

export const deleteProductById = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const accessJWT = localStorage.getItem('token');

			if (!accessJWT) {
				reject('Token not found!');
			}

			const res = await axios.delete(`${deleteproducturl}${id}`, {
				headers: {
					Authorization: `Token ${accessJWT}`,
				},
			});

			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error.message);
		}
	});
};
