import axios from 'axios';
import { postWithAuthorization } from './baseApi';
const rootUrl = 'https://teclix.herokuapp.com/asset-api/';
const vehiclegetUrl = rootUrl + 'vehicles/';
const vehicleassignUrl = rootUrl + 'vehicle/assign-items/';
const vehicleassigngetUrl = rootUrl + 'vehicle/salesperson/all';
const vehicleregisterUrl = rootUrl + 'vehicles/create';
const deletevehicleurl = rootUrl + 'vehicles/';

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

// export const assigntoVehicle = (frmData) => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const res = await axios.post(vehicleassignUrl, frmData);

// 			resolve(res.data);

// 			if (res.data.id !== frmData.vehicle) {
// 				reject('Error while assigning products and salesperson');
// 			}
// 		} catch (error) {
// 			reject(error);
// 		}
// 	});
// };

export const vehicleRegistration = (frmData) => {
	return postWithAuthorization(vehicleregisterUrl, frmData);
};

export const assigntoVehicle = (frmData) => {
	return postWithAuthorization(vehicleassignUrl, frmData);
};

export const deleteVehicleById = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const accessJWT = localStorage.getItem('token');

			if (!accessJWT) {
				reject('Token not found!');
			}

			const res = await axios.delete(`${deletevehicleurl}${id}`, {
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
