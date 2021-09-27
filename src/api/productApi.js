import axios from 'axios';

const rootUrl = 'https://teclix.herokuapp.com/asset-api/';
const productgetUrl = rootUrl + 'products';
const productregisterUrl = rootUrl + 'products';

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
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.post(productregisterUrl);

			resolve(res.data);
		} catch (error) {
			reject(error);
		}
	});
};
