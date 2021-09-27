import { fetchLocations } from '../../../api/salespersonApi';
import {
	locationsPending,
	locationsSuccess,
	locationsFail,
} from '../slices/locationsSlice';

export const getLocations = () => async (dispatch) => {
	try {
		dispatch(locationsPending());

		const result = await fetchLocations();

		if (Array.isArray(result)) {
			return dispatch(locationsSuccess(result));
		}

		dispatch(locationsFail());
	} catch (error) {
		dispatch(locationsFail());
	}
};
