import { fetchAllVehicles } from '../../../api/vehicleApi';
import {
	vehiclesPending,
	vehiclesSuccess,
	vehiclesFail,
} from '../slices/vehiclesSlice';

export const fetchVehicleData = () => async (dispatch) => {
	try {
		dispatch(vehiclesPending());

		const result = await fetchAllVehicles();
		if (result.length) return dispatch(vehiclesSuccess(result));

		dispatch(vehiclesFail('No current location data'));
	} catch (error) {
		dispatch(vehiclesFail(error));
	}
};
