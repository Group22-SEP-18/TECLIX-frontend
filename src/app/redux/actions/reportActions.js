import {
	fetchSalesPerProduct,
	fetchSalesPerMonth,
} from '../../../api/reportsApi';
import {
	salesPerProductFail,
	salesPerProductPending,
	salesPerProductSuccss,
	salesPerMonthPending,
	salesPerMonthFail,
	salesPerMonthSuccss,
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

export const fetchSalesPerMonthData = () => async (dispatch) => {
	try {
		console.log(123);
		dispatch(salesPerMonthPending());

		const result = await fetchSalesPerMonth();
		console.log(result);
		if (result.data) return dispatch(salesPerMonthSuccss(result.data));

		dispatch(salesPerMonthFail({ error: 'No sales data' }));
	} catch (error) {
		dispatch(salesPerMonthFail({ error: 'Error while accessing data' }));
	}
};
