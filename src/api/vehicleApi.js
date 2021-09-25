import axios from 'axios';

const rootUrl = 'http://127.0.0.1:8000/asset-api/';
const vehiclegetUrl = rootUrl + 'vehicles';

export const fetchAllVehicles = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const accessJWT = localStorage.getItem('token');

			if (!accessJWT) {
				reject('Token not found!');
			}

			const res = await axios.get(vehiclegetUrl, {
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
