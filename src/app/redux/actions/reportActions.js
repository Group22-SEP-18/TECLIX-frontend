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
		if (result.data) return dispatch(salesPerProductSuccss(result.data));

		dispatch(salesPerProductFail({ error: 'No sales data' }));
	} catch (error) {
		dispatch(salesPerProductFail({ error: 'Error while accessing data' }));
	}
};
