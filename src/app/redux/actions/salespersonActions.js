import { fetchSalespersons } from '../../../api/salespersonApi';
import {
	leaderboradFail,
	leaderboradPending,
	leaderboradSuccess,
} from '../slices/leaderboardSlice';
import {
	salespersonFail,
	salespersonPending,
	salespersonSuccess,
} from '../slices/salespersonSlice';

export const getSalespersons = () => async (dispatch) => {
	try {
		dispatch(salespersonPending());

		const result = await fetchSalespersons();

		if (Array.isArray(result)) {
			return dispatch(salespersonSuccess(result));
		}

		dispatch(salespersonFail());
	} catch (error) {
		dispatch(salespersonFail());
	}
};

export const getLeaderboardPoints = () => async (dispatch) => {
	try {
		dispatch(leaderboradPending());

		const result = await fetchSalespersons();

		if (Array.isArray(result)) {
			return dispatch(leaderboradSuccess(result));
		}

		dispatch(leaderboradFail());
	} catch (error) {
		dispatch(leaderboradFail());
	}
};

export const getAllLocations = () => async (dispatch) => {
	try {
		dispatch(salespersonPending());

		const result = await fetchSalespersons();

		if (Array.isArray(result)) {
			return dispatch(salespersonSuccess(result));
		}

		dispatch(salespersonFail());
	} catch (error) {
		dispatch(salespersonFail());
	}
};
