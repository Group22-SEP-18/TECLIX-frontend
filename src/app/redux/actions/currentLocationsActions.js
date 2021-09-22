import {
	currentLocationsPending,
	currentLocationsSuccess,
	currentLocationsFail,
} from '../slices/currentLocationsSlice';
import { fetchCurrentLocations } from '../../../api/salespersonApi';

export const fetchCurrentLocationData = () => async (dispatch) => {
	try {
		dispatch(currentLocationsPending());

		const result = await fetchCurrentLocations();
		if (result.length) return dispatch(currentLocationsSuccess(result));

		dispatch(currentLocationsFail('No current location data'));
	} catch (error) {
		dispatch(currentLocationsFail(error));
	}
};
