import axios from 'axios';

const rootUrl = 'https://teclix.herokuapp.com/asset-api/';
const vehiclegetUrl = rootUrl + 'vehicles/';
const vehicleassignUrl = rootUrl + 'vehicle/assign-items/';
const vehicleassigngetUrl = rootUrl + 'vehicle/salesperson/all';

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

export const fetchVehicleAssignments = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const accessJWT = localStorage.getItem('token');

			if (!accessJWT) {
				reject('Token not found!');
			}

			const res = await axios.get(vehicleassigngetUrl, {
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

export const assigntoVehicle = (frmData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.post(vehicleassignUrl, frmData);

			resolve(res.data);

			if (res.data.id !== frmData.vehicle) {
				reject('Error while assigning products and salesperson');
			}
		} catch (error) {
			reject(error);
		}
	});
};
