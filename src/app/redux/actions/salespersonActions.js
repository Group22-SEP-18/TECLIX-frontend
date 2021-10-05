import {
	approveSalespersonAccount,
	rejectSalespersonAccount,
} from '../../../api/salespersonApi';
import {
	approvePending,
	approveFail,
	approveSuccess,
	rejectPending,
	rejectFail,
	rejectSuccess,
} from '../slices/salespersonSlice';

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
