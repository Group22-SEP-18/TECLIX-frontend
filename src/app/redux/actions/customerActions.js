import { fetchCustomers } from '../../../api/customersApi';
import {
	customersPending,
	customersFail,
	customersSuccess,
} from '../slices/customerSlice';

export const getCustomers = () => async (dispatch) => {
	try {
		dispatch(customersPending());

		const result = await fetchCustomers();

		if (Array.isArray(result)) {
			return dispatch(customersSuccess(result));
		}

		dispatch(customersFail('No customer data'));
	} catch (error) {
		dispatch(customersSuccess('Error while accessing customer data'));
	}
};
