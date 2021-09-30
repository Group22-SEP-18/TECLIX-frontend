import {
	distributionOfficersPending,
	distributionOfficersFail,
	distributionOfficersSuccess,
	approvePending,
	approveFail,
	approveSuccess,
	rejectPending,
	rejectFail,
	rejectSuccess,
} from '../slices/distributionOfficersSlice';
import {
	fetchDistributionOfficers,
	approveDOAccount,
	rejectDOAccount,
} from '../../../api/staffApi';

// export const getDistributionOfficers = () => async (dispatch) => {
// 	try {
// 		dispatch(distributionOfficersPending());

// 		const result = await fetchDistributionOfficers();

// 		if (Array.isArray(result)) {
// 			return dispatch(distributionOfficersSuccess(result));
// 		}

// 		dispatch(distributionOfficersFail());
// 	} catch (error) {
// 		dispatch(distributionOfficersFail());
// 	}
// };

export const approveAccountById = (id) => async (dispatch) => {
	try {
		dispatch(approvePending({ id: id }));

		const result = await approveDOAccount(id);

		if (result.is_approved) {
			return dispatch(approveSuccess('Successfully approved the account'));
		}

		dispatch(approveFail('Account approval failed'));
	} catch (error) {
		dispatch(approveFail('Account approval failed'));
	}
};

export const rejectAccountById = (id) => async (dispatch) => {
	try {
		dispatch(rejectPending({ id: id }));

		const result = await rejectDOAccount(id);

		if (!result.is_approved) {
			return dispatch(rejectSuccess('Account rejection successful'));
		}

		dispatch(rejectFail('Account rejection failed'));
	} catch (error) {
		dispatch(rejectFail('Account rejection failed'));
	}
};
