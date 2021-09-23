import {
	distributionOfficersPending,
	distributionOfficersFail,
	distributionOfficersSuccess,
	approvePending,
	approveFail,
	approveSuccess,
} from '../slices/distributionOfficersSlice';
import {
	fetchDistributionOfficers,
	approveDOAccount,
} from '../../../api/salespersonApi';

export const getDistributionOfficers = () => async (dispatch) => {
	try {
		dispatch(distributionOfficersPending());

		const result = await fetchDistributionOfficers();

		if (Array.isArray(result)) {
			return dispatch(distributionOfficersSuccess(result));
		}

		dispatch(distributionOfficersFail());
	} catch (error) {
		dispatch(distributionOfficersFail());
	}
};

export const approveAccountById = (id) => async (dispatch) => {
	try {
		dispatch(approvePending({ id: id }));

		const result = await approveDOAccount(id);

		if (result.is_approved) {
			return dispatch(approveSuccess());
		}

		dispatch(approveFail());
	} catch (error) {
		dispatch(approveFail());
	}
};
