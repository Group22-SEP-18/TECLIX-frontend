import { fetchLocations } from '../../../api/salespersonApi';
import {
	locationsPending,
	locationsSuccess,
	locationsFail,
	filterLocations,
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

export const filterLocationData = (filters) => (dispatch) => {
	dispatch(filterLocations(filters));
};
