import axios from 'axios';

const rootUrl = 'https://teclix.herokuapp.com/customer-api/';

export const fetchCustomers = () => {
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
