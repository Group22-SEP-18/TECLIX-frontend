import { fetchServiceOrders } from '../../../api/serviceOrderApi';
import {
	serviceOrdersPending,
	serviceOrdersFail,
	serviceOrdersSuccess,
} from '../slices/serviceOrderSlice';

export const fetchServiceOrderData = () => async (dispatch) => {
	try {
		dispatch(serviceOrdersPending());

		const result = await fetchServiceOrders();
		if (result.length) return dispatch(serviceOrdersSuccess(result));

		dispatch(serviceOrdersFail('No service order data'));
	} catch (error) {
		dispatch(serviceOrdersFail('Error while accessing data'));
	}
};
