import {
	fetchSalesPerProduct,
	fetchSalesPerMonth,
	fetchSalesByPayAndLater,
	fetchSalesPerSalespersonForCurrentMonth,
	fetchSalesInLastTwoMonths,
} from '../../../api/reportsApi';
import {
	salesPerProductFail,
	salesPerProductPending,
	salesPerProductSuccss,
	salesPerMonthPending,
	salesPerMonthFail,
	salesPerMonthSuccss,
	payOrLaterPending,
	payOrLaterFail,
	payOrLaterSuccss,
	salesBySalespersonPending,
	salesBySalespersonFail,
	salesBySalespersonSuccss,
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

export const fetchPayOrLaterData = () => async (dispatch) => {
	try {
		dispatch(payOrLaterPending());

		const result = await fetchSalesByPayAndLater();
		if (result.data) return dispatch(payOrLaterSuccss(result.data));

		dispatch(payOrLaterFail({ error: 'No sales data' }));
	} catch (error) {
		dispatch(payOrLaterFail({ error: 'Error while accessing data' }));
	}
};

export const fetchSalesBySalepersonData = () => async (dispatch) => {
	try {
		dispatch(salesBySalespersonPending());

		const result = await fetchSalesPerSalespersonForCurrentMonth();
		if (result.data) return dispatch(salesBySalespersonSuccss(result.data));

		dispatch(salesBySalespersonFail({ error: 'No sales data' }));
	} catch (error) {
		dispatch(salesBySalespersonFail({ error: 'Error while accessing data' }));
	}
};
