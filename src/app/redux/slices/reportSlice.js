import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	fetchSalesPerProduct,
	fetchSalesPerMonth,
	fetchSalesByPayAndLater,
	fetchSalesPerSalespersonForCurrentMonth,
	fetchSalesInLastTwoMonths,
} from '../../../api/reportsApi';
import { monthList } from '../../utils';

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
		chartValues: [],
		error: '',
	},
	payOrLater: {
		isLoading: false,
		chartValues: [],
		error: '',
	},
	salesBySalesperson: {
		isLoading: false,
		chartValues: [],
		error: '',
	},
	progressBySalesperson: {
		isLoading: false,
		chartValues: [],
		error: '',
	},
};

export const getSalesPerProductAsync = createAsyncThunk(
	'report/getSalesPerProductAsync',
	async () => {
		const response = await fetchSalesPerProduct();
		const salesPerProduct = response.data;
		return salesPerProduct;
	}
);

export const getSalesPerMonthAsync = createAsyncThunk(
	'report/getSalesPerMonthAsync',
	async () => {
		const response = await fetchSalesPerMonth();
		const salesPerMonth = response.data;
		return salesPerMonth;
	}
);

export const getPayOrLaterAsync = createAsyncThunk(
	'report/getPayOrLaterAsync',
	async () => {
		const response = await fetchSalesByPayAndLater();
		const payOrLater = response.data;
		return payOrLater;
	}
);

export const getSalesBySalespersonAsync = createAsyncThunk(
	'report/getSalesBySalespersonAsync',
	async () => {
		const response = await fetchSalesPerSalespersonForCurrentMonth();
		const salesBySalesperson = response.data;
		return salesBySalesperson;
	}
);

export const getProgressBySalespersonAsync = createAsyncThunk(
	'report/getProgressBySalespersonAsync',
	async () => {
		const response = await fetchSalesInLastTwoMonths();
		const progressBySalesperson = response.data;
		return progressBySalesperson;
	}
);

export const reportSlice = createSlice({
	name: 'report',
	initialState,
	reducers: {
		salesPerProductAddToAdded: (state, { payload }) => {
			state.salesPerProduct.added.push(parseInt(payload));
		},
		salesPerProductRemoveFromAdded: (state, { payload }) => {
			state.salesPerProduct.added = state.salesPerProduct.added.filter(
				(v) => v !== payload
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getSalesPerProductAsync.pending, (state) => {
			state.salesPerProduct.isLoading = true;
		});
		builder.addCase(getSalesPerProductAsync.fulfilled, (state, { payload }) => {
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
		});
		builder.addCase(getSalesPerProductAsync.rejected, (state) => {
			state.salesPerProduct.isLoading = false;
			state.salesPerProduct.error = 'Error while accessing data';
		});
		builder.addCase(getSalesPerMonthAsync.pending, (state) => {
			state.salesPerMonth.isLoading = true;
		});
		builder.addCase(getSalesPerMonthAsync.fulfilled, (state, { payload }) => {
			state.salesPerMonth.isLoading = false;
			state.salesPerMonth.error = '';
			state.salesPerMonth.chartValues = payload;
		});
		builder.addCase(getSalesPerMonthAsync.rejected, (state) => {
			state.salesPerMonth.isLoading = false;
			state.salesPerMonth.error = 'Error while accessing data';
		});
		builder.addCase(getPayOrLaterAsync.pending, (state) => {
			state.payOrLater.isLoading = true;
		});
		builder.addCase(getPayOrLaterAsync.fulfilled, (state, { payload }) => {
			state.payOrLater.isLoading = false;
			state.payOrLater.error = '';
			state.payOrLater.chartValues = payload;
		});
		builder.addCase(getPayOrLaterAsync.rejected, (state) => {
			state.payOrLater.isLoading = false;
			state.payOrLater.error = 'Error while accessing data';
		});
		builder.addCase(getSalesBySalespersonAsync.pending, (state) => {
			state.salesBySalesperson.isLoading = true;
		});
		builder.addCase(
			getSalesBySalespersonAsync.fulfilled,
			(state, { payload }) => {
				state.salesBySalesperson.isLoading = false;
				state.salesBySalesperson.error = '';
				state.salesBySalesperson.chartValues = payload;
			}
		);
		builder.addCase(getSalesBySalespersonAsync.rejected, (state) => {
			state.salesBySalesperson.isLoading = false;
			state.salesBySalesperson.error = 'Error while accessing data';
		});
		builder.addCase(getProgressBySalespersonAsync.pending, (state) => {
			state.progressBySalesperson.isLoading = true;
		});
		builder.addCase(
			getProgressBySalespersonAsync.fulfilled,
			(state, { payload }) => {
				state.progressBySalesperson.isLoading = false;
				state.progressBySalesperson.error = '';
				state.progressBySalesperson.chartValues = payload;
			}
		);
		builder.addCase(getProgressBySalespersonAsync.rejected, (state) => {
			state.progressBySalesperson.isLoading = false;
			state.progressBySalesperson.error = 'Error while accessing data';
		});
	},
});

export const { salesPerProductAddToAdded, salesPerProductRemoveFromAdded } =
	reportSlice.actions;

export const selectSalesPerMonth = (state) => state.report.salesPerMonth;

export const selectPayOrPayLater = (state) => state.report.payOrLater;

export const selectProgressBySalesperson = (state) =>
	state.report.progressBySalesperson;

export const selectSalesBySalesperson = (state) =>
	state.report.salesBySalesperson;

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
