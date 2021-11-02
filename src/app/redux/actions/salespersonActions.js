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

export const approveAccountById = async (id) => async (dispatch) => {
	try {
		dispatch(approvePending({ id: id }));

		const result = await approveSalespersonAccount(id);

		if (result.is_approved) {
			dispatch(approveSuccess());
			return true;
		} else {
			dispatch(approveFail());
			return false;
		}
	} catch (error) {
		dispatch(approveFail());
		return false;
	}
};

export const rejectAccountById = async (id) => async (dispatch) => {
	try {
		dispatch(rejectPending({ id: id }));

		const result = await rejectSalespersonAccount(id);

		if (!result.is_approved) {
			dispatch(rejectSuccess('Account rejection successful'));
			return true;
		} else {
			dispatch(rejectFail('Account rejection failed'));
			return false;
		}
	} catch (error) {
		dispatch(rejectFail('Account rejection failed'));
		return false;
	}
};
