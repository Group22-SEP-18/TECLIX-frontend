import { fetchSalesPerProduct } from '../../../api/reportsApi';
import {
	salesPerProductFail,
	salesPerProductPending,
	salesPerProductSuccss,
} from '../slices/reportSlice';

export const fetchSalesPerProductData = () => async (dispatch) => {
	try {
		dispatch(salesPerProductPending());

		const result = await fetchSalesPerProduct();
		if (result.length) return dispatch(salesPerProductSuccss(result));

		dispatch(salesPerProductFail('No sales data'));
	} catch (error) {
		dispatch(salesPerProductFail(error));
	}
};
