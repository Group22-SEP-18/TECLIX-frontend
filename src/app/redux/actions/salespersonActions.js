import {
	fetchSalespersons,
	approveSalespersonAccount,
	rejectSalespersonAccount,
} from '../../../api/salespersonApi';
import {
	salespersonFail,
	salespersonPending,
	salespersonSuccess,
	approvePending,
	approveFail,
	approveSuccess,
	rejectPending,
	rejectFail,
	rejectSuccess,
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

export const approveAccountById = (id) => async (dispatch) => {
	try {
		dispatch(approvePending({ id: id }));

		const result = await approveSalespersonAccount(id);

		if (result.is_approved) {
			return dispatch(approveSuccess());
		}

		dispatch(approveFail());
	} catch (error) {
		dispatch(approveFail());
	}
};

export const rejectAccountById = (id) => async (dispatch) => {
	try {
		dispatch(rejectPending({ id: id }));

		const result = await rejectSalespersonAccount(id);

		if (!result.is_approved) {
			return dispatch(rejectSuccess('Account rejection successful'));
		}

		dispatch(rejectFail('Account rejection failed'));
	} catch (error) {
		dispatch(rejectFail('Account rejection failed'));
	}
};
