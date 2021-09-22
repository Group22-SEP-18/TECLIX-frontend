import axios from 'axios';

const rootUrl = 'http://localhost:8000/customer-api/service-orders/';

export const fetchServiceOrders = () => {
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
			console.log(error);
			reject(error.message);
		}
	});
};
