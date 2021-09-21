import axios from 'axios';

const rootUrl = 'http://localhost:8000/salesperson-api/';
const currentLocationsUrl = rootUrl + 'locations/current/';

return new Promise(async (resolve, reject) => {
	try {
		const accessJWT = sessionStorage.getItem('accessJWT');

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
		console.log(error);
		reject(error.message);
	}
});
