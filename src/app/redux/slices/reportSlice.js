import { createSlice } from '@reduxjs/toolkit';

const monthList = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sept',
	'Oct',
	'Nov',
	'Dec',
];
const initialState = {
	salesPerProduct: {
		isLoading: false,
		chartColumns: monthList,
		chartValues: [],
		error: '',
	},
	salesPerMonth: {
		isLoading: false,
		chartColumns: monthList,
		chartValues: [],
		error: '',
	},
};

export const reportSlice = createSlice({
	name: 'report',
	initialState,
	reducers: {
		salesPerProductPending: (state) => {
			state.salesPerProduct.isLoading = true;
		},
		salesPerProductSuccss: (state, { payload }) => {
			state.salesPerProduct.isLoading = false;
			state.salesPerProduct.error = '';
			const result = payload.reduce((d, row) => {
				d[row.product_id] = d[row.product_id] || {
					product_id: row.product_id,
					product_short_name: row.product_short_name,
					product_long_name: row.product_long_name,
					data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				};
				d[row.product_id]['data'][new Date(row.date).getMonth()] += row.total;
				return d;
			}, {});
			state.salesPerProduct.chartValues = Object.keys(result).map(
				(key) => result[key]
			);
		},
		salesPerProductFail: (state, { payload }) => {
			state.salesPerProduct.isLoading = false;
			state.salesPerProduct.error = payload.error;
		},
		salesPerMonthPending: (state) => {
			state.salesPerMonth.isLoading = true;
		},
		salesPerMonthSuccss: (state, { payload }) => {
			state.salesPerMonth.isLoading = false;
			state.salesPerMonth.error = '';
			state.salesPerMonth.chartValues = payload;
		},
		salesPerMonthFail: (state, { payload }) => {
			state.salesPerMonth.isLoading = false;
			state.salesPerMonth.error = payload.error;
		},
	},
});

export const {
	salesPerProductPending,
	salesPerProductFail,
	salesPerProductSuccss,
	salesPerMonthPending,
	salesPerMonthFail,
	salesPerMonthSuccss,
} = reportSlice.actions;

export default reportSlice.reducer;
