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
		added: [],
	},
	salesPerMonth: {
		isLoading: false,
		chartColumns: monthList,
		chartValues: [],
		error: '',
	},
	payOrLater: {
		isLoading: false,
		chartColumns: monthList,
		chartValues: [],
		error: '',
	},
	salesBySalesperson: {
		isLoading: false,
		chartColumns: monthList,
		chartValues: [],
		error: '',
	},
	progressBySalesperson: {
		isLoading: false,
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
			const vals = Object.keys(result).map((key) => result[key]);
			state.salesPerProduct.chartValues = vals;
			state.salesPerProduct.added = vals.map((v) => v.product_id);
		},
		salesPerProductFail: (state, { payload }) => {
			state.salesPerProduct.isLoading = false;
			state.salesPerProduct.error = payload.error;
		},
		salesPerProductAddToAdded: (state, { payload }) => {
			state.salesPerProduct.added.push(parseInt(payload));
		},
		salesPerProductRemoveFromAdded: (state, { payload }) => {
			state.salesPerProduct.added = state.salesPerProduct.added.filter(
				(v) => v !== payload
			);
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
		payOrLaterPending: (state) => {
			state.payOrLater.isLoading = true;
		},
		payOrLaterSuccss: (state, { payload }) => {
			state.payOrLater.isLoading = false;
			state.payOrLater.error = '';
			state.payOrLater.chartValues = payload;
		},
		payOrLaterFail: (state, { payload }) => {
			state.payOrLater.isLoading = false;
			state.payOrLater.error = payload.error;
		},
		salesBySalespersonPending: (state) => {
			state.salesBySalesperson.isLoading = true;
		},
		salesBySalespersonSuccss: (state, { payload }) => {
			state.salesBySalesperson.isLoading = false;
			state.salesBySalesperson.error = '';
			state.salesBySalesperson.chartValues = payload;
		},
		salesBySalespersonFail: (state, { payload }) => {
			state.salesBySalesperson.isLoading = false;
			state.salesBySalesperson.error = payload.error;
		},
		progressBySalespersonPending: (state) => {
			state.progressBySalesperson.isLoading = true;
		},
		progressBySalespersonSuccss: (state, { payload }) => {
			state.progressBySalesperson.isLoading = false;
			state.progressBySalesperson.error = '';
			state.progressBySalesperson.chartValues = payload;
		},
		progressBySalespersonFail: (state, { payload }) => {
			state.progressBySalesperson.isLoading = false;
			state.progressBySalesperson.error = payload.error;
		},
	},
});

export const {
	salesPerProductPending,
	salesPerProductFail,
	salesPerProductSuccss,
	salesPerProductAddToAdded,
	salesPerProductRemoveFromAdded,
	salesPerMonthPending,
	salesPerMonthFail,
	salesPerMonthSuccss,
	payOrLaterPending,
	payOrLaterFail,
	payOrLaterSuccss,
	salesBySalespersonPending,
	salesBySalespersonFail,
	salesBySalespersonSuccss,
	progressBySalespersonPending,
	progressBySalespersonFail,
	progressBySalespersonSuccss,
} = reportSlice.actions;

export const getAvailablesForSalesPerProduct = (state) => {
	const all = state.report.salesPerProduct.chartValues;
	const added = state.report.salesPerProduct.added;
	return all.filter((cVal) => !added.includes(cVal.product_id));
};

export const getChartValuesForSalesPerProduct = (state) => {
	const all = state.report.salesPerProduct.chartValues;
	const added = state.report.salesPerProduct.added;
	return all.filter((cVal) => added.includes(cVal.product_id));
};

export default reportSlice.reducer;
