import {
	approvePending,
	approveFail,
	approveSuccess,
	rejectPending,
	rejectFail,
	rejectSuccess,
} from '../slices/distributionOfficersSlice';
import { approveDOAccount, rejectDOAccount } from '../../../api/staffApi';

export const approveAccountById = async (id) => async (dispatch) => {
	try {
		dispatch(approvePending({ id: id }));

		const result = await approveDOAccount(id);

		if (result.is_approved) {
			dispatch(approveSuccess('Successfully approved the account'));
			return true;
		} else {
			dispatch(approveFail('Account approval failed'));
			return false;
		}
	} catch (error) {
		dispatch(approveFail('Account approval failed'));
		return false;
	}
};

export const rejectAccountById = async (id) => async (dispatch) => {
	try {
		dispatch(rejectPending({ id: id }));

		const result = await rejectDOAccount(id);

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
