import {
	currentLocationsPending,
	currentLocationsSuccess,
	currentLocationsFail,
} from '../slices/currentLocationsSlice';
import { fetchCurrentLocations } from '../../../api/salespersonApi';

export const getUserProfile = () => async (dispatch) => {
	try {
		dispatch(currentLocationsPending());

		const result = await fetchCurrentLocations();

		if (result.user && result.user._id)
			return dispatch(currentLocationsSuccess(result.user));

		dispatch(currentLocationsFail('User is not found'));
	} catch (error) {
		dispatch(currentLocationsFail(error));
	}
};
